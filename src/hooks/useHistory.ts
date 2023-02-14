import { PointerStack } from "@dubisdev/pointer-stack-structure";
import { useRef } from "react";

export const useHistory = () => {
  const { current: history } = useRef(new PointerStack<string>([""]));

  const getHistoryActionResult = (
    e: React.KeyboardEvent<HTMLInputElement>,
    input: string
  ) => {
    const currentIsLastElement = history.getPointer() === history.size - 1;
    // Save input when user presses enter or =
    if ((e.key === "Enter" || e.key === "=") && input) {
      console.log(input);
      history.push(input);
      return null;
    }

    // Clear input when user presses escape, checks if input is empty to avoid rerender
    if (e.key === "Escape") {
      return input && "";
    }

    if (e.key === "ArrowUp") {
      if (!input && currentIsLastElement) {
        return history.peek();
      }
      return history.getPrev() || "";
    }

    if (e.key === "ArrowDown") {
      return history.getNext() || "";
    }

    return null;
  };

  const isHistoryAction = (e: React.KeyboardEvent<HTMLInputElement>) => {
    return ["Enter", "Escape", "ArrowUp", "ArrowDown", "="].includes(e.key);
  };

  return { getHistoryActionResult, isHistoryAction };
};
