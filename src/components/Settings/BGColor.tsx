import { settings } from "@utils/settingsStorage";
import styles from "./index.module.css";

export const BGColor = () => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("background", event.target.value);
  };

  return (
    <input
      type="color"
      defaultValue={settings.getCache("background")}
      onChange={handleChange}
      className={styles.settingValue}
    />
  );
};
