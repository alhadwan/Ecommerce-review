import { formatMoney } from "./money";
import { it, expect, describe } from "vitest";

// suite test
describe("format money", () => {
  it("converts an amount without dec(1999) to dec(19.99)", () => {
    expect(formatMoney(1999)).toBe(`$19.99`);
  });

  it("adds two dec places to the amount", () => {
    expect(formatMoney(100)).toBe(`$1.00`);
  });
});
