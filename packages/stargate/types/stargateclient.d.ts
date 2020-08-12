import { Block, Coin, PubKey } from "@cosmjs/launchpad";
import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";
export interface Account {
  /** Bech32 account address */
  readonly address: string;
  readonly pubkey: PubKey | null;
  readonly accountNumber: number;
  readonly sequence: number;
}
export interface SequenceResponse {
  readonly accountNumber: number;
  readonly sequence: number;
}
export interface BroadcastTxFailure {
  readonly height: number;
  readonly code: number;
  readonly transactionHash: string;
  readonly rawLog?: string;
  readonly data?: Uint8Array;
}
export interface BroadcastTxSuccess {
  readonly height: number;
  readonly transactionHash: string;
  readonly rawLog?: string;
  readonly data?: Uint8Array;
}
export declare type BroadcastTxResponse = BroadcastTxSuccess | BroadcastTxFailure;
export declare function isBroadcastTxFailure(result: BroadcastTxResponse): result is BroadcastTxFailure;
export declare function isBroadcastTxSuccess(result: BroadcastTxResponse): result is BroadcastTxSuccess;
/**
 * Ensures the given result is a success. Throws a detailed error message otherwise.
 */
export declare function assertIsBroadcastTxSuccess(
  result: BroadcastTxResponse,
): asserts result is BroadcastTxSuccess;
/** Use for testing only */
export interface PrivateStargateClient {
  readonly tmClient: TendermintClient;
}
export declare class StargateClient {
  private readonly tmClient;
  private chainId;
  static connect(endpoint: string): Promise<StargateClient>;
  private constructor();
  getChainId(): Promise<string>;
  getHeight(): Promise<number>;
  getAccount(searchAddress: string): Promise<Account | null>;
  getSequence(address: string): Promise<SequenceResponse | null>;
  getBlock(height?: number): Promise<Block>;
  getBalance(address: string, searchDenom: string): Promise<Coin | null>;
  /**
   * Queries all balances for all denoms that belong to this address.
   *
   * Uses the grpc queries (which iterates over the store internally), and we cannot get
   * proofs from such a method.
   */
  getAllBalancesUnverified(address: string): Promise<readonly Coin[]>;
  disconnect(): void;
  broadcastTx(tx: Uint8Array): Promise<BroadcastTxResponse>;
  private queryVerified;
  private queryUnverified;
}
