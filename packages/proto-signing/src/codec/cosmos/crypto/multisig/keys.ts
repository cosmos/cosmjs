/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";

export const protobufPackage = "cosmos.crypto.multisig";

/**
 * LegacyAminoPubKey specifies a public key type
 * which nests multiple public keys and a threshold,
 * it uses legacy amino address rules.
 */
export interface LegacyAminoPubKey {
  threshold: number;
  publicKeys: Any[];
}

const baseLegacyAminoPubKey: object = { threshold: 0 };

export const LegacyAminoPubKey = {
  encode(message: LegacyAminoPubKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.threshold !== 0) {
      writer.uint32(8).uint32(message.threshold);
    }
    for (const v of message.publicKeys) {
      Any.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LegacyAminoPubKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLegacyAminoPubKey } as LegacyAminoPubKey;
    message.publicKeys = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.threshold = reader.uint32();
          break;
        case 2:
          message.publicKeys.push(Any.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LegacyAminoPubKey {
    const message = { ...baseLegacyAminoPubKey } as LegacyAminoPubKey;
    message.publicKeys = [];
    if (object.threshold !== undefined && object.threshold !== null) {
      message.threshold = Number(object.threshold);
    } else {
      message.threshold = 0;
    }
    if (object.publicKeys !== undefined && object.publicKeys !== null) {
      for (const e of object.publicKeys) {
        message.publicKeys.push(Any.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: LegacyAminoPubKey): unknown {
    const obj: any = {};
    message.threshold !== undefined && (obj.threshold = message.threshold);
    if (message.publicKeys) {
      obj.publicKeys = message.publicKeys.map((e) => (e ? Any.toJSON(e) : undefined));
    } else {
      obj.publicKeys = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<LegacyAminoPubKey>): LegacyAminoPubKey {
    const message = { ...baseLegacyAminoPubKey } as LegacyAminoPubKey;
    message.publicKeys = [];
    if (object.threshold !== undefined && object.threshold !== null) {
      message.threshold = object.threshold;
    } else {
      message.threshold = 0;
    }
    if (object.publicKeys !== undefined && object.publicKeys !== null) {
      for (const e of object.publicKeys) {
        message.publicKeys.push(Any.fromPartial(e));
      }
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
