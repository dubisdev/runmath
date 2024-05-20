import { useSettingsStore } from "@state/settings";
import { MathJsCalculator } from "../app/calculator/infrastructure/MathJsCalculator";
import { useMemo } from "react";

export const useCalculator = () => {
    const settings = useSettingsStore()

    const calculator = useMemo(() => {
        return new MathJsCalculator({
            useBigNumbers: settings.useBigNumbers,
            notation: settings.notation
        });
    }, [settings.useBigNumbers, settings.notation]);

    const calculate = (input: string) => {
        return calculator.calculate(input);
    };

    return { calculate };
}
