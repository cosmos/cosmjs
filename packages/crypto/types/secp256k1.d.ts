import { As } from "type-tagger";
import { ExtendedSecp256k1Signature, Secp256k1Signature } from "./secp256k1signature";
interface Keypair {
  readonly pubkey: Uint8Array;
  readonly privkey: Uint8Array;
}
export declare type Secp256k1Keypair = Keypair & As<"secp256k1-keypair">;
export declare class Secp256k1 {
  static makeKeypair(privkey: Uint8Array): Promise<Secp256k1Keypair>;
  static createSignature(messageHash: Uint8Array, privkey: Uint8Array): Promise<ExtendedSecp256k1Signature>;
  static verifySignature(
    signature: Secp256k1Signature,
    messageHash: Uint8Array,
    pubkey: Uint8Array,
  ): Promise<boolean>;
  static recoverPubkey(signature: ExtendedSecp256k1Signature, messageHash: Uint8Array): Uint8Array;
  static compressPubkey(pubkey: Uint8Array): Uint8Array;
  static trimRecoveryByte(signature: Uint8Array): Uint8Array;
}
export {};
