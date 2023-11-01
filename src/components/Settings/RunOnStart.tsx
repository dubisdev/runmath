import { settings } from "@utils/settingsStorage";
import styles from "./index.module.css";
import { Checkbox } from "./Checkbox";

export const RunOnStart = () => {
  const handleChange = (newValue: boolean) => {
    settings.set("runOnWindowsStart", newValue);
  };

  const checkedState = settings.get("runOnWindowsStart") === "true";

  return (
    <Checkbox
      checked={checkedState}
      onChange={handleChange}
      className={styles.settingValue}
    />
  );
};
