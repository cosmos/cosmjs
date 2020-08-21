import { fromHex } from "@cosmjs/encoding";
import { Uint53 } from "@cosmjs/math";

import { BroadcastTxResult } from "./cosmosclient";
import { makeSignBytes } from "./encoding";
import { AuthExtension, BroadcastMode, LcdClient, setupAuthExtension } from "./lcdapi";
import { parseLogs } from "./logs";
import { Msg } from "./msgs";
import { StdFee, StdTx } from "./types";
import { AccountData, OfflineSigner } from "./wallet";

export interface SignRequest {
  // required fields
  readonly msgs: readonly Msg[];
  readonly chainId: string;
  // optionally set by client, if unset auto-generated by the OnlineSigner before signing
  readonly accountNumber?: string;
  readonly fee?: StdFee;
  readonly sequence?: string;
  // fully optional (never set by signer)
  readonly memo?: string;
}

/**
 * OnlineSigner sends a set of messages to be signed to a network-connected signer.
 * This signer holds the private key needed to sign, and is able to set proper parameters,
 * like account number and sequence. Possibly gas and fees.
 */
export interface OnlineSigner {
  /*
   * must call once and succeed before using the signer (login / authorization step)
   */
  readonly enable: () => Promise<boolean>;

  /*
   * Get AccountData array from wallet. Rejects if not enabled.
   */
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

interface SequenceInfo {
  readonly accountNumber: string | number;
  readonly sequence: string | number;
}

export class InProcessOnlineSigner implements OnlineSigner {
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
  public constructor(signer: OfflineSigner, apiUrl: string, broadcastMode = BroadcastMode.Block) {
    this.signer = signer;
    this.lcdClient = LcdClient.withExtensions(
      { apiUrl: apiUrl, broadcastMode: broadcastMode },
      setupAuthExtension,
    );
  }

  public async enable(): Promise<boolean> {
    return true;
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    return this.signer.getAccounts();
  }

  public async signAndBroadcast(address: string, request: SignRequest): Promise<BroadcastTxResult> {
    // never overridden
    const { msgs, chainId } = request;
    const memo = request.memo || "";

    // set these if not set
    let accountNumber: string | number | undefined = request.accountNumber;
    let sequence: string | number | undefined = request.sequence;
    if (accountNumber === undefined || sequence === undefined) {
      const accountInfo = await this.getSequence(address);
      if (accountNumber === undefined) {
        accountNumber = accountInfo.accountNumber;
      }
      if (sequence === undefined) {
        sequence = accountInfo.sequence;
      }
    }

    // set fee if not set (TODO properly)
    const { fee } = request;
    if (fee === undefined) {
      throw new Error("TODO: not implemented: setting fee in OnlineSigner");
    }

    const signBytes = makeSignBytes(msgs, fee, chainId, memo, accountNumber, sequence);
    const signature = await this.signer.sign(address, signBytes);
    const signedTx: StdTx = {
      msg: msgs,
      fee: fee,
      memo: memo,
      signatures: [signature],
    };
    return this.broadcastTx(signedTx);
  }

  // helper function, maybe public?
  private async broadcastTx(tx: StdTx): Promise<BroadcastTxResult> {
    const result = await this.lcdClient.broadcastTx(tx);
    if (!result.txhash.match(/^([0-9A-F][0-9A-F])+$/)) {
      throw new Error("Received ill-formatted txhash. Must be non-empty upper-case hex");
    }

    return result.code !== undefined
      ? {
          height: Uint53.fromString(result.height).toNumber(),
          transactionHash: result.txhash,
          code: result.code,
          rawLog: result.raw_log || "",
        }
      : {
          logs: result.logs ? parseLogs(result.logs) : [],
          rawLog: result.raw_log || "",
          transactionHash: result.txhash,
          data: result.data ? fromHex(result.data) : undefined,
        };
  }

  // helper function, maybe public?
  private async getSequence(address: string): Promise<SequenceInfo> {
    const account = await this.lcdClient.auth.account(address);
    const value = account.result.value;
    if (value.address === "") {
      throw new Error(
        "Account does not exist on chain. Send some tokens there before trying to query sequence.",
      );
    }
    return {
      accountNumber: value.account_number,
      sequence: value.sequence,
    };
  }
}
