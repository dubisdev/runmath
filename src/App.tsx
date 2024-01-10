import { ConsoleInput } from "@components/ConsoleInput";
import { ConsoleResult } from "@components/ConsoleResult";
import styles from "./app.module.css";
import { useBakgroundColor } from "./hooks/useBackgroundColor";

export function App() {
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
