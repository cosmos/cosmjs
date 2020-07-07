import { Coin } from "../coins";
import { LcdClient, LcdModule } from "./lcdclient";

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

export interface AuthModule extends LcdModule {
  readonly authAccounts: (address: string) => Promise<AuthAccountsResponse>;
}

export function setupAuthModule(base: LcdClient): AuthModule {
  return {
    authAccounts: async (address: string) => {
      const path = `/auth/accounts/${address}`;
      const responseData = await base.get(path);
      if (responseData.result.type !== "cosmos-sdk/Account") {
        throw new Error("Unexpected response data format");
      }
      return responseData as AuthAccountsResponse;
    },
  };
}
