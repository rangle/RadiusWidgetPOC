import { setComponentTexts, getTemplate } from './utils';

export const HAND_OFF_SECTIONS = {
  'Anatomy': [
    'All atoms that are used to create the component are labelled',
    'Atom’s dev hands off specifications are hyperlinked for devs to find',
    'Component properties are labeled to showcase which properties are editable, mandatory, or optional'
  ],
  'Variants and Props': [
    'Copy and paste all the variants of the components',
    'Variants are properly labelled'
  ],
  'States': [
    'Copy and paste all the different states the components may have',
    'All states are properly labelled'
  ],
  'Interaction/Behaviour': [
    'All interactions/behaviours that the component may have when interacted with are labeled'
  ],
  'Component Prototype': [
    'If necessary, provide a component prototype to show how interactions may look in real time'
  ],
  'Token Annotation': [
    'Provide all token annotations used/created for the main component',
    'For the different component variants, provide only the different token annotations that are not shared with its main component'
  ],
  'Token Branch': [
    'Show which token sets are toggled on in Token Studios for this component'
  ],
  'Accessibility': [
    'Specify accessibility considerations'
  ],
  'Design Guidelines': [
    'Define what the component is and when it is used',
    'List all the component properties nested within the component',
    "Provide 'Dos' and 'Don'ts' guidelines for implementing the component properly in designs"
  ],
  'Other': [
    'Create a placeholder page in the Radius UI Kit for the future home of Component Documentation and share the link with Engineering',
    'User Acceptance Testing with Product Designers'
  ]
}

export const createCheckBoxSection = async (sections: { [key: string]: string[] }) => {
  const sectionTemplate = await getTemplate('.template.checkbox.sections') as FrameNode;
  if (!sectionTemplate) return figma.notify('Checkbox sections template does not exist.')
  const boxTemplate = sectionTemplate.findOne(node => node.name === '.template.checkbox.item') as FrameNode;
  if (!boxTemplate) return figma.notify('Checkbox sections template does not exist.')
  const frames: FrameNode[] = [];

  for (const section in sections) {
    const sectionFrame = await sectionTemplate.clone();
    await setComponentTexts(sectionFrame, { '.template.texts': section });
    // remove the placeholder checkbox
    sectionFrame.children.forEach(child => child.name === '.template.checkbox.item' ? child.remove() : null);
    // for each section, create a checkbox for all the texts
    for (const box in sections[section]) {
      const boxFrame = await boxTemplate.clone();
      await setComponentTexts(boxFrame, { '.template.texts': sections[section][box] });
      sectionFrame.appendChild(boxFrame);
    }
    frames.push(sectionFrame);
  }
  return frames;
};
