import { create } from "zustand";
import { useCalculator } from "../hooks/useCalculator";

interface BasicCalculatorState {
  input: string;
  setInput: (input: string) => void;

  result: number | string | null;
}

export const useCalculatorStore = create<BasicCalculatorState>((set) => ({
  input: "",
  result: 0,

  setInput: (input: string) => {
    const { calculate } = useCalculator();
    const result = calculate(input);
    set({ input, result });
  },
}));
