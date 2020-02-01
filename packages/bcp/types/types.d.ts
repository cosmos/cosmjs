import { Amount, Nonce } from "@iov/bcp";
import amino from "@tendermint/amino-js";
export interface TokenInfo {
  readonly denom: string;
  readonly ticker: string;
  /**
   * The number of fractional digits the token supports.
   *
   * A quantity is expressed as atomic units. 10^fractionalDigits of those
   * atomic units make up 1 token.
   *
   * E.g. in Ethereum 10^18 wei are 1 ETH and from the quantity 123000000000000000000
   * the last 18 digits are the fractional part and the rest the wole part.
   */
  readonly fractionalDigits: number;
}
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
