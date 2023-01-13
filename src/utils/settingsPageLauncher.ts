import { WebviewWindow } from "@tauri-apps/api/window";
import { TauriEvent } from "@tauri-apps/api/event";

export const createSettingsPage = () => {
  const webview = new WebviewWindow("settings-page", {
    title: "RunMath Settings",
    visible: false,
    url: "settings.html",
  });

  webview.once(TauriEvent.WINDOW_CREATED, () => {
    webview.show();
  });

  webview.once<"tauri://error">("tauri://error", async (e) => {
    if (e.payload.includes("`settings-page` already exists")) {
      await webview.unminimize();
      await webview.show();
      await webview.setFocus();
      return;
    }
    console.error(e);
  });
};
