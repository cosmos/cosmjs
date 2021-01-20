/* eslint-disable */
import * as Long from "long";
import { MerklePrefix } from "../../../../ibc/core/commitment/v1/commitment";
import { Writer, Reader } from "protobufjs/minimal";

/**
 *  ConnectionEnd defines a stateful object on a chain connected to another
 *  separate one.
 *  NOTE: there must only be 2 defined ConnectionEnds to establish
 *  a connection between two chains.
 */
export interface ConnectionEnd {
  /**
   *  client associated with this connection.
   */
  clientId: string;
  /**
   *  IBC version which can be utilised to determine encodings or protocols for
   *  channels or packets utilising this connection.
   */
  versions: Version[];
  /**
   *  current state of the connection end.
   */
  state: State;
  /**
   *  counterparty chain associated with this connection.
   */
  counterparty?: Counterparty;
  /**
   *  delay period that must pass before a consensus state can be used for packet-verification
   *  NOTE: delay period logic is only implemented by some clients.
   */
  delayPeriod: Long;
}

/**
 *  IdentifiedConnection defines a connection with additional connection
 *  identifier field.
 */
export interface IdentifiedConnection {
  /**
   *  connection identifier.
   */
  id: string;
  /**
   *  client associated with this connection.
   */
  clientId: string;
  /**
   *  IBC version which can be utilised to determine encodings or protocols for
   *  channels or packets utilising this connection
   */
  versions: Version[];
  /**
   *  current state of the connection end.
   */
  state: State;
  /**
   *  counterparty chain associated with this connection.
   */
  counterparty?: Counterparty;
  /**
   *  delay period associated with this connection.
   */
  delayPeriod: Long;
}

/**
 *  Counterparty defines the counterparty chain associated with a connection end.
 */
export interface Counterparty {
  /**
   *  identifies the client on the counterparty chain associated with a given
   *  connection.
   */
  clientId: string;
  /**
   *  identifies the connection end on the counterparty chain associated with a
   *  given connection.
   */
  connectionId: string;
  /**
   *  commitment merkle prefix of the counterparty chain.
   */
  prefix?: MerklePrefix;
}

/**
 *  ClientPaths define all the connection paths for a client state.
 */
export interface ClientPaths {
  /**
   *  list of connection paths
   */
  paths: string[];
}

/**
 *  ConnectionPaths define all the connection paths for a given client state.
 */
export interface ConnectionPaths {
  /**
   *  client state unique identifier
   */
  clientId: string;
  /**
   *  list of connection paths
   */
  paths: string[];
}

/**
 *  Version defines the versioning scheme used to negotiate the IBC verison in
 *  the connection handshake.
 */
export interface Version {
  /**
   *  unique version identifier
   */
  identifier: string;
  /**
   *  list of features compatible with the specified identifier
   */
  features: string[];
}

const baseConnectionEnd: object = {
  clientId: "",
  state: 0,
  delayPeriod: Long.UZERO,
};

const baseIdentifiedConnection: object = {
  id: "",
  clientId: "",
  state: 0,
  delayPeriod: Long.UZERO,
};

const baseCounterparty: object = {
  clientId: "",
  connectionId: "",
};

const baseClientPaths: object = {
  paths: "",
};

const baseConnectionPaths: object = {
  clientId: "",
  paths: "",
};

const baseVersion: object = {
  identifier: "",
  features: "",
};

export const protobufPackage = "ibc.core.connection.v1";

/**  State defines if a connection is in one of the following states:
 INIT, TRYOPEN, OPEN or UNINITIALIZED.
 */
export enum State {
  /** STATE_UNINITIALIZED_UNSPECIFIED -  Default State
   */
  STATE_UNINITIALIZED_UNSPECIFIED = 0,
  /** STATE_INIT -  A connection end has just started the opening handshake.
   */
  STATE_INIT = 1,
  /** STATE_TRYOPEN -  A connection end has acknowledged the handshake step on the counterparty
   chain.
   */
  STATE_TRYOPEN = 2,
  /** STATE_OPEN -  A connection end has completed the handshake.
   */
  STATE_OPEN = 3,
  UNRECOGNIZED = -1,
}

export function stateFromJSON(object: any): State {
  switch (object) {
    case 0:
    case "STATE_UNINITIALIZED_UNSPECIFIED":
      return State.STATE_UNINITIALIZED_UNSPECIFIED;
    case 1:
    case "STATE_INIT":
      return State.STATE_INIT;
    case 2:
    case "STATE_TRYOPEN":
      return State.STATE_TRYOPEN;
    case 3:
    case "STATE_OPEN":
      return State.STATE_OPEN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return State.UNRECOGNIZED;
  }
}

export function stateToJSON(object: State): string {
  switch (object) {
    case State.STATE_UNINITIALIZED_UNSPECIFIED:
      return "STATE_UNINITIALIZED_UNSPECIFIED";
    case State.STATE_INIT:
      return "STATE_INIT";
    case State.STATE_TRYOPEN:
      return "STATE_TRYOPEN";
    case State.STATE_OPEN:
      return "STATE_OPEN";
    default:
      return "UNKNOWN";
  }
}

export const ConnectionEnd = {
  encode(message: ConnectionEnd, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.clientId);
    for (const v of message.versions) {
      Version.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).int32(message.state);
    if (message.counterparty !== undefined && message.counterparty !== undefined) {
      Counterparty.encode(message.counterparty, writer.uint32(34).fork()).ldelim();
    }
    writer.uint32(40).uint64(message.delayPeriod);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ConnectionEnd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseConnectionEnd } as ConnectionEnd;
    message.versions = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        case 2:
          message.versions.push(Version.decode(reader, reader.uint32()));
          break;
        case 3:
          message.state = reader.int32() as any;
          break;
        case 4:
          message.counterparty = Counterparty.decode(reader, reader.uint32());
          break;
        case 5:
          message.delayPeriod = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ConnectionEnd {
    const message = { ...baseConnectionEnd } as ConnectionEnd;
    message.versions = [];
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = String(object.clientId);
    } else {
      message.clientId = "";
    }
    if (object.versions !== undefined && object.versions !== null) {
      for (const e of object.versions) {
        message.versions.push(Version.fromJSON(e));
      }
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = stateFromJSON(object.state);
    } else {
      message.state = 0;
    }
    if (object.counterparty !== undefined && object.counterparty !== null) {
      message.counterparty = Counterparty.fromJSON(object.counterparty);
    } else {
      message.counterparty = undefined;
    }
    if (object.delayPeriod !== undefined && object.delayPeriod !== null) {
      message.delayPeriod = Long.fromString(object.delayPeriod);
    } else {
      message.delayPeriod = Long.UZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ConnectionEnd>): ConnectionEnd {
    const message = { ...baseConnectionEnd } as ConnectionEnd;
    message.versions = [];
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = object.clientId;
    } else {
      message.clientId = "";
    }
    if (object.versions !== undefined && object.versions !== null) {
      for (const e of object.versions) {
        message.versions.push(Version.fromPartial(e));
      }
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = 0;
    }
    if (object.counterparty !== undefined && object.counterparty !== null) {
      message.counterparty = Counterparty.fromPartial(object.counterparty);
    } else {
      message.counterparty = undefined;
    }
    if (object.delayPeriod !== undefined && object.delayPeriod !== null) {
      message.delayPeriod = object.delayPeriod as Long;
    } else {
      message.delayPeriod = Long.UZERO;
    }
    return message;
  },
  toJSON(message: ConnectionEnd): unknown {
    const obj: any = {};
    message.clientId !== undefined && (obj.clientId = message.clientId);
    if (message.versions) {
      obj.versions = message.versions.map((e) => (e ? Version.toJSON(e) : undefined));
    } else {
      obj.versions = [];
    }
    message.state !== undefined && (obj.state = stateToJSON(message.state));
    message.counterparty !== undefined &&
      (obj.counterparty = message.counterparty ? Counterparty.toJSON(message.counterparty) : undefined);
    message.delayPeriod !== undefined && (obj.delayPeriod = (message.delayPeriod || Long.UZERO).toString());
    return obj;
  },
};

export const IdentifiedConnection = {
  encode(message: IdentifiedConnection, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.id);
    writer.uint32(18).string(message.clientId);
    for (const v of message.versions) {
      Version.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(32).int32(message.state);
    if (message.counterparty !== undefined && message.counterparty !== undefined) {
      Counterparty.encode(message.counterparty, writer.uint32(42).fork()).ldelim();
    }
    writer.uint32(48).uint64(message.delayPeriod);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): IdentifiedConnection {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseIdentifiedConnection } as IdentifiedConnection;
    message.versions = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.clientId = reader.string();
          break;
        case 3:
          message.versions.push(Version.decode(reader, reader.uint32()));
          break;
        case 4:
          message.state = reader.int32() as any;
          break;
        case 5:
          message.counterparty = Counterparty.decode(reader, reader.uint32());
          break;
        case 6:
          message.delayPeriod = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): IdentifiedConnection {
    const message = { ...baseIdentifiedConnection } as IdentifiedConnection;
    message.versions = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = String(object.clientId);
    } else {
      message.clientId = "";
    }
    if (object.versions !== undefined && object.versions !== null) {
      for (const e of object.versions) {
        message.versions.push(Version.fromJSON(e));
      }
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = stateFromJSON(object.state);
    } else {
      message.state = 0;
    }
    if (object.counterparty !== undefined && object.counterparty !== null) {
      message.counterparty = Counterparty.fromJSON(object.counterparty);
    } else {
      message.counterparty = undefined;
    }
    if (object.delayPeriod !== undefined && object.delayPeriod !== null) {
      message.delayPeriod = Long.fromString(object.delayPeriod);
    } else {
      message.delayPeriod = Long.UZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<IdentifiedConnection>): IdentifiedConnection {
    const message = { ...baseIdentifiedConnection } as IdentifiedConnection;
    message.versions = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = object.clientId;
    } else {
      message.clientId = "";
    }
    if (object.versions !== undefined && object.versions !== null) {
      for (const e of object.versions) {
        message.versions.push(Version.fromPartial(e));
      }
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = 0;
    }
    if (object.counterparty !== undefined && object.counterparty !== null) {
      message.counterparty = Counterparty.fromPartial(object.counterparty);
    } else {
      message.counterparty = undefined;
    }
    if (object.delayPeriod !== undefined && object.delayPeriod !== null) {
      message.delayPeriod = object.delayPeriod as Long;
    } else {
      message.delayPeriod = Long.UZERO;
    }
    return message;
  },
  toJSON(message: IdentifiedConnection): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.clientId !== undefined && (obj.clientId = message.clientId);
    if (message.versions) {
      obj.versions = message.versions.map((e) => (e ? Version.toJSON(e) : undefined));
    } else {
      obj.versions = [];
    }
    message.state !== undefined && (obj.state = stateToJSON(message.state));
    message.counterparty !== undefined &&
      (obj.counterparty = message.counterparty ? Counterparty.toJSON(message.counterparty) : undefined);
    message.delayPeriod !== undefined && (obj.delayPeriod = (message.delayPeriod || Long.UZERO).toString());
    return obj;
  },
};

export const Counterparty = {
  encode(message: Counterparty, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.clientId);
    writer.uint32(18).string(message.connectionId);
    if (message.prefix !== undefined && message.prefix !== undefined) {
      MerklePrefix.encode(message.prefix, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Counterparty {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCounterparty } as Counterparty;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        case 2:
          message.connectionId = reader.string();
          break;
        case 3:
          message.prefix = MerklePrefix.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Counterparty {
    const message = { ...baseCounterparty } as Counterparty;
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = String(object.clientId);
    } else {
      message.clientId = "";
    }
    if (object.connectionId !== undefined && object.connectionId !== null) {
      message.connectionId = String(object.connectionId);
    } else {
      message.connectionId = "";
    }
    if (object.prefix !== undefined && object.prefix !== null) {
      message.prefix = MerklePrefix.fromJSON(object.prefix);
    } else {
      message.prefix = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Counterparty>): Counterparty {
    const message = { ...baseCounterparty } as Counterparty;
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = object.clientId;
    } else {
      message.clientId = "";
    }
    if (object.connectionId !== undefined && object.connectionId !== null) {
      message.connectionId = object.connectionId;
    } else {
      message.connectionId = "";
    }
    if (object.prefix !== undefined && object.prefix !== null) {
      message.prefix = MerklePrefix.fromPartial(object.prefix);
    } else {
      message.prefix = undefined;
    }
    return message;
  },
  toJSON(message: Counterparty): unknown {
    const obj: any = {};
    message.clientId !== undefined && (obj.clientId = message.clientId);
    message.connectionId !== undefined && (obj.connectionId = message.connectionId);
    message.prefix !== undefined &&
      (obj.prefix = message.prefix ? MerklePrefix.toJSON(message.prefix) : undefined);
    return obj;
  },
};

export const ClientPaths = {
  encode(message: ClientPaths, writer: Writer = Writer.create()): Writer {
    for (const v of message.paths) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ClientPaths {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClientPaths } as ClientPaths;
    message.paths = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paths.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ClientPaths {
    const message = { ...baseClientPaths } as ClientPaths;
    message.paths = [];
    if (object.paths !== undefined && object.paths !== null) {
      for (const e of object.paths) {
        message.paths.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ClientPaths>): ClientPaths {
    const message = { ...baseClientPaths } as ClientPaths;
    message.paths = [];
    if (object.paths !== undefined && object.paths !== null) {
      for (const e of object.paths) {
        message.paths.push(e);
      }
    }
    return message;
  },
  toJSON(message: ClientPaths): unknown {
    const obj: any = {};
    if (message.paths) {
      obj.paths = message.paths.map((e) => e);
    } else {
      obj.paths = [];
    }
    return obj;
  },
};

export const ConnectionPaths = {
  encode(message: ConnectionPaths, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.clientId);
    for (const v of message.paths) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ConnectionPaths {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseConnectionPaths } as ConnectionPaths;
    message.paths = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        case 2:
          message.paths.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ConnectionPaths {
    const message = { ...baseConnectionPaths } as ConnectionPaths;
    message.paths = [];
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = String(object.clientId);
    } else {
      message.clientId = "";
    }
    if (object.paths !== undefined && object.paths !== null) {
      for (const e of object.paths) {
        message.paths.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ConnectionPaths>): ConnectionPaths {
    const message = { ...baseConnectionPaths } as ConnectionPaths;
    message.paths = [];
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = object.clientId;
    } else {
      message.clientId = "";
    }
    if (object.paths !== undefined && object.paths !== null) {
      for (const e of object.paths) {
        message.paths.push(e);
      }
    }
    return message;
  },
  toJSON(message: ConnectionPaths): unknown {
    const obj: any = {};
    message.clientId !== undefined && (obj.clientId = message.clientId);
    if (message.paths) {
      obj.paths = message.paths.map((e) => e);
    } else {
      obj.paths = [];
    }
    return obj;
  },
};

export const Version = {
  encode(message: Version, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.identifier);
    for (const v of message.features) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Version {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVersion } as Version;
    message.features = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identifier = reader.string();
          break;
        case 2:
          message.features.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Version {
    const message = { ...baseVersion } as Version;
    message.features = [];
    if (object.identifier !== undefined && object.identifier !== null) {
      message.identifier = String(object.identifier);
    } else {
      message.identifier = "";
    }
    if (object.features !== undefined && object.features !== null) {
      for (const e of object.features) {
        message.features.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<Version>): Version {
    const message = { ...baseVersion } as Version;
    message.features = [];
    if (object.identifier !== undefined && object.identifier !== null) {
      message.identifier = object.identifier;
    } else {
      message.identifier = "";
    }
    if (object.features !== undefined && object.features !== null) {
      for (const e of object.features) {
        message.features.push(e);
      }
    }
    return message;
  },
  toJSON(message: Version): unknown {
    const obj: any = {};
    message.identifier !== undefined && (obj.identifier = message.identifier);
    if (message.features) {
      obj.features = message.features.map((e) => e);
    } else {
      obj.features = [];
    }
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
