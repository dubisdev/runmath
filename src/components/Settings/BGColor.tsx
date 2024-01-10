import { HexColorPicker } from "react-colorful";
import "./bgcolor.css";
import { useSettingsStore } from "@state/settings";

export const BGColor = () => {
  const [backgroundColor, setBackgroundColor] = useSettingsStore(s => [s.backgroundColor, s.setBackgrounColor]);

  const handlePickerChange = (color: string) => {
    setBackgroundColor(color);
  };

  return (
    <HexColorPicker
      color={backgroundColor}
      onChange={handlePickerChange}
    />
  );
};
