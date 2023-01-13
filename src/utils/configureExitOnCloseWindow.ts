import { getCurrent } from "@tauri-apps/api/window";
import { exit } from "@tauri-apps/api/process";

const currentWin = getCurrent();
currentWin.onCloseRequested(() => {
  currentWin.close();
  exit();
});
