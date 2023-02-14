import { writeText } from "@tauri-apps/api/clipboard";
import { useEffect } from "react";

export const useCopyToClipboardSubscription = (result: any) => {
  useEffect(() => {
    function copyToClipboard() {
      if (result) writeText(String(result));
    }

    window.addEventListener("copy-to-clipboard", copyToClipboard);

    return () => {
      window.removeEventListener("copy-to-clipboard", copyToClipboard);
    };
  }, [result]);
};
