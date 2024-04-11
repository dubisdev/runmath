import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { getMatches } from "@tauri-apps/plugin-cli";
import { getCurrent } from "@tauri-apps/api/window";
import "./index.css";

// Start hidden if the arg is present (e.g. when the auto-launcher starts the app)
getMatches().then((matches) => {
  const shouldHide = matches.args.hidden.value
  if (shouldHide) {
    getCurrent().hide();
  }
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import("@utils/configureShortcuts").then((module) =>
  module.configureShortcuts()
);
import("@utils/singleInstance").then((module) =>
  module.configureSingleInstance()
);
import("@utils/updateNotifier").then((module) => module.checkForUpdates());
