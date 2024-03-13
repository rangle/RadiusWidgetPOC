const { widget } = figma
const { AutoLayout, Text } = widget

// export const setAutoLayout = (node: FrameNode) => {
//   node.inferredAutoLayout = {
//     layoutMode: "HORIZONTAL",
//     layoutAlign: "STRETCH",
//     layoutGrow: 1,
//     layoutPositioning: "AUTO",
//     layoutWrap: 'WRAP',
//     paddingBottom: 0,
//     paddingLeft: 0,
//     paddingRight: 0,
//     paddingTop: 0,
//     horizontalPadding: 0,
//     verticalPadding: 0,
//     primaryAxisAlignItems: "SPACE_BETWEEN",
//     primaryAxisSizingMode: "AUTO",
//     counterAxisAlignItems: "CENTER",
//     counterAxisSizingMode: "AUTO",
//     counterAxisAlignContent: "AUTO",
//     itemSpacing: 0,
//     counterAxisSpacing: 0,
//     itemReverseZIndex: false,
//     strokesIncludedInLayout: false,
//   }
// }

export const createLocalVariableIcon = async () => {
  // check if a component with the same name already exists
  const localVariableIcon = (await figma.currentPage.findOne(node => node.name === '.template.localVariableIcon' && node.type === 'COMPONENT')) as ComponentNode | null;

  // if it exists, return an instance of it
  if (localVariableIcon) {
    return await localVariableIcon.createInstance();
  }

  // else create a new component
  const textNode = await figma.createNodeFromJSXAsync(<Text
    name='.template.localVariableIcon'
  > Local Variable
  </Text>) as TextNode;

  const component = figma.createComponentFromNode(textNode);
  component.name = '.template.localVariableIcon'
  component.layoutMode = 'HORIZONTAL'

  return component.createInstance();
}

export const createTokenStudioIcon = async () => {
  // check if a component with the same name already exists
  const tokenStudioIcon = (await figma.currentPage.findOne(node => node.name === '.template.tokenStudioIcon' && node.type === 'COMPONENT')) as ComponentNode | null;

  // if it exists, return an instance of it
  if (tokenStudioIcon) {
    return await tokenStudioIcon.createInstance();
  }

  // else create a new component
  const textNode = await figma.createNodeFromJSXAsync(<Text
    y={25}
    name='.template.tokenStudioIcon'
  > Token Studio
  </Text>) as TextNode;

  const component = figma.createComponentFromNode(textNode);
  component.name = '.template.tokenStudioIcon'
  component.layoutMode = 'HORIZONTAL'

  return component.createInstance();
}

export const createTokenName = async () => {
  // check if a component with the same name already exists
  const tokenText = (await figma.currentPage.findOne(node => node.name === '.template.tokenName' && node.type === 'COMPONENT')) as ComponentNode | null;

  // if it exists, return an instance of it
  if (tokenText) {
    return await tokenText.createInstance();
  }

  // else create a new component
  const textNode = await figma.createNodeFromJSXAsync(<Text
    name='.template.tokenName'
  > Text
  </Text>) as TextNode;

  const component = figma.createComponentFromNode(textNode);
  component.name = '.template.tokenName'
  component.layoutMode = 'HORIZONTAL'

  // add text as prop to component
  component.addComponentProperty('text', 'TEXT', 'Token Text')
  const textVariableName = Object.keys(component.componentPropertyDefinitions).find((key) => key.includes('text'));
  textNode.componentPropertyReferences = {
    characters: textVariableName
  }

  return component.createInstance();
}

export const createTokenValue = async () => {
  // check if a component with the same name already exists
  const tokenText = (await figma.currentPage.findOne(node => node.name === '.template.tokenValue' && node.type === 'COMPONENT')) as ComponentNode | null;

  // if it exists, return an instance of it
  if (tokenText) {
    return await tokenText.createInstance();
  }

  // else create a new component
  const textNode = await figma.createNodeFromJSXAsync(<Text
    name='.template.tokenValue'
  > Text
  </Text>) as TextNode;

  const component = figma.createComponentFromNode(textNode);
  component.name = '.template.tokenValue'
  component.layoutMode = 'HORIZONTAL'

  // add text as prop to component
  component.addComponentProperty('text', 'TEXT', 'Token Value')
  const textVariableName = Object.keys(component.componentPropertyDefinitions).find((key) => key.includes('text'));
  textNode.componentPropertyReferences = {
    characters: textVariableName
  }

  return component.createInstance();
}

export const createToken = async () => {
  return await figma.createNodeFromJSXAsync(<AutoLayout
    name='.template.tokenValue'
    direction="horizontal"
    spacing={8}
  ></AutoLayout>) as FrameNode;
}

export const generateTemplateToken = async (x: number) => {
  const frameExists = await figma.currentPage.findOne(node => node.name === '.template.token')

  if (frameExists) {
    figma.notify('Example token (named `.template.token`) already exists, the default token will not be created.')
    return
  }

  const tokenLocalVariable = await createToken()
  tokenLocalVariable.appendChild(await createLocalVariableIcon())
  const studioName = await createTokenName()
  const studioValue = await createTokenValue()
  tokenLocalVariable.appendChild(studioName)
  tokenLocalVariable.appendChild(studioValue)
  tokenLocalVariable.name = '.template.localVariableIcon'

  const tokenTokenStudio = await createToken()
  tokenTokenStudio.appendChild(await createTokenStudioIcon())
  const localName = await createTokenName()
  const localValue = await createTokenValue()
  tokenTokenStudio.appendChild(localName)
  tokenTokenStudio.appendChild(localValue)
  tokenTokenStudio.name = '.template.tokenStudioIcon'
  tokenTokenStudio.y = 25

  const token = figma.combineAsVariants(
    [
      figma.createComponentFromNode(tokenLocalVariable),
      figma.createComponentFromNode(tokenTokenStudio)
    ],
    figma.currentPage)
  token.name = '.template.token'
  token.layoutMode = 'VERTICAL'
  token.itemSpacing = 8
  token.x = x;

  // expose nested components properties
  studioName.isExposedInstance = true
  studioValue.isExposedInstance = true
  localName.isExposedInstance = true
  localValue.isExposedInstance = true

  token.editComponentProperty('Property 1', { name: 'type' })

  return token;
}