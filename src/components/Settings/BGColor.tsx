import { HexColorPicker } from "react-colorful";
import { settings } from "@utils/settingsStorage";
import "./bgcolor.css";

export const BGColor = () => {
  const handlePickerChange = (color: string) => {
    settings.set("background", color);
  };

  return (
    <HexColorPicker
      color={settings.get("background")}
      onChange={handlePickerChange}
    />
  );
};
