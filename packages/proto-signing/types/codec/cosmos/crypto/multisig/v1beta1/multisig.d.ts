import { Writer, Reader } from "protobufjs/minimal";
/**
 *  MultiSignature wraps the signatures from a multisig.LegacyAminoPubKey.
 *  See cosmos.tx.v1betata1.ModeInfo.Multi for how to specify which signers
 *  signed and with which modes.
 */
export interface MultiSignature {
  signatures: Uint8Array[];
}
/**
 *  CompactBitArray is an implementation of a space efficient bit array.
 *  This is used to ensure that the encoded data takes up a minimal amount of
 *  space after proto encoding.
 *  This is not thread safe, and is not intended for concurrent usage.
 */
export interface CompactBitArray {
  extraBitsStored: number;
  elems: Uint8Array;
}
export declare const protobufPackage = "cosmos.crypto.multisig.v1beta1";
export declare const MultiSignature: {
  encode(message: MultiSignature, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): MultiSignature;
  fromJSON(object: any): MultiSignature;
  fromPartial(object: DeepPartial<MultiSignature>): MultiSignature;
  toJSON(message: MultiSignature): unknown;
};
export declare const CompactBitArray: {
  encode(message: CompactBitArray, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): CompactBitArray;
  fromJSON(object: any): CompactBitArray;
  fromPartial(object: DeepPartial<CompactBitArray>): CompactBitArray;
  toJSON(message: CompactBitArray): unknown;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : Partial<T>;
export {};
