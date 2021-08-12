"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWasmExtension = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const encoding_1 = require("@cosmjs/encoding");
const stargate_1 = require("@cosmjs/stargate");
const query_1 = require("cosmjs-types/cosmwasm/wasm/v1/query");
const long_1 = __importDefault(require("long"));
function setupWasmExtension(base) {
    const rpc = stargate_1.createProtobufRpcClient(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new query_1.QueryClientImpl(rpc);
    return {
        wasm: {
            listCodeInfo: async (paginationKey) => {
                const request = {
                    pagination: stargate_1.createPagination(paginationKey),
                };
                return queryService.Codes(request);
            },
            getCode: async (id) => {
                const request = { codeId: long_1.default.fromNumber(id) };
                return queryService.Code(request);
            },
            listContractsByCodeId: async (id, paginationKey) => {
                const request = {
                    codeId: long_1.default.fromNumber(id),
                    pagination: stargate_1.createPagination(paginationKey),
                };
                return queryService.ContractsByCode(request);
            },
            getContractInfo: async (address) => {
                const request = { address: address };
                return queryService.ContractInfo(request);
            },
            getContractCodeHistory: async (address, paginationKey) => {
                const request = {
                    address: address,
                    pagination: stargate_1.createPagination(paginationKey),
                };
                return queryService.ContractHistory(request);
            },
            getAllContractState: async (address, paginationKey) => {
                const request = {
                    address: address,
                    pagination: stargate_1.createPagination(paginationKey),
                };
                return queryService.AllContractState(request);
            },
            queryContractRaw: async (address, key) => {
                const request = { address: address, queryData: key };
                return queryService.RawContractState(request);
            },
            queryContractSmart: async (address, query) => {
                const request = { address: address, queryData: encoding_1.toAscii(JSON.stringify(query)) };
                const { data } = await queryService.SmartContractState(request);
                // By convention, smart queries must return a valid JSON document (see https://github.com/CosmWasm/cosmwasm/issues/144)
                try {
                    return JSON.parse(encoding_1.fromUtf8(data));
                }
                catch (error) {
                    throw new Error("Contract did not return valid JSON data");
                }
            },
        },
    };
}
exports.setupWasmExtension = setupWasmExtension;
//# sourceMappingURL=wasm.js.map