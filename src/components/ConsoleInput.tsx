import { useCalculatorStore } from "../state/calculator";
import styles from "./console.module.css";

export const ConsoleInput = () => {
  const [input, setInput] = useCalculatorStore((s) => [s.input, s.setInput]);

  return (
    <input
      type="text"
      autoFocus
      className={styles.consoleInput}
      placeholder="Do math here!"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};
