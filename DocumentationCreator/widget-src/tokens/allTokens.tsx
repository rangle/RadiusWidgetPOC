import { ComponentUsage } from "../common/token.types";
import { isComposite } from "../common/figma.types";
import { getLocalVariables } from "./local-variable";
import { getTokenStudioTokens } from "./token-studio";

export const combineComponentUsage = (
  a: ComponentUsage,
  b: ComponentUsage
): ComponentUsage => {
  return {
    name: a.name,
    props: [...a.props, ...b.props],
    children: a.children.map((ac, index) =>
      combineComponentUsage(ac, b.children[index])
    ),
  };
};

export const getAllTokens = async (node: SceneNode): Promise<ComponentUsage> => {
  const local = await getLocalVariables(node);
  const studio = getTokenStudioTokens(node);
  return combineComponentUsage(local, studio);
}

export const getAllTokensRecursive = async (node: SceneNode): Promise<ComponentUsage> => {
  const tokens = await getAllTokens(node);
  if (isComposite(node)) {
    tokens.children = await Promise.all(node.children.map(getAllTokensRecursive));
  }
  return tokens
}