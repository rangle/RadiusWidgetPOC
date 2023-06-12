// This widget will open an Iframe window with buttons to show a toast message and close the window.

const { widget } = figma
const {useSyncedState, useEffect, Text, AutoLayout } = widget


const findGlobalComponent = async () => {
  await new Promise((resolve) => {
    figma.importComponentSetByKeyAsync('TokenLayer').then((componentSet) => {
      console.log(componentSet)
      resolve(componentSet)
    }).catch((err) => {
      console.log(err)
      resolve(err)
    });
  })
}

const isComponent = (node: ComponentNode|undefined): node is ComponentNode => {
  return node !== undefined && node.id !== undefined
}

function Widget() {
  // const [styleComponent, setStyleComponent] = useSyncedState<ComponentNode|undefined>('styleNodes',undefined)
  // const [createComponent, setCreateComponent] = useSyncedState<Function|undefined>('createComponent',undefined)

  const componentName = 'TokenLayer'
  const findStyleComponent = () => {
    for (const child of figma.currentPage.children) {
      if(child.type === 'COMPONENT' && child.name === componentName) {
        return child;
      }
    }
    for (const child of figma.currentPage.children) {
      if(child.type === 'INSTANCE' && child.mainComponent && child.mainComponent.name === componentName){
        child.mainComponent.createInstance();
        return child.mainComponent;
      }
    };
    figma.notify(`Add a component named ${componentName} to the page with the property "name"`);
    return undefined;
  }

  const addComponent = () => {
    const styleComponent = findStyleComponent();
    if(styleComponent === undefined) return;

    console.log(styleComponent);
    // // find the styleComponent in the dom
    // const newChild = styleComponent.createComponent();
    // // newChild.x = styleComponent.x;
    // // newChild.y = styleComponent.y + 100;

    // // find the key with name in it
    // const nameKey = Object.keys(newChild.componentProperties).filter((key)=>key.toLowerCase().includes('name'))[0]
    // newChild.setProperties({[nameKey]:'New Token'})
    
  }


  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === 'showToast') {
        figma.notify('Hello widget')
      }
      if (msg.type === 'close') {
        figma.closePlugin()
      }
    }
  })

  return (
    <AutoLayout
      padding={16}
      fill={'#c00'}
      onClick={addComponent}
      // onClick={AddNewInstanceOfToken}
    >
      <Text
        fontSize={24}
      >
        Open IFrame
      </Text>
    </AutoLayout>
  )
}

widget.register(Widget)
