import { AminoTx, BaseAccount } from "./types";
interface NodeInfo {
  readonly network: string;
}
interface NodeInfoResponse {
  readonly node_info: NodeInfo;
}
interface BlockMeta {
  readonly header: {
    readonly height: number;
    readonly time: string;
    readonly num_txs: number;
  };
  readonly block_id: {
    readonly hash: string;
  };
}
interface Block {
  readonly header: {
    readonly height: number;
  };
}
interface BlocksResponse {
  readonly block_meta: BlockMeta;
  readonly block: Block;
}
interface AuthAccountsResponse {
  readonly result: {
    readonly value: BaseAccount;
  };
}
export interface TxsResponse {
  readonly height: string;
  readonly txhash: string;
  readonly raw_log: string;
  readonly tx: AminoTx;
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
interface PostTxsResponse {
  readonly height: string;
  readonly txhash: string;
  readonly code?: number;
  readonly raw_log?: string;
}
declare type RestClientResponse =
  | NodeInfoResponse
  | BlocksResponse
  | AuthAccountsResponse
  | TxsResponse
  | SearchTxsResponse
  | PostTxsResponse;
declare type BroadcastMode = "block" | "sync" | "async";
export declare class RestClient {
  private readonly client;
  private readonly mode;
  constructor(url: string, mode?: BroadcastMode);
  get(path: string): Promise<RestClientResponse>;
  post(path: string, params: PostTxsParams): Promise<RestClientResponse>;
  nodeInfo(): Promise<NodeInfoResponse>;
  blocksLatest(): Promise<BlocksResponse>;
  blocks(height: number): Promise<BlocksResponse>;
  authAccounts(address: string, height?: string): Promise<AuthAccountsResponse>;
  txs(query: string): Promise<SearchTxsResponse>;
  txsById(id: string): Promise<TxsResponse>;
  postTx(tx: Uint8Array): Promise<PostTxsResponse>;
}
export {};
