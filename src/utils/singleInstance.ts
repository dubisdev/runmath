import { listen } from "@tauri-apps/api/event";
import { getCurrentWindow } from "@tauri-apps/api/window";

export const configureSingleInstance = async () => {
  await listen("single-instance", async () => {
    const appWindow = getCurrentWindow();
    await appWindow.show();
    await appWindow.unminimize();
    await appWindow.setFocus();
  });
};
