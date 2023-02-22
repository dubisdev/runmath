import { HexColorPicker } from "react-colorful";
import { settings } from "@utils/settingsStorage";
import "./bgcolor.css";
import * as ls from "@utils/localStorage";

export const BGColor = () => {
  const handlePickerChange = (color: string) => {
    ls.set("background", color);
  };

  return (
    <HexColorPicker
      color={settings.getCache("background")}
      onChange={handlePickerChange}
    />
  );
};
