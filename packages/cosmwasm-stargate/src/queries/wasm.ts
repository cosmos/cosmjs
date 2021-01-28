/* eslint-disable @typescript-eslint/naming-convention */
import { JsonObject } from "@cosmjs/cosmwasm-launchpad";
import { fromUtf8, toAscii } from "@cosmjs/encoding";
import { QueryClient } from "@cosmjs/stargate";
import Long from "long";

import {
  QueryAllContractStateResponse,
  QueryClientImpl,
  QueryCodeResponse,
  QueryCodesResponse,
  QueryContractHistoryResponse,
  QueryContractInfoResponse,
  QueryContractsByCodeResponse,
  QueryRawContractStateResponse,
} from "../codec/x/wasm/internal/types/query";

export interface WasmExtension {
  readonly unverified: {
    readonly wasm: {
      readonly listCodeInfo: (paginationKey?: Uint8Array) => Promise<QueryCodesResponse>;
      /**
       * Downloads the original wasm bytecode by code ID.
       *
       * Throws an error if no code with this id
       */
      readonly getCode: (id: number) => Promise<QueryCodeResponse>;
      readonly listContractsByCodeId: (
        id: number,
        paginationKey?: Uint8Array,
      ) => Promise<QueryContractsByCodeResponse>;
      /**
       * Returns null when contract was not found at this address.
       */
      readonly getContractInfo: (address: string) => Promise<QueryContractInfoResponse>;
      /**
       * Returns null when contract history was not found for this address.
       */
      readonly getContractCodeHistory: (
        address: string,
        paginationKey?: Uint8Array,
      ) => Promise<QueryContractHistoryResponse>;
      /**
       * Returns all contract state.
       * This is an empty array if no such contract, or contract has no data.
       */
      readonly getAllContractState: (
        address: string,
        paginationKey?: Uint8Array,
      ) => Promise<QueryAllContractStateResponse>;
      /**
       * Returns the data at the key if present (unknown decoded json),
       * or null if no data at this (contract address, key) pair
       */
      readonly queryContractRaw: (address: string, key: Uint8Array) => Promise<QueryRawContractStateResponse>;
      /**
       * Makes a smart query on the contract and parses the response as JSON.
       * Throws error if no such contract exists, the query format is invalid or the response is invalid.
       */
      readonly queryContractSmart: (address: string, query: Record<string, unknown>) => Promise<JsonObject>;
    };
  };
}

export function setupWasmExtension(base: QueryClient): WasmExtension {
  const queryService = new QueryClientImpl({
    request: (service: string, method: string, data: Uint8Array): Promise<Uint8Array> => {
      const path = `/cosmwasm.wasm.v1beta1.Query/${method}`;
      return base.queryUnverified(path, data);
    },
  });
  return {
    unverified: {
      wasm: {
        listCodeInfo: async (paginationKey?: Uint8Array) => {
          const request = {
            pagination: {
              key: paginationKey ?? new Uint8Array(),
              offset: Long.fromNumber(0),
              limit: Long.fromNumber(0),
              countTotal: false,
            },
          };
          return queryService.Codes(request);
        },
        getCode: async (id: number) => {
          const request = { codeId: Long.fromNumber(id) };
          return queryService.Code(request);
        },
        listContractsByCodeId: async (id: number, paginationKey?: Uint8Array) => {
          const pagination = {
            pagination: {
              key: paginationKey ?? new Uint8Array(),
              offset: Long.fromNumber(0),
              limit: Long.fromNumber(0),
              countTotal: false,
            },
          };
          const request = { ...pagination, codeId: Long.fromNumber(id) };
          return queryService.ContractsByCode(request);
        },
        getContractInfo: async (address: string) => {
          const request = { address: address };
          return queryService.ContractInfo(request);
        },

        getContractCodeHistory: async (address: string, paginationKey?: Uint8Array) => {
          const pagination = {
            pagination: {
              key: paginationKey ?? new Uint8Array(),
              offset: Long.fromNumber(0),
              limit: Long.fromNumber(0),
              countTotal: false,
            },
          };
          const request = { ...pagination, address: address };
          return queryService.ContractHistory(request);
        },

        getAllContractState: async (address: string, paginationKey?: Uint8Array) => {
          const pagination = {
            pagination: {
              key: paginationKey ?? new Uint8Array(),
              offset: Long.fromNumber(0),
              limit: Long.fromNumber(0),
              countTotal: false,
            },
          };
          const request = { ...pagination, address: address };
          return queryService.AllContractState(request);
        },

        queryContractRaw: async (address: string, key: Uint8Array) => {
          const request = { address: address, queryData: key };
          return queryService.RawContractState(request);
        },

        queryContractSmart: async (address: string, query: Record<string, unknown>) => {
          const request = { address: address, queryData: toAscii(JSON.stringify(query)) };
          const { data } = await queryService.SmartContractState(request);
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
