import { register, unregister, unregisterAll } from "@tauri-apps/plugin-global-shortcut";
import { listen } from "@tauri-apps/api/event";
import { exit } from "@tauri-apps/plugin-process";
import { createSettingsPage } from "./createSettingsPage";
import { toggleWindowVisibility } from "./toggleWindowView";

export const configureShortcuts = async () => {
  try {
    await unregisterAll();
  } catch { } // first time it will throw an error, so we ignore it

  listen("open-settings", () => {
    createSettingsPage();
  })

  // register global shortcuts (works even when the app is not focused)
  await register("Alt+m", toggleWindowVisibility)

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
