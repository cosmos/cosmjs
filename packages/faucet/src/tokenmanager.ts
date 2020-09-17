import { Coin } from "@cosmjs/launchpad";
import { Decimal, Uint53 } from "@cosmjs/math";

import { MinimalAccount } from "./types";

const defaultCreditAmount = 10_000_000;

/** Send `factor` times credit amount on refilling */
const defaultRefillFactor = 20;

/** refill when balance gets below `factor` times credit amount */
const defaultRefillThresholdFactor = 8;

export interface TokenConfiguration {
  /** Supported tokens of the Cosmos SDK bank module */
  readonly bankTokens: readonly string[];
}

export class TokenManager {
  private readonly config: TokenConfiguration;

  public constructor(config: TokenConfiguration) {
    this.config = config;
  }

  /** The amount of tokens that will be sent to the user */
  public creditAmount(denom: string, factor: Uint53 = new Uint53(1)): Coin {
    const amountFromEnv = process.env[`FAUCET_CREDIT_AMOUNT_${denom.toUpperCase()}`];
    const amount = amountFromEnv ? Uint53.fromString(amountFromEnv).toNumber() : defaultCreditAmount;
    const value = new Uint53(amount * factor.toNumber());
    return {
      amount: value.toString(),
      denom: denom,
    };
  }

  public refillAmount(denom: string): Coin {
    const factorFromEnv = Number.parseInt(process.env.FAUCET_REFILL_FACTOR || "0", 10) || undefined;
    const factor = new Uint53(factorFromEnv || defaultRefillFactor);
    return this.creditAmount(denom, factor);
  }

  public refillThreshold(denom: string): Coin {
    const factorFromEnv = Number.parseInt(process.env.FAUCET_REFILL_THRESHOLD || "0", 10) || undefined;
    const factor = new Uint53(factorFromEnv || defaultRefillThresholdFactor);
    return this.creditAmount(denom, factor);
  }

  /** true iff the distributor account needs a refill */
  public needsRefill(account: MinimalAccount, denom: string): boolean {
    const balanceAmount = account.balance.find((b) => b.denom === denom);

    const balance = Decimal.fromAtomics(balanceAmount ? balanceAmount.amount : "0", 0);
    const thresholdAmount = this.refillThreshold(denom);
    const threshold = Decimal.fromAtomics(thresholdAmount.amount, 0);

    return balance.isLessThan(threshold);
  }
}
