import { Coin, coins } from "./coins";
import { Account, CosmosClient, GetNonceResult, PostTxResult } from "./cosmosclient";
import { makeSignBytes } from "./encoding";
import { MsgSend } from "./msgs";
import { BroadcastMode } from "./restclient";
import { StdFee, StdSignature, StdTx } from "./types";

export interface SigningCallback {
  (signBytes: Uint8Array): Promise<StdSignature>;
}

export interface FeeTable {
  readonly upload: StdFee;
  readonly init: StdFee;
  readonly exec: StdFee;
  readonly send: StdFee;
}

const defaultFees: FeeTable = {
  upload: {
    amount: coins(25000, "ucosm"),
    gas: "1000000", // one million
  },
  init: {
    amount: coins(12500, "ucosm"),
    gas: "500000", // 500k
  },
  exec: {
    amount: coins(5000, "ucosm"),
    gas: "200000", // 200k
  },
  send: {
    amount: coins(2000, "ucosm"),
    gas: "80000", // 80k
  },
};

export class SigningCosmosClient extends CosmosClient {
  public readonly senderAddress: string;

  private readonly signCallback: SigningCallback;
  private readonly fees: FeeTable;

  /**
   * Creates a new client with signing capability to interact with a CosmWasm blockchain. This is the bigger brother of CosmWasmClient.
   *
   * This instance does a lot of caching. In order to benefit from that you should try to use one instance
   * for the lifetime of your application. When switching backends, a new instance must be created.
   *
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param senderAddress The address that will sign and send transactions using this instance
   * @param signCallback An asynchonous callback to create a signature for a given transaction. This can be implemented using secure key stores that require user interaction.
   * @param customFees The fees that are paid for transactions
   * @param broadcastMode Defines at which point of the transaction processing the postTx method (i.e. transaction broadcasting) returns
   */
  public constructor(
    apiUrl: string,
    senderAddress: string,
    signCallback: SigningCallback,
    customFees?: Partial<FeeTable>,
    broadcastMode = BroadcastMode.Block,
  ) {
    super(apiUrl, broadcastMode);
    this.anyValidAddress = senderAddress;

    this.senderAddress = senderAddress;
    this.signCallback = signCallback;
    this.fees = { ...defaultFees, ...(customFees || {}) };
  }

  public async getNonce(address?: string): Promise<GetNonceResult> {
    return super.getNonce(address || this.senderAddress);
  }

  public async getAccount(address?: string): Promise<Account | undefined> {
    return super.getAccount(address || this.senderAddress);
  }

  public async sendTokens(
    recipientAddress: string,
    transferAmount: readonly Coin[],
    memo = "",
  ): Promise<PostTxResult> {
    const sendMsg: MsgSend = {
      type: "cosmos-sdk/MsgSend",
      value: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        from_address: this.senderAddress,
        // eslint-disable-next-line @typescript-eslint/camelcase
        to_address: recipientAddress,
        amount: transferAmount,
      },
    };
    const fee = this.fees.send;
    const { accountNumber, sequence } = await this.getNonce();
    const chainId = await this.getChainId();
    const signBytes = makeSignBytes([sendMsg], fee, chainId, memo, accountNumber, sequence);
    const signature = await this.signCallback(signBytes);
    const signedTx: StdTx = {
      msg: [sendMsg],
      fee: fee,
      memo: memo,
      signatures: [signature],
    };

    return this.postTx(signedTx);
  }
}
