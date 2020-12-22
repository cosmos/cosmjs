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
import { EncodeObject, OfflineSigner, Registry } from "@cosmjs/proto-signing";
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
  private readonly aminoTypes;
  static connectWithWallet(
    endpoint: string,
    signer: OfflineSigner,
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
  signAndBroadcast(
    address: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo?: string,
  ): Promise<BroadcastTxResponse>;
}
