import { appWindow } from "@tauri-apps/api/window";

export const toggleWindowVisibility = async () => {
  if (await appWindow.isVisible()) {
    await appWindow.hide();
  } else {
    await appWindow.show();
    await appWindow.setFocus();
  }
};
