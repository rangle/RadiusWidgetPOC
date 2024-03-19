

type Variable = {
  name: string;
  value?: VariableValue;
  alias?: string;
};

type Mode = {
  name: string;
  variables: Variable[];
};

type Collection = {
  name: string;
  modes: Mode[];
};

// type guard for VariableValue is alias
function isVariableAlias(value: VariableValue): value is VariableAlias {
  if (typeof value !== 'object') return false;
  return (value as VariableAlias).type === 'VARIABLE_ALIAS';
}


export async function getAllLocalVariableTokens() {
  const variableCollections = await figma.variables.getLocalVariableCollectionsAsync();
  const collections = [] as Collection[];

  // iterate through all the collections
  for (let x = 0; x < variableCollections.length; x++) {
    const collection = variableCollections[x];

    // setup modes objects
    const modes = {} as { [key: string]: Mode };
    for (let j = 0; j < collection.modes.length; j++) {
      modes[collection.modes[j].modeId] = {
        name: collection.modes[j].name,
        variables: []
      };
    }


    // through all the variables
    for (let i = 0; i < collection.variableIds.length; i++) {
      const variableId = collection.variableIds[i];
      const variable = await figma.variables.getVariableByIdAsync(variableId)

      // get the variable for each modes
      for (let j = 0; j < collection.modes.length; j++) {
        const mode = collection.modes[j];
        const value = variable?.valuesByMode[mode.modeId];
        if (!value) continue;

        // if it's a variable id, we need to find the name of it
        if (isVariableAlias(value)) {
          const alias = await figma.variables.getVariableByIdAsync(value.id);
          if (!alias) continue;
          modes[mode.modeId].variables.push({
            name: variable.name,
            alias: alias.name
          });
        } else {
          // not a variable alias
          modes[mode.modeId].variables.push({
            name: variable.name,
            value: value
          })
        }
      }
    }

    // push the collection to the collections array
    collections.push({
      name: collection.name,
      modes: Object.values(modes)
    });
  }
  return collections;
}