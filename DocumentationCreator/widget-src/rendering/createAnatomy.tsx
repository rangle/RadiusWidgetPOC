import { getComponent, setComponentTexts } from "./utils";
import { isFrame } from "../common/figma.types";

type AbsoluteFrame = {
  node: SceneNode,
  x: number,
  y: number,
  quadrant: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}


const getQuadrant = (parentComponent: AbsoluteFrame, child: AbsoluteFrame): 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' => {
  // if the child is text, always place it on the left
  // this only works for LTR languages (left to right)
  if (child.node.type === 'TEXT') {
    return parentComponent.y + parentComponent.node.height / 2 > child.y + (child.node.height / 2) ? 'topLeft' : 'bottomLeft';
  }

  if (parentComponent.x + parentComponent.node.width / 2 > (child.x + (child.node.width / 2))) {
    return parentComponent.y + parentComponent.node.height / 2 > child.y + (child.node.height / 2) ? 'topLeft' : 'bottomLeft';
  }
  return parentComponent.y + parentComponent.node.height / 2 > child.y + (child.node.height / 2) ? 'topRight' : 'bottomRight';
}

const recursivelyGetChildrenAbsolute = (frame: FrameNode) => {
  let children: AbsoluteFrame[] = [];
  children = [...frame.children].map((child) => ({
    node: child,
    x: child.absoluteBoundingBox?.x || 0,
    y: child.absoluteBoundingBox?.y || 0,
    quadrant: 'topLeft',
  }));
  children = children.filter((child) => child.node.type !== 'LINE');
  children.forEach((child) => {
    if (isFrame(child.node)) {
      children = [...children, ...recursivelyGetChildrenAbsolute(child.node)];
    }
  });

  return children;
}

export const createAnatomy = async (selectedComponent: SceneNode) => {

  // const annotationComponent = await getComponent('arrow location=topRight');
  const annotationComponent = await getComponent('.template.annotation');

  if (!annotationComponent) {
    figma.notify('Annotation component not found');
    return false
  }

  // create frame for the anatomy
  const wrapper = figma.createFrame()
  wrapper.name = 'anatomy frame'
  // the frame should be slightly larger than the selected component
  wrapper.resize(
    selectedComponent.width > 1280 - ((annotationComponent.width + 177) * 2) ? selectedComponent.width + ((annotationComponent.width + 177) * 2) : 1280,
    selectedComponent.height > 883 - 400 ? selectedComponent.height + 400 : 883
  )

  const baseComponent = selectedComponent.clone() as FrameNode;
  baseComponent.name = 'Base Component';

  const annotation = annotationComponent.createInstance();
  annotation.name = 'annotation'

  wrapper.appendChild(baseComponent)
  wrapper.appendChild(annotation)

  // centre the base component
  baseComponent.constraints = { horizontal: 'CENTER', vertical: 'CENTER' }
  baseComponent.x = wrapper.width / 2 - baseComponent.width / 2;
  baseComponent.y = wrapper.height / 2 - baseComponent.height / 2;

  // position and setup the annotation
  annotation.constraints = { horizontal: 'CENTER', vertical: 'CENTER' }
  annotation.x = baseComponent.x - annotation.width - 77;
  annotation.y = baseComponent.y - annotation.height - 77;
  await setComponentTexts(annotation, {
    'annotation': baseComponent.name
  })
  annotation.setProperties({ 'arrow location': 'bottomRight' })

  // get all the children of the base component
  let itemsToBeAnnotated = recursivelyGetChildrenAbsolute(baseComponent);
  const baseComponentAbsolute: AbsoluteFrame = {
    node: baseComponent,
    x: baseComponent.absoluteBoundingBox?.x || 0,
    y: baseComponent.absoluteBoundingBox?.y || 0,
    quadrant: 'topLeft',
  };
  itemsToBeAnnotated = itemsToBeAnnotated.map((child) => {
    return { ...child, quadrant: getQuadrant(baseComponentAbsolute, child) }
  });

  // for each child add an annotation
  itemsToBeAnnotated.forEach((child) => {
    console.log(child);

    // setup the base annotation
    const localAnnotation = annotationComponent.createInstance();
    localAnnotation.name = 'annotation'
    wrapper.appendChild(localAnnotation);
    localAnnotation.constraints = { horizontal: 'CENTER', vertical: 'CENTER' }
    setComponentTexts(localAnnotation, {
      'annotation': child.node.name
    })

    localAnnotation.x = (child.node.absoluteBoundingBox?.x || 0);
    localAnnotation.y = child.node.absoluteBoundingBox?.y || 0;

    // position the annotation based on the child's quadrant
    switch (child.quadrant) {
      case 'topLeft':
        localAnnotation.x -= localAnnotation.width + 77;
        localAnnotation.y -= localAnnotation.height + 77;
        localAnnotation.setProperties({ 'arrow location': 'bottomRight' })
        break;
      case 'topRight':
        localAnnotation.x += 77 + child.node.width;
        localAnnotation.y -= localAnnotation.height + 77;
        localAnnotation.setProperties({ 'arrow location': 'bottomLeft' })
        break;
      case 'bottomLeft':
        localAnnotation.x -= localAnnotation.width + 77;
        localAnnotation.y += 77 + child.node.height;
        localAnnotation.setProperties({ 'arrow location': 'topRight' })
        break;
      case 'bottomRight':
        localAnnotation.x += 77 + child.node.width;
        localAnnotation.y += 77 + child.node.height;
        localAnnotation.setProperties({ 'arrow location': 'topLeft' })
        break;
    }
  });

  return wrapper;
}