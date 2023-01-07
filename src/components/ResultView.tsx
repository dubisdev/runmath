import { writeText } from "@tauri-apps/api/clipboard";
import { useEffect } from "react";
import { useCalculatorStore } from "../state/calculator";

export const ResultView = () => {
  const [input, result, resultType] = useCalculatorStore((s) => [
    s.input,
    s.result,
    s.resultType,
  ]);

  useEffect(() => {
    function copyToClipboard() {
      writeText(String(result));
    }
    window.addEventListener("copy-to-clipboard", copyToClipboard);

    return () => {
      window.removeEventListener("copy-to-clipboard", copyToClipboard);
    };
  }, [result]);

  const textToDisplay = " ".repeat(input.length) + " = " + result;

  if (resultType !== "number") return null;

  return (
    <input
      id="result"
      style={{
        height: "100%",
        fontSize: "xx-large",
        position: "absolute",
        width: "100%",
        zIndex: 0,
        color: "rgba(39, 39, 39, 0.525)",
      }}
      disabled
      value={textToDisplay}
    />
  );
};
