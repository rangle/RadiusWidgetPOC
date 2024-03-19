import { isComposite } from "../../common/figma.types";
import { ComponentUsage, TokenUse } from "../../common/token.types";

function removeQuotes(str: string) {
  return str.replace(/^"|"$/g, '');
}

export function getTokenStudioTokens(node: SceneNode): ComponentUsage {
  const sharedTokens = node.getSharedPluginDataKeys("tokens");

  const children = isComposite(node)
    ? node.children.map(getTokenStudioTokens)
    : [];
  const props = sharedTokens.reduce((tokens: TokenUse[], token: string) => {
    return token === "version"
      ? tokens
      : [
        ...tokens,
        {
          name: token,
          value: removeQuotes(node.getSharedPluginData("tokens", token)),
          from: "Token Studio",
        },
      ];
  }, [] as TokenUse[]).filter((v) => v.name !== 'hash');

  return {
    name: node.name,
    props: props.flatMap((v) => v),
    children,
  } satisfies ComponentUsage;
}
