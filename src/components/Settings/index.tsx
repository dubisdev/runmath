// import { Checkbox } from "./Checkbox";
import styles from "./index.module.css";
import { settings, resetSettings } from "@utils/configureSettingsStorage";

const SETTINGS = [
  // {
  //   name: "Start RunMath on Windows Start",
  //   description:
  //     "RunMath will start automatically when you turn on your computer",
  //   SettingElement: () => (
  //     <Checkbox
  //       checked={settings.getCache("runOnWindowsStart")}
  //       onChange={(newValue) =>
  //         settings.setCache("runOnWindowsStart", newValue)
  //       }
  //       className={styles.settingValue}
  //     />
  //   ),
  // },
  {
    name: "Background Color",
    description: "Change the background color of the app",
    SettingElement: () => (
      <input
        type="color"
        defaultValue={settings.getCache("background")}
        onChange={(event) =>
          settings.setCache("background", event.target.value)
        }
        className={styles.settingValue}
      />
    ),
  },
] as const;

export const Settings = () => {
  const handleResetSettings = async () => {
    await resetSettings();
    window.location.reload();
  };

  const handleSaveSettings = async () => {
    await settings.syncCache();
    import("@tauri-apps/api/window").then((module) =>
      module.getCurrent().close()
    );
  };

  return (
    <div className={styles.settingsContainer}>
      <h1>Settings</h1>

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
        <button className={styles.save} onClick={handleSaveSettings}>
          Save Settings
        </button>
        <button className={styles.reset} onClick={handleResetSettings}>
          Reset Settings
        </button>
      </section>
    </div>
  );
};
