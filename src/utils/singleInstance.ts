import { listen } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";

export const configureSingleInstance = async () => {
  await listen("single-instance", async () => {
    await appWindow.show();
    await appWindow.unminimize();
    await appWindow.setFocus();
  });
};
