import { types } from "@cosmwasm/sdk";
import { Nonce } from "@iov/bcp";
export declare type TokenInfos = ReadonlyArray<types.TokenInfo>;
export interface NonceInfo {
  readonly account_number: string;
  readonly sequence: string;
}
export declare function accountToNonce({ account_number, sequence }: NonceInfo): Nonce;
export declare function nonceToAccountNumber(nonce: Nonce): string;
export declare function nonceToSequence(nonce: Nonce): string;
