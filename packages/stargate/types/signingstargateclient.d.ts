import { Coin, CosmosFeeTable, GasLimits, GasPrice, StdFee } from "@cosmjs/launchpad";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { AminoTypes } from "./aminotypes";
import { BroadcastTxResponse, StargateClient } from "./stargateclient";
export declare const defaultRegistryTypes: ReadonlyArray<[string, GeneratedType]>;
/** Use for testing only */
export interface PrivateSigningStargateClient {
  readonly fees: CosmosFeeTable;
  readonly registry: Registry;
}
export interface SigningStargateClientOptions {
  readonly registry?: Registry;
  readonly aminoTypes?: AminoTypes;
  readonly prefix?: string;
  readonly gasPrice?: GasPrice;
  readonly gasLimits?: GasLimits<CosmosFeeTable>;
}
export declare class SigningStargateClient extends StargateClient {
  private readonly fees;
  private readonly registry;
  private readonly signer;
  private readonly aminoTypes;
  static connectWithSigner(
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
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo?: string,
  ): Promise<BroadcastTxResponse>;
}
