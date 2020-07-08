import { Coin } from "../coins";
import { LcdApiArray, LcdClient } from "./lcdclient";
export interface TotalSupplyAllResponse {
  readonly height: string;
  readonly result: LcdApiArray<Coin>;
}
export interface TotalSupplyResponse {
  readonly height: string;
  /** The amount */
  readonly result: string;
}
export interface SupplyExtension {
  readonly supply: {
    readonly totalAll: () => Promise<TotalSupplyAllResponse>;
    readonly total: (denom: string) => Promise<TotalSupplyResponse>;
  };
}
export declare function setupSupplyExtension(base: LcdClient): SupplyExtension;
