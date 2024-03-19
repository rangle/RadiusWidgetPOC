const { widget } = figma
const { Text } = widget

import { getTemplate } from '../utils';

export async function generateTemplateCheckBoxes() {

  // create the check box, it has 2 variants, checked and unchecked
  const checked = await figma.createNodeFromJSXAsync(<Text name='checked'>
    ☑
  </Text>);
  const checkedComponent = figma.createComponentFromNode(checked);

  const unchecked = await figma.createNodeFromJSXAsync(<Text name='unchecked'>
    ☐
  </Text>);
  const uncheckedComponent = figma.createComponentFromNode(unchecked);

  const checkBoxComponent = figma.combineAsVariants([checkedComponent, uncheckedComponent], figma.currentPage)

  checkBoxComponent.name = '.template.checkBox'
  checkBoxComponent.layoutMode = 'VERTICAL'
  checkBoxComponent.editComponentProperty('Property 1', { name: 'checked' })

  const checkBoxTitleComponent = await getTemplate('.template.text.checkBoxTitle');
  const checkBoxBodyComponent = await getTemplate('.template.text.body');

}