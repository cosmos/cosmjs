/* eslint-disable @typescript-eslint/naming-convention */
import { toAscii } from "@cosmjs/encoding";
import { assert } from "@cosmjs/utils";
import { QueryClientImpl } from "cosmjs-types/cosmos/bank/v1beta1/query";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

import { QueryClient } from "./queryclient";
import { createProtobufRpcClient, toAccAddress } from "./utils";

export interface BankExtension {
  readonly bank: {
    readonly balance: (address: string, denom: string) => Promise<Coin>;
    readonly allBalances: (address: string) => Promise<Coin[]>;
    readonly totalSupply: () => Promise<Coin[]>;
    readonly supplyOf: (denom: string) => Promise<Coin>;
    readonly verified: {
      readonly balance: (address: string, denom: string) => Promise<Coin | null>;
    };
  };
}

export function setupBankExtension(base: QueryClient): BankExtension {
  const rpc = createProtobufRpcClient(base);
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const queryService = new QueryClientImpl(rpc);

  return {
    bank: {
      balance: async (address: string, denom: string) => {
        const { balance } = await queryService.Balance({ address: address, denom: denom });
        assert(balance);
        return balance;
      },
      allBalances: async (address: string) => {
        const { balances } = await queryService.AllBalances({ address: address });
        return balances;
      },
      totalSupply: async () => {
        const { supply } = await queryService.TotalSupply({});
        return supply;
      },
      supplyOf: async (denom: string) => {
        const { amount } = await queryService.SupplyOf({ denom: denom });
        assert(amount);
        return amount;
      },
      verified: {
        balance: async (address: string, denom: string) => {
          // balance key is a bit tricker, using some prefix stores
          // https://github.com/cosmwasm/cosmos-sdk/blob/80f7ff62f79777a487d0c7a53c64b0f7e43c47b9/x/bank/keeper/view.go#L74-L77
          // ("balances", binAddress, denom)
          // it seem like prefix stores just do a dumb concat with the keys (no tricks to avoid overlap)
          // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L61-L64
          // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L37-L43
          const key = Uint8Array.from([...toAscii("balances"), ...toAccAddress(address), ...toAscii(denom)]);
          const responseData = await base.queryVerified("bank", key);
          return responseData.length ? Coin.decode(responseData) : null;
        },
      },
    },
  };
}
