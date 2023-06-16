// This widget will open an Iframe window with buttons to show a toast message and close the window.

const { widget } = figma;
const { AutoLayout, useEffect, Text } = widget;

type Token = {
  node: string;
  key: string;
  value: string;
};

/**
 * ## iFrame demo
 * This is a demo of how to use an iFrame to open a window with buttons to show
 * a toast message and close the window, as well as populate a list of tokens
 * used by all elements on the page.
 *
 * See figma iFrame docs here (should be essentially the same for widgets vs.
 * plugins): https://www.figma.com/plugin-docs/creating-ui/
 */
function Widget() {
  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === 'showToast') {
        figma.notify('Hello widget');
      }
      if (msg.type === 'close') {
        figma.closePlugin();
      }
      if (msg.type === 'getTokens') {
        const allTokens = getAllTokens();
        figma.ui.postMessage({ type: 'tokens', tokens: allTokens });
      }
    };
  });

  /** Get all tokens used by every node on the page, including the node name */
  const getAllTokens = () => {
    const tokenList: Token[] = [];
    const allNodes = figma.currentPage.findAll();

    allNodes.forEach((node) => {
      node.getSharedPluginDataKeys('tokens').forEach((key) => {
        console.log(key);
        if (key === 'hash' || key === 'version') return;
        const tokenName = node.getSharedPluginData('tokens', key);
        if (tokenName) {
          tokenList.push({ node: node.name, key, value: tokenName });
        }
      });
    });

    return tokenList;
  };

  return (
    <AutoLayout fill="#FFF" padding={10}>
      <Text
        fontSize={24}
        onClick={
          // Use async callbacks or return a promise to keep the Iframe window
          // opened. Resolving the promise, closing the Iframe window, or calling
          // "figma.closePlugin()" will terminate the code.
          () =>
            new Promise((resolve) => {
              // note: size can be initially set, or updated later with figma.ui.resise(width, height)
              // Dynamic resizing is not native, but can maybe be implemented with some creativity.
              // https://www.figma.com/plugin-docs/api/properties/figma-showui/
              figma.showUI(__html__, {
                width: 400,
                height: 300,
              });
            })
        }
      >
        Get token info
      </Text>
    </AutoLayout>
  );
}

widget.register(Widget);
