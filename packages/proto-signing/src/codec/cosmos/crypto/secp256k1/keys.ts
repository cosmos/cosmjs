/* eslint-disable */
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

const basePubKey: object = {};

const basePrivKey: object = {};

export const protobufPackage = "cosmos.crypto.secp256k1";

export const PubKey = {
  encode(message: PubKey, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).bytes(message.key);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PubKey {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePubKey } as PubKey;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PubKey {
    const message = { ...basePubKey } as PubKey;
    if (object.key !== undefined && object.key !== null) {
      message.key = bytesFromBase64(object.key);
    }
    return message;
  },
  fromPartial(object: DeepPartial<PubKey>): PubKey {
    const message = { ...basePubKey } as PubKey;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = new Uint8Array();
    }
    return message;
  },
  toJSON(message: PubKey): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    return obj;
  },
};

export const PrivKey = {
  encode(message: PrivKey, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).bytes(message.key);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PrivKey {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePrivKey } as PrivKey;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PrivKey {
    const message = { ...basePrivKey } as PrivKey;
    if (object.key !== undefined && object.key !== null) {
      message.key = bytesFromBase64(object.key);
    }
    return message;
  },
  fromPartial(object: DeepPartial<PrivKey>): PrivKey {
    const message = { ...basePrivKey } as PrivKey;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = new Uint8Array();
    }
    return message;
  },
  toJSON(message: PrivKey): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    return obj;
  },
};

interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown) as WindowBase64;
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, "base64").toString("binary"));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, "binary").toString("base64"));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
}
type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
