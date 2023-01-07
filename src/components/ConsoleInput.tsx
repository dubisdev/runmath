import { useCalculatorStore } from "../state/calculator";

export const ConsoleInput = () => {
  const [input, setInput] = useCalculatorStore((s) => [s.input, s.setInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <input
      id="console-input"
      autoFocus
      type="text"
      placeholder="Do math here!"
      value={input}
      onChange={handleInputChange}
      style={{
        height: "100%",
        fontSize: "xx-large",
        position: "relative",
        display: "block",
        width: "100%",
        outline: "none",
        border: "none",
        zIndex: 1,
      }}
    />
  );
};
