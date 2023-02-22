import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import "./index.css";
import "@utils/getInitialPreferences";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import("@utils/configureExitOnCloseWindow");
import("@utils/configureShortcuts").then((module) =>
  module.configureShortcuts()
);
import("@utils/settingsStorage").then((module) =>
  module.startWatchingStorageEvents()
);
import("@utils/singleInstance").then((module) =>
  module.configureSingleInstance()
);
import("@utils/updateNotifier").then((module) => module.checkForUpdates());
