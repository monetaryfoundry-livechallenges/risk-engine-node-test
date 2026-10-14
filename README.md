# Heldnav Risk API (Node.js / TypeScript)

TypeScript HTTP API for the Heldnav collateral desk. It lists markets and positions, and checks whether a proposed borrow stays inside the market maximum LTV.

Node.js 20+.

## Run

```
npm install
npm test
npm run dev
```

The server listens on port `8080` (`PORT` overrides it). `test/desk.test.ts` passes. `test/risk.test.ts` fails until the task below is implemented.

## Layout

- `src/server.ts` starts the process
- `src/app.ts` builds the Express app
- `src/domain.ts` is the sample book
- `src/risk.ts` is the borrow check
- `src/routes` exposes health, markets, positions, and borrow checks

## API

JSON fields use camelCase.

- `GET /health`
- `GET /v1/markets`, `GET /v1/markets/:id`, and `GET /v1/markets/:id/positions`
- `GET /v1/positions` and `GET /v1/positions/:id`
- `POST /v1/borrow-check` with `collateralValue`, `existingDebt`, `additionalBorrow`, `maxLtvBps`
- `POST /v1/positions/:id/borrow-check` with `additionalBorrow`

## Candidate task: complete `evaluateBorrow`

Implement only `evaluateBorrow` in `src/risk.ts`. Return the existing result shape: `{ allowed, maxDebt, totalDebt }`. If `maxLtvBps` is above 10,000, throw an `Error` with a clear message.

1. `maxDebt = collateralValue * maxLtvBps / 10_000`.
2. `totalDebt = existingDebt + additionalBorrow`.
3. `allowed` is true when `totalDebt <= maxDebt`. Borrowing exactly at the limit is allowed.

Assume the numeric inputs are non-negative finite numbers. Do not add a validation framework or change the route handlers.
