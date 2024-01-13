import { ConsoleInput } from "@components/ConsoleInput";
import { ConsoleResult } from "@components/ConsoleResult";
import styles from "./app.module.css";
import { useBakgroundColor } from "./hooks/useBackgroundColor";
import { useExitOnClose } from "./hooks/useExitOnClose";

export function App() {
  useExitOnClose();
  useBakgroundColor();

  return (
    <div data-tauri-drag-region className={styles.appContainer}>
      <div className={styles.inputBoxLayout}>
        <ConsoleInput />
        <ConsoleResult />
      </div>
    </div>
  );
}
