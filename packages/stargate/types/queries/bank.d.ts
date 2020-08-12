import { cosmos } from "../generated/codecimpl";
import { QueryClient } from "../queryclient";
export interface BankExtension {
  readonly bank: {
    readonly balance: (address: string, denom: string) => Promise<cosmos.ICoin | null>;
    readonly unverified: {
      readonly allBalances: (address: string) => Promise<cosmos.ICoin[]>;
    };
  };
}
export declare function setupBankExtension(base: QueryClient): BankExtension;
