import { fromBase64, fromUtf8, toHex, toUtf8 } from "@cosmjs/encoding";
import { BroadcastMode, CosmosSdkTx, RestClient as BaseRestClient } from "@cosmjs/sdk38";

import { JsonObject, Model, parseWasmData, WasmData } from "./types";

// Currently all wasm query responses return json-encoded strings...
// later deprecate this and use the specific types for result
// (assuming it is inlined, no second parse needed)
type WasmResponse<T = string> = WasmSuccess<T> | WasmError;

interface WasmSuccess<T = string> {
  readonly height: string;
  readonly result: T;
}

interface WasmError {
  readonly error: string;
}

export interface TxsResponse {
  readonly height: string;
  readonly txhash: string;
  /** 🤷‍♂️ */
  readonly codespace?: string;
  /** Falsy when transaction execution succeeded. Contains error code on error. */
  readonly code?: number;
  readonly raw_log: string;
  readonly logs?: object;
  readonly tx: CosmosSdkTx;
  /** The gas limit as set by the user */
  readonly gas_wanted?: string;
  /** The gas used by the execution */
  readonly gas_used?: string;
  readonly timestamp: string;
}

export interface CodeInfo {
  readonly id: number;
  /** Bech32 account address */
  readonly creator: string;
  /** Hex-encoded sha256 hash of the code stored here */
  readonly data_hash: string;
  // TODO: these are not supported in current wasmd
  readonly source?: string;
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

/** Unfortunately, Cosmos SDK encodes empty arrays as null */
type CosmosSdkArray<T> = ReadonlyArray<T> | null;

function normalizeArray<T>(backend: CosmosSdkArray<T>): ReadonlyArray<T> {
  return backend || [];
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

export class RestClient extends BaseRestClient {
  /**
   * Creates a new client to interact with a Cosmos SDK light client daemon.
   * This class tries to be a direct mapping onto the API. Some basic decoding and normalizatin is done
   * but things like caching are done at a higher level.
   *
   * When building apps, you should not need to use this class directly. If you do, this indicates a missing feature
   * in higher level components. Feel free to raise an issue in this case.
   *
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param broadcastMode Defines at which point of the transaction processing the postTx method (i.e. transaction broadcasting) returns
   */
  public constructor(apiUrl: string, broadcastMode = BroadcastMode.Block) {
    super(apiUrl, broadcastMode);
  }

  // The /wasm endpoints

  // wasm rest queries are listed here: https://github.com/cosmwasm/wasmd/blob/master/x/wasm/client/rest/query.go#L19-L27
  public async listCodeInfo(): Promise<readonly CodeInfo[]> {
    const path = `/wasm/code`;
    const responseData = (await this.get(path)) as WasmResponse<CosmosSdkArray<CodeInfo>>;
    return normalizeArray(unwrapWasmResponse(responseData));
  }

  // this will download the original wasm bytecode by code id
  // throws error if no code with this id
  public async getCode(id: number): Promise<CodeDetails> {
    const path = `/wasm/code/${id}`;
    const responseData = (await this.get(path)) as WasmResponse<CodeDetails>;
    return unwrapWasmResponse(responseData);
  }

  public async listContractsByCodeId(id: number): Promise<readonly ContractInfo[]> {
    const path = `/wasm/code/${id}/contracts`;
    const responseData = (await this.get(path)) as WasmResponse<CosmosSdkArray<ContractInfo>>;
    return normalizeArray(unwrapWasmResponse(responseData));
  }

  /**
   * Returns null when contract was not found at this address.
   */
  public async getContractInfo(address: string): Promise<ContractDetails | null> {
    const path = `/wasm/contract/${address}`;
    const response = (await this.get(path)) as WasmResponse<ContractDetails | null>;
    return unwrapWasmResponse(response);
  }

  // Returns all contract state.
  // This is an empty array if no such contract, or contract has no data.
  public async getAllContractState(address: string): Promise<readonly Model[]> {
    const path = `/wasm/contract/${address}/state`;
    const responseData = (await this.get(path)) as WasmResponse<CosmosSdkArray<WasmData>>;
    return normalizeArray(unwrapWasmResponse(responseData)).map(parseWasmData);
  }

  // Returns the data at the key if present (unknown decoded json),
  // or null if no data at this (contract address, key) pair
  public async queryContractRaw(address: string, key: Uint8Array): Promise<Uint8Array | null> {
    const hexKey = toHex(key);
    const path = `/wasm/contract/${address}/raw/${hexKey}?encoding=hex`;
    const responseData = (await this.get(path)) as WasmResponse<WasmData[]>;
    const data = unwrapWasmResponse(responseData);
    return data.length === 0 ? null : fromBase64(data[0].val);
  }

  /**
   * Makes a smart query on the contract and parses the reponse as JSON.
   * Throws error if no such contract exists, the query format is invalid or the response is invalid.
   */
  public async queryContractSmart(address: string, query: object): Promise<JsonObject> {
    const encoded = toHex(toUtf8(JSON.stringify(query)));
    const path = `/wasm/contract/${address}/smart/${encoded}?encoding=hex`;
    const responseData = (await this.get(path)) as WasmResponse<SmartQueryResponse>;
    const result = unwrapWasmResponse(responseData);
    // By convention, smart queries must return a valid JSON document (see https://github.com/CosmWasm/cosmwasm/issues/144)
    return JSON.parse(fromUtf8(fromBase64(result.smart)));
  }
}
