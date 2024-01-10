import { create } from "zustand";

interface BasicCalculatorState {
  input: string;
  setInput: (input: string) => void;

  result: string | null;
  setResult: (result: string | null) => void;
}

export const useCalculatorStore = create<BasicCalculatorState>((set) => ({
  input: "",
  result: "",

  setInput: (input) => {
    set({ input });
  },

  setResult: (result) => {
    set({ result });
  },

}));
