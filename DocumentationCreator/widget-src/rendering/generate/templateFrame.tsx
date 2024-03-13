const { widget } = figma
const { AutoLayout, Frame } = widget

import { getTemplate } from '../utils';

export async function generateTemplateFrame(name: string, width: number, height: number, x: number, y: number) {

  const frameExists = await getTemplate('.template.frame')

  if (frameExists) {
    figma.notify('Example frame (named `.template.frame`) already exists, the default frame will not be created.')
    return
  }

  const textComponent = await getTemplate('.template.text.title')
  if (!textComponent) {
    figma.notify('Example text (named `.template.text.title`) does not exist, the default frame will not be created.')
    return
  }

  // create the template frame
  const frame = await figma.createNodeFromJSXAsync(<AutoLayout
    name={'.template.frame'}
    width={width}
    height={height}
    x={x}
    y={y}
    direction="vertical"
    fill={{ type: 'solid', color: "#fff" }}
  >

  </AutoLayout>) as FrameNode;

  const contentFrame = await figma.createNodeFromJSXAsync(<Frame
    name='.frame.content'
    width={'fill-parent'}
    height={'fill-parent'}
  >
  </Frame>) as FrameNode;

  const titleWrapper = await figma.createNodeFromJSXAsync(
    <AutoLayout
      name={'.template.frame.title'}
      width={'fill-parent'}
      fill={{ type: 'solid', color: "#000" }}
      padding={32}
    >
    </AutoLayout>) as FrameNode;

  // create a new component called title block
  const textInstance = (textComponent.parent as ComponentNode).createInstance()
  textInstance.name = '.frame.title.text'

  titleWrapper.appendChild(textInstance)

  // create a title component including the text and wrapper
  const titleComponent = figma.createComponentFromNode(titleWrapper)
  titleComponent.y = -150;
  titleComponent.layoutSizingVertical = 'HUG'
  titleComponent.name = '.template.frame.title'

  // create an instance of the new title component
  const titleInstance = titleComponent.createInstance()
  titleInstance.name = '.frame.title'

  frame.appendChild(titleInstance);
  frame.appendChild(contentFrame);

  titleInstance.layoutSizingHorizontal = 'FILL';
  contentFrame.layoutSizingHorizontal = 'FILL';
  contentFrame.layoutSizingVertical = 'FILL';

  return frame
}