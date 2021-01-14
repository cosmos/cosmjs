/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

/**
 *  PublicKey defines the keys available for use with Tendermint Validators
 */
export interface PublicKey {
  ed25519: Uint8Array | undefined;
  secp256k1: Uint8Array | undefined;
}

const basePublicKey: object = {};

export const protobufPackage = "tendermint.crypto";

export const PublicKey = {
  encode(message: PublicKey, writer: Writer = Writer.create()): Writer {
    if (message.ed25519 !== undefined) {
      writer.uint32(10).bytes(message.ed25519);
    }
    if (message.secp256k1 !== undefined) {
      writer.uint32(18).bytes(message.secp256k1);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PublicKey {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePublicKey } as PublicKey;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ed25519 = reader.bytes();
          break;
        case 2:
          message.secp256k1 = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PublicKey {
    const message = { ...basePublicKey } as PublicKey;
    if (object.ed25519 !== undefined && object.ed25519 !== null) {
      message.ed25519 = bytesFromBase64(object.ed25519);
    }
    if (object.secp256k1 !== undefined && object.secp256k1 !== null) {
      message.secp256k1 = bytesFromBase64(object.secp256k1);
    }
    return message;
  },
  fromPartial(object: DeepPartial<PublicKey>): PublicKey {
    const message = { ...basePublicKey } as PublicKey;
    if (object.ed25519 !== undefined && object.ed25519 !== null) {
      message.ed25519 = object.ed25519;
    } else {
      message.ed25519 = undefined;
    }
    if (object.secp256k1 !== undefined && object.secp256k1 !== null) {
      message.secp256k1 = object.secp256k1;
    } else {
      message.secp256k1 = undefined;
    }
    return message;
  },
  toJSON(message: PublicKey): unknown {
    const obj: any = {};
    message.ed25519 !== undefined &&
      (obj.ed25519 = message.ed25519 !== undefined ? base64FromBytes(message.ed25519) : undefined);
    message.secp256k1 !== undefined &&
      (obj.secp256k1 = message.secp256k1 !== undefined ? base64FromBytes(message.secp256k1) : undefined);
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
