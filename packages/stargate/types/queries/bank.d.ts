import { cosmos } from "../generated/codecimpl";
import { QueryClient } from "./queryclient";
export interface BankExtension {
  readonly bank: {
    readonly balance: (address: string, denom: string) => Promise<cosmos.ICoin | null>;
    readonly unverified: {
      readonly balance: (address: string, denom: string) => Promise<cosmos.ICoin>;
      readonly allBalances: (address: string) => Promise<cosmos.ICoin[]>;
      readonly totalSupply: () => Promise<cosmos.ICoin[]>;
      readonly supplyOf: (denom: string) => Promise<cosmos.ICoin>;
    };
  };
}
export declare function setupBankExtension(base: QueryClient): BankExtension;
