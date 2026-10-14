import { describe, expect, it } from "vitest";
import { evaluateBorrow } from "../src/risk.js";

describe("evaluateBorrow", () => {
  it("allows a borrow within the limit", () => {
    const result = evaluateBorrow({
      collateralValue: 1000,
      existingDebt: 500,
      additionalBorrow: 200,
      maxLtvBps: 7500,
    });
    expect(result.allowed).toBe(true);
    expect(result.maxDebt).toBe(750);
    expect(result.totalDebt).toBe(700);
  });

  it("rejects a borrow over the limit", () => {
    const result = evaluateBorrow({
      collateralValue: 1000,
      existingDebt: 500,
      additionalBorrow: 300,
      maxLtvBps: 7500,
    });
    expect(result.allowed).toBe(false);
    expect(result.totalDebt).toBe(800);
  });

  it("allows a borrow exactly at the limit", () => {
    expect(
      evaluateBorrow({
        collateralValue: 1000,
        existingDebt: 500,
        additionalBorrow: 250,
        maxLtvBps: 7500,
      }).allowed,
    ).toBe(true);
  });

  it("rejects an LTV above 10,000", () => {
    expect(() =>
      evaluateBorrow({
        collateralValue: 1000,
        existingDebt: 0,
        additionalBorrow: 100,
        maxLtvBps: 10001,
      }),
    ).toThrow(Error);
  });
});
