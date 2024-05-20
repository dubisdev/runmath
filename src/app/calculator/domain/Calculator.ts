import { CalculatorSettings } from "./CalculatorSettings";

export abstract class Calculator {
    constructor(readonly settings: CalculatorSettings) {
    }

    abstract calculate(input: string): string
}
