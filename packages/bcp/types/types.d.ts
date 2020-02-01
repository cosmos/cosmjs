import { TokenInfo } from "@cosmwasm/sdk";
import { Nonce } from "@iov/bcp";
import { Decimal } from "@iov/encoding";
import amino from "@tendermint/amino-js";
export declare type TokenInfos = ReadonlyArray<TokenInfo>;
export declare function decimalToCoin(
  lookup: readonly TokenInfo[],
  value: Decimal,
  ticker: string,
): amino.Coin;
export declare function coinToDecimal(
  tokens: readonly TokenInfo[],
  coin: amino.Coin,
): readonly [Decimal, string];
export interface NonceInfo {
  readonly account_number: string;
  readonly sequence: string;
}
export declare function accountToNonce({ account_number, sequence }: NonceInfo): Nonce;
export declare function nonceToAccountNumber(nonce: Nonce): string;
export declare function nonceToSequence(nonce: Nonce): string;
