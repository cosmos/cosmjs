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
  /**
   * The account number assigned by the blockchain.
   *
   * This was string encoded in Cosmos SDK 0.37, changed to number in Cosmos SDK 0.38 ([1])
   * and changed back to string in Cosmos SDK 0.39 ([2]).
   *
   * [1]: https://github.com/cosmos/cosmos-sdk/pull/5280
   * [2]: https://github.com/cosmos/cosmos-sdk/pull/6749
   */
  readonly account_number: number | string;
  /**
   * The sequence number for replay protection.
   *
   * This was string encoded in Cosmos SDK 0.37, changed to number in Cosmos SDK 0.38 ([1])
   * and changed back to string in Cosmos SDK 0.39 ([2]).
   *
   * [1]: https://github.com/cosmos/cosmos-sdk/pull/5280
   * [2]: https://github.com/cosmos/cosmos-sdk/pull/6749
   */
  readonly sequence: number | string;
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
