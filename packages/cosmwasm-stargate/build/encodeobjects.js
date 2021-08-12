"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMsgExecuteEncodeObject = exports.isMsgMigrateEncodeObject = exports.isMsgClearAdminEncodeObject = exports.isMsgUpdateAdminEncodeObject = exports.isMsgInstantiateContractEncodeObject = exports.isMsgStoreCodeEncodeObject = void 0;
function isMsgStoreCodeEncodeObject(encodeObject) {
    return encodeObject.typeUrl === "/cosmwasm.wasm.v1.MsgStoreCode";
}
exports.isMsgStoreCodeEncodeObject = isMsgStoreCodeEncodeObject;
function isMsgInstantiateContractEncodeObject(encodeObject) {
    return (encodeObject.typeUrl ===
        "/cosmwasm.wasm.v1.MsgInstantiateContract");
}
exports.isMsgInstantiateContractEncodeObject = isMsgInstantiateContractEncodeObject;
function isMsgUpdateAdminEncodeObject(encodeObject) {
    return encodeObject.typeUrl === "/cosmwasm.wasm.v1.MsgUpdateAdmin";
}
exports.isMsgUpdateAdminEncodeObject = isMsgUpdateAdminEncodeObject;
function isMsgClearAdminEncodeObject(encodeObject) {
    return encodeObject.typeUrl === "/cosmwasm.wasm.v1.MsgClearAdmin";
}
exports.isMsgClearAdminEncodeObject = isMsgClearAdminEncodeObject;
function isMsgMigrateEncodeObject(encodeObject) {
    return encodeObject.typeUrl === "/cosmwasm.wasm.v1.MsgMigrateContract";
}
exports.isMsgMigrateEncodeObject = isMsgMigrateEncodeObject;
function isMsgExecuteEncodeObject(encodeObject) {
    return encodeObject.typeUrl === "/cosmwasm.wasm.v1.MsgExecuteContract";
}
exports.isMsgExecuteEncodeObject = isMsgExecuteEncodeObject;
//# sourceMappingURL=encodeobjects.js.map