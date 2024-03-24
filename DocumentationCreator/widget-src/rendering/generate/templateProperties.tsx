
const { widget } = figma
const { Text } = widget

import { setComponentTexts } from "../utils";

export const generateDoDontTemplate = async () => {
  // create a frame
  const frame = figma.createFrame();
  frame.name = '.template.DoDont';
  frame.layoutMode = 'VERTICAL';
  frame.layoutSizingHorizontal = 'FIXED';
  frame.resize(300, 300);
  frame.layoutSizingVertical = 'HUG';

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
  titleDont.fills = [{ type: 'SOLID', color: { r: 0, g: 1, b: 0 } }];
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

  // add a prop of text
  // titleComponent.addComponentProperty('text', 'TEXT', 'Annotation Text')
  // titleComponent.editComponentProperty('Property 1', { name: 'frameType' })
  // const textVariableName = Object.keys(titleComponent.componentPropertyDefinitions).find((key) => key.includes('text'));

  // // assign the variant to the texts
  // titleDo.componentPropertyReferences = {
  //   characters: textVariableName
  // }
  // titleDont.componentPropertyReferences = {
  //   characters: textVariableName
  // }

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