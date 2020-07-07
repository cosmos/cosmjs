import { Coin } from "../coins";
import { LcdApiArray, LcdClient } from "./lcdclient";
export interface TotalSupplyAllReponse {
  readonly height: string;
  readonly result: LcdApiArray<Coin>;
}
export interface TotalSupplyReponse {
  readonly height: string;
  /** The amount */
  readonly result: string;
}
export interface SupplyExtension {
  readonly supply: {
    readonly totalAll: () => Promise<TotalSupplyAllReponse>;
    readonly total: (denom: string) => Promise<TotalSupplyReponse>;
  };
}
export declare function setupSupplyExtension(base: LcdClient): SupplyExtension;
