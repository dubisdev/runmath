import { SettingsManager } from "tauri-settings";
import { watch } from "tauri-plugin-fs-watch-api";

type Schema = {
  /**
   * A string that can contain a css color name or a hex color code
   */
  background: string;
  /**
   * Whether the app should run on windows start
   */
  runOnWindowsStart: boolean;
};

const settingsManager = new SettingsManager<Schema>(
  { runOnWindowsStart: false, background: "#a3c8ff" }, // default settings
  { prettify: true }
);

// checks whether the settings file exists and created it if not
// loads the settings if it exists
await settingsManager.initialize();

export const resetSettings = async () => {
  settingsManager.settings = settingsManager.default;
  await settings.syncCache();
};

// watch the settings file for changes
watch(settingsManager.path, {}, () => {
  window.dispatchEvent(new CustomEvent("settings-changed"));
});

export const settings = settingsManager;
