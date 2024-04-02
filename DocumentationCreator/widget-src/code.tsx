const { widget } = figma
const { AutoLayout, Text } = widget
import { WidgetHeader } from './ui/components/widget-header';
import { BottomLogo } from './ui/components/bottom-logo';
import { Button } from './ui/components/button';
import { Icon16px } from './ui/components/icon';
import { generateDefaultComponents, createDocumentationPage } from './rendering'

const createComponents = async () => {
  await generateDefaultComponents();
}

const createDocumentation = async () => {
  const selectedNode = figma.currentPage.selection[0];
  // get the centre of the screen to place the documentation

  if (!selectedNode) {
    figma.notify('Please select a component to generate documentation for');
    return;
  }
  await createDocumentationPage(selectedNode, selectedNode.x + selectedNode.width + 100, selectedNode.y);
}


function Widget() {
  return <AutoLayout
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
    padding={6}
  >
    <WidgetHeader >
      <AutoLayout
        verticalAlignItems="center"
        onClick={createComponents}
      >
        <Icon16px icon="gear" size={12} />
        <Text fontSize={9}>Generate Components</Text>
      </AutoLayout>
    </WidgetHeader >
    <Button icon='radius' onClick={createDocumentation}>Create Documentation</Button>

    <AutoLayout direction="horizontal" padding={16}>
      <BottomLogo />
    </AutoLayout>
  </AutoLayout >
}

widget.register(Widget)
