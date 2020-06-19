import { BroadcastMode, RestClient as BaseRestClient } from "@cosmjs/sdk38";
import { JsonObject, Model } from "./types";
export interface CodeInfo {
  readonly id: number;
  /** Bech32 account address */
  readonly creator: string;
  /** Hex-encoded sha256 hash of the code stored here */
  readonly data_hash: string;
  readonly source?: string;
  readonly builder?: string;
}
export interface CodeDetails extends CodeInfo {
  /** Base64 encoded raw wasm data */
  readonly data: string;
}
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
export declare class RestClient extends BaseRestClient {
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
  constructor(apiUrl: string, broadcastMode?: BroadcastMode);
  listCodeInfo(): Promise<readonly CodeInfo[]>;
  getCode(id: number): Promise<CodeDetails>;
  listContractsByCodeId(id: number): Promise<readonly ContractInfo[]>;
  /**
   * Returns null when contract was not found at this address.
   */
  getContractInfo(address: string): Promise<ContractDetails | null>;
  getAllContractState(address: string): Promise<readonly Model[]>;
  queryContractRaw(address: string, key: Uint8Array): Promise<Uint8Array | null>;
  /**
   * Makes a smart query on the contract and parses the reponse as JSON.
   * Throws error if no such contract exists, the query format is invalid or the response is invalid.
   */
  queryContractSmart(address: string, query: object): Promise<JsonObject>;
}
