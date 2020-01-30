import { createCosmWasmConnector, TokenInfo } from "@cosmwasm/bcp";
import { ChainConnector, TokenTicker, TxCodec } from "@iov/bcp";

export function createChainConnector(url: string): ChainConnector {
  const tokens: readonly TokenInfo[] = [
    {
      fractionalDigits: 6,
      tokenName: "Fee Token",
      tokenTicker: "COSM" as TokenTicker,
      denom: "cosm",
    },
    {
      fractionalDigits: 6,
      tokenName: "Staking Token",
      tokenTicker: "STAKE" as TokenTicker,
      denom: "stake",
    },
  ];
  return createCosmWasmConnector(url, "cosmos", tokens);
}

export function codecImplementation(): TxCodec {
  return createChainConnector("unused dummy url").codec;
}

export function codecDefaultFractionalDigits(): number {
  return 6;
}
