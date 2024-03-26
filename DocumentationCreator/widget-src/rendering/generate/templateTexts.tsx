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
    font={{ family: 'Roboto Mono', style: 'Bold' }}
    fill={{ type: 'solid', color: "#000" }}
    width={'fill-parent'}
    height={'hug-contents'}
  >Component Title</Text>) as TextNode;
  const componentTitleComponent = figma.createComponentFromNode(componentTitle);

  const gridTitle = await figma.createNodeFromJSXAsync(<Text
    name={'.template.text.gridTitle'}
    fontSize={12}
    font={{ family: 'Roboto Mono', style: 'Regular' }}
    fill={{ type: 'solid', color: "#000" }}
    width={'fill-parent'}
    height={'hug-contents'}
  >Grid Title</Text>) as TextNode;
  const gridTitleComponent = figma.createComponentFromNode(gridTitle);

  const checkBoxTitle = await figma.createNodeFromJSXAsync(<Text
    name={'.template.text.checkBoxTitle'}
    fontSize={12}
    font={{ family: 'Roboto Mono', style: 'Bold' }}
    fill={{ type: 'solid', color: "#000" }}
    width={'fill-parent'}
    height={'hug-contents'}
  >Checkbox Title</Text>) as TextNode;
  const checkBoxTitleComponent = figma.createComponentFromNode(checkBoxTitle);

  const checkBoxBody = await figma.createNodeFromJSXAsync(<Text
    name={'.template.text.checkBoxBody'}
    fontSize={12}
    font={{ family: 'Roboto Mono', style: 'Regular' }}
    fill={{ type: 'solid', color: "#000" }}
    width={'fill-parent'}
    height={'hug-contents'}
  >Checkbox Body</Text>) as TextNode;
  const checkBoxBodyComponent = figma.createComponentFromNode(checkBoxBody);

  const tableTitle = await figma.createNodeFromJSXAsync(<Text
    name={'.template.text.tableTitle'}
    fontSize={12}
    font={{ family: 'Roboto Mono', style: 'Bold' }}
    fill={{ type: 'solid', color: "#000" }}
    width={'fill-parent'}
    height={'hug-contents'}
  >Table Title</Text>) as TextNode;
  const tableTitleComponent = figma.createComponentFromNode(tableTitle);

  const tableBody = await figma.createNodeFromJSXAsync(<Text
    name={'.template.text.tableBody'}
    fontSize={12}
    font={{ family: 'Roboto Mono', style: 'Regular' }}
    fill={{ type: 'solid', color: "#000" }}
    width={'fill-parent'}
    height={'hug-contents'}
  >Table Boy</Text>) as TextNode;
  const tableBodyComponent = figma.createComponentFromNode(tableBody);

  // setup the component
  const newComponent = figma.combineAsVariants([
    titleTextComponent,
    bodyTextComponent,
    componentTitleComponent,
    gridTitleComponent,
    checkBoxTitleComponent,
    checkBoxBodyComponent,
    tableTitleComponent,
    tableBodyComponent],
    figma.currentPage
  )
  newComponent.name = '.template.texts'
  newComponent.x = x
  newComponent.layoutMode = 'VERTICAL'
  newComponent.editComponentProperty('Property 1', { name: 'style' })
  newComponent.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }]
  newComponent.itemSpacing = 16

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
  gridTitle.componentPropertyReferences = {
    characters: textVariableName
  }
  checkBoxTitle.componentPropertyReferences = {
    characters: textVariableName
  }
  checkBoxBody.componentPropertyReferences = {
    characters: textVariableName
  }
  tableTitle.componentPropertyReferences = {
    characters: textVariableName
  }
  tableBody.componentPropertyReferences = {
    characters: textVariableName
  }

  bodyTextComponent.layoutAlign = 'STRETCH'
  bodyTextComponent.layoutMode = 'VERTICAL'

  titleTextComponent.layoutAlign = 'STRETCH'
  titleTextComponent.layoutMode = 'VERTICAL'

  componentTitleComponent.layoutAlign = 'STRETCH'
  componentTitleComponent.layoutMode = 'VERTICAL'

  gridTitleComponent.layoutAlign = 'STRETCH'
  gridTitleComponent.layoutMode = 'VERTICAL'

  checkBoxTitleComponent.layoutAlign = 'STRETCH'
  checkBoxTitleComponent.layoutMode = 'VERTICAL'
  checkBoxTitleComponent.layoutGrow = 1
  checkBoxTitleComponent.paddingTop = 8;
  checkBoxTitleComponent.layoutSizingVertical = 'HUG'
  checkBoxTitle.layoutSizingHorizontal = 'FILL'

  checkBoxBodyComponent.layoutAlign = 'STRETCH'
  checkBoxBodyComponent.layoutMode = 'VERTICAL'
  checkBoxBodyComponent.layoutSizingVertical = 'HUG'
  checkBoxBody.textAutoResize = 'HEIGHT'
  checkBoxBody.layoutSizingHorizontal = 'FILL'

  tableTitleComponent.layoutAlign = 'STRETCH'
  tableTitleComponent.layoutMode = 'VERTICAL'
  tableTitleComponent.layoutSizingVertical = 'HUG'
  tableTitle.textAutoResize = 'HEIGHT'
  tableTitle.layoutSizingHorizontal = 'FILL'

  tableBodyComponent.layoutAlign = 'STRETCH'
  tableBodyComponent.layoutMode = 'VERTICAL'
  tableBodyComponent.layoutSizingVertical = 'HUG'
  tableBody.textAutoResize = 'HEIGHT'
  tableBody.layoutSizingHorizontal = 'FILL'

  return newComponent;
}