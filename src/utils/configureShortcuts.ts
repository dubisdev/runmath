import { register, unregister } from "@tauri-apps/plugin-global-shortcut";
import { listen } from "@tauri-apps/api/event";
import { exit } from "@tauri-apps/plugin-process";
import { open } from "@tauri-apps/plugin-shell";
import { createSettingsPage } from "./createSettingsPage";
import { toggleWindowVisibility } from "./toggleWindowView";
import { RELEASE_URL } from "./updateNotifier";

export const configureShortcuts = async () => {
  try {
    await unregister("Alt+m");
  } catch {} // first time it will throw an error, so we ignore it

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

    if (isUpdateCommand(e)) {
      await open(RELEASE_URL)
      toggleWindowVisibility();
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
const isUpdateCommand = (e: KeyboardEvent) => e.key === "u" && e.altKey;
