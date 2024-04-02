// reads current version of tokens and variables of current document

import { generateLayerFile } from "../common/generator.utils";
import {
  TokenCollection,
  getAllLocalVariableTokens,
} from "../common/variables.utils";

export const getTokenLayers = async () => {
  const tokenCollections = await getAllLocalVariableTokens();
  const errors = validateTokenCollection(tokenCollections);
  if (errors.length) return [tokenCollections, undefined, errors] as const;
  const layers = generateLayerFile(tokenCollections);
  return [tokenCollections, layers, errors] as const;
};

// compare two versions of tokens, returning non-breaking changes and breaking changes

// validate tokens, returning list of errors
export const validateTokenCollection = (_collections: TokenCollection[]) => {
  // TODO: add validation
  return [];
};
