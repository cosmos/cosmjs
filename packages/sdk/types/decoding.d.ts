import { Decimal } from "@iov/encoding";
import amino from "@tendermint/amino-js";
import { TokenInfo } from "./types";
export declare function coinToDecimal(
  tokens: readonly TokenInfo[],
  coin: amino.Coin,
): readonly [Decimal, string];
