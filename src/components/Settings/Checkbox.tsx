import ReactSwitch from "react-switch";

type CheckboxProps = {
  checked: boolean;
  onChange: (newValue: boolean) => any;
  className?: string;
};

export const Checkbox = (props: CheckboxProps) => {
  const { checked, onChange, className } = props;

  const handleChange = (newValue: boolean) => {
    onChange(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onChange(!checked);
    }
  };

  return (
    <ReactSwitch
      className={className}
      checked={checked}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onColor="#495662"
      uncheckedIcon={false}
      checkedIcon={false}
    />
  );
};
