import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { toggleWindowVisibility } from "./toggleWindowView";

export const configureShortcuts = () => {
  unregisterAll();
  // register a global shortcut
  register("Alt+m", () => {
    toggleWindowVisibility();
  });

  // register a shortcut but only when the window is focused
  window.addEventListener("keydown" as any, (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      window.dispatchEvent(new Event("copy-to-clipboard"));
    }
  });
};
