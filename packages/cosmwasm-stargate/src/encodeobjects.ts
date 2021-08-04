import { EncodeObject } from "@cosmjs/proto-signing";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "cosmjs-types/cosmwasm/wasm/v1/tx";

export interface MsgStoreCodeEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode";
  readonly value: Partial<MsgStoreCode>;
}

export function isMsgStoreCodeEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgStoreCodeEncodeObject {
  return (encodeObject as MsgStoreCodeEncodeObject).typeUrl === "/cosmwasm.wasm.v1.MsgStoreCode";
}

export interface MsgInstantiateContractEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract";
  readonly value: Partial<MsgInstantiateContract>;
}

export function isMsgInstantiateContractEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgInstantiateContractEncodeObject {
  return (
    (encodeObject as MsgInstantiateContractEncodeObject).typeUrl ===
    "/cosmwasm.wasm.v1.MsgInstantiateContract"
  );
}

export interface MsgUpdateAdminEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmwasm.wasm.v1.MsgUpdateAdmin";
  readonly value: Partial<MsgUpdateAdmin>;
}

export function isMsgUpdateAdminEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgUpdateAdminEncodeObject {
  return (encodeObject as MsgUpdateAdminEncodeObject).typeUrl === "/cosmwasm.wasm.v1.MsgUpdateAdmin";
}

export interface MsgClearAdminEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmwasm.wasm.v1.MsgClearAdmin";
  readonly value: Partial<MsgClearAdmin>;
}

export function isMsgClearAdminEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgClearAdminEncodeObject {
  return (encodeObject as MsgClearAdminEncodeObject).typeUrl === "/cosmwasm.wasm.v1.MsgClearAdmin";
}

export interface MsgMigrateContractEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmwasm.wasm.v1.MsgMigrateContract";
  readonly value: Partial<MsgMigrateContract>;
}

export function isMsgMigrateEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgMigrateContractEncodeObject {
  return (encodeObject as MsgMigrateContractEncodeObject).typeUrl === "/cosmwasm.wasm.v1.MsgMigrateContract";
}

export interface MsgExecuteContractEncodeObject extends EncodeObject {
  readonly typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract";
  readonly value: Partial<MsgExecuteContract>;
}

export function isMsgExecuteEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgExecuteContractEncodeObject {
  return (encodeObject as MsgExecuteContractEncodeObject).typeUrl === "/cosmwasm.wasm.v1.MsgExecuteContract";
}
