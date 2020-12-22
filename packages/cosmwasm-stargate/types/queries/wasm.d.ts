import { JsonObject } from "@cosmjs/cosmwasm-launchpad";
import { QueryClient } from "@cosmjs/stargate";
import { cosmwasm } from "../codec";
declare type IQueryAllContractStateResponse = cosmwasm.wasm.v1beta1.IQueryAllContractStateResponse;
declare type IQueryCodesResponse = cosmwasm.wasm.v1beta1.IQueryCodesResponse;
declare type IQueryCodeResponse = cosmwasm.wasm.v1beta1.IQueryCodeResponse;
declare type IQueryContractHistoryResponse = cosmwasm.wasm.v1beta1.IQueryContractHistoryResponse;
declare type IQueryContractInfoResponse = cosmwasm.wasm.v1beta1.IQueryContractInfoResponse;
declare type IQueryContractsByCodeResponse = cosmwasm.wasm.v1beta1.IQueryContractsByCodeResponse;
declare type IQueryRawContractStateResponse = cosmwasm.wasm.v1beta1.IQueryRawContractStateResponse;
export interface WasmExtension {
  readonly unverified: {
    readonly wasm: {
      readonly listCodeInfo: (paginationKey?: Uint8Array) => Promise<IQueryCodesResponse>;
      /**
       * Downloads the original wasm bytecode by code ID.
       *
       * Throws an error if no code with this id
       */
      readonly getCode: (id: number) => Promise<IQueryCodeResponse>;
      readonly listContractsByCodeId: (
        id: number,
        paginationKey?: Uint8Array,
      ) => Promise<IQueryContractsByCodeResponse>;
      /**
       * Returns null when contract was not found at this address.
       */
      readonly getContractInfo: (address: string) => Promise<IQueryContractInfoResponse>;
      /**
       * Returns null when contract history was not found for this address.
       */
      readonly getContractCodeHistory: (
        address: string,
        paginationKey?: Uint8Array,
      ) => Promise<IQueryContractHistoryResponse>;
      /**
       * Returns all contract state.
       * This is an empty array if no such contract, or contract has no data.
       */
      readonly getAllContractState: (
        address: string,
        paginationKey?: Uint8Array,
      ) => Promise<IQueryAllContractStateResponse>;
      /**
       * Returns the data at the key if present (unknown decoded json),
       * or null if no data at this (contract address, key) pair
       */
      readonly queryContractRaw: (
        address: string,
        key: Uint8Array,
      ) => Promise<IQueryRawContractStateResponse>;
      /**
       * Makes a smart query on the contract and parses the response as JSON.
       * Throws error if no such contract exists, the query format is invalid or the response is invalid.
       */
      readonly queryContractSmart: (address: string, query: Record<string, unknown>) => Promise<JsonObject>;
    };
  };
}
export declare function setupWasmExtension(base: QueryClient): WasmExtension;
export {};
