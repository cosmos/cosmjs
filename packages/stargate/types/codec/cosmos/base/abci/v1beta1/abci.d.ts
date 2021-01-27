import Long from "long";
import { Any } from "../../../../google/protobuf/any";
import { Event } from "../../../../tendermint/abci/types";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.base.abci.v1beta1";
/**
 * TxResponse defines a structure containing relevant tx data and metadata. The
 * tags are stringified and the log is JSON decoded.
 */
export interface TxResponse {
  /** The block height */
  height: Long;
  /** The transaction hash. */
  txhash: string;
  /** Namespace for the Code */
  codespace: string;
  /** Response code. */
  code: number;
  /** Result bytes, if any. */
  data: string;
  /**
   * The output of the application's logger (raw string). May be
   * non-deterministic.
   */
  rawLog: string;
  /** The output of the application's logger (typed). May be non-deterministic. */
  logs: ABCIMessageLog[];
  /** Additional information. May be non-deterministic. */
  info: string;
  /** Amount of gas requested for transaction. */
  gasWanted: Long;
  /** Amount of gas consumed by transaction. */
  gasUsed: Long;
  /** The request transaction bytes. */
  tx?: Any;
  /**
   * Time of the previous block. For heights > 1, it's the weighted median of
   * the timestamps of the valid votes in the block.LastCommit. For height == 1,
   * it's genesis time.
   */
  timestamp: string;
}
/** ABCIMessageLog defines a structure containing an indexed tx ABCI message log. */
export interface ABCIMessageLog {
  msgIndex: number;
  log: string;
  /**
   * Events contains a slice of Event objects that were emitted during some
   * execution.
   */
  events: StringEvent[];
}
/**
 * StringEvent defines en Event object wrapper where all the attributes
 * contain key/value pairs that are strings instead of raw bytes.
 */
export interface StringEvent {
  type: string;
  attributes: Attribute[];
}
/**
 * Attribute defines an attribute wrapper where the key and value are
 * strings instead of raw bytes.
 */
export interface Attribute {
  key: string;
  value: string;
}
/** GasInfo defines tx execution gas context. */
export interface GasInfo {
  /** GasWanted is the maximum units of work we allow this tx to perform. */
  gasWanted: Long;
  /** GasUsed is the amount of gas actually consumed. */
  gasUsed: Long;
}
/** Result is the union of ResponseFormat and ResponseCheckTx. */
export interface Result {
  /**
   * Data is any data returned from message or handler execution. It MUST be
   * length prefixed in order to separate data from multiple message executions.
   */
  data: Uint8Array;
  /** Log contains the log information from message or handler execution. */
  log: string;
  /**
   * Events contains a slice of Event objects that were emitted during message
   * or handler execution.
   */
  events: Event[];
}
/**
 * SimulationResponse defines the response generated when a transaction is
 * successfully simulated.
 */
export interface SimulationResponse {
  gasInfo?: GasInfo;
  result?: Result;
}
/**
 * MsgData defines the data returned in a Result object during message
 * execution.
 */
export interface MsgData {
  msgType: string;
  data: Uint8Array;
}
/**
 * TxMsgData defines a list of MsgData. A transaction will have a MsgData object
 * for each message.
 */
export interface TxMsgData {
  data: MsgData[];
}
/** SearchTxsResult defines a structure for querying txs pageable */
export interface SearchTxsResult {
  /** Count of all txs */
  totalCount: Long;
  /** Count of txs in current page */
  count: Long;
  /** Index of current page, start from 1 */
  pageNumber: Long;
  /** Count of total pages */
  pageTotal: Long;
  /** Max count txs per page */
  limit: Long;
  /** List of txs in current page */
  txs: TxResponse[];
}
export declare const TxResponse: {
  encode(message: TxResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TxResponse;
  fromJSON(object: any): TxResponse;
  fromPartial(object: DeepPartial<TxResponse>): TxResponse;
  toJSON(message: TxResponse): unknown;
};
export declare const ABCIMessageLog: {
  encode(message: ABCIMessageLog, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ABCIMessageLog;
  fromJSON(object: any): ABCIMessageLog;
  fromPartial(object: DeepPartial<ABCIMessageLog>): ABCIMessageLog;
  toJSON(message: ABCIMessageLog): unknown;
};
export declare const StringEvent: {
  encode(message: StringEvent, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StringEvent;
  fromJSON(object: any): StringEvent;
  fromPartial(object: DeepPartial<StringEvent>): StringEvent;
  toJSON(message: StringEvent): unknown;
};
export declare const Attribute: {
  encode(message: Attribute, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Attribute;
  fromJSON(object: any): Attribute;
  fromPartial(object: DeepPartial<Attribute>): Attribute;
  toJSON(message: Attribute): unknown;
};
export declare const GasInfo: {
  encode(message: GasInfo, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GasInfo;
  fromJSON(object: any): GasInfo;
  fromPartial(object: DeepPartial<GasInfo>): GasInfo;
  toJSON(message: GasInfo): unknown;
};
export declare const Result: {
  encode(message: Result, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Result;
  fromJSON(object: any): Result;
  fromPartial(object: DeepPartial<Result>): Result;
  toJSON(message: Result): unknown;
};
export declare const SimulationResponse: {
  encode(message: SimulationResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SimulationResponse;
  fromJSON(object: any): SimulationResponse;
  fromPartial(object: DeepPartial<SimulationResponse>): SimulationResponse;
  toJSON(message: SimulationResponse): unknown;
};
export declare const MsgData: {
  encode(message: MsgData, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgData;
  fromJSON(object: any): MsgData;
  fromPartial(object: DeepPartial<MsgData>): MsgData;
  toJSON(message: MsgData): unknown;
};
export declare const TxMsgData: {
  encode(message: TxMsgData, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TxMsgData;
  fromJSON(object: any): TxMsgData;
  fromPartial(object: DeepPartial<TxMsgData>): TxMsgData;
  toJSON(message: TxMsgData): unknown;
};
export declare const SearchTxsResult: {
  encode(message: SearchTxsResult, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SearchTxsResult;
  fromJSON(object: any): SearchTxsResult;
  fromPartial(object: DeepPartial<SearchTxsResult>): SearchTxsResult;
  toJSON(message: SearchTxsResult): unknown;
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
