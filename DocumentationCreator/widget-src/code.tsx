const { widget } = figma
const { Frame } = widget
import { getTokenStudioTokens } from './token-stuido'
import { getLocalVariable } from './local-variable'
import { copyPasteThis, generateDefaultComponents, createDocumentationPage } from './rendering'

// get the selected node from the figma API and return it
const getSelectedNode = async () => {
  const selectedNode = figma.currentPage.selection[0];
  if (!selectedNode) return console.log('No node selected');

  let tokens = getTokenStudioTokens(selectedNode)
  const localVariables = await getLocalVariable(selectedNode)
  tokens = tokens.concat(localVariables);

  console.log('tokens', tokens);
};

const copyPaste = () => {
  const selectedNode = figma.currentPage.selection[0];
  if (!selectedNode) return console.log('No node selected');
  copyPasteThis(selectedNode);
}

const createComponents = async () => {
  await generateDefaultComponents();
}

const createDocumentation = async () => {
  await createDocumentationPage();
}

function Widget() {
  return <Frame width={100} height={100} fill={'#C4C4C4'} onClick={createDocumentation}></Frame>
}

widget.register(Widget)
