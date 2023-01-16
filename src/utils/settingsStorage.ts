import { SettingsManager } from "tauri-settings";
import debounce from "just-debounce";
import type { PathValue } from "tauri-settings/dist/types/dot-notation";
import { emit, listen } from "@tauri-apps/api/event";
import { disable, enable } from "tauri-plugin-autostart-api";

export type Schema = {
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
  await emit("settings-reset");
};

const debouncedSave = debounce(async function <T extends keyof Schema>(
  key: T,
  value: PathValue<Schema, T>
) {
  await settingsManager.set(key, value);
  console.log(`Saved ${key} with value ${value} to settings`);
},
300);

export const startWatchingStorageEvents = () => {
  window.addEventListener("storage", async (e) => {
    switch (e.key) {
      case "background":
        document.body.style.setProperty("--bg-color", e.newValue);
        debouncedSave("background", String(e.newValue));
        break;
      case "runOnWindowsStart":
        debouncedSave("runOnWindowsStart", e.newValue === "true");
        e.newValue === "true" ? await enable() : await disable();
      default:
        break;
    }
  });

  listen("settings-reset", () => {
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "background",
        newValue: settingsManager.default.background,
      })
    );
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "runOnWindowsStart",
        newValue: String(settingsManager.default.runOnWindowsStart),
      })
    );
  });
};

export const settings = settingsManager;
