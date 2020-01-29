import { createCosmWasmConnector, TokenInfo } from "@cosmwasm/bcp";
import { ChainConnector, TokenTicker, TxCodec } from "@iov/bcp";
import { createBnsConnector } from "@iov/bns";
import { Slip10RawIndex } from "@iov/crypto";
import { createEthereumConnector } from "@iov/ethereum";
import { HdPaths } from "@iov/keycontrol";
import { createLiskConnector } from "@iov/lisk";

export const enum Codec {
  Bns,
  Lisk,
  Ethereum,
  CosmWasm,
}

export function codecFromString(input: string): Codec {
  switch (input) {
    case "bns":
      return Codec.Bns;
    case "lisk":
      return Codec.Lisk;
    case "ethereum":
      return Codec.Ethereum;
    case "cosmwasm":
      return Codec.CosmWasm;
    default:
      throw new Error(`Codec '${input}' not supported`);
  }
}

export function createPathBuilderForCodec(codec: Codec): (derivation: number) => readonly Slip10RawIndex[] {
  const pathBuilder = (accountIndex: number): readonly Slip10RawIndex[] => {
    switch (codec) {
      case Codec.Bns:
        return HdPaths.iov(accountIndex);
      case Codec.Lisk:
        return HdPaths.bip44Like(134, accountIndex);
      case Codec.Ethereum:
        return HdPaths.ethereum(accountIndex);
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
    case Codec.Bns:
      return createBnsConnector(url);
    case Codec.Lisk:
      return createLiskConnector(url);
    case Codec.Ethereum:
      return createEthereumConnector(url, {});
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
    case Codec.Bns:
      return 9; // fixed for all weave tokens
    case Codec.Lisk:
      return 8;
    case Codec.Ethereum:
      return 18;
    case Codec.CosmWasm:
      return 6;
    default:
      throw new Error("Unknown codec");
  }
}
