import { ConsoleInput } from "@components/ConsoleInput";
import { ConsoleResult } from "@components/ConsoleResult";
import styles from "./app.module.css";
import { useBakgroundColor } from "./hooks/useBackgroundColor";
import { useExitOnClose } from "./hooks/useExitOnClose";
import { useGlobalShortcut } from "./hooks/useGlobalShortcut";

export function App() {
  useExitOnClose();
  useBakgroundColor();
  useGlobalShortcut();

  return (
    <div data-tauri-drag-region className={styles.inputBoxLayout}>
      <ConsoleInput />
      <ConsoleResult />
    </div>
  );
}
