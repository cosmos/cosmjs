import { Msg, NonceInfo, StdFee, StdSignature, StdTx } from "./types";
export declare function sortJson(json: any): any;
export declare function marshalTx(tx: StdTx): Uint8Array;
export declare function makeSignBytes(
  msg: Msg,
  fee: StdFee,
  chainId: string,
  memo: string,
  account: NonceInfo,
): Uint8Array;
export declare function encodeSecp256k1Signature(pubkey: Uint8Array, signature: Uint8Array): StdSignature;
