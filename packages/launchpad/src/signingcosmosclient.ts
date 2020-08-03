/* eslint-disable @typescript-eslint/naming-convention */
import { Coin, coins } from "./coins";
import { Account, BroadcastTxResult, CosmosClient, GetSequenceResult } from "./cosmosclient";
import { makeSignBytes } from "./encoding";
import { BroadcastMode } from "./lcdapi";
import { Msg, MsgSend } from "./msgs";
import { StdFee, StdTx } from "./types";
import { OfflineSigner } from "./wallet";

/**
 * Those fees are used by the higher level methods of SigningCosmosClient
 */
export interface FeeTable {
  readonly send: StdFee;
}

const defaultFees: FeeTable = {
  send: {
    amount: coins(2000, "ucosm"),
    gas: "80000", // 80k
  },
};

export class SigningCosmosClient extends CosmosClient {
  public readonly senderAddress: string;

  private readonly signer: OfflineSigner;
  private readonly fees: FeeTable;

  /**
   * Creates a new client with signing capability to interact with a Cosmos SDK blockchain. This is the bigger brother of CosmosClient.
   *
   * This instance does a lot of caching. In order to benefit from that you should try to use one instance
   * for the lifetime of your application. When switching backends, a new instance must be created.
   *
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param senderAddress The address that will sign and send transactions using this instance
   * @param signer An implementation of OfflineSigner which can provide signatures for transactions, potentially requiring user input.
   * @param customFees The fees that are paid for transactions
   * @param broadcastMode Defines at which point of the transaction processing the broadcastTx method returns
   */
  public constructor(
    apiUrl: string,
    senderAddress: string,
    signer: OfflineSigner,
    customFees?: Partial<FeeTable>,
    broadcastMode = BroadcastMode.Block,
  ) {
    super(apiUrl, broadcastMode);
    this.anyValidAddress = senderAddress;

    this.senderAddress = senderAddress;
    this.signer = signer;
    this.fees = { ...defaultFees, ...(customFees || {}) };
  }

  public async getSequence(address?: string): Promise<GetSequenceResult> {
    return super.getSequence(address || this.senderAddress);
  }

  public async getAccount(address?: string): Promise<Account | undefined> {
    return super.getAccount(address || this.senderAddress);
  }

  public async sendTokens(
    recipientAddress: string,
    transferAmount: readonly Coin[],
    memo = "",
  ): Promise<BroadcastTxResult> {
    const sendMsg: MsgSend = {
      type: "cosmos-sdk/MsgSend",
      value: {
        from_address: this.senderAddress,
        to_address: recipientAddress,
        amount: transferAmount,
      },
    };
    return this.signAndBroadcast([sendMsg], this.fees.send, memo);
  }

  /**
   * Gets account number and sequence from the API, creates a sign doc,
   * creates a single signature, assembles the signed transaction and broadcasts it.
   */
  public async signAndBroadcast(msgs: readonly Msg[], fee: StdFee, memo = ""): Promise<BroadcastTxResult> {
    const { accountNumber, sequence } = await this.getSequence();
    const chainId = await this.getChainId();
    const signBytes = makeSignBytes(msgs, fee, chainId, memo, accountNumber, sequence);
    const signature = await this.signer.sign(this.senderAddress, signBytes);
    const signedTx: StdTx = {
      msg: msgs,
      fee: fee,
      memo: memo,
      signatures: [signature],
    };
    return this.broadcastTx(signedTx);
  }
}
