const { widget } = figma;
const { AutoLayout, useSyncedState } = widget;
import { getTokenStudioTokens } from "./token-studio";
import { getLocalVariable } from "./local-variable";

import { ComponentUsage } from "./common/token.types";

import { WidgetHeader, ComponentDocs } from "./token-list";

const combineComponentUsage = (
  a: ComponentUsage,
  b: ComponentUsage
): ComponentUsage => {
  return {
    id: a.id,
    name: a.name,
    props: [...a.props, ...b.props],
    children: a.children.map((ac, index) =>
      combineComponentUsage(ac, b.children[index])
    ),
  };
};

// get the selected node from the figma API and return it
export const getSelectedNode = async () => {
  const selectedNode = figma.currentPage.selection[0];
  if (!selectedNode) {
    console.log("No node selected");
    throw new Error("no node selected");
  }

  const tokenStudioValues = getTokenStudioTokens(selectedNode);
  const localVariableUsage = await getLocalVariable(selectedNode);
  const node: ComponentUsage = combineComponentUsage(
    localVariableUsage,
    tokenStudioValues
  );

  return node;
};

type NodeTokensProps = {
  usage: ComponentUsage | undefined;
  inspect: () => void;
  isDeleted: (id: string) => boolean;
  resetComponents: () => void;
  deleteComponent: (id: string) => void;
};

export const NodeTokens = ({
  usage,
  inspect,
  isDeleted,
  deleteComponent,
  resetComponents,
}: NodeTokensProps) => {
  return (
    <AutoLayout
      name="WidgetFrame"
      effect={{
        type: "drop-shadow",
        color: "#00000040",
        offset: {
          x: 0,
          y: 4,
        },
        blur: 4,
        showShadowBehindNode: false,
      }}
      fill="#F6F6F6"
      stroke="#858585"
      cornerRadius={6}
      direction="vertical"
      spacing={6}
      padding={12}
    >
      <WidgetHeader
        node={usage}
        addComponent={inspect}
        resetComponents={() => resetComponents()}
      />
      <ComponentDocs
        usage={usage}
        deleteComponent={deleteComponent}
        isDeleted={isDeleted}
      />
    </AutoLayout>
  );
};

export function Widget() {
  const [node, setNode] = useSyncedState<ComponentUsage | undefined>(
    "nodes",
    undefined
  );
  const [deleted, setDeleted] = useSyncedState<string[]>("deletedNodes", []);
  return (
    <NodeTokens
      usage={node}
      inspect={() => {
        getSelectedNode().then((node) => setNode(node));
      }}
      isDeleted={(id: string) => deleted.indexOf(id) !== -1}
      deleteComponent={(id: string) => {
        if (deleted.indexOf(id) === -1) setDeleted([...deleted, id]);
      }}
      resetComponents={() => {
        setNode(undefined);
        setDeleted([]);
      }}
    />
  );
}

widget.register(Widget);
