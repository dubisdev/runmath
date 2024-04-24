import { listen } from "@tauri-apps/api/event";
import { getCurrent } from "@tauri-apps/api/window";

export const configureSingleInstance = async () => {
  await listen("single-instance", async () => {
    const appWindow = getCurrent();
    await appWindow.show();
    await appWindow.unminimize();
    await appWindow.setFocus();
  });
};
