const { widget } = figma;
const { usePropertyMenu, useSyncedState, AutoLayout, SVG, Text } = widget;

type Token = [string, string];

function Widget() {
  /**
   * The list of tokens that are used on the selected element.
   */
  const [tokenList, setTokenList] = useSyncedState<Token[]>('tokenList', []);
  /**
   * This state is used when the tokenList needs to be updated from another
   * widget, in order for the other widget to know what element to get tokens
   * from.
   * */
  const [_, setSelection] = useSyncedState<readonly SceneNode[]>(
    'selection',
    []
  );
  /**
   * The name of the selected element.
   * TODO: support multiple selections
   * */
  const [selectionName, setSelectionName] = useSyncedState<string>(
    'selectionName',
    ''
  );

  usePropertyMenu(
    [
      {
        itemType: 'action',
        propertyName: 'updateAll',
        tooltip: 'Update All Widgets',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><rect fill="none" height="24" width="24" x="0"/></g><g><g><polygon points="7.41,13.41 6,12 2,16 6,20 7.41,18.59 5.83,17 21,17 21,15 5.83,15"/><polygon points="16.59,10.59 18,12 22,8 18,4 16.59,5.41 18.17,7 3,7 3,9 18.17,9"/></g></g></svg>
        `,
      },
    ],
    ({ propertyName }) => {
      if (propertyName === 'updateAll') {
        updateAll();
      }
    }
  );

  /**
   * Update all widgets on the page using their last selected element as the
   * source of truth.
   */
  const updateAll = () => {
    const allWidgetNodes: WidgetNode[] = figma.currentPage.findAll((node) => {
      return node.type === 'WIDGET';
    }) as WidgetNode[];

    const myWidgetNodes: WidgetNode[] = allWidgetNodes.filter((node) => {
      return node.widgetId === figma.widgetId;
    });

    myWidgetNodes.forEach((node) => {
      const nodeSelection = node.widgetSyncedState.selection;
      const tokenList = getSelectionTokens(nodeSelection);
      node.setWidgetSyncedState({ ...node.widgetSyncedState, tokenList });
    });
  };

  /**
   * Get the tokens used on the selected element.
   */
  const getSelectionTokens = (selection: readonly SceneNode[]) => {
    const tokenList: Token[] = [];

    // if selection is coming from state, it will only be an array of objects
    // containing IDs, so we need to get the actual nodes.
    const selectedNodes: SceneNode[] = figma.currentPage
      .findAll()
      .filter((node) => {
        // note: multiple selections are not supported yet
        return node.id === selection[0].id;
      });

    // get all the tokens that are used on the selected element and add them to
    // the tokenList array
    selectedNodes.forEach((node) => {
      node.getSharedPluginDataKeys('tokens').forEach((key) => {
        if (key === 'hash' || key === 'version') return;
        const tokenName = node.getSharedPluginData('tokens', key);
        if (tokenName) {
          tokenList.push([key, tokenName]);
        }
      });
    });
    return tokenList;
  };

  return (
    <AutoLayout fill={'#C4C4C4'} direction="vertical" spacing={8} padding={16}>
      <AutoLayout spacing="auto" width="fill-parent">
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
          onClick={() => {
            const selection = figma.currentPage.selection;
            setSelection(selection);
            // set the name of the selected element for use in the UI
            // note: multiple selections are not supported yet
            setSelectionName(selection[0].name);
            const tokenList = getSelectionTokens(selection);
            setTokenList(tokenList);
          }}
        ></SVG>
        <Text fontSize={16} width="hug-contents">
          {selectionName}
        </Text>
      </AutoLayout>

      {tokenList.map((token) => {
        return (
          <Text fontSize={16} width="hug-contents" key={token[0]}>
            {token[0]}: {token[1]}
          </Text>
        );
      })}
    </AutoLayout>
  );
}

widget.register(Widget);
