import { Webview } from "@tauri-apps/api/webview";
import { Window } from "@tauri-apps/api/window";

const SETTINGS_PAGE_LABEL = "settings-page";

export const createSettingsPage = () => {
  const settingsPage = new Window(SETTINGS_PAGE_LABEL, {
    alwaysOnTop: true,
    height: 600,
    resizable: false,
    title: "RunMath Settings",
    visible: false,
    width: 700,
  });

  const settingsWebview = new Webview(settingsPage, "settings", {
    url: "settings.html",
    height: 600,
    width: 700,
    x: 0,
    y: 0,
  });


  settingsPage.once("tauri://created", () => {
    settingsPage.show();
  });

  settingsPage.once<"tauri://error">("tauri://error", async (e) => {
    if (e.payload.includes(` \`${SETTINGS_PAGE_LABEL}\` already exists`)) {
      await settingsPage.unminimize();
      await settingsPage.show();
      await settingsPage.setFocus();
      return;
    }
    console.error(e);
  });
};
