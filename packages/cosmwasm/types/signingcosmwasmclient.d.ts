import { BroadcastMode, Coin, Msg, OfflineSigner, StdFee, StdSignature } from "@cosmjs/sdk38";
import { Account, CosmWasmClient, GetSequenceResult, PostTxResult } from "./cosmwasmclient";
import { Log } from "./logs";
export interface SigningCallback {
  (signBytes: Uint8Array): Promise<StdSignature>;
}
export interface FeeTable {
  readonly upload: StdFee;
  readonly init: StdFee;
  readonly exec: StdFee;
  readonly migrate: StdFee;
  readonly send: StdFee;
  /** Paid when setting the contract admin to a new address or unsetting it */
  readonly changeAdmin: StdFee;
}
export interface UploadMeta {
  /**
   * An URL to a .tar.gz archive of the source code of the contract, which can be used to reproducibly build the Wasm bytecode.
   *
   * @see https://github.com/CosmWasm/cosmwasm-verify
   */
  readonly source?: string;
  /**
   * A docker image (including version) to reproducibly build the Wasm bytecode from the source code.
   *
   * @example ```cosmwasm/rust-optimizer:0.8.0```
   * @see https://github.com/CosmWasm/cosmwasm-verify
   */
  readonly builder?: string;
}
export interface UploadResult {
  /** Size of the original wasm code in bytes */
  readonly originalSize: number;
  /** A hex encoded sha256 checksum of the original wasm code (that is stored on chain) */
  readonly originalChecksum: string;
  /** Size of the compressed wasm code in bytes */
  readonly compressedSize: number;
  /** A hex encoded sha256 checksum of the compressed wasm code (that stored in the transaction) */
  readonly compressedChecksum: string;
  /** The ID of the code asigned by the chain */
  readonly codeId: number;
  readonly logs: readonly Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}
/**
 * The options of an .instantiate() call.
 * All properties are optional.
 */
export interface InstantiateOptions {
  readonly memo?: string;
  readonly transferAmount?: readonly Coin[];
  /**
   * A bech32 encoded address of an admin account.
   * Caution: an admin has the privilege to upgrade a contract. If this is not desired, do not set this value.
   */
  readonly admin?: string;
}
export interface InstantiateResult {
  /** The address of the newly instantiated contract */
  readonly contractAddress: string;
  readonly logs: readonly Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}
/**
 * Result type of updateAdmin and clearAdmin
 */
export interface ChangeAdminResult {
  readonly logs: readonly Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}
export interface MigrateResult {
  readonly logs: readonly Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}
export interface ExecuteResult {
  readonly logs: readonly Log[];
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly transactionHash: string;
}
export declare class SigningCosmWasmClient extends CosmWasmClient {
  readonly senderAddress: string;
  private readonly signer;
  private readonly fees;
  /**
   * Creates a new client with signing capability to interact with a CosmWasm blockchain. This is the bigger brother of CosmWasmClient.
   *
   * This instance does a lot of caching. In order to benefit from that you should try to use one instance
   * for the lifetime of your application. When switching backends, a new instance must be created.
   *
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param senderAddress The address that will sign and send transactions using this instance
   * @param signer An implementation of OfflineSigner which can provide signatures for transactions, potentially requiring user input.
   * @param customFees The fees that are paid for transactions
   * @param broadcastMode Defines at which point of the transaction processing the postTx method (i.e. transaction broadcasting) returns
   */
  constructor(
    apiUrl: string,
    senderAddress: string,
    signer: OfflineSigner,
    customFees?: Partial<FeeTable>,
    broadcastMode?: BroadcastMode,
  );
  getSequence(address?: string): Promise<GetSequenceResult>;
  getAccount(address?: string): Promise<Account | undefined>;
  /** Uploads code and returns a receipt, including the code ID */
  upload(wasmCode: Uint8Array, meta?: UploadMeta, memo?: string): Promise<UploadResult>;
  instantiate(
    codeId: number,
    initMsg: object,
    label: string,
    options?: InstantiateOptions,
  ): Promise<InstantiateResult>;
  updateAdmin(contractAddress: string, newAdmin: string, memo?: string): Promise<ChangeAdminResult>;
  clearAdmin(contractAddress: string, memo?: string): Promise<ChangeAdminResult>;
  migrate(contractAddress: string, codeId: number, migrateMsg: object, memo?: string): Promise<MigrateResult>;
  execute(
    contractAddress: string,
    handleMsg: object,
    memo?: string,
    transferAmount?: readonly Coin[],
  ): Promise<ExecuteResult>;
  sendTokens(recipientAddress: string, transferAmount: readonly Coin[], memo?: string): Promise<PostTxResult>;
  /**
   * Gets account number and sequence from the API, creates a sign doc,
   * creates a single signature, assembles the signed transaction and broadcasts it.
   */
  signAndPost(msgs: readonly Msg[], fee: StdFee, memo?: string): Promise<PostTxResult>;
}
