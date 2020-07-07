import { Coin } from "../coins";
import { LcdClient, LcdExtension } from "./lcdclient";
export interface CosmosSdkAccount {
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
    readonly value: CosmosSdkAccount;
  };
}
export interface AuthExtension extends LcdExtension {
  readonly auth: {
    readonly account: (address: string) => Promise<AuthAccountsResponse>;
  };
}
export declare function setupAuthExtension(base: LcdClient): AuthExtension;
