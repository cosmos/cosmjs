import { Coin } from "../coins";
import { LcdClient } from "./lcdclient";
/**
 * A Cosmos SDK base account.
 *
 * This type describes the base account representation as returned
 * by the Cosmos SDK 0.37–0.39 LCD API.
 *
 * @see https://docs.cosmos.network/master/modules/auth/02_state.html#base-account
 */
export interface BaseAccount {
  /** Bech32 account address */
  readonly address: string;
  readonly coins: readonly Coin[];
  /** Bech32 encoded pubkey */
  readonly public_key: string;
  readonly account_number: number;
  readonly sequence: number;
}
export interface AuthAccountsResponse {
  readonly height: string;
  readonly result: {
    readonly type: "cosmos-sdk/Account";
    readonly value: BaseAccount;
  };
}
export interface AuthExtension {
  readonly auth: {
    readonly account: (address: string) => Promise<AuthAccountsResponse>;
  };
}
export declare function setupAuthExtension(base: LcdClient): AuthExtension;
