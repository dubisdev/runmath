import { create, all, typeOf, format } from "mathjs"
import { CalculatorSettings } from "../domain/CalculatorSettings";
import { Calculator } from "../domain/Calculator";

export class MathJsCalculator implements Calculator {
    private readonly mathJsEngine = create(all);

    constructor(readonly settings: CalculatorSettings) {
        this.mathJsEngine.config({
            number: this.settings.useBigNumbers ? 'BigNumber' : 'number'
        });
    }

    calculate(input: string) {
        try {
            if (input === "") return "";

            const res = this.mathJsEngine.evaluate(input);

            const { notation } = this.settings

            if (typeOf(res) === "number") return format(res, { notation, precision: notation !== "fixed" ? 14 : undefined });

            // Big Numbeers precision is set to 64 by default (enough for 99.99999999999999% of cases)
            if (typeOf(res) === "BigNumber") return format(res, { notation });

            if (typeOf(res) === "Complex") return String(res);
            if (typeOf(res) === "Unit") return String(res);

            throw new Error("Cannot evaluate object");
        } catch {
            return "";
        }
    }
}
