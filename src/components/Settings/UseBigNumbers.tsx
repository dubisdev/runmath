import styles from "./index.module.css";
import { Checkbox } from "./Checkbox";
import { useSettingsStore } from "@state/settings";

export const UseBigNumbers = () => {
  const useBigNumbers = useSettingsStore(s => s.useBigNumbers);
  const setUseBigNumbers = useSettingsStore(s => s.setUseBigNumbers);

  const handleChange = (newValue: boolean) => {
    setUseBigNumbers(newValue);
  };

  return (
    <Checkbox
      checked={useBigNumbers}
      onChange={handleChange}
      className={styles.settingValue}
    />
  );
};
