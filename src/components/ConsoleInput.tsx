import { useCalculatorStore } from "@state/calculator";
import Textra from "react-textra";
import styles from "./console.module.css";

const dateAsSum = new Date().toLocaleDateString().split("/").join("+");

const placeHolderContents = [dateAsSum, "alt + q", "alt + s"];

export const ConsoleInput = () => {
  const [input, setInput] = useCalculatorStore((s) => [s.input, s.setInput]);

  return (
    <>
      {!input && (
        <Textra
          data={placeHolderContents}
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
