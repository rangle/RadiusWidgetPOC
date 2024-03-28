import { EmptyPage } from "./ui/pages/empty-page";

const { widget } = figma;
const { AutoLayout, useSyncedState } = widget;

export type WidgetConfiguration = {
  name: string;
  repository: string;
  accessToken: string;
  branch: string;
  path: string;
};

export type LoadedTokens = {
  inspectedAt: string;
  collections: VariableCollection[];
};

export function Widget() {
  const [synchDetails, setSynchDetails] = useSyncedState<string | null>(
    "synchDetails",
    null
  );
  const [allTokens, setAllTokens] = useSyncedState<LoadedTokens | null>(
    "allGlobalTokens",
    null
  );

  return (
    <EmptyPage
      openConfig={() =>
        new Promise((_res) => figma.showUI(__html__, { title: "This is it" }))
      }
    />
  );
}

widget.register(Widget);

function strNow() {
  const d = new Date();
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}
