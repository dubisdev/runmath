import { useState } from "react";

type CheckboxProps = {
  checked: boolean;
  onChange: (newValue: boolean) => any;
  className?: string;
};

export const Checkbox = (props: CheckboxProps) => {
  const { checked, onChange, className } = props;

  const [isChecked, setIsChecked] = useState(() => checked);

  const toggleChecked = () => {
    setIsChecked((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      toggleChecked();
      onChange(!isChecked);
    }
  };

  return (
    <input
      style={{
        accentColor: "white",
        width: "30%",
        height: "1.25rem",
      }}
      type="checkbox"
      checked={isChecked}
      onChange={(e) => onChange(e.target.checked)}
      className={className}
      onKeyDown={handleKeyDown}
      onInput={toggleChecked}
    />
  );
};
