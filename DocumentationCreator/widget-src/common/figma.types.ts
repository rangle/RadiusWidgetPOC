export const isFrame = (n: SceneNode): n is FrameNode => n.type === "FRAME";
export const isInstance = (n: SceneNode): n is InstanceNode =>
  n.type === "INSTANCE";
export const isComponent = (n: SceneNode): n is ComponentNode =>
  n.type === "COMPONENT";
export const isComponentSet = (n: SceneNode): n is ComponentSetNode =>
  n.type === "COMPONENT_SET";
export const isGroup = (n: SceneNode): n is GroupNode => n.type === "GROUP";

export type Composite =
  | FrameNode
  | InstanceNode
  | ComponentNode
  | ComponentSetNode
  | GroupNode;

export const isComposite = (n: SceneNode): n is Composite =>
  isFrame(n) ||
  isInstance(n) ||
  isComponent(n) ||
  isComponentSet(n) ||
  isGroup(n);
