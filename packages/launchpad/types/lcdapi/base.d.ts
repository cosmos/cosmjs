import { WrappedStdTx } from "../tx";
/**
 * The mode used to send transaction
 *
 * @see https://cosmos.network/rpc/#/Transactions/post_txs
 */
export declare enum BroadcastMode {
  /** Return after tx commit */
  Block = "block",
  /** Return after CheckTx */
  Sync = "sync",
  /** Return right away */
  Async = "async",
}
/** A response from the /txs/encode endpoint */
export interface EncodeTxResponse {
  /** base64-encoded amino-binary encoded representation */
  readonly tx: string;
}
interface NodeInfo {
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
interface ApplicationVersion {
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
interface BlockId {
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
interface Block {
  readonly header: BlockHeader;
  readonly data: {
    /** Array of base64 encoded transactions */
    readonly txs: readonly string[] | null;
  };
}
export interface BlockResponse {
  readonly block_id: BlockId;
  readonly block: Block;
}
export interface TxsResponse {
  readonly height: string;
  readonly txhash: string;
  /** 🤷‍♂️ */
  readonly codespace?: string;
  /** Falsy when transaction execution succeeded. Contains error code on error. */
  readonly code?: number;
  readonly raw_log: string;
  readonly logs?: unknown[];
  readonly tx: WrappedStdTx;
  /** The gas limit as set by the user */
  readonly gas_wanted?: string;
  /** The gas used by the execution */
  readonly gas_used?: string;
  readonly timestamp: string;
}
export interface SearchTxsResponse {
  readonly total_count: string;
  readonly count: string;
  readonly page_number: string;
  readonly page_total: string;
  readonly limit: string;
  readonly txs: readonly TxsResponse[];
}
export interface BroadcastTxsResponse {
  readonly height: string;
  readonly txhash: string;
  readonly code?: number;
  /**
   * The result data of the execution (hex encoded).
   *
   * @see https://github.com/cosmos/cosmos-sdk/blob/v0.38.4/types/result.go#L101
   */
  readonly data?: string;
  readonly raw_log?: string;
  /** The same as `raw_log` but deserialized? */
  readonly logs?: unknown[];
  /** The gas limit as set by the user */
  readonly gas_wanted?: string;
  /** The gas used by the execution */
  readonly gas_used?: string;
}
export {};
