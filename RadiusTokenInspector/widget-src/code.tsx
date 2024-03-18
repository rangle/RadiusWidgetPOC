const { widget } = figma;
const { AutoLayout, useSyncedState } = widget;

import { ComponentUsage } from "./common/token.types";

import { WidgetHeader, ComponentDocs } from "./token-list";
import { getAllLocalVariableTokens } from "./common/variables.utils";
import { generateLayerFile } from "./common/generator.utils";
import { isComponent, isInstance } from "./common/figma.types";
import {
  diffRecordValues,
  flatTokenList,
  getComponentSet,
  getTokensFromNode,
  getVariantList,
  getVariantListByFilter,
  getVariantMatrix,
  isNotNil,
} from "./common/component.utils";
import { isArray } from "./common/token-parser.types";

// get the selected node from the figma API and return it
export const getSelectedNode = async () => {
  const selectedNode = figma.currentPage.selection[0];
  if (!selectedNode) {
    console.log("No node selected");
    throw new Error("no node selected");
  }

  const set = await getComponentSet(selectedNode);
  const matrix = getVariantMatrix(set);

  console.log("==========>>>>>>>>>", matrix);

  if (!isInstance(selectedNode)) return undefined;

  const main = await selectedNode.getMainComponentAsync();

  if (!main) return undefined;

  const node = await getTokensFromNode(main);

  console.log("================>..");

  if (set && set.children) {
    // obtain the default props for each prop
    const defaultProps = Object.entries(set.componentPropertyDefinitions)
      .map(([propName, prop]) => {
        if (prop.type === "VARIANT" && prop.variantOptions) {
          const defaultVariant =
            prop.variantOptions.find((v) => v.indexOf("✦") !== -1) ??
            prop.variantOptions[0];
          return [propName, defaultVariant];
        }
      })
      .filter(isNotNil);
    const defaultPropsMap = Object.fromEntries(defaultProps);
    console.log("PROP >>>>", defaultProps);

    // find the one component that has all defaults
    const [allDefault] = set.children.filter(
      (n) =>
        isComponent(n) &&
        defaultProps.every(([k, v]) => n.variantProperties?.[k] === v)
    );

    if (!isComponent(allDefault)) return undefined;

    // get its tokens/variables
    const node = await getTokensFromNode(allDefault);
    const mainTokens = flatTokenList(node, "component");

    // for every prop, find the components that vary that one prop while leaving the rest default
    const results = defaultProps.reduce((acc, [propName]) => {
      console.log(">>>>>", propName);
      const components = getVariantListByFilter(set, (variant) => {
        // for every prop in the component that is not the current one
        const filterProps = Object.entries(
          variant.variantProperties ?? {}
        ).filter(([name]) => propName !== name);
        // select the component that has the default value for those properties
        return filterProps.every(
          ([name, value]) => defaultPropsMap[name] === value
        );
      });

      // now for each one of these components grab their tokens and generate a diff with the default tokens
      const result = components.map(async (variant) => {
        if (isComponent(variant)) {
          const tokens = await getTokensFromNode(variant).then((node) =>
            flatTokenList(node, "component")
          );

          const attributes = [
            propName,
            variant.variantProperties?.[propName],
          ].join(" ");
          const differences = diffRecordValues(mainTokens, tokens);
          console.log(">>>", attributes, differences);
          return [attributes, differences] as const;
        }
      });
      return [...acc, ...result];
    }, [] as Promise<readonly [string, Record<string, string>] | undefined>[]);

    const r = (await Promise.all(results)).filter(isNotNil);
    const resultMap = Object.fromEntries(r);

    console.log("***", resultMap);
  }

  return node;
};

type NodeTokensProps = {
  usage: ComponentUsage | undefined;
  inspect: () => void;
  isDeleted: (id: string) => boolean;
  resetComponents: () => void;
  deleteComponent: (id: string) => void;
};

export const NodeTokens = ({
  usage,
  inspect,
  isDeleted,
  deleteComponent,
  resetComponents,
}: NodeTokensProps) => {
  return (
    <AutoLayout
      name="WidgetFrame"
      effect={{
        type: "drop-shadow",
        color: "#00000040",
        offset: {
          x: 0,
          y: 4,
        },
        blur: 4,
        showShadowBehindNode: false,
      }}
      fill="#F6F6F6"
      stroke="#858585"
      cornerRadius={6}
      direction="vertical"
      spacing={6}
      padding={12}
    >
      <WidgetHeader
        node={usage}
        addComponent={inspect}
        resetComponents={() => resetComponents()}
      />
      <ComponentDocs
        usage={usage}
        deleteComponent={deleteComponent}
        isDeleted={isDeleted}
      />
    </AutoLayout>
  );
};

export function Widget() {
  const [node, setNode] = useSyncedState<ComponentUsage | undefined>(
    "nodes",
    undefined
  );
  const [deleted, setDeleted] = useSyncedState<string[]>("deletedNodes", []);

  return (
    <NodeTokens
      usage={node}
      inspect={() => {
        getAllLocalVariableTokens().then((collections) => {
          const result = generateLayerFile(collections);
          console.log("==================>", result);
        });

        getSelectedNode().then((node) => {
          console.log("=====", node);
          setNode(node);
        });
      }}
      isDeleted={(id: string) => deleted.indexOf(id) !== -1}
      deleteComponent={(id: string) => {
        if (deleted.indexOf(id) === -1) setDeleted([...deleted, id]);
      }}
      resetComponents={() => {
        setNode(undefined);
        setDeleted([]);
      }}
    />
  );
}

widget.register(Widget);
