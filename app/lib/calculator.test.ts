import { describe, expect, it } from "vitest";
import calculate from "./calculator";

describe("calculate", () => {
  it("adds two numbers", () => {
    expect(calculate("2+3")).toBe(5);
  });

  it("respects precedence", () => {
    expect(calculate("2+3*4")).toBe(14);
  });

  it("handles division by zero", () => {
    expect(calculate("5/0")).toBe(Infinity);
  });

  it("supports negative operands", () => {
    expect(calculate("3*-3")).toBe(-9);
  });

  it("handles subtracting a negative number", () => {
    expect(calculate("3--3")).toBe(6);
  });

  it("handles floating-point arithmetic", () => {
    expect(calculate("0.1+0.2")).toBe(0.3);
  });

  it("rejects invalid expressions", () => {
    expect(calculate("5++2")).toBeNaN();
    expect(calculate("2**3")).toBeNaN();
    expect(calculate("5+")).toBeNaN();
  });
});
