import { Writer, Reader } from "protobufjs/minimal";
/**
 *  PubKey defines a secp256k1 public key
 *  Key is the compressed form of the pubkey. The first byte depends is a 0x02 byte
 *  if the y-coordinate is the lexicographically largest of the two associated with
 *  the x-coordinate. Otherwise the first byte is a 0x03.
 *  This prefix is followed with the x-coordinate.
 */
export interface PubKey {
  key: Uint8Array;
}
/**
 *  PrivKey defines a secp256k1 private key.
 */
export interface PrivKey {
  key: Uint8Array;
}
export declare const protobufPackage = "cosmos.crypto.secp256k1";
export declare const PubKey: {
  encode(message: PubKey, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): PubKey;
  fromJSON(object: any): PubKey;
  fromPartial(object: DeepPartial<PubKey>): PubKey;
  toJSON(message: PubKey): unknown;
};
export declare const PrivKey: {
  encode(message: PrivKey, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): PrivKey;
  fromJSON(object: any): PrivKey;
  fromPartial(object: DeepPartial<PrivKey>): PrivKey;
  toJSON(message: PrivKey): unknown;
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
