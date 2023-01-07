import { getCurrent } from "@tauri-apps/api/window";

// TODO - Wait for https://github.com/tauri-apps/tauri/pull/5815 to use minimize instead of hide
export const toggleWindowVisibility = async () => {
  const current = getCurrent();
  if (await current.isVisible()) {
    await current.hide();
  } else {
    await current.show();
    await current.setFocus();
  }
};
