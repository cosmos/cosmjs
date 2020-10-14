import { cosmos } from "../codec";
import { QueryClient } from "./queryclient";
export interface BankExtension {
  readonly bank: {
    readonly balance: (address: string, denom: string) => Promise<cosmos.base.v1beta1.ICoin | null>;
    readonly unverified: {
      readonly balance: (address: string, denom: string) => Promise<cosmos.base.v1beta1.ICoin>;
      readonly allBalances: (address: string) => Promise<cosmos.base.v1beta1.ICoin[]>;
      readonly totalSupply: () => Promise<cosmos.base.v1beta1.ICoin[]>;
      readonly supplyOf: (denom: string) => Promise<cosmos.base.v1beta1.ICoin>;
    };
  };
}
export declare function setupBankExtension(base: QueryClient): BankExtension;
