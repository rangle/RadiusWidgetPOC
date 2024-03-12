import { isInstance } from "../common/figma.types";

export const createPropertiesGrid = async (selectedComponent: SceneNode) => {
  console.log('\n\n====== create properties grid ======')
  if (!isInstance(selectedComponent)) {
    figma.notify('Please select a component or an instance to create a properties grid')
    return
  }

  const component = await selectedComponent.getMainComponentAsync();

  if (!component) {
    figma.notify('No original component found')
    return
  }

  if (!component.variantProperties) {
    figma.notify('No variant properties found')
    return
  }

  figma.notify('Creating properties grid')
}

