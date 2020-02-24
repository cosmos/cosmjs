import { CosmosSdkAccount, CosmosSdkTx, Model, StdTx } from "./types";
interface NodeInfo {
  readonly network: string;
}
interface NodeInfoResponse {
  readonly node_info: NodeInfo;
}
export interface BlockId {
  readonly hash: string;
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
  readonly result: {
    readonly type: "cosmos-sdk/Account";
    readonly value: CosmosSdkAccount;
  };
}
declare type WasmResponse<T = string> = WasmSuccess<T> | WasmError;
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
interface PostTxsParams {}
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
  readonly tx: string;
}
export interface CodeInfo {
  readonly id: number;
  /** Bech32 account address */
  readonly creator: string;
  /** Hex-encoded sha256 hash of the code stored here */
  readonly code_hash: string;
  readonly source?: string;
  readonly builder?: string;
}
export interface ContractInfo {
  readonly code_id: number;
  /** Bech32 account address */
  readonly creator: string;
  /** Argument passed on initialization of the contract */
  readonly init_msg: object;
}
interface GetCodeResult {
  readonly code: string;
}
declare type RestClientResponse =
  | NodeInfoResponse
  | BlockResponse
  | AuthAccountsResponse
  | TxsResponse
  | SearchTxsResponse
  | PostTxsResponse
  | EncodeTxResponse
  | WasmResponse<string>
  | WasmResponse<GetCodeResult>;
/**
 * The mode used to send transaction
 *
 * @see https://cosmos.network/rpc/#/Transactions/post_txs
 */
export declare enum BroadcastMode {
  /** Return after tx commit */
  Block = "block",
  /** Return afer CheckTx */
  Sync = "sync",
  /** Return right away */
  Async = "async",
}
export declare class RestClient {
  private readonly client;
  private readonly mode;
  constructor(url: string, mode?: BroadcastMode);
  get(path: string): Promise<RestClientResponse>;
  post(path: string, params: PostTxsParams): Promise<RestClientResponse>;
  authAccounts(address: string): Promise<AuthAccountsResponse>;
  blocksLatest(): Promise<BlockResponse>;
  blocks(height: number): Promise<BlockResponse>;
  nodeInfo(): Promise<NodeInfoResponse>;
  txsQuery(query: string): Promise<SearchTxsResponse>;
  txsById(id: string): Promise<TxsResponse>;
  /** returns the amino-encoding of the transaction performed by the server */
  encodeTx(tx: CosmosSdkTx): Promise<Uint8Array>;
  /**
   * Broadcasts a signed transaction to into the transaction pool.
   * Depending on the RestClient's broadcast mode, this might or might
   * wait for checkTx or deliverTx to be executed before returning.
   *
   * @param tx a signed transaction as StdTx (i.e. not wrapped in type/value container)
   */
  postTx(tx: StdTx): Promise<PostTxsResponse>;
  listCodeInfo(): Promise<readonly CodeInfo[]>;
  getCode(id: number): Promise<Uint8Array>;
  listContractAddresses(): Promise<readonly string[]>;
  listContractsByCodeId(id: number): Promise<readonly ContractInfo[]>;
  getContractInfo(address: string): Promise<ContractInfo>;
  getAllContractState(address: string): Promise<readonly Model[]>;
  queryContractRaw(address: string, key: Uint8Array): Promise<Uint8Array | null>;
  queryContractSmart(address: string, query: object): Promise<Uint8Array>;
}
export {};
