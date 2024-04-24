import { getCurrent } from "@tauri-apps/api/window";

export const toggleWindowVisibility = async () => {
  const appWindow = getCurrent();

  if (await appWindow.isVisible()) {
    await appWindow.hide();
  } else {
    await appWindow.show();
    await appWindow.setFocus();
  }
};
