import { useEffect, useState } from "react";

import ReactSwitch from "react-switch";

type CheckboxProps = {
  checked: boolean;
  onChange: (newValue: boolean) => any;
  className?: string;
};

export const Checkbox = (props: CheckboxProps) => {
  const { checked, onChange, className } = props;

  const [isChecked, setIsChecked] = useState(() => checked);

  useEffect(() => {
    onChange(isChecked);
  }, [isChecked]);

  const handleChange = (newValue: boolean) => {
    setIsChecked(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsChecked((prev) => !prev);
    }
  };

  return (
    <ReactSwitch
      className={className}
      checked={isChecked}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onColor="#495662"
      uncheckedIcon={false}
      checkedIcon={false}
    />
  );
};
