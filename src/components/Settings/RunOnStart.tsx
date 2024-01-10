import styles from "./index.module.css";
import { Checkbox } from "./Checkbox";
import { useSettingsStore } from "@state/settings";

export const RunOnStart = () => {
  const runOnWindowsStart = useSettingsStore(s => s.runOnWindowsStart);
  const setRunOnStart = useSettingsStore(s => s.setRunOnWindowsStart);

  const handleChange = (newValue: boolean) => {
    setRunOnStart(newValue);
  };

  return (
    <Checkbox
      checked={runOnWindowsStart}
      onChange={handleChange}
      className={styles.settingValue}
    />
  );
};
