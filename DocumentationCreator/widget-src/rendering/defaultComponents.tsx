import { generateTemplateFrame } from './generate/templateFrame';
import { generateTemplateTexts } from './generate/templateTexts';
import { generateTemplateToken } from './generate/templateToken';

export async function generateDefaultComponents() {
  // load fonts
  await figma.loadFontAsync({ family: "Roboto Mono", style: "Regular" })
  await figma.loadFontAsync({ family: "Inter", style: "Regular" })

  // create a new frame
  await generateTemplateTexts(650);
  const newFrame = await generateTemplateFrame('Example Frame', 550, 1000, 0, 0);
  await generateTemplateToken(1000);
  if (!newFrame) return

  // focus on the new frame
  figma.currentPage.selection = [newFrame]
  figma.viewport.scrollAndZoomIntoView([newFrame])
  figma.notify('Element created')
}