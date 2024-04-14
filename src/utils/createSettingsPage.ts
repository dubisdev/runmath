import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

const SETTINGS_PAGE_LABEL = "settings-page";

export const createSettingsPage = () => {
  const settingsPage = new WebviewWindow(SETTINGS_PAGE_LABEL, {
    url: "./settings.html",
    alwaysOnTop: true,
    height: 600,
    resizable: false,
    title: "RunMath Settings",
    visible: false,
    width: 700,
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
