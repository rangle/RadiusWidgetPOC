
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
    if (!texts[node.name]) return;
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