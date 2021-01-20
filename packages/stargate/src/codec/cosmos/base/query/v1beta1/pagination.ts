/* eslint-disable */
import * as Long from "long";
import { Writer, Reader } from "protobufjs/minimal";

/**
 *  PageRequest is to be embedded in gRPC request messages for efficient
 *  pagination. Ex:
 *
 *   message SomeRequest {
 *           Foo some_parameter = 1;
 *           PageRequest pagination = 2;
 *   }
 */
export interface PageRequest {
  /**
   *  key is a value returned in PageResponse.next_key to begin
   *  querying the next page most efficiently. Only one of offset or key
   *  should be set.
   */
  key: Uint8Array;
  /**
   *  offset is a numeric offset that can be used when key is unavailable.
   *  It is less efficient than using key. Only one of offset or key should
   *  be set.
   */
  offset: Long;
  /**
   *  limit is the total number of results to be returned in the result page.
   *  If left empty it will default to a value to be set by each app.
   */
  limit: Long;
  /**
   *  count_total is set to true  to indicate that the result set should include
   *  a count of the total number of items available for pagination in UIs.
   *  count_total is only respected when offset is used. It is ignored when key
   *  is set.
   */
  countTotal: boolean;
}

/**
 *  PageResponse is to be embedded in gRPC response messages where the
 *  corresponding request message has used PageRequest.
 *
 *   message SomeResponse {
 *           repeated Bar results = 1;
 *           PageResponse page = 2;
 *   }
 */
export interface PageResponse {
  /**
   *  next_key is the key to be passed to PageRequest.key to
   *  query the next page most efficiently
   */
  nextKey: Uint8Array;
  /**
   *  total is total number of results available if PageRequest.count_total
   *  was set, its value is undefined otherwise
   */
  total: Long;
}

const basePageRequest: object = {
  offset: Long.UZERO,
  limit: Long.UZERO,
  countTotal: false,
};

const basePageResponse: object = {
  total: Long.UZERO,
};

export const protobufPackage = "cosmos.base.query.v1beta1";

export const PageRequest = {
  encode(message: PageRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).bytes(message.key);
    writer.uint32(16).uint64(message.offset);
    writer.uint32(24).uint64(message.limit);
    writer.uint32(32).bool(message.countTotal);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PageRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePageRequest } as PageRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        case 2:
          message.offset = reader.uint64() as Long;
          break;
        case 3:
          message.limit = reader.uint64() as Long;
          break;
        case 4:
          message.countTotal = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PageRequest {
    const message = { ...basePageRequest } as PageRequest;
    if (object.key !== undefined && object.key !== null) {
      message.key = bytesFromBase64(object.key);
    }
    if (object.offset !== undefined && object.offset !== null) {
      message.offset = Long.fromString(object.offset);
    } else {
      message.offset = Long.UZERO;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Long.fromString(object.limit);
    } else {
      message.limit = Long.UZERO;
    }
    if (object.countTotal !== undefined && object.countTotal !== null) {
      message.countTotal = Boolean(object.countTotal);
    } else {
      message.countTotal = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PageRequest>): PageRequest {
    const message = { ...basePageRequest } as PageRequest;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = new Uint8Array();
    }
    if (object.offset !== undefined && object.offset !== null) {
      message.offset = object.offset as Long;
    } else {
      message.offset = Long.UZERO;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit as Long;
    } else {
      message.limit = Long.UZERO;
    }
    if (object.countTotal !== undefined && object.countTotal !== null) {
      message.countTotal = object.countTotal;
    } else {
      message.countTotal = false;
    }
    return message;
  },
  toJSON(message: PageRequest): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    message.offset !== undefined && (obj.offset = (message.offset || Long.UZERO).toString());
    message.limit !== undefined && (obj.limit = (message.limit || Long.UZERO).toString());
    message.countTotal !== undefined && (obj.countTotal = message.countTotal);
    return obj;
  },
};

export const PageResponse = {
  encode(message: PageResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).bytes(message.nextKey);
    writer.uint32(16).uint64(message.total);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PageResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePageResponse } as PageResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nextKey = reader.bytes();
          break;
        case 2:
          message.total = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PageResponse {
    const message = { ...basePageResponse } as PageResponse;
    if (object.nextKey !== undefined && object.nextKey !== null) {
      message.nextKey = bytesFromBase64(object.nextKey);
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = Long.fromString(object.total);
    } else {
      message.total = Long.UZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PageResponse>): PageResponse {
    const message = { ...basePageResponse } as PageResponse;
    if (object.nextKey !== undefined && object.nextKey !== null) {
      message.nextKey = object.nextKey;
    } else {
      message.nextKey = new Uint8Array();
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = object.total as Long;
    } else {
      message.total = Long.UZERO;
    }
    return message;
  },
  toJSON(message: PageResponse): unknown {
    const obj: any = {};
    message.nextKey !== undefined &&
      (obj.nextKey = base64FromBytes(message.nextKey !== undefined ? message.nextKey : new Uint8Array()));
    message.total !== undefined && (obj.total = (message.total || Long.UZERO).toString());
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
