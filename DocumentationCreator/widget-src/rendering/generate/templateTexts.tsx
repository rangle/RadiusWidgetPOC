const { widget } = figma
const { Text } = widget

import { getTemplate } from '../utils';

export async function generateTemplateTexts(x: number) {
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
  newComponent.x = x + 10
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