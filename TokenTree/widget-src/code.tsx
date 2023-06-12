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
        const name = node.getSharedPluginData('tokens', key)
        // render the tree
        console.log('name',name,name === 'semanticTheme.color.actions.hover.foregroundOnNoBackground');
        console.log('tokens',tokens)
        console.log('token',tokens[name])
        console.log('manual',tokens['semanticTheme.color.actions.hover.foregroundOnNoBackground'])
        // iterate over the token values
        
        console.log('token',Object.keys(tokens).filter((token) => token.includes('semanticTheme')));
        // const token = GetValueFromKey(name.split('.'),tokens)
        // console.log('name',name)
        // console.log('tokens' ,tokens);
        // console.log('token',token);
        // console.log(token)
        // renderTree(token,node.x,node.y-20,node.parent);
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
