import React from "react";
import { createRoot } from "react-dom/client";
import { Settings } from "@components/Settings";

const root = createRoot(document.getElementById("root")!)
root.render(
  <React.StrictMode>
    <Settings />
  </React.StrictMode>
);
