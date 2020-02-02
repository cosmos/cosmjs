import { Decimal } from "@iov/encoding";
import amino from "@tendermint/amino-js";

import { TokenInfo } from "./types";

export function decimalToCoin(lookup: readonly TokenInfo[], value: Decimal, ticker: string): amino.Coin {
  const match = lookup.find(token => token.ticker === ticker);
  if (!match) {
    throw Error(`unknown ticker: ${ticker}`);
  }
  if (match.fractionalDigits !== value.fractionalDigits) {
    throw new Error(
      "Mismatch in fractional digits between token and value. If you really want, implement a conversion here. However, this indicates a bug in the caller code.",
    );
  }
  return {
    denom: match.denom,
    amount: value.atomics,
  };
}
