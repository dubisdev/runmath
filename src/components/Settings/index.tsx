import styles from "./index.module.css";
import { useSettingsStore } from "@state/settings";
import { BGColor } from "./BGColor";
import { RunOnStart } from "./RunOnStart";
import { UseBigNumbers } from "./UseBigNumbers";
import { FormatSelector } from "./FormatSelector";
import { HideOnEnter } from "./HideOnEnter";

const SETTINGS = [
  {
    name: "Use Big Numbers",
    description:
      "Add support for big numbers (numbers with more than 16 digits). This will make the app slower, so it's recommended to turn it off if you don't need it.",
    SettingElement: UseBigNumbers,
  },

  {
    name: "Output Format",
    description: `Auto (Default): RunMath will try to adjust the output for you.
    Fixed: fixed notation.
    Exponential: Scientific notation.
    Engineering: Scientific notation with multiples of 3.`,
    SettingElement: FormatSelector,
  },

  {
    name: "Background Color",
    description: "Change the background color of the app",
    SettingElement: BGColor,
  },
  {
    name: "Hide RunMath on enter",
    description: "After the result is calculated, RunMath will copy the result to the clipboard and hide the window.",
    SettingElement: HideOnEnter,
  },
  {
    name: "Start RunMath on Windows Start",
    description:
      "RunMath will start automatically when you turn on your computer",
    SettingElement: RunOnStart,
  },
] as const;

export const Settings = () => {
  const resetSettings = useSettingsStore((s) => s.reset);

  const handleResetSettings = () => {
    resetSettings();
  };

  const handleExitSettings = () => {
    import("@tauri-apps/api/window").then((module) =>
      module.getCurrentWindow().close()
    );
  };

  return (
    <div className={styles.settingsContainer}>
      <h1>⚙️ RunMath Settings</h1>

      {SETTINGS.map(({ SettingElement, description, name }) => (
        <label className={styles.settingItem} key={name}>
          <section className={styles.settingTextZone}>
            <header className={styles.settingTitle}>{name}</header>
            <span className={styles.settingDescription}>{description}</span>
          </section>

          <SettingElement />
        </label>
      ))}

      <section className={styles.buttonarea}>
        <button className={styles.save} onClick={handleExitSettings}>
          Exit Settings
        </button>
        <button className={styles.reset} onClick={handleResetSettings}>
          Reset Settings
        </button>
      </section>
    </div>
  );
};
