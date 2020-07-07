import { fromBase64, fromUtf8, toHex, toUtf8 } from "@cosmjs/encoding";
import { LcdApiArray, LcdClient, LcdModule, normalizeLcdApiArray } from "@cosmjs/sdk38";

import { JsonObject, Model, parseWasmData, WasmData } from "../types";

type WasmResponse<T> = WasmSuccess<T> | WasmError;

interface WasmSuccess<T> {
  readonly height: string;
  readonly result: T;
}

interface WasmError {
  readonly error: string;
}

export interface CodeInfo {
  readonly id: number;
  /** Bech32 account address */
  readonly creator: string;
  /** Hex-encoded sha256 hash of the code stored here */
  readonly data_hash: string;
  /**
   * An URL to a .tar.gz archive of the source code of the contract, which can be used to reproducibly build the Wasm bytecode.
   *
   * @see https://github.com/CosmWasm/cosmwasm-verify
   */
  readonly source?: string;
  /**
   * A docker image (including version) to reproducibly build the Wasm bytecode from the source code.
   *
   * @example ```cosmwasm/rust-optimizer:0.8.0```
   * @see https://github.com/CosmWasm/cosmwasm-verify
   */
  readonly builder?: string;
}

export interface CodeDetails extends CodeInfo {
  /** Base64 encoded raw wasm data */
  readonly data: string;
}

// This is list view, without contract info
export interface ContractInfo {
  readonly address: string;
  readonly code_id: number;
  /** Bech32 account address */
  readonly creator: string;
  /** Bech32-encoded admin address */
  readonly admin?: string;
  readonly label: string;
}

export interface ContractDetails extends ContractInfo {
  /** Argument passed on initialization of the contract */
  readonly init_msg: object;
}

interface SmartQueryResponse {
  // base64 encoded response
  readonly smart: string;
}

function isWasmError<T>(resp: WasmResponse<T>): resp is WasmError {
  return (resp as WasmError).error !== undefined;
}

function unwrapWasmResponse<T>(response: WasmResponse<T>): T {
  if (isWasmError(response)) {
    throw new Error(response.error);
  }
  return response.result;
}

/**
 * @see https://github.com/cosmwasm/wasmd/blob/master/x/wasm/client/rest/query.go#L19-L27
 */
export interface WasmModule extends LcdModule {
  readonly listCodeInfo: () => Promise<readonly CodeInfo[]>;

  /**
   * Downloads the original wasm bytecode by code ID.
   *
   * Throws an error if no code with this id
   */
  readonly getCode: (id: number) => Promise<CodeDetails>;

  readonly listContractsByCodeId: (id: number) => Promise<readonly ContractInfo[]>;

  /**
   * Returns null when contract was not found at this address.
   */
  readonly getContractInfo: (address: string) => Promise<ContractDetails | null>;

  /**
   * Returns all contract state.
   * This is an empty array if no such contract, or contract has no data.
   */
  readonly getAllContractState: (address: string) => Promise<readonly Model[]>;

  /**
   * Returns the data at the key if present (unknown decoded json),
   * or null if no data at this (contract address, key) pair
   */
  readonly queryContractRaw: (address: string, key: Uint8Array) => Promise<Uint8Array | null>;

  /**
   * Makes a smart query on the contract and parses the reponse as JSON.
   * Throws error if no such contract exists, the query format is invalid or the response is invalid.
   */
  readonly queryContractSmart: (address: string, query: object) => Promise<JsonObject>;
}

export function setupWasmModule(base: LcdClient): WasmModule {
  return {
    listCodeInfo: async () => {
      const path = `/wasm/code`;
      const responseData = (await base.get(path)) as WasmResponse<LcdApiArray<CodeInfo>>;
      return normalizeLcdApiArray(unwrapWasmResponse(responseData));
    },
    getCode: async (id: number) => {
      const path = `/wasm/code/${id}`;
      const responseData = (await base.get(path)) as WasmResponse<CodeDetails>;
      return unwrapWasmResponse(responseData);
    },
    listContractsByCodeId: async (id: number) => {
      const path = `/wasm/code/${id}/contracts`;
      const responseData = (await base.get(path)) as WasmResponse<LcdApiArray<ContractInfo>>;
      return normalizeLcdApiArray(unwrapWasmResponse(responseData));
    },
    getContractInfo: async (address: string) => {
      const path = `/wasm/contract/${address}`;
      const response = (await base.get(path)) as WasmResponse<ContractDetails | null>;
      return unwrapWasmResponse(response);
    },
    getAllContractState: async (address: string) => {
      const path = `/wasm/contract/${address}/state`;
      const responseData = (await base.get(path)) as WasmResponse<LcdApiArray<WasmData>>;
      return normalizeLcdApiArray(unwrapWasmResponse(responseData)).map(parseWasmData);
    },
    queryContractRaw: async (address: string, key: Uint8Array) => {
      const hexKey = toHex(key);
      const path = `/wasm/contract/${address}/raw/${hexKey}?encoding=hex`;
      const responseData = (await base.get(path)) as WasmResponse<WasmData[]>;
      const data = unwrapWasmResponse(responseData);
      return data.length === 0 ? null : fromBase64(data[0].val);
    },
    queryContractSmart: async (address: string, query: object) => {
      const encoded = toHex(toUtf8(JSON.stringify(query)));
      const path = `/wasm/contract/${address}/smart/${encoded}?encoding=hex`;
      const responseData = (await base.get(path)) as WasmResponse<SmartQueryResponse>;
      const result = unwrapWasmResponse(responseData);
      // By convention, smart queries must return a valid JSON document (see https://github.com/CosmWasm/cosmwasm/issues/144)
      return JSON.parse(fromUtf8(fromBase64(result.smart)));
    },
  };
}
