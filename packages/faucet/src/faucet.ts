import {
  assertIsDeliverTxSuccess as assertIsDeliverTxSuccessStargate,
  calculateFee,
  SigningStargateClient,
  StargateClient,
} from "@cosmjs/stargate";
import { isDefined, sleep } from "@cosmjs/utils";

import * as constants from "./constants";
import { debugAccount, logAccountsState, logSendJob } from "./debugging";
import { PathBuilder } from "./pathbuilder";
import { createClients, createWallets } from "./profile";
import { TokenConfiguration, TokenManager } from "./tokenmanager";
import { MinimalAccount, SendJob } from "./types";

export class Faucet {
  public static async make(
    apiUrl: string,
    addressPrefix: string,
    config: TokenConfiguration,
    mnemonic: string,
    pathBuilder: PathBuilder,
    numberOfDistributors: number,
    logging = false,
  ): Promise<Faucet> {
    const wallets = await createWallets(mnemonic, pathBuilder, addressPrefix, numberOfDistributors, logging);
    const clients = await createClients(apiUrl, wallets);
    const readonlyClient = await StargateClient.connect(apiUrl);
    return new Faucet(addressPrefix, config, clients, readonlyClient, logging);
  }

  public readonly addressPrefix: string;
  public readonly holderAddress: string;
  public readonly distributorAddresses: readonly string[];

  private readonly tokenConfig: TokenConfiguration;
  private readonly tokenManager: TokenManager;
  private readonly readOnlyClient: StargateClient;
  private readonly clients: { [senderAddress: string]: SigningStargateClient };
  private readonly logging: boolean;
  private creditCount = 0;

  private constructor(
    addressPrefix: string,
    config: TokenConfiguration,
    clients: ReadonlyArray<readonly [string, SigningStargateClient]>,
    readonlyClient: StargateClient,
    logging = false,
  ) {
    this.addressPrefix = addressPrefix;
    this.tokenConfig = config;
    this.tokenManager = new TokenManager(config);

    this.readOnlyClient = readonlyClient;
    [this.holderAddress, ...this.distributorAddresses] = clients.map(([address]) => address);
    this.clients = clients.reduce(
      (acc, [senderAddress, client]) => ({ ...acc, [senderAddress]: client }),
      {},
    );
    this.logging = logging;
  }

  /**
   * Returns a list of denoms of tokens owned by the the holder and configured in the faucet
   */
  public async availableTokens(): Promise<string[]> {
    const { balance } = await this.loadAccount(this.holderAddress);
    return balance
      .filter((b) => b.amount !== "0")
      .map((b) => this.tokenConfig.bankTokens.find((token) => token == b.denom))
      .filter(isDefined);
  }

  /**
   * Creates and broadcasts a send transaction. Then waits until the transaction is in a block.
   * Throws an error if the transaction failed.
   */
  public async send(job: SendJob): Promise<void> {
    const client = this.clients[job.sender];
    const fee = calculateFee(constants.gasLimitSend, constants.gasPrice);
    const result = await client.sendTokens(job.sender, job.recipient, [job.amount], fee, constants.memo);
    assertIsDeliverTxSuccessStargate(result);
  }

  /** Use one of the distributor accounts to send tokens to user */
  public async credit(recipient: string, denom: string): Promise<void> {
    if (this.distributorAddresses.length === 0) throw new Error("No distributor account available");
    const sender = this.distributorAddresses[this.getCreditCount() % this.distributorAddresses.length];
    const job: SendJob = {
      sender: sender,
      recipient: recipient,
      amount: this.tokenManager.creditAmount(denom),
    };
    if (this.logging) logSendJob(job);
    await this.send(job);
  }

  /** Returns a list to token denoms which are configured */
  public configuredTokens(): string[] {
    return Array.from(this.tokenConfig.bankTokens);
  }

  public async loadAccount(address: string): Promise<MinimalAccount> {
    const balance = await this.readOnlyClient.getAllBalances(address);
    return {
      address: address,
      balance: balance,
    };
  }

  public async loadAccounts(): Promise<readonly MinimalAccount[]> {
    const addresses = [this.holderAddress, ...this.distributorAddresses];
    return Promise.all(addresses.map(this.loadAccount.bind(this)));
  }

  public async refill(): Promise<void> {
    if (this.logging) {
      console.info(`Connected to network: ${await this.readOnlyClient.getChainId()}`);
      console.info(`Tokens on network: ${this.configuredTokens().join(", ")}`);
    }

    const accounts = await this.loadAccounts();
    if (this.logging) logAccountsState(accounts);
    const [_, ...distributorAccounts] = accounts;

    const availableTokenDenoms = await this.availableTokens();
    if (this.logging) console.info("Available tokens:", availableTokenDenoms);

    const jobs: SendJob[] = [];
    for (const denom of availableTokenDenoms) {
      const refillDistibutors = distributorAccounts.filter((account) =>
        this.tokenManager.needsRefill(account, denom),
      );

      if (this.logging) {
        console.info(`Refilling ${denom} of:`);
        console.info(
          refillDistibutors.length
            ? refillDistibutors.map((r) => `  ${debugAccount(r)}`).join("\n")
            : "  none",
        );
      }
      for (const refillDistibutor of refillDistibutors) {
        jobs.push({
          sender: this.holderAddress,
          recipient: refillDistibutor.address,
          amount: this.tokenManager.refillAmount(denom),
        });
      }
    }
    if (jobs.length > 0) {
      for (const job of jobs) {
        if (this.logging) logSendJob(job);
        // don't crash faucet when one send fails
        try {
          await this.send(job);
        } catch (error) {
          console.error(error);
        }
        await sleep(75);
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
