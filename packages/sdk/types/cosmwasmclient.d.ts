import { Log } from "./logs";
import { TxsResponse } from "./restclient";
import { Coin, CosmosSdkTx, StdSignature } from "./types";
export interface SigningCallback {
  (signBytes: Uint8Array): Promise<StdSignature>;
}
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
export interface ExecuteResult {
  readonly logs: readonly Log[];
}
export declare class CosmWasmClient {
  static makeReadOnly(url: string): CosmWasmClient;
  static makeWritable(url: string, senderAddress: string, signCallback: SigningCallback): CosmWasmClient;
  private readonly restClient;
  private readonly signingData;
  private get senderAddress();
  private get signCallback();
  private constructor();
  chainId(): Promise<string>;
  /**
   * Returns a 32 byte upper-case hex transaction hash (typically used as the transaction ID)
   */
  getIdentifier(tx: CosmosSdkTx): Promise<string>;
  /**
   * Returns account number and sequence.
   *
   * @param address returns data for this address. When unset, the client's sender adddress is used.
   */
  getNonce(address?: string): Promise<GetNonceResult>;
  searchTx(query: SearchTxQuery): Promise<readonly TxsResponse[]>;
  postTx(tx: Uint8Array): Promise<PostTxResult>;
  /** Uploads code and returns a code ID */
  upload(wasmCode: Uint8Array, memo?: string): Promise<number>;
  instantiate(
    codeId: number,
    initMsg: object,
    memo?: string,
    transferAmount?: readonly Coin[],
  ): Promise<string>;
  execute(
    contractAddress: string,
    handleMsg: object,
    memo?: string,
    transferAmount?: readonly Coin[],
  ): Promise<ExecuteResult>;
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
