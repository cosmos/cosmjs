import { Stream } from "xstream";
import { Adaptor } from "./adaptor";
import * as requests from "./requests";
import * as responses from "./responses";
import { RpcClient } from "./rpcclients";
export declare class Client {
  static connect(url: string): Promise<Client>;
  static detectVersion(client: RpcClient): Promise<Client>;
  private readonly client;
  private readonly p;
  private readonly r;
  constructor(client: RpcClient, adaptor: Adaptor);
  disconnect(): void;
  abciInfo(): Promise<responses.AbciInfoResponse>;
  abciQuery(params: requests.AbciQueryParams): Promise<responses.AbciQueryResponse>;
  block(height?: number): Promise<responses.BlockResponse>;
  blockResults(height?: number): Promise<responses.BlockResultsResponse>;
  blockchain(minHeight?: number, maxHeight?: number): Promise<responses.BlockchainResponse>;
  /**
   * Broadcast transaction to mempool and wait for response
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_sync
   */
  broadcastTxSync(params: requests.BroadcastTxParams): Promise<responses.BroadcastTxSyncResponse>;
  /**
   * Broadcast transaction to mempool and do not wait for result
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async
   */
  broadcastTxAsync(params: requests.BroadcastTxParams): Promise<responses.BroadcastTxAsyncResponse>;
  /**
   * Broadcast transaction to mempool and wait for block
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_commit
   */
  broadcastTxCommit(params: requests.BroadcastTxParams): Promise<responses.BroadcastTxCommitResponse>;
  commit(height?: number): Promise<responses.CommitResponse>;
  genesis(): Promise<responses.GenesisResponse>;
  health(): Promise<responses.HealthResponse>;
  status(): Promise<responses.StatusResponse>;
  subscribeNewBlock(): Stream<responses.NewBlockEvent>;
  subscribeNewBlockHeader(): Stream<responses.NewBlockHeaderEvent>;
  subscribeTx(query?: requests.QueryString): Stream<responses.TxEvent>;
  /**
   * Get a single transaction by hash
   *
   * @see https://docs.tendermint.com/master/rpc/#/Info/tx
   */
  tx(params: requests.TxParams): Promise<responses.TxResponse>;
  /**
   * Search for transactions that are in a block
   *
   * @see https://docs.tendermint.com/master/rpc/#/Info/tx_search
   */
  txSearch(params: requests.TxSearchParams): Promise<responses.TxSearchResponse>;
  txSearchAll(params: requests.TxSearchParams): Promise<responses.TxSearchResponse>;
  validators(height?: number): Promise<responses.ValidatorsResponse>;
  private doCall;
  private subscribe;
}
