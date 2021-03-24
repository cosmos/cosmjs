import { Coin } from "@cosmjs/amino";

import { LcdClient } from "./lcdclient";

export interface BankBalancesResponse {
  readonly height: string;
  readonly result: readonly Coin[];
}

export interface BankExtension {
  readonly bank: {
    readonly balances: (address: string) => Promise<BankBalancesResponse>;
  };
}

export function setupBankExtension(base: LcdClient): BankExtension {
  return {
    bank: {
      balances: async (address: string) => {
        const path = `/bank/balances/${address}`;
        return base.get(path);
      },
    },
  };
}
