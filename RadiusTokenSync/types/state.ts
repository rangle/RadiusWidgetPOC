import { EventHandler } from "@create-figma-plugin/utilities";

export type WidgetConfiguration = {
  name: string;
  repository: string;
  accessToken: string;
  branch: string;
  path: string;
  error?: string;
};

export interface WidgetStateHandler extends EventHandler {
  name: "PLUGIN_STATE_CHANGE";
  handler: (state: WidgetConfiguration | null) => void;
}

export interface UiStateHandler extends EventHandler {
  name: "UI_STATE_CHANGE";
  handler: (state: WidgetConfiguration) => void;
}

export interface UiCloseHandler extends EventHandler {
  name: "UI_CLOSE";
  handler: () => void;
}
