/* eslint-disable @typescript-eslint/naming-convention */
import { toAscii } from "@cosmjs/encoding";
import { assert } from "@cosmjs/utils";

import { cosmos } from "../codec";
import { QueryClient } from "./queryclient";
import { toAccAddress, toObject } from "./utils";

const { Coin } = cosmos.base.v1beta1;
const { Query } = cosmos.bank.v1beta1;

export interface BankExtension {
  readonly bank: {
    readonly balance: (address: string, denom: string) => Promise<cosmos.base.v1beta1.ICoin | null>;
    readonly unverified: {
      readonly balance: (address: string, denom: string) => Promise<cosmos.base.v1beta1.ICoin>;
      readonly allBalances: (address: string) => Promise<cosmos.base.v1beta1.ICoin[]>;
      readonly totalSupply: () => Promise<cosmos.base.v1beta1.ICoin[]>;
      readonly supplyOf: (denom: string) => Promise<cosmos.base.v1beta1.ICoin>;
    };
  };
}

export function setupBankExtension(base: QueryClient): BankExtension {
  // Use this service to get easy typed access to query methods
  // This cannot be used to for proof verification
  const queryService = Query.create((method: any, requestData, callback) => {
    // Parts of the path are unavailable, so we hardcode them here. See https://github.com/protobufjs/protobuf.js/issues/1229
    const path = `/cosmos.bank.v1beta1.Query/${method.name}`;
    base
      .queryUnverified(path, requestData)
      .then((response) => callback(null, response))
      .catch((error) => callback(error));
  });

  return {
    bank: {
      balance: async (address: string, denom: string) => {
        // balance key is a bit tricker, using some prefix stores
        // https://github.com/cosmwasm/cosmos-sdk/blob/80f7ff62f79777a487d0c7a53c64b0f7e43c47b9/x/bank/keeper/view.go#L74-L77
        // ("balances", binAddress, denom)
        // it seem like prefix stores just do a dumb concat with the keys (no tricks to avoid overlap)
        // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L61-L64
        // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L37-L43
        const key = Uint8Array.from([...toAscii("balances"), ...toAccAddress(address), ...toAscii(denom)]);
        const responseData = await base.queryVerified("bank", key);
        return responseData.length ? toObject(Coin.decode(responseData)) : null;
      },
      unverified: {
        balance: async (address: string, denom: string) => {
          const { balance } = await queryService.balance({ address: address, denom: denom });
          assert(balance);
          return toObject(balance);
        },
        allBalances: async (address: string) => {
          const { balances } = await queryService.allBalances({ address: address });
          return balances.map(toObject);
        },
        totalSupply: async () => {
          const { supply } = await queryService.totalSupply({});
          return supply.map(toObject);
        },
        supplyOf: async (denom: string) => {
          const { amount } = await queryService.supplyOf({ denom: denom });
          assert(amount);
          return toObject(amount);
        },
      },
    },
  };
}
