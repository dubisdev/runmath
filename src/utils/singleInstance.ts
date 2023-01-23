import { listen } from "@tauri-apps/api/event";
import { getCurrent } from "@tauri-apps/api/window";

export const configureSingleInstance = async () => {
  await listen("single-instance", async () => {
    const win = getCurrent();
    await win.show();
    await win.unminimize();
    await win.setFocus();
  });
};
