import { h, Fragment, FunctionalComponent, render } from "preact";
import { ConfigForm } from "./components/config";

import "@create-figma-plugin/ui/css/base.css";

export const App: FunctionalComponent = () => {
  return (
    <Fragment>
      <ConfigForm />
    </Fragment>
  );
};

render(<App />, document.getElementById("root")!);
