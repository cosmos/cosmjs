import { Encoding, isNonNullObject } from "@iov/encoding";
import axios, { AxiosError, AxiosInstance } from "axios";

import { Coin, CosmosSdkTx, JsonObject, Model, parseWasmData, StdTx, WasmData } from "./types";

const { fromBase64, fromUtf8, toHex, toUtf8 } = Encoding;

export interface CosmosSdkAccount {
  /** Bech32 account address */
  readonly address: string;
  readonly coins: ReadonlyArray<Coin>;
  /** Bech32 encoded pubkey */
  readonly public_key: string;
  readonly account_number: number;
  readonly sequence: number;
}

export interface NodeInfo {
  readonly protocol_version: {
    readonly p2p: string;
    readonly block: string;
    readonly app: string;
  };
  readonly id: string;
  readonly listen_addr: string;
  readonly network: string;
  readonly version: string;
  readonly channels: string;
  readonly moniker: string;
  readonly other: {
    readonly tx_index: string;
    readonly rpc_address: string;
  };
}

export interface ApplicationVersion {
  readonly name: string;
  readonly server_name: string;
  readonly client_name: string;
  readonly version: string;
  readonly commit: string;
  readonly build_tags: string;
  readonly go: string;
}

export interface NodeInfoResponse {
  readonly node_info: NodeInfo;
  readonly application_version: ApplicationVersion;
}

export interface BlockId {
  readonly hash: string;
  // TODO: here we also have this
  // parts: {
  //   total: '1',
  //   hash: '7AF200C78FBF9236944E1AB270F4045CD60972B7C265E3A9DA42973397572931'
  // }
}

export interface BlockHeader {
  readonly version: {
    readonly block: string;
    readonly app: string;
  };
  readonly height: string;
  readonly chain_id: string;
  /** An RFC 3339 time string like e.g. '2020-02-15T10:39:10.4696305Z' */
  readonly time: string;
  readonly last_commit_hash: string;
  readonly last_block_id: BlockId;
  /** Can be empty */
  readonly data_hash: string;
  readonly validators_hash: string;
  readonly next_validators_hash: string;
  readonly consensus_hash: string;
  readonly app_hash: string;
  /** Can be empty */
  readonly last_results_hash: string;
  /** Can be empty */
  readonly evidence_hash: string;
  readonly proposer_address: string;
}

export interface Block {
  readonly header: BlockHeader;
  readonly data: {
    /** Array of base64 encoded transactions */
    readonly txs: ReadonlyArray<string> | null;
  };
}

export interface BlockResponse {
  readonly block_id: BlockId;
  readonly block: Block;
}

interface AuthAccountsResponse {
  readonly height: string;
  readonly result: {
    readonly type: "cosmos-sdk/Account";
    readonly value: CosmosSdkAccount;
  };
}

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

interface SearchTxsResponse {
  readonly total_count: string;
  readonly count: string;
  readonly page_number: string;
  readonly page_total: string;
  readonly limit: string;
  readonly txs: readonly TxsResponse[];
}

export interface PostTxsResponse {
  readonly height: string;
  readonly txhash: string;
  readonly code?: number;
  readonly raw_log?: string;
  /** The same as `raw_log` but deserialized? */
  readonly logs?: object;
  /** The gas limit as set by the user */
  readonly gas_wanted?: string;
  /** The gas used by the execution */
  readonly gas_used?: string;
}

interface EncodeTxResponse {
  // base64-encoded amino-binary encoded representation
  readonly tx: string;
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

type RestClientResponse =
  | NodeInfoResponse
  | BlockResponse
  | AuthAccountsResponse
  | TxsResponse
  | SearchTxsResponse
  | PostTxsResponse
  | EncodeTxResponse
  | WasmResponse<string>
  | WasmResponse<CodeInfo[]>
  | WasmResponse<CodeDetails>
  | WasmResponse<ContractInfo[] | null>
  | WasmResponse<ContractDetails | null>;

/** Unfortunately, Cosmos SDK encodes empty arrays as null */
type CosmosSdkArray<T> = ReadonlyArray<T> | null;

function normalizeArray<T>(backend: CosmosSdkArray<T>): ReadonlyArray<T> {
  return backend || [];
}

/**
 * The mode used to send transaction
 *
 * @see https://cosmos.network/rpc/#/Transactions/post_txs
 */
export enum BroadcastMode {
  /** Return after tx commit */
  Block = "block",
  /** Return afer CheckTx */
  Sync = "sync",
  /** Return right away */
  Async = "async",
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

// We want to get message data from 500 errors
// https://stackoverflow.com/questions/56577124/how-to-handle-500-error-message-with-axios
// this should be chained to catch one error and throw a more informative one
function parseAxiosError(err: AxiosError): never {
  // use the error message sent from server, not default 500 msg
  if (err.response?.data) {
    let errorText: string;
    const data = err.response.data;
    // expect { error: string }, but otherwise dump
    if (data.error && typeof data.error === "string") {
      errorText = data.error;
    } else if (typeof data === "string") {
      errorText = data;
    } else {
      errorText = JSON.stringify(data);
    }
    throw new Error(`${errorText} (HTTP ${err.response.status})`);
  } else {
    throw err;
  }
}

export class RestClient {
  private readonly client: AxiosInstance;
  private readonly broadcastMode: BroadcastMode;

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
    const headers = {
      post: { "Content-Type": "application/json" },
    };
    this.client = axios.create({
      baseURL: apiUrl,
      headers: headers,
    });
    this.broadcastMode = broadcastMode;
  }

  public async get(path: string): Promise<RestClientResponse> {
    const { data } = await this.client.get(path).catch(parseAxiosError);
    if (data === null) {
      throw new Error("Received null response from server");
    }
    return data;
  }

  public async post(path: string, params: any): Promise<RestClientResponse> {
    if (!isNonNullObject(params)) throw new Error("Got unexpected type of params. Expected object.");
    const { data } = await this.client.post(path, params).catch(parseAxiosError);
    if (data === null) {
      throw new Error("Received null response from server");
    }
    return data;
  }

  // The /auth endpoints

  public async authAccounts(address: string): Promise<AuthAccountsResponse> {
    const path = `/auth/accounts/${address}`;
    const responseData = await this.get(path);
    if ((responseData as any).result.type !== "cosmos-sdk/Account") {
      throw new Error("Unexpected response data format");
    }
    return responseData as AuthAccountsResponse;
  }

  // The /blocks endpoints

  public async blocksLatest(): Promise<BlockResponse> {
    const responseData = await this.get("/blocks/latest");
    if (!(responseData as any).block) {
      throw new Error("Unexpected response data format");
    }
    return responseData as BlockResponse;
  }

  public async blocks(height: number): Promise<BlockResponse> {
    const responseData = await this.get(`/blocks/${height}`);
    if (!(responseData as any).block) {
      throw new Error("Unexpected response data format");
    }
    return responseData as BlockResponse;
  }

  // The /node_info endpoint

  public async nodeInfo(): Promise<NodeInfoResponse> {
    const responseData = await this.get("/node_info");
    if (!(responseData as any).node_info) {
      throw new Error("Unexpected response data format");
    }
    return responseData as NodeInfoResponse;
  }

  // The /txs endpoints

  public async txById(id: string): Promise<TxsResponse> {
    const responseData = await this.get(`/txs/${id}`);
    if (!(responseData as any).tx) {
      throw new Error("Unexpected response data format");
    }
    return responseData as TxsResponse;
  }

  public async txsQuery(query: string): Promise<SearchTxsResponse> {
    const responseData = await this.get(`/txs?${query}`);
    if (!(responseData as any).txs) {
      throw new Error("Unexpected response data format");
    }
    return responseData as SearchTxsResponse;
  }

  /** returns the amino-encoding of the transaction performed by the server */
  public async encodeTx(tx: CosmosSdkTx): Promise<Uint8Array> {
    const responseData = await this.post("/txs/encode", tx);
    if (!(responseData as any).tx) {
      throw new Error("Unexpected response data format");
    }
    return Encoding.fromBase64((responseData as EncodeTxResponse).tx);
  }

  /**
   * Broadcasts a signed transaction to into the transaction pool.
   * Depending on the RestClient's broadcast mode, this might or might
   * wait for checkTx or deliverTx to be executed before returning.
   *
   * @param tx a signed transaction as StdTx (i.e. not wrapped in type/value container)
   */
  public async postTx(tx: StdTx): Promise<PostTxsResponse> {
    const params = {
      tx: tx,
      mode: this.broadcastMode,
    };
    const responseData = await this.post("/txs", params);
    if (!(responseData as any).txhash) {
      throw new Error("Unexpected response data format");
    }
    return responseData as PostTxsResponse;
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
