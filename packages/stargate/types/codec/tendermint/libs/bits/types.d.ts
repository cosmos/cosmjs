import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "tendermint.libs.bits";
export interface BitArray {
  bits: Long;
  elems: Long[];
}
export declare const BitArray: {
  encode(message: BitArray, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): BitArray;
  fromJSON(object: any): BitArray;
  fromPartial(object: DeepPartial<BitArray>): BitArray;
  toJSON(message: BitArray): unknown;
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
