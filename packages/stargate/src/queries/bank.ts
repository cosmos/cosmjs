import { Bech32, toAscii } from "@cosmjs/encoding";

import { cosmos } from "../generated/codecimpl";
import { QueryClient } from "../queryclient";

export interface BankExtension {
  readonly bank: {
    readonly balance: (address: string, denom: string) => Promise<cosmos.ICoin>;
  };
}

export function setupBankExtension(base: QueryClient): BankExtension {
  return {
    bank: {
      balance: async (address: string, denom: string) => {
        // balance key is a bit tricker, using some prefix stores
        // https://github.com/cosmwasm/cosmos-sdk/blob/80f7ff62f79777a487d0c7a53c64b0f7e43c47b9/x/bank/keeper/view.go#L74-L77
        // ("balances", binAddress, denom)
        // it seem like prefix stores just do a dumb concat with the keys (no tricks to avoid overlap)
        // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L61-L64
        // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L37-L43
        const binAddress = Bech32.decode(address).data;
        const bankKey = Uint8Array.from([...toAscii("balances"), ...binAddress, ...toAscii(denom)]);
        const responseData = await base.queryVerified("bank", bankKey);
        return cosmos.Coin.decode(responseData);
      },
    },
  };
}
