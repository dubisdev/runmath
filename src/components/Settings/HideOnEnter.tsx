import styles from "./index.module.css";
import { Checkbox } from "./Checkbox";
import { useSettingsStore } from "@state/settings";

export const HideOnEnter = () => {
  const hideOnEnter = useSettingsStore(s => s.hideOnEnter);
  const setHideOnEnter = useSettingsStore(s => s.setHideOnEnter);

  const handleChange = (newValue: boolean) => {
    setHideOnEnter(newValue);
  };

  return (
    <Checkbox
      checked={hideOnEnter}
      onChange={handleChange}
      className={styles.settingValue}
    />
  );
};
