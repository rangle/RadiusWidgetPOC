
export async function copyPasteThis(node: SceneNode) {
  const copiedNode = node.clone()
  copiedNode.name = node.name + ' copy'
  figma.currentPage.appendChild(copiedNode)
  copiedNode.x = node.x + node.width + 20
  copiedNode.y = node.y
  figma.currentPage.selection = [copiedNode]
  figma.viewport.scrollAndZoomIntoView([copiedNode])
  figma.notify('Element copied')
}

export async function pastFromMemory() {
} 