import { cosmos } from "../codec";
import { QueryClient } from "./queryclient";
export interface AuthExtension {
  readonly auth: {
    readonly account: (address: string) => Promise<cosmos.auth.IBaseAccount | null>;
    readonly unverified: {
      readonly account: (address: string) => Promise<cosmos.auth.IBaseAccount | null>;
    };
  };
}
export declare function setupAuthExtension(base: QueryClient): AuthExtension;
