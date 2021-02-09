import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmwasm.wasm.v1beta1";
/** AccessType permission types */
export declare enum AccessType {
  /** ACCESS_TYPE_UNSPECIFIED - AccessTypeUnspecified placeholder for empty value */
  ACCESS_TYPE_UNSPECIFIED = 0,
  /** ACCESS_TYPE_NOBODY - AccessTypeNobody forbidden */
  ACCESS_TYPE_NOBODY = 1,
  /** ACCESS_TYPE_ONLY_ADDRESS - AccessTypeOnlyAddress restricted to an address */
  ACCESS_TYPE_ONLY_ADDRESS = 2,
  /** ACCESS_TYPE_EVERYBODY - AccessTypeEverybody unrestricted */
  ACCESS_TYPE_EVERYBODY = 3,
  UNRECOGNIZED = -1,
}
export declare function accessTypeFromJSON(object: any): AccessType;
export declare function accessTypeToJSON(object: AccessType): string;
/** ContractCodeHistoryOperationType actions that caused a code change */
export declare enum ContractCodeHistoryOperationType {
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED - ContractCodeHistoryOperationTypeUnspecified placeholder for empty value */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED = 0,
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT - ContractCodeHistoryOperationTypeInit on chain contract instantiation */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT = 1,
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE - ContractCodeHistoryOperationTypeMigrate code migration */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE = 2,
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS - ContractCodeHistoryOperationTypeGenesis based on genesis data */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS = 3,
  UNRECOGNIZED = -1,
}
export declare function contractCodeHistoryOperationTypeFromJSON(
  object: any,
): ContractCodeHistoryOperationType;
export declare function contractCodeHistoryOperationTypeToJSON(
  object: ContractCodeHistoryOperationType,
): string;
/** AccessTypeParam */
export interface AccessTypeParam {
  value: AccessType;
}
/** AccessConfig access control type. */
export interface AccessConfig {
  permission: AccessType;
  address: string;
}
/** Params defines the set of wasm parameters. */
export interface Params {
  codeUploadAccess?: AccessConfig;
  instantiateDefaultPermission: AccessType;
  maxWasmCodeSize: Long;
}
/** CodeInfo is data for the uploaded contract WASM code */
export interface CodeInfo {
  /** CodeHash is the unique CodeID */
  codeHash: Uint8Array;
  /** Creator address who initially stored the code */
  creator: string;
  /** Source is a valid absolute HTTPS URI to the contract's source code, optional */
  source: string;
  /** Builder is a valid docker image name with tag, optional */
  builder: string;
  /** InstantiateConfig access control to apply on contract creation, optional */
  instantiateConfig?: AccessConfig;
}
/** ContractInfo stores a WASM contract instance */
export interface ContractInfo {
  /** CodeID is the reference to the stored Wasm code */
  codeId: Long;
  /** Creator address who initially instantiated the contract */
  creator: string;
  /** Admin is an optional address that can execute migrations */
  admin: string;
  /** Label is optional metadata to be stored with a contract instance. */
  label: string;
  /**
   * Created Tx position when the contract was instantiated.
   * This data should kept internal and not be exposed via query results. Just use for sorting
   */
  created?: AbsoluteTxPosition;
}
/** ContractCodeHistoryEntry metadata to a contract. */
export interface ContractCodeHistoryEntry {
  operation: ContractCodeHistoryOperationType;
  /** CodeID is the reference to the stored WASM code */
  codeId: Long;
  /** Updated Tx position when the operation was executed. */
  updated?: AbsoluteTxPosition;
  msg: Uint8Array;
}
/** AbsoluteTxPosition is a unique transaction position that allows for global ordering of transactions. */
export interface AbsoluteTxPosition {
  /** BlockHeight is the block the contract was created at */
  blockHeight: Long;
  /** TxIndex is a monotonic counter within the block (actual transaction index, or gas consumed) */
  txIndex: Long;
}
/** Model is a struct that holds a KV pair */
export interface Model {
  /** hex-encode key to read it better (this is often ascii) */
  key: Uint8Array;
  /** base64-encode raw value */
  value: Uint8Array;
}
export declare const AccessTypeParam: {
  encode(message: AccessTypeParam, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccessTypeParam;
  fromJSON(object: any): AccessTypeParam;
  fromPartial(object: DeepPartial<AccessTypeParam>): AccessTypeParam;
  toJSON(message: AccessTypeParam): unknown;
};
export declare const AccessConfig: {
  encode(message: AccessConfig, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AccessConfig;
  fromJSON(object: any): AccessConfig;
  fromPartial(object: DeepPartial<AccessConfig>): AccessConfig;
  toJSON(message: AccessConfig): unknown;
};
export declare const Params: {
  encode(message: Params, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Params;
  fromJSON(object: any): Params;
  fromPartial(object: DeepPartial<Params>): Params;
  toJSON(message: Params): unknown;
};
export declare const CodeInfo: {
  encode(message: CodeInfo, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): CodeInfo;
  fromJSON(object: any): CodeInfo;
  fromPartial(object: DeepPartial<CodeInfo>): CodeInfo;
  toJSON(message: CodeInfo): unknown;
};
export declare const ContractInfo: {
  encode(message: ContractInfo, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ContractInfo;
  fromJSON(object: any): ContractInfo;
  fromPartial(object: DeepPartial<ContractInfo>): ContractInfo;
  toJSON(message: ContractInfo): unknown;
};
export declare const ContractCodeHistoryEntry: {
  encode(message: ContractCodeHistoryEntry, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ContractCodeHistoryEntry;
  fromJSON(object: any): ContractCodeHistoryEntry;
  fromPartial(object: DeepPartial<ContractCodeHistoryEntry>): ContractCodeHistoryEntry;
  toJSON(message: ContractCodeHistoryEntry): unknown;
};
export declare const AbsoluteTxPosition: {
  encode(message: AbsoluteTxPosition, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AbsoluteTxPosition;
  fromJSON(object: any): AbsoluteTxPosition;
  fromPartial(object: DeepPartial<AbsoluteTxPosition>): AbsoluteTxPosition;
  toJSON(message: AbsoluteTxPosition): unknown;
};
export declare const Model: {
  encode(message: Model, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Model;
  fromJSON(object: any): Model;
  fromPartial(object: DeepPartial<Model>): Model;
  toJSON(message: Model): unknown;
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
