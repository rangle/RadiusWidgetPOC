const { widget } = figma
const { AutoLayout, Text } = widget
import { GetAllTokens } from './utils/index'
import { StudioToken } from './types/index'
import { TokensAsObject } from './types/index'

// const GetValueFromKey = (keys:string[],tokens:any) => {
//   const key = keys.shift();
//   return tokens[key];
//   // if(!key) return tokens;
//   // return GetValueFromKey(keys,tokens[key]);
// }

function Widget() {
  const renderTree = (token:StudioToken,x:number,y:number,container:SceneNode) => {
    figma.loadFontAsync({ family: "Inter", style: "Regular" }).then(() => {
      const text = figma.createText()
      text.characters = `${token.parent?'↳ ':''}${token.name}`
      text.x = x
      text.y = y
      container.appendChild(text)
      if(token.parent){
        renderTree(token.parent,x,y-20,container);
      }
    })
  };
  const generateTree = () => {
    const tokens = GetAllTokens();
    
    // get the select component
    figma.currentPage.selection.forEach((node) => {
      node.getSharedPluginDataKeys('tokens').forEach((key,i) => {
        if(key === 'hash') return;
        if(key !== 'fill') return;
        const name = node.getSharedPluginData('tokens', key).replaceAll('"','')
        const token = tokens[name];
        renderTree(token,node.x,node.y-20,node.parent);
      });
    });

    // get all the tokens of on the component
  }

  return (<AutoLayout >
    <AutoLayout
      padding={8}
      direction="vertical"
      fill={'#0c0'}
      onClick={generateTree}
    >
      <Text>Make Tree</Text>
    </AutoLayout>

  </AutoLayout>)
}

widget.register(Widget)
