import { isInstance } from "../common/figma.types";
import { getComponent } from "./utils";
import { setComponentTexts, getComponentProperties } from "./utils";

const { widget } = figma
const { AutoLayout } = widget



export const createPropertiesGrid = async (selectedComponent: SceneNode) => {
  if (!isInstance(selectedComponent)) {
    figma.notify('Please select a component or an instance to create a properties grid')
    return
  }

  const titleComponent = await getComponent('style=.template.text.gridTitle');

  if (!titleComponent) {
    figma.notify('Example text (named `.template.text.gridTitle`) does not exist.')
    return
  }

  const component = await selectedComponent.getMainComponentAsync();



  if (!component) {
    figma.notify('No component found')
    return
  }

  const componentOptions = getComponentProperties(component);

  const maxOption = Object.entries(componentOptions).reduce((acc, [key, value]) => {
    if (!value.variantOptions) return acc
    if (!acc[1].variantOptions) return [key, value]
    if (acc[1].variantOptions.length < value.variantOptions.length) {
      return [key, value]
    }
    return acc
  }, ['', { type: 'TEXT', defaultValue: '', variantOptions: [] } as ComponentOption])

  const gridFrame = await figma.createNodeFromJSXAsync(<AutoLayout
    name="Properties Grid"
    direction="horizontal"
    width="hug-contents"
    height="hug-contents"
    spacing={8}
  ></AutoLayout>) as FrameNode;

  // a frame to hold all the options
  const optionsFrame = await figma.createNodeFromJSXAsync(<AutoLayout
    name={maxOption[0]}
    direction="vertical"
    spacing={8}
  ></AutoLayout>) as FrameNode;

  gridFrame.appendChild(optionsFrame)

  const title = titleComponent.createInstance();
  title.name = 'gridTitle'
  setComponentTexts(title, { 'gridTitle': maxOption[0] });
  optionsFrame.appendChild(title)

  // create an instance for each of the maxOptions
  maxOption[1].variantOptions?.forEach((option) => {
    const instance = (component as ComponentNode).createInstance();
    instance.name = option;
    optionsFrame.appendChild(instance)
    instance.setProperties({ [maxOption[0]]: option })
  })

  optionsFrame.layoutSizingHorizontal = 'HUG'
  optionsFrame.layoutSizingVertical = 'HUG'
  title.layoutSizingHorizontal = 'FILL'

  // for each entry in the componentOptions, create a new instance and set the properties
  Object.entries(componentOptions).forEach(([key, value]) => {
    if (key === maxOption[0]) return
    if (value.type === 'BOOLEAN') {
      const currentOptionFrame = optionsFrame.clone();
      const name = key + ': ' + !value.defaultValue
      currentOptionFrame.name = name;
      setComponentTexts(currentOptionFrame, { 'gridTitle': name });
      currentOptionFrame.children.forEach(async (child) => {
        if (!isInstance(child)) return
        if (child.name === 'gridTitle') {
          await setComponentTexts(child, { '.template.text.gridTitle': key });
          return
        }
        if (Object.keys(child.componentProperties).includes(key)) {
          child.setProperties({ [key]: !value.defaultValue })
        } else {
          child.remove();
        }
      });
      gridFrame.appendChild(currentOptionFrame)

      return;
    }
    value.variantOptions?.forEach((option) => {
      const currentOptionFrame = optionsFrame.clone();
      const name = key + ': ' + option
      currentOptionFrame.name = name;
      setComponentTexts(currentOptionFrame, { 'gridTitle': name });

      // for each instance, we set it to it's new state
      currentOptionFrame.children.forEach(async (child) => {
        if (!isInstance(child)) return
        // if it's the title
        if (child.name === 'gridTitle') {
          await setComponentTexts(child, { '.template.text.gridTitle': key });
          return
        }
        // if it's a component
        if (Object.keys(child.componentProperties).includes(key)) {
          child.setProperties({ [key]: option })
        } else {
          child.remove();
        }

      });
      gridFrame.appendChild(currentOptionFrame)
    });
  })
  return gridFrame;
}

