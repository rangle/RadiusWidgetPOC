import { getTemplate, getComponentProperties, setComponentTexts } from "./utils";

const getValue = (property: ComponentOption) => {
  if (property.type === 'BOOLEAN') return ['True', 'False'].join('\n');
  if (property.type === 'INSTANCE_SWAP') return (property.variantOptions?.join('\n') || 'N/A');
  if (property.type === 'TEXT') {
    if (typeof property.defaultValue === 'boolean') return ['True', 'False'].join('\n');
    return property.defaultValue
  }
  if (property.type === 'VARIANT') return property.variantOptions?.join('\n') || 'N/A';
  return "N/A";
};

const getName = (key: string) => {
  // if the key has #numbers them remove them and say it's a sub property
  if (key.match(/#\d+:\d+/)) {
    return key.replace(/#\d+:\d+/g, '') + ' (Sub Property)';
  }
  return key;
};

export const createComponentProperties = async (selectedNode: InstanceNode) => {
  const doDontTemplate = await getTemplate('.template.DoDont') as FrameNode;
  const tableTemplate = await getTemplate('.template.table') as FrameNode;

  if (!doDontTemplate && tableTemplate) figma.notify('Template not found');

  // wrapper to contain the do and don'ts

  const doDontWrapper = figma.createFrame();
  doDontWrapper.name = 'Do & Dont';
  doDontWrapper.layoutMode = 'HORIZONTAL';
  doDontWrapper.layoutSizingVertical = 'HUG';
  // doDontWrapper.layoutSizingHorizontal = 'FILL';
  doDontWrapper.itemSpacing = 30;

  const doFrame = doDontTemplate.clone();
  doFrame.name = 'Do';
  doDontWrapper.appendChild(doFrame);


  const dontFrame = doDontTemplate.clone();
  dontFrame.name = 'Dont';

  const title = dontFrame.findOne(node => node.name === '.template.DoDont.title') as InstanceNode;
  if (title) {
    title.setProperties({ 'type': ".template.DoDont.dont" })
  }

  doDontWrapper.appendChild(dontFrame);

  // create the table
  const table = tableTemplate.clone();
  table.name = 'Properties';

  const rootComponent = await selectedNode.getMainComponentAsync();
  if (!rootComponent) {
    figma.notify('Component not found');
    return [];
  }

  const properties = await getComponentProperties(rootComponent);

  const firstRow = table.findOne(node => node.name === '.template.table.body') as FrameNode;

  // for each property create a row
  Object.entries(properties).forEach(([key, property]) => {
    const row = firstRow.clone();

    setComponentTexts(firstRow, {
      '.template.table.body.cell.1': getName(key),
      '.template.table.body.cell.2': getValue(property),
      '.template.table.body.cell.3': property.type + "\n" + ((property.defaultValue).toString() || 'N/A')
    })

    table.appendChild(row);
  });

  // delete first row
  firstRow.remove();
  table.children[1].remove();


  return [table, doDontWrapper];

}