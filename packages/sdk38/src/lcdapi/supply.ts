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
  readonly supply: {
    readonly totalAll: () => Promise<TotalSupplyAllReponse>;
    readonly total: (denom: string) => Promise<TotalSupplyReponse>;
  };
}

export function setupSupplyModule(base: LcdClient): SupplyModule {
  return {
    supply: {
      totalAll: async () => {
        return base.get(`/supply/total`);
      },
      total: async (denom: string) => {
        return base.get(`/supply/total/${denom}`);
      },
    },
  };
}
