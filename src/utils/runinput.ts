import { typeOf, format, evaluate } from "mathjs";

export const calculateResult = (expression: string) => {
  try {
    if (expression === "") return [null, null] as const;

    const res = evaluate(expression);

    if (typeOf(res) === "number") return [Number(format(res, {precision: 14})), "number"] as const;
    if (typeOf(res) === "Complex") return [res, "string"] as const;
    if (typeOf(res) === "Unit") return [res, "string"] as const;

    throw new Error("Cannot evaluate object");
  } catch (error) {
    return [null, "error"] as const;
  }
};
