import { types } from "@cosmwasm/sdk";
import { Nonce } from "@iov/bcp";
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
export declare function accountToNonce({ account_number: account, sequence }: types.NonceInfo): Nonce;
export declare function nonceToAccountNumber(nonce: Nonce): number;
export declare function nonceToSequence(nonce: Nonce): number;
