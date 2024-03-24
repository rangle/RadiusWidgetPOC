const { widget } = figma
const { Text, AutoLayout } = widget

import { getComponent, setComponentTexts } from '../utils';

export async function generateTemplateCheckBoxes() {

  // create the check box, it has 2 variants, checked and unchecked
  const checked = await figma.createNodeFromJSXAsync(<Text name='checked'>
    [x]
  </Text>);
  const checkedComponent = figma.createComponentFromNode(checked);

  const unchecked = await figma.createNodeFromJSXAsync(<Text name='unchecked'>
    [_]
  </Text>);
  const uncheckedComponent = figma.createComponentFromNode(unchecked);

  const checkBoxComponent = figma.combineAsVariants([checkedComponent, uncheckedComponent], figma.currentPage)

  checkBoxComponent.name = '.template.checkBox'
  checkBoxComponent.layoutMode = 'VERTICAL'
  checkBoxComponent.editComponentProperty('Property 1', { name: 'checked' })


  const checkboxTitle = await getComponent('style=.template.text.checkBoxTitle');
  const checkboxText = await getComponent('style=.template.text.checkBoxBody');
  if (!checkboxTitle || !checkboxText) return figma.notify('Checkbox texts templates do not exist.')

  // we'll create a template for the checkbox sections
  // checkbox consists of an instance of checkboxBody and the checkbox component
  const checkboxSection = await figma.createNodeFromJSXAsync(<AutoLayout
    name={'.template.checkbox.item'}
    width={'fill-parent'}
    direction="horizontal"
    spacing={8}
  ></AutoLayout>) as FrameNode;
  // create a checkbox instance
  const checkboxInstance = checkBoxComponent.defaultVariant.createInstance();
  // set the property checked to unchecked
  checkboxInstance.setProperties({ checked: 'unchecked' })
  checkboxSection.appendChild(checkboxInstance);
  // create a checkbox body instance
  const checkboxBodyInstance = checkboxText.createInstance();
  checkboxSection.appendChild(checkboxBodyInstance);
  checkboxBodyInstance.layoutSizingVertical = 'HUG';
  checkboxBodyInstance.layoutSizingHorizontal = 'FILL';
  setComponentTexts(checkboxBodyInstance, { '.template.texts': 'This is the template for checkboxes, styling this will affect all future checkbox sections' });


  // checkbox sections
  const checkboxSections = await figma.createNodeFromJSXAsync(<AutoLayout
    name={'.template.checkbox.sections'}
    direction="vertical"
    spacing={8}
    width={'hug-contents'}
  ></AutoLayout>) as FrameNode;
  // add the title to the section and the checkbox section
  const checkboxTitleInstance = checkboxTitle.createInstance();
  setComponentTexts(checkboxTitleInstance, { '.template.texts': 'Checkbox sections title' });
  checkboxSections.appendChild(checkboxTitleInstance);
  checkboxSections.appendChild(checkboxSection);
  checkboxSection.layoutSizingHorizontal = 'FILL';

}