import { Uint53, Uint64 } from "@cosmjs/math";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

/**
 * Creates a coin.
 *
 * If your values do not exceed the safe integer range of JS numbers (53 bit),
 * you can use the number type here. This is the case for all typical Cosmos SDK
 * chains that use the default 6 decimals.
 *
 * In case you need to supportr larger values, use unsigned integer strings instead.
 */
export function coin(amount: number | string, denom: string): Coin {
  let outAmount: string;
  if (typeof amount === "number") {
    try {
      outAmount = new Uint53(amount).toString();
    } catch (_err) {
      throw new Error(
        "Given amount is not a safe integer. Consider using a string instead to overcome the limitations of JS numbers.",
      );
    }
  } else {
    if (!amount.match(/^[0-9]+$/)) {
      throw new Error("Invalid unsigned integer string format");
    }
    outAmount = amount.replace(/^0*/, "") || "0";
  }
  return {
    amount: outAmount,
    denom: denom,
  };
}

/**
 * Creates a list of coins with one element.
 */
export function coins(amount: number | string, denom: string): Coin[] {
  return [coin(amount, denom)];
}

/**
 * Takes a coins list like "819966000ucosm,700000000ustake" and parses it.
 *
 * A Stargate-ready variant of this function is available via:
 *
 * ```
 * import { parseCoins } from "@cosmjs/proto-signing";
 * // or
 * import { parseCoins } from "@cosmjs/stargate";
 * ```
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
