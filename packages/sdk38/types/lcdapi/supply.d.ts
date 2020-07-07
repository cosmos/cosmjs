import { Coin } from "../coins";
import { LcdApiArray, LcdClient, LcdModule } from "./lcdclient";
export interface TotalSupplyAllReponse {
  readonly height: string;
  readonly result: LcdApiArray<Coin>;
}
export interface TotalSupplyReponse {
  readonly height: string;
  /** The amount */
  readonly result: string;
}
export interface SupplyModule extends LcdModule {
  readonly totalSupplyAll: () => Promise<TotalSupplyAllReponse>;
  readonly totalSupply: (denom: string) => Promise<TotalSupplyReponse>;
}
export declare function setupSupplyModule(base: LcdClient): SupplyModule;
