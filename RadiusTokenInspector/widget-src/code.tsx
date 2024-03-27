const { widget } = figma;
const { AutoLayout, useSyncedState } = widget;

import { TokenRecords } from "./common/token.types";

import { WidgetHeader } from "./token-list";
import { isComponent, isInstance } from "./common/figma.types";
import {
  diffRecordValues,
  flatTokenList,
  getComponentSet,
  getTokensFromNode,
  getVariantListByFilter,
  isNotNil,
} from "./common/component.utils";
import { VariantsDocs, EmptyComponentDocs } from "./token-list/variants-docs";

// get the selected node from the figma API and return it
export const getSelectedNode = async () => {
  const selectedNode = figma.currentPage.selection[0];
  if (!selectedNode) {
    console.log("No node selected");
    throw new Error("no node selected");
  }

  if (!isInstance(selectedNode)) return undefined;

  // const set = await getComponentSet(selectedNode);
  // const matrix = getVariantMatrix(set);

  // console.log("==========>>>>>>>>>", matrix);

  const main = await selectedNode.getMainComponentAsync();

  // if (!main) return undefined;

  //  const node = await getTokensFromNode(main);

  console.log("================>..");

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
  return undefined;
};

type NodeTokensProps = {
  document: () => void;
};

export const NodeTokens = ({ document }: NodeTokensProps) => {
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
      <WidgetHeader loaded={false} addVariants={document} />
      <EmptyComponentDocs />
    </AutoLayout>
  );
};

export type VariantTokensProps = {
  name: string;
  tokens: TokenRecords;
  lastLoaded?: string;
  resetComponets: () => void;
};

export const VariantTokens: FunctionalWidget<VariantTokensProps> = ({
  name,
  tokens,
  lastLoaded,
  resetComponets,
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
      <WidgetHeader
        loaded={true}
        lastLoaded={lastLoaded}
        addVariants={() => {}}
        resetComponents={resetComponets}
      />
      <VariantsDocs name={name} tokenList={tokens} />
    </AutoLayout>
  );
};

const documentVariants =
  (
    setVariantTokens: (tokens: TokenRecords | null) => void,
    node: ComponentNode
  ) =>
  () => {
    Promise.resolve(node)
      .then((node) => {
        if (!node) throw new Error("No component selected");
        // setName(node.name);
        return getTokenList(node);
      })
      .then((list) => {
        console.log("PRE", list);
        return setVariantTokens(list ?? null);
      });
  };

export function Widget() {
  const [node, setNode] = useSyncedState<ComponentNode | null>("nodes", null);
  const [lastLoaded, setLastLoaded] = useSyncedState<string | null>(
    "lastLoaded",
    null
  );
  const [variantTokens, setVariantTokens] = useSyncedState<TokenRecords | null>(
    "componentTokens",
    null
  );

  return node && variantTokens ? (
    <VariantTokens
      name={node.name}
      tokens={variantTokens}
      lastLoaded={lastLoaded ?? undefined}
      resetComponets={() => {
        setNode(null);
        setLastLoaded(null);
        setVariantTokens(null);
      }}
    />
  ) : (
    <NodeTokens
      document={() =>
        getSelectedNode().then((node) => {
          if (!node || !isComponent(node)) {
            console.error("No valid component");
            throw new Error("No valid component selected");
          }
          setNode(node);
          setLastLoaded(strNow());
          documentVariants(setVariantTokens, node)();
        })
      }
    />
  );
}

widget.register(Widget);

function strNow() {
  const d = new Date();
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}
