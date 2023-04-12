import { useCalculatorStore } from "@state/calculator";
import styles from "./console.module.css";
import { useCopyToClipboardSubscription } from "../hooks/useCopyToClipboardSubscription";
import { shouldDisplayInSubconsole, SubConsoleResult } from "./SubConsoleResult";

const calculateConsoleResult = (input: string, result: any) => {
  return " ".repeat(input.length) + " = " + result;
};

export const ConsoleResult = () => {
  const input = useCalculatorStore((s) => s.input);
  const result = useCalculatorStore((s) => s.result);
  useCopyToClipboardSubscription();

  if (!result) return null;

  if (shouldDisplayInSubconsole(input, String(result))) {
    return <SubConsoleResult value={String(result)} />
  }

  const value = calculateConsoleResult(input, result);
  return <input className={styles.consoleResult} disabled value={value} />;
};
