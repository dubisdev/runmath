import { useCalculatorStore } from "@state/calculator";
import { useHistory } from "../hooks/useHistory";
import styles from "./console.module.css";
import { InputPlaceholder } from "./InputPlaceholder";

export const ConsoleInput = () => {
  const { getHistoryActionResult, isHistoryAction } = useHistory();

  const input = useCalculatorStore((s) => s.input);
  const setInput = useCalculatorStore((s) => s.setInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isHistoryAction(e)) {
      const newInput = getHistoryActionResult(e, input);
      if (typeof newInput === "string") {
        setInput(newInput);
      }
    }
  };

  return (
    <>
      {!input && <InputPlaceholder />}
      <input
        autoFocus
        spellCheck={false}
        className={styles.consoleInput}
        value={input}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    </>
  );
};
