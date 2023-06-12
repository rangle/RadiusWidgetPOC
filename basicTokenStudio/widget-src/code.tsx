const { widget } = figma
const { AutoLayout, useSyncedState, Text } = widget

import { TokenSets, TokensAsObject } from './types'
import { RenderListOfTokens } from './renderListOfTokens';

// TODO add computed value, this is for math and reference props
const GetAllTokens = (setTokens:Function) => {
  console.log("GetAllTokens");

  const usedTokenSet = JSON.parse(figma.root.getSharedPluginData("tokens", "usedTokenSet"));
  const activeSets = Object.keys(usedTokenSet).filter((key) => usedTokenSet[key] === "enabled");
  // console.log(activeSets);

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
