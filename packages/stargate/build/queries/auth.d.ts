import { BaseAccount } from "../codec/cosmos/auth/v1beta1/auth";
import { QueryClient } from "./queryclient";
export interface AuthExtension {
  readonly auth: {
    readonly account: (address: string) => Promise<BaseAccount | null>;
    readonly unverified: {
      readonly account: (address: string) => Promise<BaseAccount | null>;
    };
  };
}
export declare function setupAuthExtension(base: QueryClient): AuthExtension;
