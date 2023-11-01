import { disable, enable } from "tauri-plugin-autostart-api";
import * as ls from "@utils/localStorage"

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

class SettingsStorage<Schema extends Record<string, any>> {
  constructor(defaultSettings?: Schema) {
    this.default = defaultSettings || {} as Schema;
  }

  readonly default = {} as Schema;


  get<T extends keyof Schema>(key: T): string {
    if (typeof key !== "string") throw new Error("Key must be a string");
    return ls.get(key) as Schema[T] || this.default[key];
  }

  set<T extends keyof Schema>(key: T, value: Schema[T]) {
    if (typeof key === "string") {
      return ls.set(key, String(value));
    }
  }

  resetDefaults() {
    for (const key in this.default) {
      ls.set(key, this.default[key]);
    }
  }

}

const settingsManager = new SettingsStorage<Schema>(
  { runOnWindowsStart: false, background: "#a3c8ff" }, // default settings
);

export const resetSettings = async () => {
  settingsManager.resetDefaults();
};

export const startWatchingStorageEvents = () => {
  window.addEventListener("storage", async (e) => {
    switch (e.key) {
      case "background":
        document.body.style.setProperty("--bg-color", e.newValue);
        break;
      case "runOnWindowsStart":
        e.newValue === "true" ? await enable() : await disable();
      default:
        break;
    }
  });

};

export const settings = settingsManager;
