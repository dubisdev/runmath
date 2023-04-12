import { appWindow } from "@tauri-apps/api/window";
import { exit } from "@tauri-apps/api/process";

export const configureExitOnClose = () => {
  appWindow.onCloseRequested(() => {
    appWindow.close();
    exit();
  });
};
