import { useState } from "react";

import ReactSwitch from "react-switch";

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
    <ReactSwitch
      className={className}
      checked={isChecked}
      onChange={toggleChecked}
      onKeyDown={handleKeyDown}
      onColor="#495662"
      uncheckedIcon={false}
      checkedIcon={false}
    />
  );
};
