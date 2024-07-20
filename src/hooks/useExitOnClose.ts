import { getCurrentWindow } from "@tauri-apps/api/window";
import { exit } from "@tauri-apps/plugin-process";

/**
 * Configures the main window to exit the app when closed.
 * When the main window is closed, the app will exit. (The settings window will be forced to close)
 */
export const useExitOnClose = () => {
  const appWindow = getCurrentWindow();

  appWindow.onCloseRequested(() => {
    appWindow.close();
    exit();
  });
};
