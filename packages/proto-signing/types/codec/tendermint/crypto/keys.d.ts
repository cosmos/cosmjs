import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "tendermint.crypto";
/** PublicKey defines the keys available for use with Tendermint Validators */
export interface PublicKey {
  ed25519: Uint8Array | undefined;
  secp256k1: Uint8Array | undefined;
}
export declare const PublicKey: {
  encode(message: PublicKey, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PublicKey;
  fromJSON(object: any): PublicKey;
  fromPartial(object: DeepPartial<PublicKey>): PublicKey;
  toJSON(message: PublicKey): unknown;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
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
