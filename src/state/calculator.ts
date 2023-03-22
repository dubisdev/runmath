import { create } from "zustand";
import { calculateResult } from "@utils/runinput";

interface BasicCalculatorState {
  input: string;
  setInput: (input: string) => void;

  result: number | string | null;
  resultType: "number" | "error" | "string" | null;
}

export const useCalculatorStore = create<BasicCalculatorState>((set) => ({
  input: "",
  resultType: null,
  result: 0,

  setInput: (input: string) => {
    const [result, resultType] = calculateResult(input);
    set({ input, result, resultType });
  },
}));
