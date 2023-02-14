import { useCalculatorStore } from "@state/calculator";
import styles from "./console.module.css";
import { useCopyToClipboardSubscription } from "../hooks/useCopyToClipboardSubscription";

const shouldDisplayInSubconsole = (input: string, result: string) => {
  return input.length + 3 + result.length > 34;
};

const calculateConsoleResult = (input: string, result: any) => {
  return " ".repeat(input.length) + " = " + result;
};

export const ConsoleResult = () => {
  const input = useCalculatorStore((s) => s.input);
  const result = useCalculatorStore((s) => s.result);
  const resultType = useCalculatorStore((s) => s.resultType);
  useCopyToClipboardSubscription(result);

  if (!["number", "string"].includes(String(resultType))) return null;

  if (shouldDisplayInSubconsole(input, String(result))) {
    return (
      <input
        className={styles.subconsoleResult}
        disabled
        value={String(result)}
      />
    );
  }

  const value = calculateConsoleResult(input, result);
  return <input className={styles.consoleResult} disabled value={value} />;
};
