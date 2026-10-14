import { Router } from "express";
import { findMarket, listMarkets, positionsForMarket } from "../domain.js";
import { routeParam } from "../params.js";

export const marketsRouter = Router();

marketsRouter.get("/v1/markets", (_req, res) => {
  res.json(listMarkets());
});

marketsRouter.get("/v1/markets/:id", (req, res) => {
  const market = findMarket(routeParam(req.params.id));
  if (!market) {
    res.status(404).json({ error: "unknown market" });
    return;
  }
  res.json(market);
});

marketsRouter.get("/v1/markets/:id/positions", (req, res) => {
  const market = findMarket(routeParam(req.params.id));
  if (!market) {
    res.status(404).json({ error: "unknown market" });
    return;
  }
  res.json(positionsForMarket(market.id));
});
