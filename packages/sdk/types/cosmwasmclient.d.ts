import { Log } from "./logs";
import { BlockResponse, BroadcastMode, RestClient, TxsResponse } from "./restclient";
import { CosmosSdkAccount, CosmosSdkTx, StdTx } from "./types";
export interface GetNonceResult {
  readonly accountNumber: number;
  readonly sequence: number;
}
export interface PostTxResult {
  readonly logs: readonly Log[];
  readonly rawLog: string;
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-exmpty upper-case hex */
  readonly transactionHash: string;
}
export interface SearchByIdQuery {
  readonly id: string;
}
export interface SearchByHeightQuery {
  readonly height: number;
}
export interface SearchBySentFromOrToQuery {
  readonly sentFromOrTo: string;
}
export declare type SearchTxQuery = SearchByIdQuery | SearchByHeightQuery | SearchBySentFromOrToQuery;
export declare class CosmWasmClient {
  protected readonly restClient: RestClient;
  constructor(url: string, broadcastMode?: BroadcastMode);
  chainId(): Promise<string>;
  /**
   * Returns a 32 byte upper-case hex transaction hash (typically used as the transaction ID)
   */
  getIdentifier(tx: CosmosSdkTx): Promise<string>;
  /**
   * Returns account number and sequence.
   *
   * Throws if the account does not exist on chain.
   *
   * @param address returns data for this address. When unset, the client's sender adddress is used.
   */
  getNonce(address: string): Promise<GetNonceResult>;
  getAccount(address: string): Promise<CosmosSdkAccount | undefined>;
  /**
   * Gets block header and meta
   *
   * @param height The height of the block. If undefined, the latest height is used.
   */
  getBlock(height?: number): Promise<BlockResponse>;
  searchTx(query: SearchTxQuery): Promise<readonly TxsResponse[]>;
  postTx(tx: StdTx): Promise<PostTxResult>;
  /**
   * Returns the data at the key if present (raw contract dependent storage data)
   * or null if no data at this key.
   *
   * Promise is rejected when contract does not exist.
   */
  queryContractRaw(address: string, key: Uint8Array): Promise<Uint8Array | null>;
  /**
   * Makes a "smart query" on the contract, returns raw data
   *
   * Promise is rejected when contract does not exist.
   * Promise is rejected for invalid query format.
   */
  queryContractSmart(address: string, queryMsg: object): Promise<Uint8Array>;
}
