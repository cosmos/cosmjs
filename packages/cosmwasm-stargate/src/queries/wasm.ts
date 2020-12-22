/* eslint-disable @typescript-eslint/naming-convention */
import { JsonObject } from "@cosmjs/cosmwasm-launchpad";
import { fromUtf8, toAscii } from "@cosmjs/encoding";
import { QueryClient } from "@cosmjs/stargate";
import Long from "long";

import { cosmwasm } from "../codec";

type IQueryAllContractStateResponse = cosmwasm.wasm.v1beta1.IQueryAllContractStateResponse;
type IQueryCodesResponse = cosmwasm.wasm.v1beta1.IQueryCodesResponse;
type IQueryCodeResponse = cosmwasm.wasm.v1beta1.IQueryCodeResponse;
type IQueryContractHistoryResponse = cosmwasm.wasm.v1beta1.IQueryContractHistoryResponse;
type IQueryContractInfoResponse = cosmwasm.wasm.v1beta1.IQueryContractInfoResponse;
type IQueryContractsByCodeResponse = cosmwasm.wasm.v1beta1.IQueryContractsByCodeResponse;
type IQueryRawContractStateResponse = cosmwasm.wasm.v1beta1.IQueryRawContractStateResponse;

const { Query } = cosmwasm.wasm.v1beta1;

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

export function setupWasmExtension(base: QueryClient): WasmExtension {
  const queryService = Query.create((method: any, requestData, callback) => {
    const path = `/cosmwasm.wasm.v1beta1.Query/${method.name}`;
    base
      .queryUnverified(path, requestData)
      .then((response) => callback(null, response))
      .catch((error) => callback(error));
  });
  return {
    unverified: {
      wasm: {
        listCodeInfo: async (paginationKey?: Uint8Array) => {
          const request = paginationKey ? { pagination: { key: paginationKey } } : {};
          return queryService.codes(request);
        },
        getCode: async (id: number) => {
          const request = { codeId: Long.fromNumber(id) };
          return queryService.code(request);
        },
        listContractsByCodeId: async (id: number, paginationKey?: Uint8Array) => {
          const pagination = paginationKey ? { pagination: { key: paginationKey } } : {};
          const request = { ...pagination, codeId: Long.fromNumber(id) };
          return queryService.contractsByCode(request);
        },
        getContractInfo: async (address: string) => {
          const request = { address: address };
          return queryService.contractInfo(request);
        },

        getContractCodeHistory: async (address: string, paginationKey?: Uint8Array) => {
          const pagination = paginationKey ? { pagination: { key: paginationKey } } : {};
          const request = { ...pagination, address: address };
          return queryService.contractHistory(request);
        },

        getAllContractState: async (address: string, paginationKey?: Uint8Array) => {
          const pagination = paginationKey ? { pagination: { key: paginationKey } } : {};
          const request = { ...pagination, address: address };
          return queryService.allContractState(request);
        },

        queryContractRaw: async (address: string, key: Uint8Array) => {
          const request = { address: address, queryData: key };
          return queryService.rawContractState(request);
        },

        queryContractSmart: async (address: string, query: Record<string, unknown>) => {
          const request = { address: address, queryData: toAscii(JSON.stringify(query)) };
          const { data } = await queryService.smartContractState(request);
          // By convention, smart queries must return a valid JSON document (see https://github.com/CosmWasm/cosmwasm/issues/144)
          try {
            return JSON.parse(fromUtf8(data));
          } catch (error) {
            throw new Error("Contract did not return valid JSON data");
          }
        },
      },
    },
  };
}
