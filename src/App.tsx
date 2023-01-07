import { ConsoleInput } from "./components/ConsoleInput";
import { ResultView } from "./components/ResultView";

export function App() {
  return (
    <div
      data-tauri-drag-region
      style={{
        backgroundColor: "var(--bg-color)",
        borderRadius: "10px",
        border: "2px solid black",
        boxShadow: "2px 3px 12px -8px rgba(0,0,0,0.8)",
        WebkitBoxShadow: "2px 3px 12px -8px rgba(0,0,0,0.8)",
      }}
    >
      <div className="inputBox">
        <ResultView />
        <ConsoleInput />
      </div>
    </div>
  );
}
