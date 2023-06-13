const { widget } = figma
const { AutoLayout, useSyncedState, Text } = widget

import { TokenSets, TokensAsObject } from './types'
import { RenderListOfTokens } from './renderListOfTokens';

// check figma.root for values
// if there is no values make a default value
const SetDefaultValues = () => {
  const usedTokenSet = JSON.parse(figma.root.getSharedPluginData("tokens", "values"))as TokenSets;
  console.log(usedTokenSet)
  if (Object.keys(usedTokenSet).length === 0) {
    figma.notify("No tokens found, creating default tokens");
    figma.root.setSharedPluginData("tokens", "values", JSON.stringify({
      "global": []
    }));
  }
}


// TODO add computed value, this is for math and reference props
const GetAllTokens = (setTokens:Function) => {
  console.log("GetAllTokens");

  const usedTokenSet = JSON.parse(figma.root.getSharedPluginData("tokens", "usedTokenSet"));
  const activeSets = Object.keys(usedTokenSet).filter((key) => usedTokenSet[key] === "enabled");
  const allTokenValues = JSON.parse(figma.root.getSharedPluginData("tokens", "values")) as TokenSets;

  const activeTokens = activeSets
    .map((set) => allTokenValues[set])


  const noDuplicates = activeTokens.reduce((acc, val) => {
    val.forEach((token) => {
      acc[token.name] = token
    })
    return acc
  }, {} as TokensAsObject)

  setTokens(noDuplicates)
  console.log(noDuplicates)
};

function Widget() {
  const [tokens, setTokens] = useSyncedState<TokensAsObject>('tokens',{})
  return <AutoLayout 
    stroke={'#000'} 
    padding={10} 
    direction="vertical"
    spacing={10}
    >
    <AutoLayout
      onClick={()=>SetDefaultValues()}
      padding={5}
      fill={'#ccc'}
      >
      <Text >Click to set default values</Text>
    </AutoLayout>
    <AutoLayout 
      onClick={()=>GetAllTokens(setTokens)} 
      direction="horizontal"
      padding={5}
      fill={'#ccc'}
      >
      <Text >Click to get tokens</Text>
    </AutoLayout>
    <RenderListOfTokens tokens={tokens}></RenderListOfTokens>
  </AutoLayout>
}

widget.register(Widget)
