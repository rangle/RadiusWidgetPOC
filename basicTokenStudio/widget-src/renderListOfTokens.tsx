const { widget } = figma
const { AutoLayout, Text } = widget
import hash from 'object-hash';
import { TokensAsObject, StudioToken } from './types'
import { PersistentNodesCache, PersistentNode } from './types'

const HexToRGB = (hex:string) => {
  // if { is in the string, replace the string with a hash for now
  if(hex.includes('{')) {
    console.log('not a hex value', hex)
    hex = '#ff0000'
  }

  // remove # if present
  hex = hex.replace('#','').toLowerCase();

  // check if hex is 3 or 6 digits
  if(hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }

  const r = parseInt(hex.substring(0,2),16)/255;
  const g = parseInt(hex.substring(2,4),16)/255;
  const b = parseInt(hex.substring(4,6),16)/255;
  return {r,g,b} as RGB;
}

// TODO all the other token types and node types combos
const ApplyValueToSelected = (token:StudioToken) => {
  figma.currentPage.selection.forEach((node) => {
      console.log('apply', token.name, node.name);
      if(token.type === 'color' && node.type === 'RECTANGLE') {
        node.fills = [{type: 'SOLID', color: HexToRGB(token.value)}];

        const action = 'fill'
        const myHash = AddToNodeCache(token,node,action);
        node.setSharedPluginData('tokens', 'hash', myHash);
        // TODO !!!!!! is it token.value or token.name? <<< maybe we don't need to do the hash stuff then...
        // rename action to something more appropriate
        node.setSharedPluginData('tokens', action, token.name);
      }
  });
}

// TODO this should update the node, not delete the old one...
// TODO what does it look like when there is multiple tokens applied to a node?
// TODO what happens with the hash when we change the node?
const AddToNodeCache = (token:StudioToken,node:SceneNode,action:string) => {
  const persistentNodesCache = JSON.parse(figma.root.getSharedPluginData("tokens", "persistentNodesCache")) as PersistentNodesCache;
  console.log(persistentNodesCache)
  // find if the node exists in the cache
  const nodeIndex = persistentNodesCache.findIndex((item) => item[0] === node.id);
  const updatedAt = Date.now();
  const myHash = hash({
    [action]: token.name
  }) as string;
  const newData = [node.id,{
    createdAt: Date.now(),
    hash:myHash,
    tokens: {
      [action]: token.name
    }
  }] as PersistentNode;

  // add the node if it doesn't exist
  if(nodeIndex === -1) {
    persistentNodesCache.push(newData);
  } else {
    persistentNodesCache[nodeIndex] = newData;
  }
  figma.root.setSharedPluginData("tokens", "persistentNodesCache", JSON.stringify(persistentNodesCache));
  figma.root.setSharedPluginData("tokens", "updatedAt", updatedAt.toString());
  return myHash
};

export const RenderListOfTokens = ({tokens}: {tokens:TokensAsObject}) => {
  return (<AutoLayout
    name="Tokens"
    direction="vertical"
    spacing={5}
    >
    {Object.keys(tokens).map((key) => {
      return <AutoLayout 
        direction='horizontal'
        name={tokens[key].name}
        onClick={()=>ApplyValueToSelected(tokens[key])}
        fill={'#ccc'}
        padding={5}
        key={key}
        >
        <Text key={`${key}+1`}>{tokens[key].name} </Text>
        <Text key={`${key}+2`}>- {tokens[key].value}</Text>
      </AutoLayout>
    })}
  </AutoLayout>);
}
