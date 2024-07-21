import { listen } from "@tauri-apps/api/event";
import { exit } from "@tauri-apps/plugin-process";
import { createSettingsPage } from "./createSettingsPage";

export const configureShortcuts = async () => {
  listen("open-settings", () => {
    createSettingsPage();
  })

  // register shortcuts when the window is focused
  window.addEventListener("keydown", async (e) => {
    if (isExitCommand(e)) {
      await exit();
    }

    if (isCopyCommand(e)) {
      window.dispatchEvent(new Event("copy-to-clipboard"));
    }

    if (isSettingsCommand(e)) {
      createSettingsPage();
    }

  });

  // prevent context menu from opening
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
};

const isExitCommand = (e: KeyboardEvent) => e.key === "q" && e.altKey;
const isCopyCommand = (e: KeyboardEvent) => e.key === "Enter";
const isSettingsCommand = (e: KeyboardEvent) => e.key === "s" && e.altKey;
