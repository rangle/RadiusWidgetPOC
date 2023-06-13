const { widget } = figma
const { AutoLayout, Text, useSyncedState } = widget

type UsedTokenSet = {[key:string]:'enabled'|'disabled'}

const getTokenSets = (setValue:(newVal:string)=>void) => {
  const tokenSets = JSON.parse(figma.root.getSharedPluginData("tokens", "usedTokenSet")) as UsedTokenSet;
  setValue(JSON.stringify(tokenSets))
}

const setTokenSets = () => {
  const tokenSets = (JSON.parse(figma.root.getSharedPluginData("tokens", "usedTokenSet")) as UsedTokenSet);
  Object.keys(tokenSets).forEach((key) => {
    if(key ==='global') return
    tokenSets[key] = 'disabled'
  });
  // const tmp = {...tokenSets['style-1']};
  figma.root.setSharedPluginData("tokens", "usedTokenSet", JSON.stringify(tokenSets));
}


function Widget() {
  const [tokens, setTokens] = useSyncedState<string>('tokens','hello world')

  return <AutoLayout 
    direction={'vertical'}
    fill={'#C4C4C4'}
    padding={8} 
    >
    <Text
      onClick={()=>getTokenSets(setTokens)}
    >
      Get Tokens Sets
    </Text>
    <Text onClick={setTokenSets}>
      Disable all token sets
    </Text>
    <Text>
      {tokens}
    </Text>
  </AutoLayout>
}

widget.register(Widget)
