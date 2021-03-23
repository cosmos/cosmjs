import { Uint53, Uint64 } from "@cosmjs/math";

/**
 * This is the same as Coin from @cosmjs/launchpad but those might diverge in the future.
 */
export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

/**
 * Creates a coin.
 *
 * This is the same as coin from @cosmjs/launchpad but those might diverge in the future.
 */
export function coin(amount: number, denom: string): Coin {
  return { amount: new Uint53(amount).toString(), denom: denom };
}

/**
 * Creates a list of coins with one element
 *
 * This is the same as coins from @cosmjs/launchpad but those might diverge in the future.
 */
export function coins(amount: number, denom: string): Coin[] {
  return [coin(amount, denom)];
}

/**
 * Takes a coins list like "819966000ucosm,700000000ustake" and parses it
 *
 * This is the same as parseCoins from @cosmjs/launchpad but those might diverge in the future.
 */
export function parseCoins(input: string): Coin[] {
  return input
    .replace(/\s/g, "")
    .split(",")
    .filter(Boolean)
    .map((part) => {
      const match = part.match(/^([0-9]+)([a-zA-Z]+)/);
      if (!match) throw new Error("Got an invalid coin string");
      return {
        amount: Uint64.fromString(match[1]).toString(),
        denom: match[2],
      };
    });
}
