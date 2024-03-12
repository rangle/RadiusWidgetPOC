import { getAllTokensRecursive } from "../tokens";
import type { ComponentUsage } from "../common/token.types";

const { widget } = figma
const { AutoLayout, Text } = widget

const flattenTokens = (tokens: ComponentUsage): ComponentUsage[] => {
  const flattenedTokens = [tokens];
  for (let i = 0; i < tokens.children.length; i++) {
    const child = tokens.children[i];
    flattenedTokens.push(...flattenTokens(child));
  }
  return flattenedTokens;
}

const tokenText = (value: ComponentUsage['props'][0]) => {
  return <AutoLayout
    name={value.name}
    width={'fill-parent'}
    direction="horizontal"
    spacing={16}
  >
    <Text>
      {value.name}
    </Text>
    <Text>
      {value.value}
    </Text>
    <Text>
      {value.from}
    </Text>
  </AutoLayout>
}

const componentTokens = (tokens: ComponentUsage) => {
  return <AutoLayout
    name={tokens.name}
    width='fill-parent'
    direction="vertical"
    spacing={8}
  >
    {tokens.props.map(tokenText)}
  </AutoLayout>
}

// this component will generate a component with all the tokens assiciated with a component
// it will go through each child of the component looking for tokens
export const createComponentTokens = async (selectedComponent: SceneNode) => {
  console.log('\n\n====== create component tokens ======')
  const tokens = await getAllTokensRecursive(selectedComponent);
  const flattenedTokens = flattenTokens(tokens);

  await figma.createNodeFromJSXAsync(<AutoLayout
    name={'.component.tokens'}
    width={200}
    direction="vertical"
    spacing={8}
  >{flattenedTokens.map(componentTokens)}</AutoLayout>);
};
