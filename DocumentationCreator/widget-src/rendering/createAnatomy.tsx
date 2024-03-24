import { getComponent, setComponentTexts } from "./utils";
import { isFrame } from "../common/figma.types";

export const createAnatomy = async (selectedComponent: SceneNode) => {

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
    '.template.annotation': baseComponent.name
  })
  annotation.setProperties({ 'arrow location': 'bottomRight' })

  let itemsToBeAnnotated = [...baseComponent.children];
  if (itemsToBeAnnotated.length < 3) {
    itemsToBeAnnotated.forEach((child) => {
      if (isFrame(child)) itemsToBeAnnotated = [...itemsToBeAnnotated, ...child.children];
    })
  }

  // for each child add an annotation
  itemsToBeAnnotated.forEach((child, index) => {
    if (index >= 3) return;
    const localAnnotation = annotationComponent.createInstance();
    wrapper.appendChild(localAnnotation);
    localAnnotation.constraints = { horizontal: 'CENTER', vertical: 'CENTER' }
    setComponentTexts(localAnnotation, {
      '.template.annotation': child.name
    })
    switch (index) {
      case 0:
        localAnnotation.x = baseComponent.x + baseComponent.width + 77;
        localAnnotation.y = baseComponent.y - localAnnotation.height - 77;
        localAnnotation.setProperties({ 'arrow location': 'bottomLeft' })
        break;
      case 1:
        localAnnotation.x = baseComponent.x - localAnnotation.width - 77;
        localAnnotation.y = baseComponent.y + baseComponent.height + 77;
        localAnnotation.setProperties({ 'arrow location': 'topRight' })
        break;
      case 2:
        localAnnotation.x = baseComponent.x + baseComponent.width + 77;
        localAnnotation.y = baseComponent.y + baseComponent.height + 77;
        localAnnotation.setProperties({ 'arrow location': 'topLeft' })
        break;
    }
  });

  return wrapper;
}