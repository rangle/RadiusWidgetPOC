import { getAllTokensRecursive } from "../tokens";
import type { ComponentUsage } from "../common/token.types";
import { getComponent, setComponentTexts } from "./utils";

const { widget } = figma
const { AutoLayout } = widget

const flattenTokens = (tokens: ComponentUsage): ComponentUsage[] => {
  const flattenedTokens = [tokens];
  for (let i = 0; i < tokens.children.length; i++) {
    const child = tokens.children[i];
    if (child.props.length === 0) continue;
    flattenedTokens.push(...flattenTokens(child));
  }
  return flattenedTokens;
}




// this component will generate a component with all the tokens assiciated with a component
// it will go through each child of the component looking for tokens
export const createComponentTokens = async (selectedComponent: SceneNode) => {
  console.log('\n\n====== create component tokens ======')
  const tokens = await getAllTokensRecursive(selectedComponent);
  const flattenedTokens = flattenTokens(tokens);

  const localVariable = await getComponent('type=.template.localVariableIcon');
  const tokenStudio = await getComponent('type=.template.tokenStudioIcon');
  const componentTitleComponent = await getComponent('style=.template.text.componentTitle');
  if (!localVariable || !tokenStudio || !componentTitleComponent) {
    figma.notify('Example token (named `.template.token`) does not exist.')
    return
  }

  const tokenContainer = await figma.createNodeFromJSXAsync(
    <AutoLayout
      name={selectedComponent.name + ' tokens'}
      width={200}
      direction="vertical"
      spacing={8}
    ></AutoLayout>
  ) as FrameNode;

  const tokenListTemplate = await figma.createNodeFromJSXAsync(
    <AutoLayout
      name='tokenList'
      width='fill-parent'
      direction="vertical"
      spacing={8}
    ></AutoLayout>);

  for (let i = 0; i < flattenedTokens.length; i++) {
    const tokenList = await tokenListTemplate.clone() as FrameNode;
    tokenList.name = flattenedTokens[i].name;
    const name = componentTitleComponent.createInstance();
    setComponentTexts(name, { '.template.texts': flattenedTokens[i].name });
    tokenList.appendChild(name);

    for (let j = 0; j < flattenedTokens[i].props.length; j++) {
      const token = flattenedTokens[i].props[j];
      const tokenInstance = token.from === 'Token Studio' ? await tokenStudio.createInstance() : await localVariable.createInstance();
      tokenInstance.name = token.name;
      setComponentTexts(tokenInstance, { '.template.tokenName': token.name, '.template.tokenValue': token.value });
      tokenList.appendChild(tokenInstance);
    }
    tokenContainer.appendChild(tokenList);
    tokenList.layoutSizingHorizontal = "HUG";
    tokenList.layoutSizingVertical = 'HUG';
  }
  tokenContainer.layoutMode = 'VERTICAL';
  tokenContainer.layoutSizingHorizontal = "HUG";
  tokenContainer.layoutSizingVertical = 'HUG';

  // remove token list
  tokenListTemplate.remove();

  return tokenContainer;

};
