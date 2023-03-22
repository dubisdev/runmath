import { typeOf, format, evaluate } from "mathjs";

export const calculateResult = (expression: string) => {
  try {
    if (expression === "") null;

    const res = evaluate(expression);

    if (typeOf(res) === "number") return format(res, {precision: 14});
    if (typeOf(res) === "Complex") return String(res);
    if (typeOf(res) === "Unit") return String(res);

    throw new Error("Cannot evaluate object");
  } catch (error) {
    return null;
  }
};
