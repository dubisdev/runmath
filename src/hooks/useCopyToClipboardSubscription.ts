import { useCalculatorStore } from "@state/calculator";
import { useSettingsStore } from "@state/settings";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { useEffect } from "react";

export const useCopyToClipboardSubscription = () => {
  const result = useCalculatorStore(s => s.result)
  const setInput = useCalculatorStore(s => s.setInput);
  const hideOnEnter = useSettingsStore(s => s.hideOnEnter)

  useEffect(() => {
    function copyToClipboard() {
      if (result) {
        writeText(String(result));

        if (hideOnEnter) {
          getCurrentWindow().hide();
        }
      }

      setInput("");
    }

    window.addEventListener("copy-to-clipboard", copyToClipboard);

    return () => {
      window.removeEventListener("copy-to-clipboard", copyToClipboard);
    };
  }, [result]);
};
