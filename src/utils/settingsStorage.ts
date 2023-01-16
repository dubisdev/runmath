import { SettingsManager } from "tauri-settings";
import debounce from "just-debounce";

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

// creates or loads the settings file
await settingsManager.initialize();

export const resetSettings = async () => {
  settingsManager.settings = settingsManager.default;
  await settingsManager.syncCache();
};

const debouncedSave = debounce(async (key: keyof Schema, value: any) => {
  await settingsManager.set(key, value);
  console.info(`Saved ${key} with value ${value} to settings`);
}, 1000);

window.addEventListener("storage", (e) => {
  switch (e.key) {
    case "background":
      document.body.style.setProperty("--bg-color", e.newValue);
      debouncedSave("background", e.newValue);
      break;
    default:
      break;
  }
});

export const settings = settingsManager;
