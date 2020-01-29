import { createCosmWasmConnector, TokenInfo } from "@cosmwasm/bcp";
import { ChainConnector, TokenTicker, TxCodec } from "@iov/bcp";
import { Slip10RawIndex } from "@iov/crypto";
import { HdPaths } from "@iov/keycontrol";
import { createLiskConnector } from "@iov/lisk";

export const enum Codec {
  Lisk,
  CosmWasm,
}

export function codecFromString(input: string): Codec {
  switch (input) {
    case "lisk":
      return Codec.Lisk;
    case "cosmwasm":
      return Codec.CosmWasm;
    default:
      throw new Error(`Codec '${input}' not supported`);
  }
}

export function createPathBuilderForCodec(codec: Codec): (derivation: number) => readonly Slip10RawIndex[] {
  const pathBuilder = (accountIndex: number): readonly Slip10RawIndex[] => {
    switch (codec) {
      case Codec.Lisk:
        return HdPaths.bip44Like(134, accountIndex);
      case Codec.CosmWasm:
        return HdPaths.cosmos(accountIndex);
      default:
        throw new Error("No path builder for this codec found");
    }
  };
  return pathBuilder;
}

export function createChainConnector(codec: Codec, url: string): ChainConnector {
  switch (codec) {
    case Codec.Lisk:
      return createLiskConnector(url);
    case Codec.CosmWasm: {
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
    default:
      throw new Error("No connector for this codec found");
  }
}

export function codecImplementation(codec: Codec): TxCodec {
  return createChainConnector(codec, "unused dummy url").codec;
}

export function codecDefaultFractionalDigits(codec: Codec): number {
  switch (codec) {
    case Codec.Lisk:
      return 8;
    case Codec.CosmWasm:
      return 6;
    default:
      throw new Error("Unknown codec");
  }
}
