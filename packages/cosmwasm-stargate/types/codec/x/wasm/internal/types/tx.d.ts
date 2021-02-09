import { AccessConfig } from "../../../../x/wasm/internal/types/types";
import Long from "long";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmwasm.wasm.v1beta1";
/** MsgStoreCode submit Wasm code to the system */
export interface MsgStoreCode {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** WASMByteCode can be raw or gzip compressed */
  wasmByteCode: Uint8Array;
  /** Source is a valid absolute HTTPS URI to the contract's source code, optional */
  source: string;
  /** Builder is a valid docker image name with tag, optional */
  builder: string;
  /** InstantiatePermission access control to apply on contract creation, optional */
  instantiatePermission?: AccessConfig;
}
/** MsgStoreCodeResponse returns store result data. */
export interface MsgStoreCodeResponse {
  /** CodeID is the reference to the stored WASM code */
  codeId: Long;
}
/** MsgInstantiateContract create a new smart contract instance for the given code id. */
export interface MsgInstantiateContract {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** Admin is an optional address that can execute migrations */
  admin: string;
  /** CodeID is the reference to the stored WASM code */
  codeId: Long;
  /** Label is optional metadata to be stored with a contract instance. */
  label: string;
  /** InitMsg json encoded message to be passed to the contract on instantiation */
  initMsg: Uint8Array;
  /** InitFunds coins that are transferred to the contract on instantiation */
  initFunds: Coin[];
}
/** MsgInstantiateContractResponse return instantiation result data */
export interface MsgInstantiateContractResponse {
  /** Address is the bech32 address of the new contract instance. */
  address: string;
}
/** MsgExecuteContract submits the given message data to a smart contract */
export interface MsgExecuteContract {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** Msg json encoded message to be passed to the contract */
  msg: Uint8Array;
  /** SentFunds coins that are transferred to the contract on execution */
  sentFunds: Coin[];
}
/** MsgExecuteContractResponse returns execution result data. */
export interface MsgExecuteContractResponse {
  /** Data contains base64-encoded bytes to returned from the contract */
  data: Uint8Array;
}
/** MsgMigrateContract runs a code upgrade/ downgrade for a smart contract */
export interface MsgMigrateContract {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** CodeID references the new WASM code */
  codeId: Long;
  /** MigrateMsg json encoded message to be passed to the contract on migration */
  migrateMsg: Uint8Array;
}
/** MsgMigrateContractResponse returns contract migration result data. */
export interface MsgMigrateContractResponse {
  /**
   * Data contains same raw bytes returned as data from the wasm contract.
   * (May be empty)
   */
  data: Uint8Array;
}
/** MsgUpdateAdmin sets a new admin for a smart contract */
export interface MsgUpdateAdmin {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** NewAdmin address to be set */
  newAdmin: string;
  /** Contract is the address of the smart contract */
  contract: string;
}
/** MsgUpdateAdminResponse returns empty data */
export interface MsgUpdateAdminResponse {}
/** MsgClearAdmin removes any admin stored for a smart contract */
export interface MsgClearAdmin {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** Contract is the address of the smart contract */
  contract: string;
}
/** MsgClearAdminResponse returns empty data */
export interface MsgClearAdminResponse {}
export declare const MsgStoreCode: {
  encode(message: MsgStoreCode, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgStoreCode;
  fromJSON(object: any): MsgStoreCode;
  fromPartial(object: DeepPartial<MsgStoreCode>): MsgStoreCode;
  toJSON(message: MsgStoreCode): unknown;
};
export declare const MsgStoreCodeResponse: {
  encode(message: MsgStoreCodeResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgStoreCodeResponse;
  fromJSON(object: any): MsgStoreCodeResponse;
  fromPartial(object: DeepPartial<MsgStoreCodeResponse>): MsgStoreCodeResponse;
  toJSON(message: MsgStoreCodeResponse): unknown;
};
export declare const MsgInstantiateContract: {
  encode(message: MsgInstantiateContract, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgInstantiateContract;
  fromJSON(object: any): MsgInstantiateContract;
  fromPartial(object: DeepPartial<MsgInstantiateContract>): MsgInstantiateContract;
  toJSON(message: MsgInstantiateContract): unknown;
};
export declare const MsgInstantiateContractResponse: {
  encode(message: MsgInstantiateContractResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgInstantiateContractResponse;
  fromJSON(object: any): MsgInstantiateContractResponse;
  fromPartial(object: DeepPartial<MsgInstantiateContractResponse>): MsgInstantiateContractResponse;
  toJSON(message: MsgInstantiateContractResponse): unknown;
};
export declare const MsgExecuteContract: {
  encode(message: MsgExecuteContract, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgExecuteContract;
  fromJSON(object: any): MsgExecuteContract;
  fromPartial(object: DeepPartial<MsgExecuteContract>): MsgExecuteContract;
  toJSON(message: MsgExecuteContract): unknown;
};
export declare const MsgExecuteContractResponse: {
  encode(message: MsgExecuteContractResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgExecuteContractResponse;
  fromJSON(object: any): MsgExecuteContractResponse;
  fromPartial(object: DeepPartial<MsgExecuteContractResponse>): MsgExecuteContractResponse;
  toJSON(message: MsgExecuteContractResponse): unknown;
};
export declare const MsgMigrateContract: {
  encode(message: MsgMigrateContract, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgMigrateContract;
  fromJSON(object: any): MsgMigrateContract;
  fromPartial(object: DeepPartial<MsgMigrateContract>): MsgMigrateContract;
  toJSON(message: MsgMigrateContract): unknown;
};
export declare const MsgMigrateContractResponse: {
  encode(message: MsgMigrateContractResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgMigrateContractResponse;
  fromJSON(object: any): MsgMigrateContractResponse;
  fromPartial(object: DeepPartial<MsgMigrateContractResponse>): MsgMigrateContractResponse;
  toJSON(message: MsgMigrateContractResponse): unknown;
};
export declare const MsgUpdateAdmin: {
  encode(message: MsgUpdateAdmin, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgUpdateAdmin;
  fromJSON(object: any): MsgUpdateAdmin;
  fromPartial(object: DeepPartial<MsgUpdateAdmin>): MsgUpdateAdmin;
  toJSON(message: MsgUpdateAdmin): unknown;
};
export declare const MsgUpdateAdminResponse: {
  encode(_: MsgUpdateAdminResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgUpdateAdminResponse;
  fromJSON(_: any): MsgUpdateAdminResponse;
  fromPartial(_: DeepPartial<MsgUpdateAdminResponse>): MsgUpdateAdminResponse;
  toJSON(_: MsgUpdateAdminResponse): unknown;
};
export declare const MsgClearAdmin: {
  encode(message: MsgClearAdmin, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgClearAdmin;
  fromJSON(object: any): MsgClearAdmin;
  fromPartial(object: DeepPartial<MsgClearAdmin>): MsgClearAdmin;
  toJSON(message: MsgClearAdmin): unknown;
};
export declare const MsgClearAdminResponse: {
  encode(_: MsgClearAdminResponse, writer?: _m0.Writer): _m0.Writer;
  decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgClearAdminResponse;
  fromJSON(_: any): MsgClearAdminResponse;
  fromPartial(_: DeepPartial<MsgClearAdminResponse>): MsgClearAdminResponse;
  toJSON(_: MsgClearAdminResponse): unknown;
};
/** Msg defines the wasm Msg service. */
export interface Msg {
  /** StoreCode to submit Wasm code to the system */
  StoreCode(request: MsgStoreCode): Promise<MsgStoreCodeResponse>;
  /** Instantiate creates a new smart contract instance for the given code id. */
  InstantiateContract(request: MsgInstantiateContract): Promise<MsgInstantiateContractResponse>;
  /** Execute submits the given message data to a smart contract */
  ExecuteContract(request: MsgExecuteContract): Promise<MsgExecuteContractResponse>;
  /** Migrate runs a code upgrade/ downgrade for a smart contract */
  MigrateContract(request: MsgMigrateContract): Promise<MsgMigrateContractResponse>;
  /** UpdateAdmin sets a new   admin for a smart contract */
  UpdateAdmin(request: MsgUpdateAdmin): Promise<MsgUpdateAdminResponse>;
  /** ClearAdmin removes any admin stored for a smart contract */
  ClearAdmin(request: MsgClearAdmin): Promise<MsgClearAdminResponse>;
}
export declare class MsgClientImpl implements Msg {
  private readonly rpc;
  constructor(rpc: Rpc);
  StoreCode(request: MsgStoreCode): Promise<MsgStoreCodeResponse>;
  InstantiateContract(request: MsgInstantiateContract): Promise<MsgInstantiateContractResponse>;
  ExecuteContract(request: MsgExecuteContract): Promise<MsgExecuteContractResponse>;
  MigrateContract(request: MsgMigrateContract): Promise<MsgMigrateContractResponse>;
  UpdateAdmin(request: MsgUpdateAdmin): Promise<MsgUpdateAdminResponse>;
  ClearAdmin(request: MsgClearAdmin): Promise<MsgClearAdminResponse>;
}
interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
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
