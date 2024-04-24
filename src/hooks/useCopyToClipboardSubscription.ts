import { useCalculatorStore } from "@state/calculator";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { useEffect } from "react";

export const useCopyToClipboardSubscription = () => {
  const result = useCalculatorStore(s => s.result)
  const setInput = useCalculatorStore(s => s.setInput);

  useEffect(() => {
    function copyToClipboard() {
      if (result) writeText(String(result));
      setInput("");
    }

    window.addEventListener("copy-to-clipboard", copyToClipboard);

    return () => {
      window.removeEventListener("copy-to-clipboard", copyToClipboard);
    };
  }, [result]);
};
