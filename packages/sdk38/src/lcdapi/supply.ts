import { Coin } from "../coins";
import { LcdApiArray, LcdClient, LcdExtension } from "./lcdclient";

export interface TotalSupplyAllReponse {
  readonly height: string;
  readonly result: LcdApiArray<Coin>;
}

export interface TotalSupplyReponse {
  readonly height: string;
  /** The amount */
  readonly result: string;
}

export interface SupplyExtension extends LcdExtension {
  readonly supply: {
    readonly totalAll: () => Promise<TotalSupplyAllReponse>;
    readonly total: (denom: string) => Promise<TotalSupplyReponse>;
  };
}

export function setupSupplyExtension(base: LcdClient): SupplyExtension {
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
