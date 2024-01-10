import { useCalculatorStore } from "@state/calculator";
import styles from "./console.module.css";
import { useCopyToClipboardSubscription } from "../hooks/useCopyToClipboardSubscription";
import { shouldDisplayInSubconsole, SubConsoleResult } from "./SubConsoleResult";
import { useCalculator } from "../hooks/useCalculator";
import { useEffect } from "react";

const calculateConsoleResult = (input: string, result: any) => {
  return " ".repeat(input.length) + " = " + result;
};

export const ConsoleResult = () => {
  const input = useCalculatorStore((s) => s.input);
  const result = useCalculatorStore((s) => s.result);
  const setResult = useCalculatorStore((s) => s.setResult);

  const { calculate } = useCalculator();

  useCopyToClipboardSubscription();

  useEffect(() => {
    const result = calculate(input);
    setResult(result);

  }, [input])

  if (!result) return null;

  if (shouldDisplayInSubconsole(input, String(result))) {
    return <SubConsoleResult value={String(result)} />
  }

  const value = calculateConsoleResult(input, result);
  return <input className={styles.consoleResult} disabled value={value} />;
};
