import { Decimal, Uint53 } from "@cosmjs/math";

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
 * Starting with CosmJS 0.32.3, the following imports are all synonym and support
 * a variety of denom types such as IBC denoms or tokenfactory. If you need to
 * restrict the denom to something very minimal, this needs to be implemented
 * separately in the caller.
 *
 * ```
 * import { parseCoins } from "@cosmjs/proto-signing";
 * // equals
 * import { parseCoins } from "@cosmjs/stargate";
 * // equals
 * import { parseCoins } from "@cosmjs/amino";
 * ```
 *
 * This function is not made for supporting decimal amounts and does not support
 * parsing gas prices.
 */
export function parseCoins(input: string): Coin[] {
  return input
    .replace(/\s/g, "")
    .split(",")
    .filter(Boolean)
    .map((part) => {
      // Denom regex from Stargate (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/types/coin.go#L599-L601)
      const match = part.match(/^([0-9]+)([a-zA-Z][a-zA-Z0-9/]{2,127})$/);
      if (!match) throw new Error("Got an invalid coin string");
      return {
        amount: match[1].replace(/^0+/, "") || "0",
        denom: match[2],
      };
    });
}

/**
 * Function to sum up coins with type Coin
 */
export function addCoins(lhs: Coin, rhs: Coin): Coin {
  if (lhs.denom !== rhs.denom) throw new Error("Trying to add two coins with different denoms");
  return {
    amount: Decimal.fromAtomics(lhs.amount, 0).plus(Decimal.fromAtomics(rhs.amount, 0)).atomics,
    denom: lhs.denom,
  };
}
