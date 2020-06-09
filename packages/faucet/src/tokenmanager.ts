import { Decimal, Uint53 } from "@cosmjs/math";
import { Coin } from "@cosmjs/sdk38";

import { BankTokenMeta, MinimalAccount, TokenConfiguration } from "./types";

/** Send `factor` times credit amount on refilling */
const defaultRefillFactor = 20;

/** refill when balance gets below `factor` times credit amount */
const defaultRefillThresholdFactor = 8;

export class TokenManager {
  private readonly config: TokenConfiguration;

  public constructor(config: TokenConfiguration) {
    this.config = config;
  }

  /** The amount of tokens that will be sent to the user */
  public creditAmount(tickerSymbol: string, factor: Uint53 = new Uint53(1)): Coin {
    const amountFromEnv = process.env[`FAUCET_CREDIT_AMOUNT_${tickerSymbol}`];
    const amount = amountFromEnv ? Uint53.fromString(amountFromEnv).toNumber() : 10;
    const value = new Uint53(amount * factor.toNumber());

    const meta = this.getTokenMeta(tickerSymbol);
    return {
      amount: value.toString() + "0".repeat(meta.fractionalDigits),
      denom: meta.denom,
    };
  }

  public refillAmount(tickerSymbol: string): Coin {
    const factorFromEnv = Number.parseInt(process.env.FAUCET_REFILL_FACTOR || "0", 10) || undefined;
    const factor = new Uint53(factorFromEnv || defaultRefillFactor);
    return this.creditAmount(tickerSymbol, factor);
  }

  public refillThreshold(tickerSymbol: string): Coin {
    const factorFromEnv = Number.parseInt(process.env.FAUCET_REFILL_THRESHOLD || "0", 10) || undefined;
    const factor = new Uint53(factorFromEnv || defaultRefillThresholdFactor);
    return this.creditAmount(tickerSymbol, factor);
  }

  /** true iff the distributor account needs a refill */
  public needsRefill(account: MinimalAccount, tickerSymbol: string): boolean {
    const meta = this.getTokenMeta(tickerSymbol);

    const balanceAmount = account.balance.find((b) => b.denom === meta.denom);

    const balance = balanceAmount
      ? Decimal.fromAtomics(balanceAmount.amount, meta.fractionalDigits)
      : Decimal.fromAtomics("0", 0);

    const thresholdAmount = this.refillThreshold(tickerSymbol);
    const threshold = Decimal.fromAtomics(thresholdAmount.amount, meta.fractionalDigits);

    // TODO: perform < operation on Decimal type directly
    // https://github.com/iov-one/iov-core/issues/1375
    return balance.toFloatApproximation() < threshold.toFloatApproximation();
  }

  private getTokenMeta(tickerSymbol: string): BankTokenMeta {
    const match = this.config.bankTokens.find((token) => token.tickerSymbol === tickerSymbol);
    if (!match) throw new Error(`No token found for ticker symbol: ${tickerSymbol}`);
    return match;
  }
}
