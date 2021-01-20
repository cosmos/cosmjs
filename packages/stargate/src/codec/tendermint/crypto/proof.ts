/* eslint-disable */
import * as Long from "long";
import { Writer, Reader } from "protobufjs/minimal";

export interface Proof {
  total: Long;
  index: Long;
  leafHash: Uint8Array;
  aunts: Uint8Array[];
}

export interface ValueOp {
  /**
   *  Encoded in ProofOp.Key.
   */
  key: Uint8Array;
  /**
   *  To encode in ProofOp.Data
   */
  proof?: Proof;
}

export interface DominoOp {
  key: string;
  input: string;
  output: string;
}

/**
 *  ProofOp defines an operation used for calculating Merkle root
 *  The data could be arbitrary format, providing nessecary data
 *  for example neighbouring node hash
 */
export interface ProofOp {
  type: string;
  key: Uint8Array;
  data: Uint8Array;
}

/**
 *  ProofOps is Merkle proof defined by the list of ProofOps
 */
export interface ProofOps {
  ops: ProofOp[];
}

const baseProof: object = {
  total: Long.ZERO,
  index: Long.ZERO,
};

const baseValueOp: object = {};

const baseDominoOp: object = {
  key: "",
  input: "",
  output: "",
};

const baseProofOp: object = {
  type: "",
};

const baseProofOps: object = {};

export const protobufPackage = "tendermint.crypto";

export const Proof = {
  encode(message: Proof, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.total);
    writer.uint32(16).int64(message.index);
    writer.uint32(26).bytes(message.leafHash);
    for (const v of message.aunts) {
      writer.uint32(34).bytes(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Proof {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProof } as Proof;
    message.aunts = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.int64() as Long;
          break;
        case 2:
          message.index = reader.int64() as Long;
          break;
        case 3:
          message.leafHash = reader.bytes();
          break;
        case 4:
          message.aunts.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Proof {
    const message = { ...baseProof } as Proof;
    message.aunts = [];
    if (object.total !== undefined && object.total !== null) {
      message.total = Long.fromString(object.total);
    } else {
      message.total = Long.ZERO;
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = Long.fromString(object.index);
    } else {
      message.index = Long.ZERO;
    }
    if (object.leafHash !== undefined && object.leafHash !== null) {
      message.leafHash = bytesFromBase64(object.leafHash);
    }
    if (object.aunts !== undefined && object.aunts !== null) {
      for (const e of object.aunts) {
        message.aunts.push(bytesFromBase64(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Proof>): Proof {
    const message = { ...baseProof } as Proof;
    message.aunts = [];
    if (object.total !== undefined && object.total !== null) {
      message.total = object.total as Long;
    } else {
      message.total = Long.ZERO;
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index as Long;
    } else {
      message.index = Long.ZERO;
    }
    if (object.leafHash !== undefined && object.leafHash !== null) {
      message.leafHash = object.leafHash;
    } else {
      message.leafHash = new Uint8Array();
    }
    if (object.aunts !== undefined && object.aunts !== null) {
      for (const e of object.aunts) {
        message.aunts.push(e);
      }
    }
    return message;
  },
  toJSON(message: Proof): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = (message.total || Long.ZERO).toString());
    message.index !== undefined && (obj.index = (message.index || Long.ZERO).toString());
    message.leafHash !== undefined &&
      (obj.leafHash = base64FromBytes(message.leafHash !== undefined ? message.leafHash : new Uint8Array()));
    if (message.aunts) {
      obj.aunts = message.aunts.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.aunts = [];
    }
    return obj;
  },
};

export const ValueOp = {
  encode(message: ValueOp, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).bytes(message.key);
    if (message.proof !== undefined && message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ValueOp {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseValueOp } as ValueOp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        case 2:
          message.proof = Proof.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ValueOp {
    const message = { ...baseValueOp } as ValueOp;
    if (object.key !== undefined && object.key !== null) {
      message.key = bytesFromBase64(object.key);
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = Proof.fromJSON(object.proof);
    } else {
      message.proof = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ValueOp>): ValueOp {
    const message = { ...baseValueOp } as ValueOp;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = new Uint8Array();
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = Proof.fromPartial(object.proof);
    } else {
      message.proof = undefined;
    }
    return message;
  },
  toJSON(message: ValueOp): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    message.proof !== undefined && (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined);
    return obj;
  },
};

export const DominoOp = {
  encode(message: DominoOp, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.input);
    writer.uint32(26).string(message.output);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DominoOp {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDominoOp } as DominoOp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.input = reader.string();
          break;
        case 3:
          message.output = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DominoOp {
    const message = { ...baseDominoOp } as DominoOp;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.input !== undefined && object.input !== null) {
      message.input = String(object.input);
    } else {
      message.input = "";
    }
    if (object.output !== undefined && object.output !== null) {
      message.output = String(object.output);
    } else {
      message.output = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<DominoOp>): DominoOp {
    const message = { ...baseDominoOp } as DominoOp;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.input !== undefined && object.input !== null) {
      message.input = object.input;
    } else {
      message.input = "";
    }
    if (object.output !== undefined && object.output !== null) {
      message.output = object.output;
    } else {
      message.output = "";
    }
    return message;
  },
  toJSON(message: DominoOp): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.input !== undefined && (obj.input = message.input);
    message.output !== undefined && (obj.output = message.output);
    return obj;
  },
};

export const ProofOp = {
  encode(message: ProofOp, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.type);
    writer.uint32(18).bytes(message.key);
    writer.uint32(26).bytes(message.data);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ProofOp {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProofOp } as ProofOp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.key = reader.bytes();
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ProofOp {
    const message = { ...baseProofOp } as ProofOp;
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = bytesFromBase64(object.key);
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ProofOp>): ProofOp {
    const message = { ...baseProofOp } as ProofOp;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = new Uint8Array();
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    return message;
  },
  toJSON(message: ProofOp): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.key !== undefined &&
      (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },
};

export const ProofOps = {
  encode(message: ProofOps, writer: Writer = Writer.create()): Writer {
    for (const v of message.ops) {
      ProofOp.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ProofOps {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProofOps } as ProofOps;
    message.ops = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ops.push(ProofOp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ProofOps {
    const message = { ...baseProofOps } as ProofOps;
    message.ops = [];
    if (object.ops !== undefined && object.ops !== null) {
      for (const e of object.ops) {
        message.ops.push(ProofOp.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ProofOps>): ProofOps {
    const message = { ...baseProofOps } as ProofOps;
    message.ops = [];
    if (object.ops !== undefined && object.ops !== null) {
      for (const e of object.ops) {
        message.ops.push(ProofOp.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: ProofOps): unknown {
    const obj: any = {};
    if (message.ops) {
      obj.ops = message.ops.map((e) => (e ? ProofOp.toJSON(e) : undefined));
    } else {
      obj.ops = [];
    }
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
