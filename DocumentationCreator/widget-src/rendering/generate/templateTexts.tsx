const { widget } = figma
const { Text } = widget

import { getComponent } from '../utils';

export async function generateTemplateTexts(x: number) {
  const frameExists = await getComponent('style=.template.text.body')

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
  >Title Text</Text>) as TextNode;
  const titleTextComponent = figma.createComponentFromNode(titleText);

  const componentTitle = await figma.createNodeFromJSXAsync(<Text
    name={'.template.text.componentTitle'}
    fontSize={20}
    font={{ family: 'Roboto Mono', style: 'Regular' }}
    fill={{ type: 'solid', color: "#000" }}
    width={'fill-parent'}
    height={'hug-contents'}
  >Component Title</Text>) as TextNode;
  const componentTitleComponent = figma.createComponentFromNode(componentTitle);

  // setup the component
  const newComponent = figma.combineAsVariants([titleTextComponent, bodyTextComponent, componentTitleComponent], figma.currentPage)//figma.createComponentFromNode(bodyText)
  newComponent.name = '.template.texts'
  newComponent.x = x
  newComponent.layoutMode = 'VERTICAL'
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
  componentTitle.componentPropertyReferences = {
    characters: textVariableName
  }

  bodyTextComponent.layoutAlign = 'STRETCH'
  titleTextComponent.layoutAlign = 'STRETCH'
  componentTitleComponent.layoutAlign = 'STRETCH'

  return newComponent;
}