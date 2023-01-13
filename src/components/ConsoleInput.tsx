import { useCalculatorStore } from "@state/calculator";
import styles from "./console.module.css";

const dateAsSum = new Date().toLocaleDateString().split("/").join("+");

export const ConsoleInput = () => {
  const [input, setInput] = useCalculatorStore((s) => [s.input, s.setInput]);

  return (
    <input
      autoFocus
      className={styles.consoleInput}
      placeholder={dateAsSum}
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};
