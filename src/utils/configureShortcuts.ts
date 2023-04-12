import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { exit } from "@tauri-apps/api/process";
import { open } from "@tauri-apps/api/shell";
import { createSettingsPage } from "./settingsPageLauncher";
import { toggleWindowVisibility } from "./toggleWindowView";
import { RELEASE_URL } from "./updateNotifier";

export const configureShortcuts = () => {
  unregisterAll();

  // register global shortcuts (works even when the app is not focused)
  register("Alt+m", toggleWindowVisibility);

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
};

const isExitCommand = (e: KeyboardEvent) => e.key === "q" && e.altKey;
const isCopyCommand = (e: KeyboardEvent) => e.key === "Enter";
const isSettingsCommand = (e: KeyboardEvent) => e.key === "s" && e.altKey;
const isUpdateCommand = (e: KeyboardEvent) => e.key === "u" && e.altKey;
