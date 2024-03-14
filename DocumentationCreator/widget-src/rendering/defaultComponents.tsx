import { generateTemplateFrame } from './generate/templateFrame';
import { generateTemplateTexts } from './generate/templateTexts';
import { generateTemplateToken } from './generate/templateToken';
import { generateTemplateCheckBoxes } from './generate/templateCheckboxes';

export async function generateDefaultComponents() {

  // is this page empty other than the widget?
  if (figma.currentPage.children.length > 1) {
    figma.notify('This page is not empty. Please create a new page to generate the default components.');
    return;
  }

  // load fonts
  await figma.loadFontAsync({ family: "Roboto Mono", style: "Regular" })
  await figma.loadFontAsync({ family: "Inter", style: "Regular" })

  // create a new frame
  await generateTemplateTexts(650);
  await generateTemplateFrame('Example Frame', 550, 1000, 0, 0);
  await generateTemplateToken(1000);
  await generateTemplateCheckBoxes();

  // organize all the frames on the page
  const spacing = 20;
  let currentX = 0;
  let currentY = 0;
  let prevWidth = 0;
  let prevHeight = 0;
  figma.currentPage.children.forEach((child) => {
    if (child.type === 'WIDGET') return;
    if (child.width < 150) {
      if (prevHeight) {
        currentY += prevHeight + spacing + spacing;
      }
      child.x = currentX;
      child.y = currentY;
      if (child.width > prevWidth) {
        prevWidth = child.width;
      }
      prevHeight = child.height;
    } else {
      currentX += prevWidth + spacing;
      currentY = 0;
      prevWidth = child.width;
      prevHeight = child.height;
      child.x = currentX;
      child.y = currentY;
    }
  });

}