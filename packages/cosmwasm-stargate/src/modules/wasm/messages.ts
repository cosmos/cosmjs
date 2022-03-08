import { toUtf8 } from "@cosmjs/encoding";
import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { isNonNullObject } from "@cosmjs/utils";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "cosmjs-types/cosmwasm/wasm/v1/tx";
import Long from "long";

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

/**
 * Takes a JSON representation of the Go implementation and imports it into CosmJS types
 *
 * The Go JSON and the ts-proto JSON are not compatible, i.e. we have to implement every
 * message individually.
 */
export function importWasmMessages(
  json: string,
): Array<MsgExecuteContractEncodeObject | MsgInstantiateContractEncodeObject> {
  const doc = JSON.parse(json);
  if (!Array.isArray(doc)) throw new Error("Array expected");
  const out = [];
  for (const element of doc) {
    if (!isNonNullObject(element)) throw new Error("Element must be an object");
    if (!("@type" in element)) throw new Error("Element is missing a @type field");
    const typeUrl = (element as any)["@type"];
    if (typeof typeUrl !== "string") throw new Error("Element's @type fiels must be a string");
    switch (typeUrl) {
      case "/cosmwasm.wasm.v1.MsgExecuteContract": {
        // console.log(element);
        const msg: MsgExecuteContractEncodeObject = {
          typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
          value: MsgExecuteContract.fromPartial({
            sender: (element as any).sender,
            contract: (element as any).contract,
            msg: toUtf8(JSON.stringify((element as any).msg)),
            funds: (element as any).funds,
          }),
        };
        out.push(msg);
        break;
      }
      case "/cosmwasm.wasm.v1.MsgInstantiateContract": {
        // console.log(element);
        const msg: MsgInstantiateContractEncodeObject = {
          typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
          value: MsgInstantiateContract.fromPartial({
            sender: (element as any).sender,
            admin: (element as any).admin,
            codeId: Long.fromString((element as any).code_id, true, 10),
            label: (element as any).label,
            msg: toUtf8(JSON.stringify((element as any).msg)),
            funds: (element as any).funds,
          }),
        };
        out.push(msg);
        break;
      }
      default:
        throw new Error(`Unsupported message type '${typeUrl}' found.`);
    }
  }
  return out;
}
