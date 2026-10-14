export type Market = {
  id: string;
  collateralSymbol: string;
  debtSymbol: string;
  maxLtvBps: number;
};

export type Position = {
  id: string;
  marketId: string;
  owner: string;
  collateralValue: number;
  debt: number;
};

const markets: Market[] = [
  { id: "eth-usdc", collateralSymbol: "ETH", debtSymbol: "USDC", maxLtvBps: 7500 },
  { id: "wbtc-usdc", collateralSymbol: "WBTC", debtSymbol: "USDC", maxLtvBps: 7000 },
  { id: "steth-usdc", collateralSymbol: "stETH", debtSymbol: "USDC", maxLtvBps: 6500 },
];

const positions: Position[] = [
  { id: "pos-1001", marketId: "eth-usdc", owner: "alice", collateralValue: 10000, debt: 5200 },
  { id: "pos-1002", marketId: "wbtc-usdc", owner: "bob", collateralValue: 1000, debt: 500 },
  { id: "pos-1003", marketId: "steth-usdc", owner: "carol", collateralValue: 2500, debt: 0 },
];

export function listMarkets(): Market[] {
  return markets;
}

export function findMarket(id: string): Market | undefined {
  return markets.find((market) => market.id === id);
}

export function listPositions(): Position[] {
  return positions;
}

export function findPosition(id: string): Position | undefined {
  return positions.find((position) => position.id === id);
}

export function positionsForMarket(marketId: string): Position[] {
  return positions.filter((position) => position.marketId === marketId);
}
