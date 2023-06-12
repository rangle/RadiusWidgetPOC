
export enum TokenTypes {
  OTHER = 'other',
  COLOR = 'color',
  BORDER_RADIUS = 'borderRadius',
  SIZING = 'sizing',
  SPACING = 'spacing',
  TEXT = 'text',
  TYPOGRAPHY = 'typography',
  OPACITY = 'opacity',
  BORDER_WIDTH = 'borderWidth',
  BOX_SHADOW = 'boxShadow',
  FONT_FAMILIES = 'fontFamilies',
  FONT_WEIGHTS = 'fontWeights',
  LINE_HEIGHTS = 'lineHeights',
  FONT_SIZES = 'fontSizes',
  LETTER_SPACING = 'letterSpacing',
  PARAGRAPH_SPACING = 'paragraphSpacing',
  PARAGRAPH_INDENT = 'paragraphIndent',
  TEXT_DECORATION = 'textDecoration',
  TEXT_CASE = 'textCase',
  COMPOSITION = 'composition',
  DIMENSION = 'dimension',
  BORDER = 'border',
  ASSET = 'asset',
  BOOLEAN = 'boolean',
}

export type StudioToken = {
  name:string;
  type:`${TokenTypes}`;
  value:string;
  parent?: StudioToken;
  computedValue?: string;
}

export type TokenSets = {
  [key: string]: StudioToken[];
};

export type TokensAsObject = {
  [key: string]: StudioToken;
};

export type PersistentNode = [
  string, // id of the node
  {
    hash:string; // a unique hash for the tokens used
    tokens:{
      [key:string]:string; // fill:brand
    };
    createdAt:number; 
}]

export type PersistentNodesCache = PersistentNode[]

