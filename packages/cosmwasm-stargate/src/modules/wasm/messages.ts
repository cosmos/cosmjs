import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "cosmjs-types/cosmwasm/wasm/v1/tx";

export const wasmTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/cosmwasm.wasm.v1.MsgClearAdmin", MsgClearAdmin],
  ["/cosmwasm.wasm.v1.MsgExecuteContract", MsgExecuteContract],
  ["/cosmwasm.wasm.v1.MsgMigrateContract", MsgMigrateContract],
  ["/cosmwasm.wasm.v1.MsgStoreCode", MsgStoreCode],
  ["/cosmwasm.wasm.v1.MsgInstantiateContract", MsgInstantiateContract],
  ["/cosmwasm.wasm.v1.MsgUpdateAdmin", MsgUpdateAdmin],
];

export interface MsgStoreCodeEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode";
  readonly value: Partial<MsgStoreCode>;
}

export function isMsgStoreCodeEncodeObject(object: EncodeObject): object is MsgStoreCodeEncodeObject {
  return (object as MsgStoreCodeEncodeObject).typeUrl === "/cosmwasm.wasm.v1.MsgStoreCode";
}

export interface MsgInstantiateContractEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract";
  readonly value: Partial<MsgInstantiateContract>;
}

export function isMsgInstantiateContractEncodeObject(
  object: EncodeObject,
): object is MsgInstantiateContractEncodeObject {
  return (
    (object as MsgInstantiateContractEncodeObject).typeUrl === "/cosmwasm.wasm.v1.MsgInstantiateContract"
  );
}

export interface MsgUpdateAdminEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmwasm.wasm.v1.MsgUpdateAdmin";
  readonly value: Partial<MsgUpdateAdmin>;
}

export function isMsgUpdateAdminEncodeObject(object: EncodeObject): object is MsgUpdateAdminEncodeObject {
  return (object as MsgUpdateAdminEncodeObject).typeUrl === "/cosmwasm.wasm.v1.MsgUpdateAdmin";
}

export interface MsgClearAdminEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmwasm.wasm.v1.MsgClearAdmin";
  readonly value: Partial<MsgClearAdmin>;
}

export function isMsgClearAdminEncodeObject(object: EncodeObject): object is MsgClearAdminEncodeObject {
  return (object as MsgClearAdminEncodeObject).typeUrl === "/cosmwasm.wasm.v1.MsgClearAdmin";
}

export interface MsgMigrateContractEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmwasm.wasm.v1.MsgMigrateContract";
  readonly value: Partial<MsgMigrateContract>;
}

export function isMsgMigrateEncodeObject(object: EncodeObject): object is MsgMigrateContractEncodeObject {
  return (object as MsgMigrateContractEncodeObject).typeUrl === "/cosmwasm.wasm.v1.MsgMigrateContract";
}

export interface MsgExecuteContractEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract";
  readonly value: Partial<MsgExecuteContract>;
}

export function isMsgExecuteEncodeObject(object: EncodeObject): object is MsgExecuteContractEncodeObject {
  return (object as MsgExecuteContractEncodeObject).typeUrl === "/cosmwasm.wasm.v1.MsgExecuteContract";
}
