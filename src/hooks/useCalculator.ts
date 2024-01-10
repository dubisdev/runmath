import { useSettingsStore, CalculationOptions } from "@state/settings";
import { typeOf, format, create, all } from "mathjs";

const mathjs = create(all);

export const useCalculator = () => {
  const useBigNumbers = useSettingsStore((state) => state.useBigNumbers);
  const notation = useSettingsStore((state) => state.notation);

  const calculate = (expression: string) => {
    return calculateResult(expression, { useBigNumbers, notation })
  }

  return { calculate };
}

export const calculateResult = (expression: string, config: CalculationOptions) => {
  const { useBigNumbers, notation } = config;

  mathjs.config({
    number: useBigNumbers ? "BigNumber" : "number"
  });

  try {
    if (expression === "") null;

    const res = mathjs.evaluate(expression);

    if (typeOf(res) === "number") return format(res, { notation, precision: 14 });

    // Big Numbeers precision is set to 64 by default (enough for 99.99999999999999% of cases)
    if (typeOf(res) === "BigNumber") return format(res, { notation });

    if (typeOf(res) === "Complex") return String(res);
    if (typeOf(res) === "Unit") return String(res);

    throw new Error("Cannot evaluate object");
  } catch (error) {
    return null;
  }
};
