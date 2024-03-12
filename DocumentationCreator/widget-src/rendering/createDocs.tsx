import { cloneTemplate } from './utils';

export async function createDocumentationPage() {
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
  cloneTemplate('.template.frame', 'dev-handoff', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Dev Hands off Specification',
  })
  xLocation += 550 + spacing;
  cloneTemplate('.template.frame', 'anatomy', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Anatomy',
  })
  xLocation += 550 + spacing;
  cloneTemplate('.template.frame', 'variants-props', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Variants & Props',
  })
  xLocation += 550 + spacing;
  cloneTemplate('.template.frame', 'states', { x: xLocation, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'States',
  })
}