const { widget } = figma
const { Text, AutoLayout, Frame } = widget

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
  cloned.findAll(node => node.type === 'TEXT').forEach((node) => {
    if (texts[node.name]) {
      node.characters = texts[node.name]
    }
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

export async function generateTemplateFrame(name: string, width: number, height: number, x: number, y: number) {

  const frameExists = await getTemplate('.template.frame')

  if (frameExists) {
    figma.notify('Example frame (named `.template.frame`) already exists, the default frame will not be created.')
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
    <AutoLayout
      name={'.frame.title'}
      width={'fill-parent'}
      fill={{ type: 'solid', color: "#000" }}
      padding={32}
    >
      {generateFrameTitle('.frame.title.text', name)}
    </AutoLayout>
    <Frame
      name='.frame.content'
      width={'fill-parent'}
      height={'fill-parent'}
    >
    </Frame>
  </AutoLayout>);

  return frame
}

export async function generateTemplateTexts(x: number = 0, y: number = 0) {
  const frameExists = await getTemplate('.template.texts')

  if (frameExists) {
    figma.notify('Example text (named `.template.texts`) already exists, the default text will not be created.')
    return
  }

  return await figma.createNodeFromJSXAsync(<AutoLayout
    name=".template.texts"
    direction="vertical"
    padding={32}
    spacing={16}
    fill={{ type: 'solid', color: "#fff" }}
    x={x}
    y={y}
  >
    <Text
      name={'.template.title'}
      fontSize={32}
      font={{ family: 'Roboto Mono', style: 'Regular' }}
      fill={{ type: 'solid', color: "#000" }}
      width={'fill-parent'}
      height={'hug-contents'}
    >Title Text</Text>
    <Text
      name={'.template.body'}
      fontSize={16}
      font={{ family: 'Roboto Mono', style: 'Regular' }}
      fill={{ type: 'solid', color: "#000" }}
      width={'fill-parent'}
      height={'hug-contents'}
    >Body Text</Text>
  </AutoLayout>)
}

export async function generateDefaultComponents() {
  // load fonts
  await figma.loadFontAsync({ family: "Roboto Mono", style: "Regular" })
  await figma.loadFontAsync({ family: "Inter", style: "Regular" })

  // create a new frame
  const newFrame = await generateTemplateFrame('Example Frame', 550, 1000, 0, 0);
  await generateTemplateTexts(566);

  if (!newFrame) return

  // focus on the new frame
  figma.currentPage.selection = [newFrame]
  figma.viewport.scrollAndZoomIntoView([newFrame])
  figma.notify('Element created')
}