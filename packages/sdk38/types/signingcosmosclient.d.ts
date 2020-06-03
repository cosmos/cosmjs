import { Coin } from "./coins";
import { Account, CosmosClient, GetNonceResult, PostTxResult } from "./cosmosclient";
import { BroadcastMode } from "./restclient";
import { StdFee, StdSignature } from "./types";
export interface SigningCallback {
  (signBytes: Uint8Array): Promise<StdSignature>;
}
export interface FeeTable {
  readonly upload: StdFee;
  readonly init: StdFee;
  readonly exec: StdFee;
  readonly send: StdFee;
}
export declare class SigningCosmosClient extends CosmosClient {
  readonly senderAddress: string;
  private readonly signCallback;
  private readonly fees;
  /**
   * Creates a new client with signing capability to interact with a CosmWasm blockchain. This is the bigger brother of CosmWasmClient.
   *
   * This instance does a lot of caching. In order to benefit from that you should try to use one instance
   * for the lifetime of your application. When switching backends, a new instance must be created.
   *
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param senderAddress The address that will sign and send transactions using this instance
   * @param signCallback An asynchonous callback to create a signature for a given transaction. This can be implemented using secure key stores that require user interaction.
   * @param customFees The fees that are paid for transactions
   * @param broadcastMode Defines at which point of the transaction processing the postTx method (i.e. transaction broadcasting) returns
   */
  constructor(
    apiUrl: string,
    senderAddress: string,
    signCallback: SigningCallback,
    customFees?: Partial<FeeTable>,
    broadcastMode?: BroadcastMode,
  );
  getNonce(address?: string): Promise<GetNonceResult>;
  getAccount(address?: string): Promise<Account | undefined>;
  sendTokens(recipientAddress: string, transferAmount: readonly Coin[], memo?: string): Promise<PostTxResult>;
}
