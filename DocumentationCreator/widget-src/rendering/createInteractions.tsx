import { getComponent, setComponentTexts } from "./utils";

export const createInteractions = async (selectedComponent: SceneNode) => {

  const annotationComponent = await getComponent('arrow location=topRight');

  if (!annotationComponent) {
    figma.notify('Annotation component not found');
    return false
  }

  // create frame for the anatomy
  const wrapper = figma.createFrame()
  wrapper.name = 'anatomy frame'
  wrapper.resize(
    selectedComponent.width > 1280 - ((annotationComponent.width + 177) * 2) ? selectedComponent.width + ((annotationComponent.width + 177) * 2) : 1280,
    selectedComponent.height > 883 - 400 ? selectedComponent.height + 400 : 883
  )

  const baseComponent = selectedComponent.clone() as FrameNode;
  baseComponent.name = 'Base Component';


  const annotation = annotationComponent.createInstance();

  wrapper.appendChild(baseComponent)
  wrapper.appendChild(annotation)

  baseComponent.constraints = { horizontal: 'CENTER', vertical: 'CENTER' }
  baseComponent.x = wrapper.width / 2 - baseComponent.width / 2;
  baseComponent.y = wrapper.height / 2 - baseComponent.height / 2;

  annotation.constraints = { horizontal: 'CENTER', vertical: 'CENTER' }
  annotation.x = baseComponent.x - annotation.width - 77;
  annotation.y = baseComponent.y - annotation.height - 77;
  await setComponentTexts(annotation, {
    '.template.annotation': "Am I an interactive component, please describe how I'm interactive."
  })
  annotation.setProperties({ 'arrow location': 'bottomRight' })

  return wrapper;
}