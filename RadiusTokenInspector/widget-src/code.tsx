const { widget } = figma;
const { AutoLayout, useSyncedState } = widget;

import { ComponentUsage, TokenRecords } from "./common/token.types";

import { WidgetHeader, ComponentDocs } from "./token-list";
import { getAllLocalVariableTokens } from "./common/variables.utils";
import { generateLayerFile } from "./common/generator.utils";
import { isComponent, isInstance } from "./common/figma.types";
import {
  diffRecordValues,
  flatTokenList,
  getComponentSet,
  getTokensFromNode,
  getVariantListByFilter,
  isNotNil,
} from "./common/component.utils";
import { VariantsDocs } from "./token-list/variants-docs";

// get the selected node from the figma API and return it
export const getSelectedNode = async () => {
  console.log("in select node");
  const selectedNode = figma?.currentPage?.selection[0];
  console.log("==========>>>>>>>>>", selectedNode);
  if (!selectedNode) {
    console.warn("No node selected");
    throw new Error("no node selected");
  }

  if (isInstance(selectedNode)) {
    console.log("==========>>>>>>>>> INSTANCE", selectedNode);

    const main = await selectedNode.getMainComponentAsync();

    console.log("================>....");

    // const set = await getComponentSet(selectedNode);
    // if (set && set.children) {
    //   // obtain the default props for each prop
    //   const defaultProps = Object.entries(set.componentPropertyDefinitions)
    //     .map(([propName, prop]) => {
    //       if (prop.type === "VARIANT" && prop.variantOptions) {
    //         const defaultVariant =
    //           prop.variantOptions.find((v) => v.indexOf("✦") !== -1) ??
    //           prop.variantOptions[0];
    //         return [propName, defaultVariant];
    //       }
    //     })
    //     .filter(isNotNil);
    //   const defaultPropsMap = Object.fromEntries(defaultProps);
    //   console.log("PROP >>>>", defaultProps);

    //   // find the one component that has all defaults
    //   const [allDefault] = set.children.filter(
    //     (n) =>
    //       isComponent(n) &&
    //       defaultProps.every(([k, v]) => n.variantProperties?.[k] === v)
    //   );

    //   if (!isComponent(allDefault)) return undefined;

    //   // get its tokens/variables
    //   const node = await getTokensFromNode(allDefault);
    //   const mainTokens = flatTokenList(node, "component");

    //   // for every prop, find the components that vary that one prop while leaving the rest default
    //   const results = defaultProps.reduce((acc, [propName]) => {
    //     console.log(">>>>>", propName);
    //     const components = getVariantListByFilter(set, (variant) => {
    //       // for every prop in the component that is not the current one
    //       const filterProps = Object.entries(
    //         variant.variantProperties ?? {}
    //       ).filter(([name]) => propName !== name);
    //       // select the component that has the default value for those properties
    //       return filterProps.every(
    //         ([name, value]) => defaultPropsMap[name] === value
    //       );
    //     });

    //     // now for each one of these components grab their tokens and generate a diff with the default tokens
    //     const result = components.map(async (variant) => {
    //       if (isComponent(variant)) {
    //         const tokens = await getTokensFromNode(variant).then((node) =>
    //           flatTokenList(node, "component")
    //         );

    //         const attributes = [
    //           propName,
    //           variant.variantProperties?.[propName],
    //         ].join(" ");
    //         const differences = diffRecordValues(mainTokens, tokens);
    //         console.log(">>>", attributes, differences);
    //         return [attributes, differences] as const;
    //       }
    //     });
    //     return [...acc, ...result];
    //   }, [] as Promise<readonly [string, Record<string, string>] | undefined>[]);

    //   const r = (await Promise.all(results)).filter(isNotNil);
    //   const resultMap = Object.fromEntries(r);

    //   console.log("***", resultMap);
    //   return {
    //     default: mainTokens,
    //     ...resultMap,
    //   };
    // }

    return main;
  }

  if (isComponent(selectedNode)) {
    console.log(">> COMPONENTS", selectedNode);
    return selectedNode;
  }
  console.log("NOT A COMPONENT");
  return undefined;
};

const getTokenList = async (
  node: BaseNode
): Promise<TokenRecords | undefined> => {
  const set = await getComponentSet(node);
  console.log("SET", set);
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
    return {
      default: mainTokens,
      ...resultMap,
    } satisfies TokenRecords;
  }

  if (isComponent(node)) {
    console.log("Single component selected");
    // get its tokens/variables
    const tokens = await getTokensFromNode(node);
    const defaultTokens = flatTokenList(tokens, "component");
    return {
      default: defaultTokens,
    };
  }

  console.log("Invalid selection");
  return undefined;
};

type NodeTokensProps = {
  usage: ComponentUsage | undefined;
  document: () => void;
  deleteComponent: (id: string) => void;
};

export const NodeTokens = ({
  usage,
  document,
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
      <WidgetHeader loaded={!!usage} addVariants={document} />
      <ComponentDocs
        usage={usage}
      />
    </AutoLayout>
  );
};

export type VariantTokensProps = {
  name: string;
  tokens: TokenRecords;
};

export const VariantTokens: FunctionalWidget<VariantTokensProps> = ({
  name,
  tokens,
}) => {
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
      <WidgetHeader loaded={true} addVariants={() => {}} />
      <VariantsDocs name={name} tokenList={tokens} />
    </AutoLayout>
  );
};

export function Widget() {
  const [node, setNode] = useSyncedState<ComponentUsage | undefined>(
    "nodes",
    undefined
  );
  const [name, setName] = useSyncedState<string>("name", "");
  const [deleted, setDeleted] = useSyncedState<string[]>("deletedNodes", []);
  const [variantTokens, setVariantTokens] = useSyncedState<
    TokenRecords | undefined
  >("componentTokens", undefined);

  return variantTokens ? (
    <VariantTokens name={name} tokens={variantTokens} />
  ) : (
    <NodeTokens
      usage={node}
      inspect={() => {
        getAllLocalVariableTokens().then((collections) => {
          const result = generateLayerFile(collections);
          console.log("==================>", result);
        });

        getSelectedNode()
          .then((node) => {
            if (!node) throw new Error("No component selected");
            return getTokensFromNode(node);
          })
          .then((usage) => setNode(usage));
      }}
      document={() => {
        console.log("BEFORE SELECT NODE");
        getSelectedNode()
          .then((node) => {
            console.log("after getCurrentNode");
            if (!node) throw new Error("No component selected");
            // setName(node.name);
            return getTokenList(node);
          })
          .then((list) => {
            console.log("PRE", list);
            return setVariantTokens(list);
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
