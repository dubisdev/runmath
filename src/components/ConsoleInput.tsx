import { useCalculatorStore } from "@state/calculator";
import Textra from "react-textra";
import styles from "./console.module.css";

const dateAsSum = new Date().toLocaleDateString().split("/").join("+");

const placeHolderContents = [
  dateAsSum,
  "alt + q = quit",
  "alt + s = settings",
  "alt + m = toggle visibility",
  "enter = copy to clipboard",
  "tab = select all",
];

export const ConsoleInput = () => {
  const [input, setInput] = useCalculatorStore((s) => [s.input, s.setInput]);

  return (
    <>
      {!input && (
        <Textra
          data={placeHolderContents}
          stopDuration={7000}
          effect="scale"
          className={styles.placeholder}
        />
      )}
      <input
        autoFocus
        className={styles.consoleInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </>
  );
};
