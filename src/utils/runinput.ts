import { evaluate } from "mathjs";

export const calculateResult = (expression: string) => {
  try {
    if (expression === "") return [null, null] as const;

    const res = evaluate(expression);
    if (typeof res !== "number") throw new Error("Cannot evaluate object");

    return [res, "number"] as const;
  } catch (error) {
    return [null, "error"] as const;
  }
};
