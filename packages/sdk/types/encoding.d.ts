import { Decimal } from "@iov/encoding";
import amino from "@tendermint/amino-js";
import { TokenInfo } from "./types";
export declare function decimalToCoin(
  lookup: readonly TokenInfo[],
  value: Decimal,
  ticker: string,
): amino.Coin;
