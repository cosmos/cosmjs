import { TokenConfiguration } from "@cosmwasm/bcp";
import { Account, Amount, BlockchainConnection, TokenTicker } from "@iov/bcp";
import { Decimal, Uint53 } from "@iov/encoding";
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
import { SendJob } from "./types";

/** Send `factor` times credit amount on refilling */
const defaultRefillFactor = 20;

/** refill when balance gets below `factor` times credit amount */
const defaultRefillThresholdFactor = 8;

export class Faucet {
  private readonly config: TokenConfiguration;

  public constructor(config: TokenConfiguration) {
    this.config = config;
  }

  /** The amount of tokens that will be sent to the user */
  public creditAmount(token: TokenTicker, factor: Uint53 = new Uint53(1)): Amount {
    const amountFromEnv = process.env[`FAUCET_CREDIT_AMOUNT_${token}`];
    const amount = amountFromEnv ? Uint53.fromString(amountFromEnv).toNumber() : 10;
    const value = new Uint53(amount * factor.toNumber());

    const fractionalDigits = this.getFractionalDigits(token);
    return {
      quantity: value.toString() + "0".repeat(fractionalDigits),
      fractionalDigits: fractionalDigits,
      tokenTicker: token,
    };
  }

  public refillAmount(token: TokenTicker): Amount {
    const factorFromEnv = Number.parseInt(process.env.FAUCET_REFILL_FACTOR || "0", 10) || undefined;
    const factor = new Uint53(factorFromEnv || defaultRefillFactor);
    return this.creditAmount(token, factor);
  }

  public refillThreshold(token: TokenTicker): Amount {
    const factorFromEnv = Number.parseInt(process.env.FAUCET_REFILL_THRESHOLD || "0", 10) || undefined;
    const factor = new Uint53(factorFromEnv || defaultRefillThresholdFactor);
    return this.creditAmount(token, factor);
  }

  public async refill(profile: UserProfile, connection: BlockchainConnection): Promise<void> {
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
      const refillDistibutors = distributorAccounts.filter(account => this.needsRefill(account, token));
      console.info(`Refilling ${token} of:`);
      console.info(
        refillDistibutors.length ? refillDistibutors.map(r => `  ${debugAccount(r)}`).join("\n") : "  none",
      );
      for (const refillDistibutor of refillDistibutors) {
        jobs.push({
          sender: holderIdentity,
          recipient: refillDistibutor.address,
          tokenTicker: token,
          amount: this.refillAmount(token),
        });
      }
    }
    if (jobs.length > 0) {
      for (const job of jobs) {
        logSendJob(job);
        await send(profile, connection, job);
        await sleep(50);
      }

      console.info("Done refilling accounts.");
      logAccountsState(await loadAccounts(profile, connection));
    } else {
      console.info("Nothing to be done. Anyways, thanks for checking.");
    }
  }

  /** true iff the distributor account needs a refill */
  public needsRefill(account: Account, token: TokenTicker): boolean {
    const balanceAmount = account.balance.find(b => b.tokenTicker === token);

    const balance = balanceAmount
      ? Decimal.fromAtomics(balanceAmount.quantity, balanceAmount.fractionalDigits)
      : Decimal.fromAtomics("0", 0);

    const thresholdAmount = this.refillThreshold(token);
    const threshold = Decimal.fromAtomics(thresholdAmount.quantity, thresholdAmount.fractionalDigits);

    // TODO: perform < operation on Decimal type directly
    // https://github.com/iov-one/iov-core/issues/1375
    return balance.toFloatApproximation() < threshold.toFloatApproximation();
  }

  private getFractionalDigits(ticker: TokenTicker): number {
    const match = [...this.config.bankTokens, ...(this.config.erc20Tokens || [])].find(
      token => token.ticker === ticker,
    );
    if (!match) throw new Error(`No token found for ticker symbol: ${ticker}`);
    return match.fractionalDigits;
  }
}
