import { TokenSets, TokensAsObject, StudioToken } from "../types/index";

export const GetAllTokens = () => {
  const usedTokenSet = JSON.parse(figma.root.getSharedPluginData("tokens", "usedTokenSet"));
  const activeSets = Object.keys(usedTokenSet).filter((key) => usedTokenSet[key] === "enabled");
  const allTokenValues = JSON.parse(figma.root.getSharedPluginData("tokens", "values")) as TokenSets;

  const activeTokens = activeSets
    .map((set) => allTokenValues[set])

  findParentToken(activeTokens)

  const noDuplicates = activeTokens.reduce((acc, val) => {
    val.forEach((token) => {
      acc[token.name] = token
    })
    return acc
  }, {} as TokensAsObject)

  return noDuplicates
}

// compute the token values
// replace all the tokens that in brackets and get the tree of values
// link to the parent node (create the tree)
// do math on the tokens if they maths

// from the bottom find the parent token
const findTokenByName = (name:string, tokens:StudioToken[][]) => {
  // loop over the token sets
  for (let i = tokens.length - 1; i >= 0; i--) {
    const tokenSet = tokens[i];
    // loop over the tokens
    for (let j = 0; j < tokenSet.length; j++) {
      const token = tokenSet[j];
      if (token.name === name) return token;
    }
  }
}

const findParentToken = (tokens:StudioToken[][]) => {
  // loop over the token sets
  for (let i = tokens.length - 1; i >= 0; i--) {
    const tokenSet = tokens[i];
    // loop over the tokens
    for (let j = 0; j < tokenSet.length; j++) {
      const token = tokenSet[j];
      if (typeof token.value !== 'string' || !token.value.includes("{")) continue;
      const parentName = (token.value.match(/\{(.*?)\}/)||[])[1];
      if (!parentName) continue;
      
      token.parent = findTokenByName(parentName, tokens);
    }
  }

}

