import { ChainConnector, TxCodec } from "@iov/bcp";
import { bnsCodec, createBnsConnector } from "@iov/bns";
import { Slip10RawIndex } from "@iov/crypto";
import { createEthereumConnector, ethereumCodec } from "@iov/ethereum";
import { HdPaths } from "@iov/keycontrol";
import { createLiskConnector, liskCodec } from "@iov/lisk";

export const enum Codec {
  Bns,
  Lisk,
  Ethereum,
}

export function codecFromString(input: string): Codec {
  switch (input) {
    case "bns":
      return Codec.Bns;
    case "lisk":
      return Codec.Lisk;
    case "ethereum":
      return Codec.Ethereum;
    default:
      throw new Error(`Codec '${input}' not supported`);
  }
}

export function codecImplementation(codec: Codec): TxCodec {
  switch (codec) {
    case Codec.Bns:
      return bnsCodec;
    case Codec.Lisk:
      return liskCodec;
    case Codec.Ethereum:
      return ethereumCodec;
    default:
      throw new Error("No codec implementation for this codec found");
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
    default:
      throw new Error("No connector for this codec found");
  }
}

export function codecDefaultFractionalDigits(codec: Codec): number {
  switch (codec) {
    case Codec.Bns:
      return 9; // fixed for all weave tokens
    case Codec.Lisk:
      return 8;
    case Codec.Ethereum:
      return 18;
    default:
      throw new Error("Unknown codec");
  }
}
