import { WebviewWindow } from "@tauri-apps/api/window";

const SETTINGS_PAGE_LABEL = "settings-page";

export const createSettingsPage = () => {
  const webview = new WebviewWindow(SETTINGS_PAGE_LABEL, {
    width: 700,
    height: 400,
    resizable: false,
    title: "RunMath Settings",
    visible: false,
    url: "settings.html",
  });

  webview.once("tauri://created", () => {
    webview.show();
  });

  webview.once<"tauri://error">("tauri://error", async (e) => {
    if (e.payload.includes(` \`${SETTINGS_PAGE_LABEL}\` already exists`)) {
      await webview.unminimize();
      await webview.show();
      await webview.setFocus();
      return;
    }
    console.error(e);
  });
};
