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
  cloneTemplate('.template.frame', 'dev-handoff', { x: 0, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Dev Hands off Specification',
  })
  cloneTemplate('.template.frame', 'anatomy', { x: 566, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Anatomy',
  })
  cloneTemplate('.template.frame', 'variants-props', { x: 1132, y: 0, width: 550, height: 500 }, {
    '.frame.title.text': 'Variants & Props',
  })
}