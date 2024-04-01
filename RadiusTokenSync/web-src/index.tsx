import { h, Fragment, FunctionalComponent, render } from "preact";
import { ConfigForm } from "./components/config";

import { useEffect, useState } from "preact/hooks";
import { emit, on, EventHandler } from "@create-figma-plugin/utilities";

import "@create-figma-plugin/ui/css/base.css";
import {
  UiStateHandler,
  WidgetConfiguration,
  WidgetStateHandler,
} from "../types/state";

const initialState: WidgetConfiguration = {
  name: "",
  repository: "",
  accessToken: "",
  branch: "",
  path: "",
};

export const App: FunctionalComponent = () => {
  const [state, setState] = useState<WidgetConfiguration>(initialState);
  useEffect(() => {
    on<WidgetStateHandler>("PLUGIN_STATE_CHANGE", (state) => {
      console.log("WEB: STATE CHANGE", state);
      setState(state ?? initialState);
    });
  }, []);

  const updateState = (newState: WidgetConfiguration) => {
    console.log("SENDING UI_STATE_CHANGE");
    emit<UiStateHandler>("UI_STATE_CHANGE", newState);
  };

  return (
    <Fragment>
      <ConfigForm state={state} updateState={updateState} />
    </Fragment>
  );
};

render(<App />, document.getElementById("root")!);
