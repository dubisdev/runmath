import { getCurrent } from "@tauri-apps/api/window";
import { exit } from "@tauri-apps/api/process";

export const configureExitOnClose = () => {
  const currentWin = getCurrent();
  currentWin.onCloseRequested(() => {
    currentWin.close();
    exit();
  });
};
