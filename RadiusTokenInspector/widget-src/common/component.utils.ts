import { getLocalVariable } from "../local-variable";
import { getTokenStudioTokens } from "../token-studio";
import { isInstance, isComponent, isComponentSet } from "./figma.types";
import { ComponentUsage } from "./token.types";
import { combineComponentUsage } from "./token.utils";

export const getComponentSet = async (node: BaseNode) => {
  if (!node) {
    console.log("No node selected");
    throw new Error("no node selected");
  }

  if (isInstance(node)) {
    const main = await node.getMainComponentAsync();

    if (isComponent(main)) {
      const { parent } = main;

      // get the component set
      if (isComponentSet(parent)) return parent;
    }
  }
  return undefined;
};

export const visitComponents = <T>(
  set: ComponentSetNode | undefined,
  visitor: (c: ComponentNode) => T
) => {
  if (!set) return [];
  const result = set.children.map((component) => {
    if (isComponent(component)) {
      return visitor(component);
    }
  });
  return result;
};

export const getVariantMatrix = (set: ComponentSetNode | undefined) => {
  if (!set) return [];
  return visitComponents(set, (component) => component.variantProperties);
};

export const flatTokenList = (
  node: ComponentUsage,
  name = ""
): Record<string, string> => {
  const fullName = `${name}.`;
  const tokens = node.props.reduce((acc, prop) => {
    const key = `${fullName}${prop.name}`;
    const token = prop.value;
    return { ...acc, [key]: token };
  }, {} as Record<string, string>);
  const childrenTokens = node.children.reduce(
    (acc, child) => ({
      ...acc,
      ...flatTokenList(child, `${fullName}${child.name}`),
    }),
    {} as Record<string, string>
  );
  return {
    ...tokens,
    ...childrenTokens,
  };
};

export const getTokensFromNode = async (node: ComponentNode | InstanceNode) => {
  const tokenStudioValues = getTokenStudioTokens(node);
  const localVariableUsage = await getLocalVariable(node);
  const componentUsage: ComponentUsage = combineComponentUsage(
    localVariableUsage,
    tokenStudioValues
  );
  return componentUsage;
};

export const isNotNil = <T>(o: T | null | undefined): o is T => !!o;

export const diffRecordValues = <T extends Record<string, string>>(
  a: T,
  b: T
): Record<string, string> => {
  // record any tokens in b that are not identical to a
  const diffEntries = Object.entries(b)
    .map(([key, value]) => {
      return a[key] === value ? null : [key, value];
    })
    .filter(isNotNil);
  return Object.fromEntries(diffEntries);
};

export const getVariantList = (set: ComponentSetNode) =>
  set.children.filter(isComponent);

export const getVariantListByFilter = (
  set: ComponentSetNode,
  project: (variant: ComponentNode) => boolean
) => set.children.filter((v) => isComponent(v) && project(v));
