const { widget } = figma;
const { Frame, usePropertyMenu, useSyncedState, AutoLayout, SVG, Text } =
  widget;

type Token = [string, string][];

function Widget() {
  const [tokenList, setTokenList] = useSyncedState<Token>('tokenList', []);
  // usePropertyMenu(
  //   [
  //     {
  //       itemType: 'action',
  //       propertyName: 'getSelectionTokens',
  //       tooltip: 'Get Selection Tokens',
  //       icon: `<svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           height="24px"
  //           viewBox="0 0 24 24"
  //           width="24px"
  //           fill="#FFFFFF"
  //         >
  //           <g fill="none">
  //             <path d="M0 0h24v24H0V0z" />
  //             <path d="M0 0h24v24H0V0z" opacity=".87" />
  //           </g>
  //           <path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3zM21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z" />
  //         </svg>
  //       `,
  //     },
  //   ],
  //   ({ propertyName }) => {
  //     if (propertyName === 'getSelectionTokens') {
  //       getSelectionTokens();
  //     }
  //   }
  // );

  const getSelectionTokens = () => {
    // console.log('getSelectionTokens');
    const selection = figma.currentPage.selection;
    // console.log(selection);
    const newTokenList: Token = [];
    selection.forEach((node) => {
      // console.log(node);
      // console.log(node.getSharedPluginDataKeys('tokens'));
      node.getSharedPluginDataKeys('tokens').forEach((key) => {
        // console.log(key);
        if (key === 'hash' || key === 'version') return;
        const tokenName = node.getSharedPluginData('tokens', key);
        console.log({ key, tokenName });
        if (tokenName) {
          newTokenList.push([key, tokenName]);
        }
      });
    });
    console.log(newTokenList);
    setTokenList(newTokenList);
  };

  return (
    <AutoLayout
      fill={'#C4C4C4'}
      direction="vertical"
      // verticalAlignItems={'center'}
      spacing={8}
      padding={16}
      // cornerRadius={8}
      // fill={'#FFFFFF'}
      // stroke={'#E6E6E6'}
    >
      <SVG
        src={`<svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g fill="none">
              <path d="M0 0h24v24H0V0z" />
              <path d="M0 0h24v24H0V0z" opacity=".87" />
            </g>
            <path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3zM21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z" />
          </svg>`}
        onClick={getSelectionTokens}
      ></SVG>
      {/* temporarily rendering just the first 2 tokens for testing */}
      {tokenList[0] && (
        <Text fontSize={16} width="hug-contents">
          {tokenList[0][0]}: {tokenList[0][1]}
        </Text>
      )}
      {tokenList[1] && (
        <Text fontSize={16} width="hug-contents">
          {tokenList[1][0]}: {tokenList[1][1]}
        </Text>
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
