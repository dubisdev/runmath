import { appWindow } from "@tauri-apps/api/window";

// TODO - Wait for https://github.com/tauri-apps/tauri/pull/5815 to use minimize instead of hide
export const toggleWindowVisibility = async () => {
  if (await appWindow.isVisible()) {
    await appWindow.hide();
  } else {
    await appWindow.show();
    await appWindow.setFocus();
  }
};
