import { create } from "zustand";
import { calculateResult } from "../utils/runinput";

interface BasicCalculatorState {
  input: string;
  setInput: (input: string) => void;
  resetInput: () => void;

  result: number | null;
  resultType: "number" | "error" | null;
  setResult: (result: number | null) => void;
}

export const useCalculatorStore = create<BasicCalculatorState>((set) => ({
  input: "",
  resultType: null,

  setInput: (input: string) =>
    set(() => {
      const [result, resultType] = calculateResult(input);
      return { input, result, resultType };
    }),

  resetInput: () => set({ input: "" }),

  result: 0,
  setResult: (result: number | null) => set({ result }),
}));
