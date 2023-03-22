import { create } from "zustand";
import { calculateResult } from "@utils/runinput";

interface BasicCalculatorState {
  input: string;
  setInput: (input: string) => void;

  result: number | string | null;
}

export const useCalculatorStore = create<BasicCalculatorState>((set) => ({
  input: "",
  result: 0,

  setInput: (input: string) => {
    const result = calculateResult(input);
    set({ input, result });
  },
}));
