import Long from "long";
import { MerklePrefix } from "../../../../ibc/core/commitment/v1/commitment";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "ibc.core.connection.v1";
/**
 * State defines if a connection is in one of the following states:
 * INIT, TRYOPEN, OPEN or UNINITIALIZED.
 */
export declare enum State {
  /** STATE_UNINITIALIZED_UNSPECIFIED - Default State */
  STATE_UNINITIALIZED_UNSPECIFIED = 0,
  /** STATE_INIT - A connection end has just started the opening handshake. */
  STATE_INIT = 1,
  /**
   * STATE_TRYOPEN - A connection end has acknowledged the handshake step on the counterparty
   * chain.
   */
  STATE_TRYOPEN = 2,
  /** STATE_OPEN - A connection end has completed the handshake. */
  STATE_OPEN = 3,
  UNRECOGNIZED = -1,
}
export declare function stateFromJSON(object: any): State;
export declare function stateToJSON(object: State): string;
/**
 * ConnectionEnd defines a stateful object on a chain connected to another
 * separate one.
 * NOTE: there must only be 2 defined ConnectionEnds to establish
 * a connection between two chains.
 */
export interface ConnectionEnd {
  /** client associated with this connection. */
  clientId: string;
  /**
   * IBC version which can be utilised to determine encodings or protocols for
   * channels or packets utilising this connection.
   */
  versions: Version[];
  /** current state of the connection end. */
  state: State;
  /** counterparty chain associated with this connection. */
  counterparty?: Counterparty;
  /**
   * delay period that must pass before a consensus state can be used for packet-verification
   * NOTE: delay period logic is only implemented by some clients.
   */
  delayPeriod: Long;
}
/**
 * IdentifiedConnection defines a connection with additional connection
 * identifier field.
 */
export interface IdentifiedConnection {
  /** connection identifier. */
  id: string;
  /** client associated with this connection. */
  clientId: string;
  /**
   * IBC version which can be utilised to determine encodings or protocols for
   * channels or packets utilising this connection
   */
  versions: Version[];
  /** current state of the connection end. */
  state: State;
  /** counterparty chain associated with this connection. */
  counterparty?: Counterparty;
  /** delay period associated with this connection. */
  delayPeriod: Long;
}
/** Counterparty defines the counterparty chain associated with a connection end. */
export interface Counterparty {
  /**
   * identifies the client on the counterparty chain associated with a given
   * connection.
   */
  clientId: string;
  /**
   * identifies the connection end on the counterparty chain associated with a
   * given connection.
   */
  connectionId: string;
  /** commitment merkle prefix of the counterparty chain. */
  prefix?: MerklePrefix;
}
/** ClientPaths define all the connection paths for a client state. */
export interface ClientPaths {
  /** list of connection paths */
  paths: string[];
}
/** ConnectionPaths define all the connection paths for a given client state. */
export interface ConnectionPaths {
  /** client state unique identifier */
  clientId: string;
  /** list of connection paths */
  paths: string[];
}
/**
 * Version defines the versioning scheme used to negotiate the IBC verison in
 * the connection handshake.
 */
export interface Version {
  /** unique version identifier */
  identifier: string;
  /** list of features compatible with the specified identifier */
  features: string[];
}
export declare const ConnectionEnd: {
  encode(message: ConnectionEnd, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ConnectionEnd;
  fromJSON(object: any): ConnectionEnd;
  fromPartial(object: DeepPartial<ConnectionEnd>): ConnectionEnd;
  toJSON(message: ConnectionEnd): unknown;
};
export declare const IdentifiedConnection: {
  encode(message: IdentifiedConnection, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): IdentifiedConnection;
  fromJSON(object: any): IdentifiedConnection;
  fromPartial(object: DeepPartial<IdentifiedConnection>): IdentifiedConnection;
  toJSON(message: IdentifiedConnection): unknown;
};
export declare const Counterparty: {
  encode(message: Counterparty, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Counterparty;
  fromJSON(object: any): Counterparty;
  fromPartial(object: DeepPartial<Counterparty>): Counterparty;
  toJSON(message: Counterparty): unknown;
};
export declare const ClientPaths: {
  encode(message: ClientPaths, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ClientPaths;
  fromJSON(object: any): ClientPaths;
  fromPartial(object: DeepPartial<ClientPaths>): ClientPaths;
  toJSON(message: ClientPaths): unknown;
};
export declare const ConnectionPaths: {
  encode(message: ConnectionPaths, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ConnectionPaths;
  fromJSON(object: any): ConnectionPaths;
  fromPartial(object: DeepPartial<ConnectionPaths>): ConnectionPaths;
  toJSON(message: ConnectionPaths): unknown;
};
export declare const Version: {
  encode(message: Version, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Version;
  fromJSON(object: any): Version;
  fromPartial(object: DeepPartial<Version>): Version;
  toJSON(message: Version): unknown;
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
