import { writeText } from "@tauri-apps/api/clipboard";
import { useEffect } from "react";
import { useCalculatorStore } from "@state/calculator";
import styles from "./console.module.css";

export const ConsoleResult = () => {
  const input = useCalculatorStore((s) => s.input);
  const result = useCalculatorStore((s) => s.result);
  const resultType = useCalculatorStore((s) => s.resultType);

  useEffect(() => {
    function copyToClipboard() {
      if (result) writeText(String(result));
    }

    window.addEventListener("copy-to-clipboard", copyToClipboard);

    return () => {
      window.removeEventListener("copy-to-clipboard", copyToClipboard);
    };
  }, [result]);

  if (!["number", "string"].includes(String(resultType))) return null;

  const value = " ".repeat(input.length) + " = " + result;

  return <input className={styles.consoleResult} disabled value={value} />;
};
