import { getComponent, setComponentTexts } from "./utils";
import { isFrame } from "../common/figma.types";

type AbsoluteFrame = {
  node: SceneNode,
  x: number,
  y: number,
  quadrant: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}


const getQuadrant = (parentComponent: FrameNode, child: SceneNode): 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' => {
  if (parentComponent.width / 2 > (child.x + (child.width / 2))) {
    return parentComponent.height / 2 > child.y + (child.height / 2) ? 'topLeft' : 'bottomLeft';
  }
  return parentComponent.height / 2 > child.y + (child.height / 2) ? 'topRight' : 'bottomRight';
}

const recursivelyGetChildrenAbsolute = (frame: FrameNode) => {
  let children: AbsoluteFrame[] = [];
  children = [...frame.children].map((child) => ({
    node: child,
    x: child.absoluteBoundingBox?.x || 0,
    y: child.absoluteBoundingBox?.y || 0,
    quadrant: 'topLeft',
  }));
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

  const itemsToBeAnnotated = recursivelyGetChildrenAbsolute(baseComponent);
  // get quadrant for each child
  itemsToBeAnnotated.map((child) => {
    return { ...child, quadrant: getQuadrant(baseComponent, child.node) }
  });

  // find conflicting quadrants

  // for each child add an annotation
  itemsToBeAnnotated.forEach((child) => {
    // what quarter of the base component is the child in

    const localAnnotation = annotationComponent.createInstance();
    wrapper.appendChild(localAnnotation);
    localAnnotation.constraints = { horizontal: 'CENTER', vertical: 'CENTER' }
    setComponentTexts(localAnnotation, {
      '.template.annotation': child.node.name
    })

    localAnnotation.x = (child.node.absoluteBoundingBox?.x || 0) + (child.node.width / 2) - (localAnnotation.width / 2);
    localAnnotation.y = child.node.absoluteBoundingBox?.y || 0

    switch (child.quadrant) {
      case 'topLeft':
        localAnnotation.x -= 77;
        localAnnotation.y -= 77;
        localAnnotation.setProperties({ 'arrow location': 'bottomRight' })
        break;
      case 'topRight':
        localAnnotation.x += 77;
        localAnnotation.y -= 77;
        // localAnnotation.x = baseComponent.x + baseComponent.width + 77 - child.x - (child.node.width / 2);
        localAnnotation.setProperties({ 'arrow location': 'bottomLeft' })
        break;
      case 'bottomLeft':
        localAnnotation.x -= 77;
        localAnnotation.y += 77;
        localAnnotation.setProperties({ 'arrow location': 'topRight' })
        break;
      case 'bottomRight':
        localAnnotation.x += 77;
        localAnnotation.y += 77;
        // localAnnotation.x = child.node.absoluteBoundingBox?.x//child.x - (child.node.width / 2) + 77;
        // localAnnotation.y = child.node.absol//child.y;
        localAnnotation.setProperties({ 'arrow location': 'topLeft' })
        break;

      // case 'topLeft':
      //   localAnnotation.x = baseComponent.x + 77 + child.x;
      //   localAnnotation.y = baseComponent.y - localAnnotation.height - 77 + child.y;
      //   localAnnotation.setProperties({ 'arrow location': 'bottomLeft' })
      //   break;
      // case 'topRight':
      //   localAnnotation.x = baseComponent.x - localAnnotation.width - 77 + child.x + (child.node.width / 2);
      //   localAnnotation.y = baseComponent.y + baseComponent.height + 77 - child.y;
      //   localAnnotation.setProperties({ 'arrow location': 'topRight' })
      //   break;
      // case 'bottomLeft':
      //   // localAnnotation.x = baseComponent.x + child.x + (child.width / 2) + 77;
      //   localAnnotation.setProperties({ 'arrow location': 'topLeft' })
      //   break;
      // case 'bottomRight':
      //   // localAnnotation.x = baseComponent.x - localAnnotation.width - 77;
      //   // localAnnotation.y = baseComponent.y + baseComponent.height + 77;
      //   localAnnotation.setProperties({ 'arrow location': 'topRight' })
      //   break;
    }

    //   if (index >= 3) return;
    //   const localAnnotation = annotationComponent.createInstance();
    //   wrapper.appendChild(localAnnotation);
    //   localAnnotation.constraints = { horizontal: 'CENTER', vertical: 'CENTER' }
    //   setComponentTexts(localAnnotation, {
    //     '.template.annotation': child.node.name
    //   })
    //   switch (index) {
    //     case 0:
    //       localAnnotation.x = baseComponent.x + baseComponent.width + 77;
    //       localAnnotation.y = baseComponent.y - localAnnotation.height - 77;
    //       localAnnotation.setProperties({ 'arrow location': 'bottomLeft' })
    //       break;
    //     case 1:
    //       localAnnotation.x = baseComponent.x - localAnnotation.width - 77;
    //       localAnnotation.y = baseComponent.y + baseComponent.height + 77;
    //       localAnnotation.setProperties({ 'arrow location': 'topRight' })
    //       break;
    //     case 2:
    //       localAnnotation.x = baseComponent.x + baseComponent.width + 77;
    //       localAnnotation.y = baseComponent.y + baseComponent.height + 77;
    //       localAnnotation.setProperties({ 'arrow location': 'topLeft' })
    //       break;
    //   }
    // });
  });

  return wrapper;
}