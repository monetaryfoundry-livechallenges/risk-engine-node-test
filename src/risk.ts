export type BorrowRequest = {
  collateralValue: number;
  existingDebt: number;
  additionalBorrow: number;
  maxLtvBps: number;
};

export type BorrowResult = {
  allowed: boolean;
  maxDebt: number;
  totalDebt: number;
};

export function evaluateBorrow(input: BorrowRequest): BorrowResult {
  // TODO: validate finite, non-negative values; validate LTV; calculate the limit.
  return { allowed: false, maxDebt: 0, totalDebt: 0 };
}
