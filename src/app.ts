import express from "express";
import { borrowRouter } from "./routes/borrow.js";
import { healthRouter } from "./routes/health.js";
import { marketsRouter } from "./routes/markets.js";
import { positionsRouter } from "./routes/positions.js";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(healthRouter);
  app.use(marketsRouter);
  app.use(positionsRouter);
  app.use(borrowRouter);
  app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error instanceof SyntaxError) {
      res.status(400).json({ error: "invalid JSON" });
      return;
    }
    next(error);
  });
  return app;
}
