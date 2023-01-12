import { ConsoleInput } from "./components/ConsoleInput";
import { ConsoleResult } from "./components/ConsoleResult";
import styles from "./app.module.css";

export function App() {
  return (
    <div data-tauri-drag-region className={styles.appContainer}>
      <div className={styles.inputBoxLayout}>
        <ConsoleResult />
        <ConsoleInput />
      </div>
    </div>
  );
}
