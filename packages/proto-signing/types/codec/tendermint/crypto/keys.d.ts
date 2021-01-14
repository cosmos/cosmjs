import { Writer, Reader } from "protobufjs/minimal";
/**
 *  PublicKey defines the keys available for use with Tendermint Validators
 */
export interface PublicKey {
  ed25519: Uint8Array | undefined;
  secp256k1: Uint8Array | undefined;
}
export declare const protobufPackage = "tendermint.crypto";
export declare const PublicKey: {
  encode(message: PublicKey, writer?: Writer): Writer;
  decode(input: Uint8Array | Reader, length?: number | undefined): PublicKey;
  fromJSON(object: any): PublicKey;
  fromPartial(object: DeepPartial<PublicKey>): PublicKey;
  toJSON(message: PublicKey): unknown;
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
