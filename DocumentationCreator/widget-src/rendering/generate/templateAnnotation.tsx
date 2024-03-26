
export const generateAnnotation = async () => {
  const annotationWrapper = createAnnotationWrapper()
  const annotationBubble = createAnnotationBubble()
  const annotationText = await createAnnotationText()
  const annotationArrow = await createAnnotationArrow()

  annotationWrapper.appendChild(annotationArrow)
  annotationArrow.layoutPositioning = "ABSOLUTE"

  annotationWrapper.appendChild(annotationBubble)
  annotationBubble.appendChild(annotationText)

  // apply styles that need to be applied once elements are combined.
  annotationWrapper.layoutSizingVertical = 'HUG'
  annotationWrapper.layoutSizingHorizontal = 'FIXED'
  annotationBubble.layoutSizingVertical = 'HUG'
  annotationBubble.layoutSizingHorizontal = 'FIXED'
  annotationText.textAutoResize = "HEIGHT"
  annotationText.layoutSizingHorizontal = 'FILL'

  annotationWrapper.name = 'topLeft'
  annotationWrapper.constraints = {
    horizontal: 'MIN',
    vertical: 'MIN'
  }

  // top right
  const annotationWrapperRight = annotationWrapper.clone();
  annotationWrapperRight.name = 'topRight'
  const annotationArrowTopRight = annotationWrapperRight.findOne(node => node.name === '.template.annotation.arrow') as VectorNode;
  annotationArrowTopRight.x = 309
  annotationArrowTopRight.y = 1
  annotationArrowTopRight.rotation = 45
  annotationArrowTopRight.constraints = {
    horizontal: 'MAX',
    vertical: 'MIN'
  }

  // bottom right
  const annotationWrapperBottomRight = annotationWrapperRight.clone();
  annotationWrapperBottomRight.name = 'bottomRight'
  const annotationArrowBottomRight = annotationWrapperBottomRight.findOne(node => node.name === '.template.annotation.arrow') as VectorNode;
  annotationArrowBottomRight.x = 309
  annotationArrowBottomRight.y = 86
  annotationArrowBottomRight.rotation = -45
  annotationArrowBottomRight.constraints = {
    horizontal: 'MAX',
    vertical: 'MAX'
  }

  // bottom left
  const annotationWrapperBottomLeft = annotationWrapper.clone();
  annotationWrapperBottomLeft.name = 'bottomLeft'
  const annotationArrowBottomLeft = annotationWrapperBottomLeft.findOne(node => node.name === '.template.annotation.arrow') as VectorNode;
  annotationArrowBottomLeft.x = 1
  annotationArrowBottomLeft.y = 86
  annotationArrowBottomLeft.rotation = -135
  annotationArrowBottomRight.constraints = {
    horizontal: 'MIN',
    vertical: 'MAX'
  }

  // find all the text nodes
  const annotationTextRight = annotationWrapperRight.findOne((node) => node.name === '.template.annotation.text')
  const annotationTextBottomRight = annotationWrapperBottomRight.findOne((node) => node.name === '.template.annotation.text')
  const annotationTextBottomLeft = annotationWrapperBottomLeft.findOne((node) => node.name === '.template.annotation.text')
  if (!annotationTextRight || !annotationTextBottomRight || !annotationTextBottomLeft) return figma.notify('Annotation text not found')

  // create a new component out of the annotation
  const annotationComponentTopLeft = figma.createComponentFromNode(annotationWrapper)
  const annotationComponentTopRight = figma.createComponentFromNode(annotationWrapperRight)
  const annotationComponentBottomRight = figma.createComponentFromNode(annotationWrapperBottomRight)
  const annotationComponentBottomLeft = figma.createComponentFromNode(annotationWrapperBottomLeft)

  const annotationComponent = figma.combineAsVariants([
    annotationComponentTopLeft,
    annotationComponentTopRight,
    annotationComponentBottomRight,
    annotationComponentBottomLeft
  ], figma.currentPage)

  annotationComponent.name = '.template.annotation'
  annotationComponent.layoutMode = 'VERTICAL';
  annotationComponent.itemSpacing = 16;
  annotationComponent.verticalPadding = 77;
  annotationComponent.horizontalPadding = 77;
  annotationComponent.layoutSizingHorizontal = 'HUG'

  // add the text prop to the component 
  annotationComponent.addComponentProperty('text', 'TEXT', 'Annotation Text')
  annotationComponent.editComponentProperty('Property 1', { name: 'arrow location' })

  const textVariableName = Object.keys(annotationComponent.componentPropertyDefinitions).find((key) => key.includes('text'));

  annotationText.componentPropertyReferences = {
    characters: textVariableName
  }
  annotationTextRight.componentPropertyReferences = {
    characters: textVariableName
  }
  annotationTextBottomRight.componentPropertyReferences = {
    characters: textVariableName
  }
  annotationTextBottomLeft.componentPropertyReferences = {
    characters: textVariableName
  }

  return annotationComponent;
}

const createAnnotationWrapper = () => {
  const node = figma.createFrame()
  node.name = '.template.annotation.wrapper'
  node.resize(304, 86)
  node.clipsContent = false
  // auto layout
  node.layoutMode = 'HORIZONTAL'
  node.primaryAxisAlignItems = 'MIN'
  node.counterAxisAlignItems = 'MIN'
  node.paddingLeft = 0
  node.paddingRight = 0
  node.paddingTop = 0
  node.paddingBottom = 0
  node.itemSpacing = 0
  node.strokes = [
    {
      "type": "SOLID",
      "visible": true,
      "opacity": 1,
      "blendMode": "NORMAL",
      "color": {
        "r": 0.9372549057006836,
        "g": 0.5960784554481506,
        "b": 0.15294118225574493
      },
      "boundVariables": {}
    }
  ]
  return node;
}

const createAnnotationBubble = () => {
  const node = figma.createFrame()
  node.name = '.template.annotation.bubble'
  node.x = 0
  node.y = 0
  node.resize(309, 86)
  node.clipsContent = false
  // auto layout
  node.layoutMode = 'HORIZONTAL'
  node.primaryAxisAlignItems = 'MIN'
  node.counterAxisAlignItems = 'MIN'
  node.paddingLeft = 32
  node.paddingRight = 32
  node.paddingTop = 32
  node.paddingBottom = 32
  node.itemSpacing = 0
  node.fills = [
    {
      "type": "SOLID",
      "visible": true,
      "opacity": 1,
      "blendMode": "NORMAL",
      "color": {
        "r": 1,
        "g": 1,
        "b": 1
      },
      "boundVariables": {}
    }
  ]
  node.strokes = [
    {
      "type": "SOLID",
      "visible": true,
      "opacity": 1,
      "blendMode": "NORMAL",
      "color": {
        "r": 0.9372549057006836,
        "g": 0.5960784554481506,
        "b": 0.15294118225574493
      },
      "boundVariables": {}
    }
  ]

  return node;
};

const createAnnotationText = async () => {
  const node = figma.createText()
  node.name = '.template.annotation.text'
  await figma.loadFontAsync({ family: "Inter", style: "Regular" }) // load Figma default font
  await figma.loadFontAsync({ "family": "Roboto Mono", "style": "Regular" })
  const characters = 'Annotation text'
  node.characters = characters
  node.setRangeFontSize(0, characters.length, 16)
  node.setRangeFontName(0, characters.length, { "family": "Roboto Mono", "style": "Regular" })
  node.setRangeLineHeight(0, characters.length, { "unit": "PERCENT", "value": 139.9999976158142 })
  node.fills = [
    {
      "type": "SOLID",
      "visible": true,
      "opacity": 1,
      "blendMode": "NORMAL",
      "color": {
        "r": 0.14901961386203766,
        "g": 0.14901961386203766,
        "b": 0.14901961386203766
      },
      "boundVariables": {}
    }
  ]
  return node;
}

const createAnnotationArrow = async () => {
  const node = figma.createVector()
  node.name = '.template.annotation.arrow'
  node.x = 2
  node.y = 2
  node.resize(101.82337951660156, 0)
  node.rotation = 135
  await node.setVectorNetworkAsync({
    regions: [],
    segments: [
      {
        start: 0,
        end: 1,
        tangentStart: { x: 0, y: 0 },
        tangentEnd: { x: 0, y: 0 }
      }
    ],
    vertices: [
      {
        x: 0,
        y: 0,
        // strokeCap: "NONE",
        strokeJoin: "MITER",
        cornerRadius: 0,
        handleMirroring: "NONE"
      },
      {
        x: 101.82337951660156,
        y: 0,
        strokeCap: 'ARROW_EQUILATERAL',
        strokeJoin: "MITER",
        cornerRadius: 0,
        handleMirroring: "NONE"
      }
    ]
  });
  node.strokes = [
    {
      "type": "SOLID",
      "visible": true,
      "opacity": 1,
      "blendMode": "NORMAL",
      "color": {
        "r": 0.9372549057006836,
        "g": 0.5960784554481506,
        "b": 0.15294118225574493
      },
      "boundVariables": {}
    }
  ]

  return node;
}