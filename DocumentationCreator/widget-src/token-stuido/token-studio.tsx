


export function getTokenStudioTokens(node: SceneNode) {
  const tokens: Token[] = []
  const sharedTokens = node.getSharedPluginDataKeys('tokens');
  if (sharedTokens.length > 0) {
    sharedTokens.forEach((token) => {
      if (token === 'version') return;
      const value = node.getSharedPluginData('tokens', token);
      tokens.push({
        name: token,
        value: value,
        from: 'Token Studio'
      })
    });
  }
  return tokens
}

