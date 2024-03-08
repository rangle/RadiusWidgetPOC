const { widget } = figma
const { Text, AutoLayout, Frame } = widget

export async function cloneTemplate(referenceTemplate: string, name: string, size: {
  x: number,
  y: number,
  width: number,
  height: number
}, texts: Record<string, string> = {}) {
  await figma.loadFontAsync({ family: "Roboto Mono", style: "Regular" })

  const template = await getTemplate(referenceTemplate)
  if (!template) return

  const cloned = template.clone() as unknown as FrameNode
  cloned.name = name
  cloned.x = size.x
  cloned.y = size.y
  cloned.resize(size.width, size.height)

  // go through the tree of the cloned node and replace the texts when they key matches the name
  cloned.findAll(node => node.type === 'INSTANCE').forEach((node) => {
    const instance = node as InstanceNode
    const instanceTextName = Object.keys(instance.componentProperties).find((key) => key.includes('text'));
    if (!instanceTextName) return
    const newValue: { [key: string]: string } = {}
    newValue[instanceTextName] = texts[node.name]
    instance.setProperties(newValue)
  })

}

export async function getTemplate(name: string) {
  if (!figma.currentPage.parent?.children) return false;

  // go through all the pages looking for the template frame
  for (let i = 0; i < figma.currentPage.parent?.children.length; i++) {
    const page = figma.currentPage.parent?.children[i] as unknown as PageNode;
    if (!page) continue;

    // load the page data
    await page.loadAsync();

    // find the frame with the name
    const foundFrame = page.findOne(node => node.name === name);
    if (foundFrame) return foundFrame
  }

  return false;
}

export function generateFrameTitle(name: string, text: string) {
  return <Text
    name={name}
    fontSize={32}
    font={{ family: 'Roboto Mono', style: 'Regular' }}
    fill={{ type: 'solid', color: "#fff" }}
    width={'fill-parent'}
    height={'hug-contents'}
  >{text}</Text>
}

export async function generateTemplateFrame(name: string, width: number, height: number, x: number, y: number) {

  const frameExists = await getTemplate('.template.frame')

  if (frameExists) {
    figma.notify('Example frame (named `.template.frame`) already exists, the default frame will not be created.')
    return
  }

  const textInstance = await getTemplate('.template.text.title')
  if (!textInstance) {
    figma.notify('Example text (named `.template.text.title`) does not exist, the default frame will not be created.')
    return
  }

  // create an instance of a component
  const instance = (textInstance.parent as ComponentNode).createInstance()
  instance.name = '.frame.title.text'

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
    <AutoLayout
      name={'.frame.title'}
      width={'fill-parent'}
      fill={{ type: 'solid', color: "#000" }}
      padding={32}
    >
    </AutoLayout>
    <Frame
      name='.frame.content'
      width={'fill-parent'}
      height={'fill-parent'}
    >
    </Frame>
  </AutoLayout>) as FrameNode;

  const frameTitle = frame.children[0] as FrameNode
  frameTitle.appendChild(instance)

  return frame
}

export async function generateTemplateTexts() {
  const frameExists = await getTemplate('.template.texts')

  if (frameExists) {
    figma.notify('Example text (named `.template.texts`) already exists, the default text will not be created.')
    return
  }

  // create the node and make the into components
  const bodyText = await figma.createNodeFromJSXAsync(<Text
    name={'.template.text.body'}
    fontSize={16}
    font={{ family: 'Roboto Mono', style: 'Regular' }}
    fill={{ type: 'solid', color: "#000" }}
    width={'fill-parent'}
    height={'hug-contents'}
  >Body Text</Text>) as TextNode;
  const bodyTextComponent = figma.createComponentFromNode(bodyText);

  const titleText = await figma.createNodeFromJSXAsync(<Text
    name={'.template.text.title'}
    fontSize={32}
    font={{ family: 'Roboto Mono', style: 'Regular' }}
    fill={{ type: 'solid', color: "#fff" }}
    width={'fill-parent'}
    height={'hug-contents'}
    y={32}
  >Title Text</Text>) as TextNode;
  const titleTextComponent = figma.createComponentFromNode(titleText);

  // setup the component
  const newComponent = figma.combineAsVariants([titleTextComponent, bodyTextComponent], figma.currentPage)//figma.createComponentFromNode(bodyText)
  newComponent.name = '.template.texts'
  newComponent.x = 565
  newComponent.editComponentProperty('Property 1', { name: 'style' })
  newComponent.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }]

  // For the components, make their text property a variable
  newComponent.addComponentProperty('text', 'TEXT', 'Hello world')
  const textVariableName = Object.keys(newComponent.componentPropertyDefinitions).find((key) => key.includes('text'));

  bodyText.componentPropertyReferences = {
    characters: textVariableName
  }
  titleText.componentPropertyReferences = {
    characters: textVariableName
  }

  return newComponent;
}

export async function generateDefaultComponents() {
  // load fonts
  await figma.loadFontAsync({ family: "Roboto Mono", style: "Regular" })
  await figma.loadFontAsync({ family: "Inter", style: "Regular" })

  // create a new frame
  await generateTemplateTexts();
  const newFrame = await generateTemplateFrame('Example Frame', 550, 1000, 0, 0);

  if (!newFrame) return

  // focus on the new frame
  figma.currentPage.selection = [newFrame]
  figma.viewport.scrollAndZoomIntoView([newFrame])
  figma.notify('Element created')
}