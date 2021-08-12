import { EncodeObject } from "@cosmjs/proto-signing";
import { MsgClearAdmin, MsgExecuteContract, MsgInstantiateContract, MsgMigrateContract, MsgStoreCode, MsgUpdateAdmin } from "cosmjs-types/cosmwasm/wasm/v1/tx";
export interface MsgStoreCodeEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode";
    readonly value: Partial<MsgStoreCode>;
}
export declare function isMsgStoreCodeEncodeObject(encodeObject: EncodeObject): encodeObject is MsgStoreCodeEncodeObject;
export interface MsgInstantiateContractEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract";
    readonly value: Partial<MsgInstantiateContract>;
}
export declare function isMsgInstantiateContractEncodeObject(encodeObject: EncodeObject): encodeObject is MsgInstantiateContractEncodeObject;
export interface MsgUpdateAdminEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmwasm.wasm.v1.MsgUpdateAdmin";
    readonly value: Partial<MsgUpdateAdmin>;
}
export declare function isMsgUpdateAdminEncodeObject(encodeObject: EncodeObject): encodeObject is MsgUpdateAdminEncodeObject;
export interface MsgClearAdminEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmwasm.wasm.v1.MsgClearAdmin";
    readonly value: Partial<MsgClearAdmin>;
}
export declare function isMsgClearAdminEncodeObject(encodeObject: EncodeObject): encodeObject is MsgClearAdminEncodeObject;
export interface MsgMigrateContractEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmwasm.wasm.v1.MsgMigrateContract";
    readonly value: Partial<MsgMigrateContract>;
}
export declare function isMsgMigrateEncodeObject(encodeObject: EncodeObject): encodeObject is MsgMigrateContractEncodeObject;
export interface MsgExecuteContractEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract";
    readonly value: Partial<MsgExecuteContract>;
}
export declare function isMsgExecuteEncodeObject(encodeObject: EncodeObject): encodeObject is MsgExecuteContractEncodeObject;
