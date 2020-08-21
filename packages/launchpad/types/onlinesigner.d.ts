import { BroadcastTxResult } from "./cosmosclient";
import { AuthExtension, BroadcastMode, LcdClient } from "./lcdapi";
import { Msg } from "./msgs";
import { StdFee } from "./types";
import { AccountData, OfflineSigner } from "./wallet";
export interface SignRequest {
  readonly msgs: readonly Msg[];
  readonly chainId: string;
  readonly fee?: StdFee;
  readonly memo?: string;
}
/**
 * OnlineSigner sends a set of messages to be signed to a network-connected signer.
 * This signer holds the private key needed to sign, and is able to set proper parameters,
 * like account number and sequence. Possibly gas and fees.
 */
export interface OnlineSigner {
  readonly enable: () => Promise<boolean>;
  readonly getAccounts: () => Promise<readonly AccountData[]>;
  /**
   * Signs with whichever key corresponds to provided bech32-encoded address. Rejects if not enabled.
   * Will query chain for account_number and sequence number if not set by caller.
   * Will auto-set fee if not set by caller
   *
   * Will submit to the blockchain and return the BroadcastTxResult (even when rejected by the chain)
   * Promise will only error on network connectivity issues, not on rejected tx.
   */
  readonly signAndBroadcast: (address: string, request: SignRequest) => Promise<BroadcastTxResult>;
}
export declare class InProcessOnlineSigner implements OnlineSigner {
  protected readonly signer: OfflineSigner;
  protected readonly lcdClient: LcdClient & AuthExtension;
  /**
   * This is a default implementation of an OnlineSigner that
   * takes and OfflineSigner and an LcdEndpoint in order to provide all needed functionality
   * for signing.
   *
   * @param signer An OfflineSigner that holds the keys
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param broadcastMode Defines at which point of the transaction processing the broadcastTx method returns
   */
  constructor(signer: OfflineSigner, apiUrl: string, broadcastMode?: BroadcastMode);
  enable(): Promise<boolean>;
  getAccounts(): Promise<readonly AccountData[]>;
  signAndBroadcast(address: string, request: SignRequest): Promise<BroadcastTxResult>;
  private broadcastTx;
  private getSequence;
}
