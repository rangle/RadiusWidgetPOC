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
export const NodeTokens = ({
  usage,
  inspect,
}: {
  usage: ComponentUsage | undefined;
  inspect: () => void;
}) => {
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
      <WidgetHeader inspect={inspect} />
      <ComponentDocs usage={usage} />
    </AutoLayout>
  );
};

export function Widget() {
  const [node, setNode] = useSyncedState<ComponentUsage | undefined>(
    "nodes",
    undefined
  );
  return (
    <NodeTokens
      usage={node}
      inspect={() => {
        getSelectedNode().then((node) => setNode(node));
      }}
    />
  );
}

widget.register(Widget);
