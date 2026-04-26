import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { getMatches } from "@tauri-apps/plugin-cli";
import { getCurrentWindow } from "@tauri-apps/api/window";
import "./index.css";

// Start hidden if the arg is present (e.g. when the auto-launcher starts the app)
getMatches().then((matches) => {
  const shouldHide = matches.args["start-hidden"].value
  if (shouldHide) {
    getCurrentWindow().hide();
  }
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import("@utils/configureShortcuts").then((module) =>
  module.configureShortcuts()
);
import("@utils/singleInstance").then((module) =>
  module.configureSingleInstance()
);
import("@utils/updateNotifier").then((module) => module.checkForUpdates());
