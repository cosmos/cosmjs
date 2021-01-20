/* eslint-disable */
import * as Long from "long";
import { Writer, Reader } from "protobufjs/minimal";

/**
 *  App includes the protocol and software version for the application.
 *  This information is included in ResponseInfo. The App.Protocol can be
 *  updated in ResponseEndBlock.
 */
export interface App {
  protocol: Long;
  software: string;
}

/**
 *  Consensus captures the consensus rules for processing a block in the blockchain,
 *  including all blockchain data structures and the rules of the application's
 *  state transition machine.
 */
export interface Consensus {
  block: Long;
  app: Long;
}

const baseApp: object = {
  protocol: Long.UZERO,
  software: "",
};

const baseConsensus: object = {
  block: Long.UZERO,
  app: Long.UZERO,
};

export const protobufPackage = "tendermint.version";

export const App = {
  encode(message: App, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint64(message.protocol);
    writer.uint32(18).string(message.software);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): App {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseApp } as App;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.protocol = reader.uint64() as Long;
          break;
        case 2:
          message.software = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): App {
    const message = { ...baseApp } as App;
    if (object.protocol !== undefined && object.protocol !== null) {
      message.protocol = Long.fromString(object.protocol);
    } else {
      message.protocol = Long.UZERO;
    }
    if (object.software !== undefined && object.software !== null) {
      message.software = String(object.software);
    } else {
      message.software = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<App>): App {
    const message = { ...baseApp } as App;
    if (object.protocol !== undefined && object.protocol !== null) {
      message.protocol = object.protocol as Long;
    } else {
      message.protocol = Long.UZERO;
    }
    if (object.software !== undefined && object.software !== null) {
      message.software = object.software;
    } else {
      message.software = "";
    }
    return message;
  },
  toJSON(message: App): unknown {
    const obj: any = {};
    message.protocol !== undefined && (obj.protocol = (message.protocol || Long.UZERO).toString());
    message.software !== undefined && (obj.software = message.software);
    return obj;
  },
};

export const Consensus = {
  encode(message: Consensus, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint64(message.block);
    writer.uint32(16).uint64(message.app);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Consensus {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseConsensus } as Consensus;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block = reader.uint64() as Long;
          break;
        case 2:
          message.app = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Consensus {
    const message = { ...baseConsensus } as Consensus;
    if (object.block !== undefined && object.block !== null) {
      message.block = Long.fromString(object.block);
    } else {
      message.block = Long.UZERO;
    }
    if (object.app !== undefined && object.app !== null) {
      message.app = Long.fromString(object.app);
    } else {
      message.app = Long.UZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Consensus>): Consensus {
    const message = { ...baseConsensus } as Consensus;
    if (object.block !== undefined && object.block !== null) {
      message.block = object.block as Long;
    } else {
      message.block = Long.UZERO;
    }
    if (object.app !== undefined && object.app !== null) {
      message.app = object.app as Long;
    } else {
      message.app = Long.UZERO;
    }
    return message;
  },
  toJSON(message: Consensus): unknown {
    const obj: any = {};
    message.block !== undefined && (obj.block = (message.block || Long.UZERO).toString());
    message.app !== undefined && (obj.app = (message.app || Long.UZERO).toString());
    return obj;
  },
};

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
