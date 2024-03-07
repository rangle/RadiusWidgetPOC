
// type BoundVariables = SliceNode['boundVariables'];
type KeysOfBoundVariables = SceneNode['boundVariables'] extends infer BV
  ? BV extends Record<string, object>
  ? keyof BV
  : never
  : never;


export async function getLocalVariable(node: SceneNode) {
  const tokens: Token[] = [];
  if (!node) return tokens;

  const variables = node?.boundVariables;
  if (!variables) return tokens;

  // for each key in variables we need to make a async query to get the current value of the variable
  await Promise.all((Object.keys(variables) as KeysOfBoundVariables[]).map(async (key) => {
    const variableValue = variables[key];
    if (!variableValue) return;
    if (Array.isArray(variableValue)) {
      // for each item in the array get the get variable by id
      await Promise.all(variableValue.map(async (variable) => {
        const value = await figma.variables.getVariableByIdAsync(variable.id);
        if (value) {
          tokens.push({
            name: key,
            value: value.name,
            from: 'Local Variable'
          })
        }
      }));
    } else if (typeof variableValue.id === "string") {
      const value = await figma.variables.getVariableByIdAsync(variableValue.id);
      if (value) {
        tokens.push({
          name: key,
          value: value.name,
          from: 'Local Variable'
        })
      }
    }
  }));

  return tokens;
}