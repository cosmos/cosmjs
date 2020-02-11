import { StdSignature } from "./types";
export declare function encodeSecp256k1Signature(pubkey: Uint8Array, signature: Uint8Array): StdSignature;
export declare function decodeSignature(
  signature: StdSignature,
): {
  readonly pubkey: Uint8Array;
  readonly signature: Uint8Array;
};
