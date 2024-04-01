import { useEffect } from "preact/hooks";
import { EmptyPage } from "./ui/pages/empty-page";
import { emit, on } from "@create-figma-plugin/utilities";
import {
  UiCloseHandler,
  UiStateHandler,
  WidgetConfiguration,
  WidgetStateHandler,
} from "../types/state";
import {
  RepositoryTokenLayers,
  fetchRepositoryTokenLayers,
} from "./services/load-github.services";

const { widget } = figma;
const { AutoLayout, useSyncedState, Text } = widget;

export type LoadedTokens = {
  inspectedAt: string;
  collections: VariableCollection[];
};

export const isValidConfiguration = (
  u: WidgetConfiguration | unknown
): u is WidgetConfiguration => {
  return !!u;
};

export function Widget() {
  const [synchConfiguration, setSynchConfiguration] =
    useSyncedState<WidgetConfiguration | null>("synchedState", null);
  const [errorMessage, setErrorMessage] = useSyncedState<string | null>(
    "errorState",
    null
  );
  const [lastLoaded, setLastLoaded] = useSyncedState<string | null>(
    "lastLoaded",
    null
  );
  const [synchDetails, setSynchDetails] =
    useSyncedState<RepositoryTokenLayers | null>("synchDetails", null);
  const [allTokens, setAllTokens] = useSyncedState<LoadedTokens | null>(
    "allGlobalTokens",
    null
  );

  return (
    <EmptyPage
      loaded={synchConfiguration !== null}
      error={errorMessage}
      lastLoaded={lastLoaded}
      name={synchConfiguration ? synchConfiguration.name : ""}
      synchDetails={synchDetails}
      openConfig={openConfiguration(synchConfiguration, setSynchConfiguration)}
      synchronize={async () => {
        console.log("synchronizing...");
        if (!isValidConfiguration(synchConfiguration)) {
          setErrorMessage("Invalid Github configuration");
          return;
        }

        console.log("1");
        // setSynchDetails(null);
        // setErrorMessage(null);
        // setLastLoaded(null);
        console.log("2");

        await fetchRepositoryTokenLayers({
          credentials: {
            accessToken: synchConfiguration.accessToken,
            repoFullName: synchConfiguration?.repository,
          },
          branch: synchConfiguration.branch,
          tokenFilePath: synchConfiguration.path,
        })
          .then((details) => {
            console.log("synchronizing...DONE!");
            setLastLoaded(new Date().toISOString());
            return setSynchDetails(details);
          })
          .catch((e: unknown) => {
            console.error(e);
          });
      }}
    />
  );
}

widget.register(Widget);

function openConfiguration(
  synchConfiguration: WidgetConfiguration | null,
  setSynchConfiguration: (newValue: WidgetConfiguration | null) => void
): () => void {
  return () =>
    new Promise((resolve) => {
      figma.showUI(__html__, {
        title: "Configure Token Export",
        height: 400,
      });
      emit<WidgetStateHandler>("PLUGIN_STATE_CHANGE", synchConfiguration);
      on<UiStateHandler>("UI_STATE_CHANGE", (msg) => {
        setSynchConfiguration(msg);
        resolve("close");
      });
      on<UiCloseHandler>("UI_CLOSE", () => {
        resolve("close");
      });
    });
}

function strNow() {
  const d = new Date();
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}
