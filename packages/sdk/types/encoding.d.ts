import { StdSignature, StdTx } from "./types";
export declare function sortJson(json: any): any;
export declare function marshalTx(tx: StdTx): Uint8Array;
export declare function encodeSecp256k1Signature(pubkey: Uint8Array, signature: Uint8Array): StdSignature;
