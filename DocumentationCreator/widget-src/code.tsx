const { widget } = figma
const { AutoLayout, Text } = widget
import { getAllTokens, getAllLocalVariableTokens } from './tokens'
import { generateDefaultComponents, createDocumentationPage, createPropertiesGrid, createComponentTokens, createCheckBoxSection, HAND_OFF_SECTIONS } from './rendering'

// get the selected node from the figma API and return it
const getSelectedNode = async () => {
  const selectedNode = figma.currentPage.selection[0];
  if (!selectedNode) return figma.notify('No node selected');
  const tokens = getAllTokens(selectedNode);
  console.log('tokens', tokens);
};

const createComponents = async () => {
  await generateDefaultComponents();
}

const createDocumentation = async () => {
  const selectedNode = figma.currentPage.selection[0];
  await createDocumentationPage(selectedNode);
}

const createGrid = async () => {
  const selectedNode = figma.currentPage.selection[0];
  if (!selectedNode) return figma.notify('No node selected');
  await createPropertiesGrid(selectedNode)
}

const createTokens = async () => {
  const selectedNode = figma.currentPage.selection[0];
  if (!selectedNode) return figma.notify('No node selected');
  await createComponentTokens(selectedNode)
}

const clickGetTokens = async () => {
  console.log(await getAllLocalVariableTokens());
}

const clickCreateCheckBoxSection = async () => {
  const frames = await createCheckBoxSection(HAND_OFF_SECTIONS);
  if (!frames) return figma.notify('No frames created');

  const wrapper = await figma.createNodeFromJSXAsync(<AutoLayout
    direction='vertical'
    spacing={10}
  ></AutoLayout>) as FrameNode;
  frames.forEach(frame => {
    wrapper.appendChild(frame);
    frame.layoutSizingHorizontal = 'FILL';
  })

};

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
    <AutoLayout
      onClick={clickGetTokens}
      padding={20}
      fill={{ type: 'solid', color: '#fff' }}
    >
      <Text>Get Tokens</Text>
    </AutoLayout>
    <AutoLayout
      onClick={clickCreateCheckBoxSection}
      padding={20}
      fill={{ type: 'solid', color: '#fff' }}
    >
      <Text>Create Checkbox Section</Text>
    </AutoLayout>
  </AutoLayout>
}

widget.register(Widget)
