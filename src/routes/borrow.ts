import { Router } from "express";
import { findMarket, findPosition } from "../domain.js";
import { routeParam } from "../params.js";
import { evaluateBorrow, type BorrowRequest } from "../risk.js";

export const borrowRouter = Router();

borrowRouter.post("/v1/borrow-check", (req, res) => {
  try {
    res.json(evaluateBorrow(readBorrowRequest(req.body)));
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "invalid request" });
  }
});

borrowRouter.post("/v1/positions/:id/borrow-check", (req, res) => {
  const position = findPosition(routeParam(req.params.id));
  if (!position) {
    res.status(404).json({ error: "unknown position" });
    return;
  }
  const market = findMarket(position.marketId);
  if (!market) {
    res.status(404).json({ error: "unknown market" });
    return;
  }
  const additionalBorrow = req.body?.additionalBorrow;
  if (typeof additionalBorrow !== "number" || !Number.isFinite(additionalBorrow)) {
    res.status(400).json({ error: "invalid request" });
    return;
  }
  try {
    res.json(
      evaluateBorrow({
        collateralValue: position.collateralValue,
        existingDebt: position.debt,
        additionalBorrow,
        maxLtvBps: market.maxLtvBps,
      }),
    );
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "invalid request" });
  }
});

function readBorrowRequest(body: unknown): BorrowRequest {
  if (body === null || typeof body !== "object") {
    throw new Error("invalid request");
  }
  const value = body as Record<string, unknown>;
  const collateralValue = value.collateralValue;
  const existingDebt = value.existingDebt;
  const additionalBorrow = value.additionalBorrow;
  const maxLtvBps = value.maxLtvBps;
  if (
    !isFiniteNumber(collateralValue) ||
    !isFiniteNumber(existingDebt) ||
    !isFiniteNumber(additionalBorrow) ||
    !isFiniteNumber(maxLtvBps)
  ) {
    throw new Error("invalid request");
  }
  return { collateralValue, existingDebt, additionalBorrow, maxLtvBps };
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
