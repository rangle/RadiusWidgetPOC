
const { widget } = figma
const { Text } = widget

import { setComponentTexts, getComponent } from "../utils";

export const generatePropertiesTemplates = async () => {
  await generateDoDontTemplate();
  await generateTableTemplate();
};

export const generateTableTemplate = async () => {

  // get the text component
  const textComponent = await getComponent('.template.texts');
  if (!textComponent) return figma.notify('Example text (named `.template.texts`) does not exist.')

  // table header 
  const tableHeaderRow = figma.createFrame();
  tableHeaderRow.name = '.template.table.header';
  tableHeaderRow.layoutMode = 'HORIZONTAL';
  tableHeaderRow.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]
  tableHeaderRow.strokeLeftWeight = 0;
  tableHeaderRow.strokeRightWeight = 0;
  tableHeaderRow.strokeBottomWeight = 1;
  tableHeaderRow.strokeTopWeight = 0;

  const tableBodyRow = tableHeaderRow.clone();
  tableBodyRow.name = '.template.table.body';

  const tableHeaderCell = figma.createFrame();
  tableHeaderCell.name = '.template.table.header.cell';
  tableHeaderCell.layoutMode = 'HORIZONTAL';
  tableHeaderCell.resize(241, 1);
  tableHeaderCell.layoutSizingHorizontal = 'FIXED';
  tableHeaderCell.layoutSizingVertical = 'HUG';
  tableHeaderCell.horizontalPadding = 16;
  tableHeaderCell.verticalPadding = 16;

  const tableBodyCell = tableHeaderCell.clone();
  tableBodyCell.name = '.template.table.body.cell';

  const tableHeaderText = textComponent.createInstance();
  tableHeaderText.name = '.template.table.header.text';
  tableHeaderText.setProperties({ 'style': ".template.text.tableTitle" })
  tableHeaderText.layoutSizingVertical = 'HUG';
  tableHeaderCell.appendChild(tableHeaderText);
  setComponentTexts(tableHeaderText, { '.template.table.header.text': 'NAME' })

  tableHeaderRow.appendChild(tableHeaderCell);

  const cell2 = tableHeaderCell.clone();
  cell2.resize(280, 1);
  cell2.layoutSizingVertical = 'HUG';
  setComponentTexts(cell2, { '.template.table.header.text': 'VALUES' })
  tableHeaderRow.appendChild(cell2);

  const cell3 = tableHeaderCell.clone();
  cell3.resize(657, 1);
  cell3.layoutSizingVertical = 'HUG';
  setComponentTexts(cell3, { '.template.table.header.text': 'DESCRIPTION' })
  tableHeaderRow.appendChild(cell3);




  const tableBodyText = textComponent.createInstance();
  tableBodyText.name = '.template.table.body.cell.1';
  tableBodyText.setProperties({ 'style': ".template.text.tableBody" })
  tableBodyText.layoutSizingVertical = 'HUG';
  tableBodyCell.appendChild(tableBodyText);
  tableBodyText.layoutSizingHorizontal = 'FILL';
  setComponentTexts(tableBodyText, { '.template.table.body.cell.1': 'Name of option' })

  tableBodyRow.appendChild(tableBodyCell);

  const tableBodyCell2 = tableBodyCell.clone();
  tableBodyCell2.resize(280, 1);
  tableBodyCell2.layoutSizingVertical = 'HUG';
  tableBodyCell2.children[0].name = '.template.table.body.cell.2';
  setComponentTexts(tableBodyCell2, { '.template.table.body.cell.2': 'Options of option' })
  tableBodyRow.appendChild(tableBodyCell2);

  const tableBodyCell3 = tableBodyCell.clone();
  tableBodyCell3.resize(657, 1);
  tableBodyCell3.layoutSizingVertical = 'HUG';
  tableBodyCell3.children[0].name = '.template.table.body.cell.3';
  setComponentTexts(tableBodyCell3, { '.template.table.body.cell.3': 'Description of option' })
  tableBodyRow.appendChild(tableBodyCell3);

  const tableComponent = figma.createFrame();
  tableComponent.name = '.template.table';
  tableComponent.layoutMode = 'VERTICAL';
  tableComponent.layoutSizingHorizontal = 'HUG';

  tableComponent.appendChild(tableHeaderRow);
  tableComponent.appendChild(tableBodyRow);

  tableHeaderRow.layoutSizingHorizontal = 'HUG';
  tableHeaderRow.layoutSizingVertical = 'HUG';
  tableBodyRow.layoutSizingHorizontal = 'HUG';
  tableBodyRow.layoutSizingVertical = 'HUG';

  return tableHeaderRow;
};

export const generateDoDontTemplate = async () => {
  // create a frame
  const frame = figma.createFrame();
  frame.name = '.template.DoDont';
  frame.layoutMode = 'VERTICAL';
  frame.layoutSizingHorizontal = 'FIXED';
  frame.resize(300, 300);
  frame.layoutSizingVertical = 'HUG';
  frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]

  const content = figma.createFrame();
  content.name = '.template.DoDont.content';

  // create the title component
  const titleWrapperDo = figma.createFrame();
  titleWrapperDo.name = '.template.DoDont.do';
  titleWrapperDo.layoutMode = 'HORIZONTAL';
  titleWrapperDo.strokeTopWeight = 8;
  titleWrapperDo.strokeAlign = 'INSIDE';
  titleWrapperDo.verticalPadding = 32;
  titleWrapperDo.horizontalPadding = 32;
  titleWrapperDo.strokes = [
    {
      "type": "SOLID",
      "visible": true,
      "opacity": 1,
      "blendMode": "NORMAL",
      "color": {
        "r": 0,
        "g": 1,
        "b": 0
      },
      "boundVariables": {}
    }
  ]

  const titleWrapperDont = titleWrapperDo.clone();
  titleWrapperDont.name = '.template.DoDont.dont';
  titleWrapperDont.strokes = [
    {
      "type": "SOLID",
      "visible": true,
      "opacity": 1,
      "blendMode": "NORMAL",
      "color": {
        "r": 1,
        "g": 0,
        "b": 0
      },
      "boundVariables": {}
    }
  ]

  const titleDo = await figma.createNodeFromJSXAsync(<Text
    name={'.template.DoDont.title'}
    fontSize={20}
    font={{ family: 'Roboto Mono', style: 'Bold' }}
    fill={{ type: 'solid', color: '#0f0' }}
  >Do</Text>) as TextNode;

  const titleDont = titleDo.clone();
  titleDont.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }];
  titleDont.characters = "Don't";

  titleWrapperDo.appendChild(titleDo);
  titleWrapperDont.appendChild(titleDont);

  titleDo.textAutoResize = "HEIGHT"
  titleDo.layoutSizingHorizontal = 'FILL'
  titleDont.textAutoResize = "HEIGHT"
  titleDont.layoutSizingHorizontal = 'FILL'

  // create components of the titles
  const titleDoComponent = figma.createComponentFromNode(titleWrapperDo);
  const titleDontComponent = figma.createComponentFromNode(titleWrapperDont);

  // create the component into a variant
  const titleComponent = figma.combineAsVariants([titleDoComponent, titleDontComponent], figma.currentPage);
  titleComponent.name = '.template.DoDont.title';
  titleComponent.layoutMode = 'VERTICAL';
  titleComponent.itemSpacing = 16;
  titleComponent.layoutSizingHorizontal = 'HUG';
  titleComponent.layoutSizingVertical = 'HUG';
  // rename propert 1 to type
  titleComponent.editComponentProperty('Property 1', { name: 'type' })


  // now we use create templates for the does and don's
  // create an instance of the titleDo component
  const titleDoInstance = titleComponent.defaultVariant.createInstance();
  frame.appendChild(titleDoInstance);
  frame.appendChild(content);
  titleDoInstance.layoutSizingHorizontal = 'FILL';
  titleDoInstance.layoutSizingVertical = 'HUG';
  content.layoutSizingHorizontal = 'FILL';

  setComponentTexts(titleDoInstance, { '.template.DoDont.title': "Don't" });


}