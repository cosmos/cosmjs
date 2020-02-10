import { TokenConfiguration } from "@cosmwasm/bcp";
import { BlockchainConnection, TxCodec } from "@iov/bcp";
import { UserProfile } from "@iov/keycontrol";
import { sleep } from "@iov/utils";

import { debugAccount, logAccountsState, logSendJob } from "./debugging";
import {
  availableTokensFromHolder,
  identitiesOfFirstWallet,
  loadAccounts,
  loadTokenTickers,
  send,
} from "./multichainhelpers";
import { TokenManager } from "./tokenmanager";
import { SendJob } from "./types";

export class Faucet {
  /** will be private soon */
  public readonly tokenManager: TokenManager;

  public constructor(config: TokenConfiguration) {
    this.tokenManager = new TokenManager(config);
  }

  public async refill(profile: UserProfile, connection: BlockchainConnection, codec: TxCodec): Promise<void> {
    console.info(`Connected to network: ${connection.chainId()}`);
    console.info(`Tokens on network: ${(await loadTokenTickers(connection)).join(", ")}`);

    const holderIdentity = identitiesOfFirstWallet(profile)[0];

    const accounts = await loadAccounts(profile, connection);
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
          tokenTicker: token,
          amount: this.tokenManager.refillAmount(token),
        });
      }
    }
    if (jobs.length > 0) {
      for (const job of jobs) {
        logSendJob(job);
        await send(profile, connection, codec, job);
        await sleep(50);
      }

      console.info("Done refilling accounts.");
      logAccountsState(await loadAccounts(profile, connection));
    } else {
      console.info("Nothing to be done. Anyways, thanks for checking.");
    }
  }
}
