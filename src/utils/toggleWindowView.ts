import { getCurrentWindow } from "@tauri-apps/api/window";

export const toggleWindowVisibility = async () => {
  const appWindow = getCurrentWindow();

  if (await appWindow.isVisible()) {
    await appWindow.hide();
  } else {
    await appWindow.show();
    await appWindow.setFocus();
  }
};
