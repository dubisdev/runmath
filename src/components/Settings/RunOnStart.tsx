import { settings } from "@utils/settingsStorage";
import styles from "./index.module.css";
import * as ls from "@utils/localStorage";
import { Checkbox } from "./Checkbox";

export const RunOnStart = () => {
  const handleChange = (newValue: boolean) => {
    ls.set("runOnWindowsStart", newValue);
  };

  return (
    <Checkbox
      checked={settings.getCache("runOnWindowsStart")}
      onChange={handleChange}
      className={styles.settingValue}
    />
  );
};
