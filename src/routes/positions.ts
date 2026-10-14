import { Router } from "express";
import { findPosition, listPositions } from "../domain.js";
import { routeParam } from "../params.js";

export const positionsRouter = Router();

positionsRouter.get("/v1/positions", (_req, res) => {
  res.json(listPositions());
});

positionsRouter.get("/v1/positions/:id", (req, res) => {
  const position = findPosition(routeParam(req.params.id));
  if (!position) {
    res.status(404).json({ error: "unknown position" });
    return;
  }
  res.json(position);
});
