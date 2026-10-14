import type { Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

let server: Server;
let base: string;

beforeAll(async () => {
  server = await new Promise((resolve) => {
    const listening = createApp().listen(0, () => resolve(listening));
  });
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("no port");
  }
  base = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

describe("desk routes", () => {
  it("lists markets and a position", async () => {
    const markets = await fetch(`${base}/v1/markets`).then((response) => response.json());
    expect(markets.map((market: { id: string }) => market.id)).toEqual([
      "eth-usdc",
      "wbtc-usdc",
      "steth-usdc",
    ]);

    const position = await fetch(`${base}/v1/positions/pos-1001`);
    expect(position.status).toBe(200);
    expect(await position.json()).toMatchObject({ owner: "alice", debt: 5200 });
  });

  it("returns 404 for an unknown market", async () => {
    const response = await fetch(`${base}/v1/markets/missing`);
    expect(response.status).toBe(404);
  });
});
