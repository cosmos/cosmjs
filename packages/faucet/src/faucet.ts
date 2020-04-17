import { TokenConfiguration } from "@cosmwasm/bcp";
import {
  Account,
  Address,
  BlockchainConnection,
  Identity,
  isBlockInfoFailed,
  isBlockInfoPending,
  SendTransaction,
  TokenTicker,
  TxCodec,
} from "@iov/bcp";
import { UserProfile } from "@iov/keycontrol";
import { sleep } from "@iov/utils";

import { identityToAddress } from "./addresses";
import { debugAccount, logAccountsState, logSendJob } from "./debugging";
import { availableTokensFromHolder, identitiesOfFirstWallet } from "./multichainhelpers";
import { TokenManager } from "./tokenmanager";
import { SendJob } from "./types";

export class Faucet {
  public get holder(): Identity {
    return identitiesOfFirstWallet(this.profile)[0];
  }
  public get distributors(): readonly Identity[] {
    return identitiesOfFirstWallet(this.profile).slice(1);
  }

  private readonly tokenManager: TokenManager;
  private readonly connection: BlockchainConnection;
  private readonly codec: TxCodec;
  private readonly profile: UserProfile;
  private readonly logging: boolean;
  private creditCount = 0;

  public constructor(
    config: TokenConfiguration,
    connection: BlockchainConnection,
    codec: TxCodec,
    profile: UserProfile,
    logging = false,
  ) {
    this.tokenManager = new TokenManager(config);
    this.connection = connection;
    this.codec = codec;
    this.profile = profile;
    this.logging = logging;
  }

  /**
   * Creates and posts a send transaction. Then waits until the transaction is in a block.
   */
  public async send(job: SendJob): Promise<void> {
    const sendWithFee = await this.connection.withDefaultFee<SendTransaction>({
      kind: "bcp/send",
      chainId: this.connection.chainId,
      sender: this.codec.identityToAddress(job.sender),
      senderPubkey: job.sender.pubkey,
      recipient: job.recipient,
      memo: "Make love, not war",
      amount: job.amount,
    });

    const nonce = await this.connection.getNonce({ pubkey: job.sender.pubkey });
    const signed = await this.profile.signTransaction(job.sender, sendWithFee, this.codec, nonce);

    const post = await this.connection.postTx(this.codec.bytesToPost(signed));
    const blockInfo = await post.blockInfo.waitFor((info) => !isBlockInfoPending(info));
    if (isBlockInfoFailed(blockInfo)) {
      throw new Error(`Sending tokens failed. Code: ${blockInfo.code}, message: ${blockInfo.message}`);
    }
  }

  /** Use one of the distributor accounts to send tokend to user */
  public async credit(recipient: Address, ticker: TokenTicker): Promise<void> {
    if (this.distributors.length === 0) throw new Error("No distributor account available");
    const sender = this.distributors[this.getCreditCount() % this.distributors.length];
    const job: SendJob = {
      sender: sender,
      recipient: recipient,
      amount: this.tokenManager.creditAmount(ticker),
    };
    if (this.logging) logSendJob(job);
    await this.send(job);
  }

  public async loadTokenTickers(): Promise<ReadonlyArray<TokenTicker>> {
    return (await this.connection.getAllTokens()).map((token) => token.tokenTicker);
  }

  public async loadAccounts(): Promise<ReadonlyArray<Pick<Account, "address" | "balance">>> {
    const addresses = identitiesOfFirstWallet(this.profile).map((identity) => identityToAddress(identity));

    const out: Account[] = [];
    for (const address of addresses) {
      const response = await this.connection.getAccount({ address: address });
      if (response) {
        out.push({
          address: response.address,
          balance: response.balance,
        });
      } else {
        out.push({
          address: address,
          balance: [],
        });
      }
    }

    return out;
  }

  public async refill(): Promise<void> {
    if (this.logging) {
      console.info(`Connected to network: ${this.connection.chainId}`);
      console.info(`Tokens on network: ${(await this.loadTokenTickers()).join(", ")}`);
    }

    const accounts = await this.loadAccounts();
    if (this.logging) logAccountsState(accounts);
    const [holderAccount, ...distributorAccounts] = accounts;

    const availableTokens = availableTokensFromHolder(holderAccount);
    if (this.logging) console.info("Available tokens:", availableTokens);

    const jobs: SendJob[] = [];
    for (const token of availableTokens) {
      const refillDistibutors = distributorAccounts.filter((account) =>
        this.tokenManager.needsRefill(account, token),
      );

      if (this.logging) {
        console.info(`Refilling ${token} of:`);
        console.info(
          refillDistibutors.length
            ? refillDistibutors.map((r) => `  ${debugAccount(r)}`).join("\n")
            : "  none",
        );
      }
      for (const refillDistibutor of refillDistibutors) {
        jobs.push({
          sender: this.holder,
          recipient: refillDistibutor.address,
          amount: this.tokenManager.refillAmount(token),
        });
      }
    }
    if (jobs.length > 0) {
      for (const job of jobs) {
        if (this.logging) logSendJob(job);
        await this.send(job);
        await sleep(50);
      }

      if (this.logging) {
        console.info("Done refilling accounts.");
        logAccountsState(await this.loadAccounts());
      }
    } else {
      if (this.logging) {
        console.info("Nothing to be done. Anyways, thanks for checking.");
      }
    }
  }

  /** returns an integer >= 0 that increments and is unique for this instance */
  private getCreditCount(): number {
    return this.creditCount++;
  }
}
