import { Ed25519HdWallet, Secp256k1HdWallet, Wallet } from "@iov/keycontrol";

import { Codec } from "./codec";

export function createWalletForCodec(input: Codec, mnemonic: string): Wallet {
  switch (input) {
    case Codec.Lisk:
      return Ed25519HdWallet.fromMnemonic(mnemonic);
    case Codec.CosmWasm:
      return Secp256k1HdWallet.fromMnemonic(mnemonic);
    default:
      throw new Error(`Codec '${input}' not supported`);
  }
}
