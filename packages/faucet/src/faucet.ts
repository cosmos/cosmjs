import { TokenConfiguration } from "@cosmwasm/bcp";
import {
  Account,
  BlockchainConnection,
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
  /** will be private soon */
  public readonly tokenManager: TokenManager;

  private readonly connection: BlockchainConnection;
  private readonly codec: TxCodec;
  private readonly profile: UserProfile;

  public constructor(
    config: TokenConfiguration,
    connection: BlockchainConnection,
    codec: TxCodec,
    profile: UserProfile,
  ) {
    this.tokenManager = new TokenManager(config);
    this.connection = connection;
    this.codec = codec;
    this.profile = profile;
  }

  /**
   * Creates and posts a send transaction. Then waits until the transaction is in a block.
   */
  public async send(job: SendJob): Promise<void> {
    const sendWithFee = await this.connection.withDefaultFee<SendTransaction>({
      kind: "bcp/send",
      chainId: this.connection.chainId(),
      sender: this.codec.identityToAddress(job.sender),
      senderPubkey: job.sender.pubkey,
      recipient: job.recipient,
      memo: "Make love, not war",
      amount: job.amount,
    });

    const nonce = await this.connection.getNonce({ pubkey: job.sender.pubkey });
    const signed = await this.profile.signTransaction(job.sender, sendWithFee, this.codec, nonce);

    const post = await this.connection.postTx(this.codec.bytesToPost(signed));
    const blockInfo = await post.blockInfo.waitFor(info => !isBlockInfoPending(info));
    if (isBlockInfoFailed(blockInfo)) {
      throw new Error(`Sending tokens failed. Code: ${blockInfo.code}, message: ${blockInfo.message}`);
    }
  }

  public async loadTokenTickers(): Promise<ReadonlyArray<TokenTicker>> {
    return (await this.connection.getAllTokens()).map(token => token.tokenTicker);
  }

  public async loadAccounts(): Promise<ReadonlyArray<Pick<Account, "address" | "balance">>> {
    const addresses = identitiesOfFirstWallet(this.profile).map(identity => identityToAddress(identity));

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
    console.info(`Connected to network: ${this.connection.chainId()}`);
    console.info(`Tokens on network: ${(await this.loadTokenTickers()).join(", ")}`);

    const holderIdentity = identitiesOfFirstWallet(this.profile)[0];

    const accounts = await this.loadAccounts();
    logAccountsState(accounts);
    const holderAccount = accounts[0];
    const distributorAccounts = accounts.slice(1);

    const availableTokens = availableTokensFromHolder(holderAccount);
    console.info("Available tokens:", availableTokens);

    const jobs: SendJob[] = [];

    for (const token of availableTokens) {
      const refillDistibutors = distributorAccounts.filter(account =>
        this.tokenManager.needsRefill(account, token),
      );
      console.info(`Refilling ${token} of:`);
      console.info(
        refillDistibutors.length ? refillDistibutors.map(r => `  ${debugAccount(r)}`).join("\n") : "  none",
      );
      for (const refillDistibutor of refillDistibutors) {
        jobs.push({
          sender: holderIdentity,
          recipient: refillDistibutor.address,
          amount: this.tokenManager.refillAmount(token),
        });
      }
    }
    if (jobs.length > 0) {
      for (const job of jobs) {
        logSendJob(job);
        await this.send(job);
        await sleep(50);
      }

      console.info("Done refilling accounts.");
      logAccountsState(await this.loadAccounts());
    } else {
      console.info("Nothing to be done. Anyways, thanks for checking.");
    }
  }
}
