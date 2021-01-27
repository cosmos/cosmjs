import { Coin } from "../codec/cosmos/base/v1beta1/coin";
import { QueryClient } from "./queryclient";
export interface BankExtension {
  readonly bank: {
    readonly balance: (address: string, denom: string) => Promise<Coin | null>;
    readonly unverified: {
      readonly balance: (address: string, denom: string) => Promise<Coin>;
      readonly allBalances: (address: string) => Promise<Coin[]>;
      readonly totalSupply: () => Promise<Coin[]>;
      readonly supplyOf: (denom: string) => Promise<Coin>;
    };
  };
}
export declare function setupBankExtension(base: QueryClient): BankExtension;
