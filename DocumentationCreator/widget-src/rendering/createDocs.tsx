import { cloneTemplate } from './utils';
import { isInstance } from '../common/figma.types';
import { createPropertiesGrid } from './createPropertiesGrid';
import { createComponentTokens } from './createComponentTokens';
export async function createDocumentationPage(node: SceneNode) {
  // create the documentation frames
  // Dev Hands off Specification
  // Anatomy
  // Variants & Props
  // States
  // Behaviour
  // Component Prototype
  // Token Annotations
  // Token Branch
  // Accessibility
  // Component Properties
  let xLocation = 0;
  const spacing = 20;
  await cloneTemplate('.template.frame', 'dev-handoff', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Dev Hands off Specification',
  })
  xLocation += 550 + spacing;
  await cloneTemplate('.template.frame', 'anatomy', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Anatomy',
  })
  xLocation += 550 + spacing;
  const propsFrame = await cloneTemplate('.template.frame', 'variants-props', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Variants & Props',
  })
  if (isInstance(node) && propsFrame) {
    const propertiesGrid = await createPropertiesGrid(node);
    const contentFrame = propsFrame.findOne(node => node.name === '.frame.content')
    if (propertiesGrid && contentFrame) {
      (contentFrame as FrameNode).appendChild(propertiesGrid);
    }
  }

  xLocation += (propsFrame?.width || 550) + spacing;
  await cloneTemplate('.template.frame', 'states', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'States',
  })

  xLocation += 550 + spacing;
  await cloneTemplate('.template.frame', 'behaviour', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Behaviour',
  })

  xLocation += 550 + spacing;
  await cloneTemplate('.template.frame', 'component-prototype', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Component Prototype',
  })

  xLocation += 550 + spacing;
  await cloneTemplate('.template.frame', 'token-annotations', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Token Annotations',
  })

  xLocation += 550 + spacing;
  const tokenContainer = await cloneTemplate('.template.frame', 'token-branch', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Token Branch',
  })
  if (isInstance(node) && tokenContainer) {
    const tokenList = await createComponentTokens(node);
    const contentFrame = tokenContainer.findOne(node => node.name === '.frame.content')
    if (tokenList && contentFrame) {
      (contentFrame as FrameNode).appendChild(tokenList);
    }
  }


  xLocation += (tokenContainer?.width || 550) + spacing;
  await cloneTemplate('.template.frame', 'accessibility', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Accessibility',
  })

  xLocation += 550 + spacing;
  await cloneTemplate('.template.frame', 'component-properties', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Component Properties',
  })

}