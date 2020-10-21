import { Coin, CosmosFeeTable, GasLimits, GasPrice, StdFee } from "@cosmjs/launchpad";
import { EncodeObject, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { BroadcastTxResponse, StargateClient } from "./stargateclient";
/** Use for testing only */
export interface PrivateSigningStargateClient {
  readonly fees: CosmosFeeTable;
  readonly registry: Registry;
}
export interface SigningStargateClientOptions {
  readonly registry?: Registry;
  readonly gasPrice?: GasPrice;
  readonly gasLimits?: GasLimits<CosmosFeeTable>;
}
export declare class SigningStargateClient extends StargateClient {
  private readonly fees;
  private readonly registry;
  private readonly signer;
  static connectWithWallet(
    endpoint: string,
    signer: OfflineSigner,
    options?: SigningStargateClientOptions,
  ): Promise<SigningStargateClient>;
  private constructor();
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
