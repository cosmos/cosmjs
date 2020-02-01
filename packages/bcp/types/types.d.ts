import { TokenInfo } from "@cosmwasm/sdk";
import { Amount, Nonce } from "@iov/bcp";
import amino from "@tendermint/amino-js";
export declare type TokenInfos = ReadonlyArray<TokenInfo>;
export declare function amountToCoin(lookup: ReadonlyArray<TokenInfo>, amount: Amount): amino.Coin;
export declare function coinToAmount(tokens: TokenInfos, coin: amino.Coin): Amount;
export interface NonceInfo {
  readonly account_number: string;
  readonly sequence: string;
}
export declare function accountToNonce({ account_number, sequence }: NonceInfo): Nonce;
export declare function nonceToAccountNumber(nonce: Nonce): string;
export declare function nonceToSequence(nonce: Nonce): string;
