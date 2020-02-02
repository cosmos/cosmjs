import { Decimal } from "@iov/encoding";
import amino from "@tendermint/amino-js";

import { TokenInfo } from "./types";

export function coinToDecimal(tokens: readonly TokenInfo[], coin: amino.Coin): readonly [Decimal, string] {
  const match = tokens.find(({ denom }) => denom === coin.denom);
  if (!match) {
    throw Error(`unknown denom: ${coin.denom}`);
  }
  const value = Decimal.fromAtomics(coin.amount, match.fractionalDigits);
  return [value, match.ticker];
}
