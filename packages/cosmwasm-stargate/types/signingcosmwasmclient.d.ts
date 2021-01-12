import {
  ChangeAdminResult,
  CosmWasmFeeTable,
  ExecuteResult,
  InstantiateOptions,
  InstantiateResult,
  MigrateResult,
  UploadMeta,
  UploadResult,
} from "@cosmjs/cosmwasm-launchpad";
import { Coin, CosmosFeeTable, GasLimits, GasPrice, StdFee } from "@cosmjs/launchpad";
import { EncodeObject, OfflineDirectSigner, Registry } from "@cosmjs/proto-signing";
import { BroadcastTxResponse } from "@cosmjs/stargate";
import { CosmWasmClient } from "./cosmwasmclient";
export interface SigningCosmWasmClientOptions {
  readonly registry?: Registry;
  readonly gasPrice?: GasPrice;
  readonly gasLimits?: GasLimits<CosmosFeeTable>;
}
/** Use for testing only */
export interface PrivateSigningCosmWasmClient {
  readonly fees: CosmWasmFeeTable;
}
export declare class SigningCosmWasmClient extends CosmWasmClient {
  private readonly fees;
  private readonly registry;
  private readonly signer;
  static connectWithWallet(
    endpoint: string,
    signer: OfflineDirectSigner,
    options?: SigningCosmWasmClientOptions,
  ): Promise<SigningCosmWasmClient>;
  private constructor();
  /** Uploads code and returns a receipt, including the code ID */
  upload(
    senderAddress: string,
    wasmCode: Uint8Array,
    meta?: UploadMeta,
    memo?: string,
  ): Promise<UploadResult>;
  instantiate(
    senderAddress: string,
    codeId: number,
    initMsg: Record<string, unknown>,
    label: string,
    options?: InstantiateOptions,
  ): Promise<InstantiateResult>;
  updateAdmin(
    senderAddress: string,
    contractAddress: string,
    newAdmin: string,
    memo?: string,
  ): Promise<ChangeAdminResult>;
  clearAdmin(senderAddress: string, contractAddress: string, memo?: string): Promise<ChangeAdminResult>;
  migrate(
    senderAddress: string,
    contractAddress: string,
    codeId: number,
    migrateMsg: Record<string, unknown>,
    memo?: string,
  ): Promise<MigrateResult>;
  execute(
    senderAddress: string,
    contractAddress: string,
    handleMsg: Record<string, unknown>,
    memo?: string,
    transferAmount?: readonly Coin[],
  ): Promise<ExecuteResult>;
  sendTokens(
    senderAddress: string,
    recipientAddress: string,
    transferAmount: readonly Coin[],
    memo?: string,
  ): Promise<BroadcastTxResponse>;
  /**
   * Creates a transaction with the given messages, fee and memo. Then signs and broadcasts the transaction.
   *
   * @param signerAddress The address that will sign transactions using this instance. The signer must be able to sign with this address.
   * @param messages
   * @param fee
   * @param memo
   */
  signAndBroadcast(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo?: string,
  ): Promise<BroadcastTxResponse>;
}
