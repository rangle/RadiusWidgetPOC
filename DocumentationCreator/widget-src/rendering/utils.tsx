
export async function cloneTemplate(referenceTemplate: string, name: string, size: {
  x: number,
  y: number,
  width: number,
  height: number
}, texts: Record<string, string> = {}) {
  await figma.loadFontAsync({ family: "Roboto Mono", style: "Regular" })

  const template = await getTemplate(referenceTemplate)
  if (!template) return

  const cloned = template.clone() as InstanceNode
  cloned.name = name
  cloned.x = size.x
  cloned.y = size.y
  cloned.resize(size.width, size.height)

  // go through the tree of the cloned node and replace the texts when they key matches the name
  setComponentTexts(cloned, texts);
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

type TemplateTypes = 'type=.template.tokenStudioIcon'
  | 'type=.template.localVariableIcon'
  | 'style=.template.text.componentTitle'
  | 'style=.template.text.body'
  | '.template.texts'
  | '.template.frame.title'

export async function getComponent(name: TemplateTypes) {
  if (!figma.currentPage.parent?.children) return false;

  // go through all the pages looking for the template frame
  for (let i = 0; i < figma.currentPage.parent?.children.length; i++) {
    const page = figma.currentPage.parent?.children[i] as unknown as PageNode;
    if (!page) continue;

    // load the page data
    await page.loadAsync();

    // find the frame with the name
    const foundFrame = page.findOne(node => node.type === 'COMPONENT' && node.name === name);
    if (foundFrame) return foundFrame as ComponentNode
  }

  return false;
}

// iterate over children of component, find the matching instance, and apply text to the instance
export async function setComponentTexts(component: InstanceNode, texts: Record<string, string>) {
  // go through the tree of the cloned node and replace the texts when they key matches the name
  component.findAll(node => node.type === 'INSTANCE').forEach((node) => {
    if (!texts[node.name]) return;
    const instance = node as InstanceNode
    const instanceTextName = Object.keys(instance.componentProperties).find((key) => key.includes('text'));
    if (!instanceTextName) return
    const newValue: { [key: string]: string } = {}
    newValue[instanceTextName] = texts[node.name]
    instance.setProperties(newValue)
  })
}
