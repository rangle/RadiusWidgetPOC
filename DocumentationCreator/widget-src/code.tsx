const { widget } = figma
const { AutoLayout, Text } = widget
import { getAllTokens } from './tokens'
import { generateDefaultComponents, createDocumentationPage, createPropertiesGrid, createComponentTokens } from './rendering'

// get the selected node from the figma API and return it
const getSelectedNode = async () => {
  const selectedNode = figma.currentPage.selection[0];
  if (!selectedNode) return console.log('No node selected');
  const tokens = getAllTokens(selectedNode);
  console.log('tokens', tokens);
};

const createComponents = async () => {
  await generateDefaultComponents();
}

const createDocumentation = async () => {
  await createDocumentationPage();
}

const createGrid = async () => {
  const selectedNode = figma.currentPage.selection[0];
  if (!selectedNode) return figma.notify('No node selected');
  await createPropertiesGrid(selectedNode)
}

const createTokens = async () => {
  const selectedNode = figma.currentPage.selection[0];
  if (!selectedNode) return figma.notify('No node selected');
  createComponentTokens(selectedNode)
}

function Widget() {
  return <AutoLayout
    direction='vertical'
    spacing={10}
  >
    <AutoLayout
      onClick={createComponents}
      padding={20}
      fill={{ type: 'solid', color: '#fff' }}
    >
      <Text>Generate Default Documentation</Text>
    </AutoLayout>
    <AutoLayout
      onClick={createDocumentation}
      padding={20}
      fill={{ type: 'solid', color: '#fff' }}
    >
      <Text>Create Documentation</Text>
    </AutoLayout>
    <AutoLayout
      onClick={createGrid}
      padding={20}
      fill={{ type: 'solid', color: '#fff' }}
    >
      <Text>Create Grid</Text>
    </AutoLayout>
    <AutoLayout
      onClick={createTokens}
      padding={20}
      fill={{ type: 'solid', color: '#fff' }}
    >
      <Text>Create Tokens</Text>
    </AutoLayout>
  </AutoLayout>
}

widget.register(Widget)
