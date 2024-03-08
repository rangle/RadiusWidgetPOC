import {

  isComposite,
} from "../common/figma.types";
import { ComponentUsage, TokenUse } from "../common/token.types";

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
            value: node.getSharedPluginData("tokens", token),
            from: "Token Studio",
          },
        ];
  }, [] as TokenUse[]);

  return {
    name: node.name,
    props: props.flatMap((v) => v),
    children,
  } satisfies ComponentUsage;
}
