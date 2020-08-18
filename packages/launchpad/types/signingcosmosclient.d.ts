import { Coin } from "./coins";
import { Account, BroadcastTxResult, CosmosClient, GetSequenceResult } from "./cosmosclient";
import { BroadcastMode } from "./lcdapi";
import { Msg } from "./msgs";
import { StdFee } from "./types";
import { OfflineSigner } from "./wallet";
/**
 * These fees are used by the higher level methods of SigningCosmosClient
 */
export interface FeeTable {
  readonly send: StdFee;
}
export declare class GasPrice {
  readonly amount: number;
  readonly denom: string;
  constructor(amount: number, denom: string);
}
export declare type GasLimits = {
  readonly [key in keyof FeeTable]: number;
};
export declare class SigningCosmosClient extends CosmosClient {
  readonly senderAddress: string;
  private readonly signer;
  private readonly fees;
  /**
   * Creates a new client with signing capability to interact with a Cosmos SDK blockchain. This is the bigger brother of CosmosClient.
   *
   * This instance does a lot of caching. In order to benefit from that you should try to use one instance
   * for the lifetime of your application. When switching backends, a new instance must be created.
   *
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param senderAddress The address that will sign and send transactions using this instance
   * @param signer An implementation of OfflineSigner which can provide signatures for transactions, potentially requiring user input.
   * @param gasPrice The price paid per unit of gas
   * @param gasLimits Custom overrides for gas limits related to specific transaction types
   * @param broadcastMode Defines at which point of the transaction processing the broadcastTx method returns
   */
  constructor(
    apiUrl: string,
    senderAddress: string,
    signer: OfflineSigner,
    gasPrice?: GasPrice,
    gasLimits?: Partial<GasLimits>,
    broadcastMode?: BroadcastMode,
  );
  getSequence(address?: string): Promise<GetSequenceResult>;
  getAccount(address?: string): Promise<Account | undefined>;
  sendTokens(
    recipientAddress: string,
    transferAmount: readonly Coin[],
    memo?: string,
  ): Promise<BroadcastTxResult>;
  /**
   * Gets account number and sequence from the API, creates a sign doc,
   * creates a single signature, assembles the signed transaction and broadcasts it.
   */
  signAndBroadcast(msgs: readonly Msg[], fee: StdFee, memo?: string): Promise<BroadcastTxResult>;
}
