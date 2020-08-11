import { Coin } from "@cosmjs/launchpad";
import { Decimal } from "@cosmjs/math";

import { TokenConfiguration } from "./tokenmanager";
import { MinimalAccount, SendJob } from "./types";

/** A string representation of a coin in a human-readable format that can change at any time */
function debugCoin(coin: Coin, tokens: TokenConfiguration): string {
  const meta = tokens.bankTokens.find((token) => token.denom == coin.denom);
  if (!meta) throw new Error(`No token configuration found for denom ${coin.denom}`);
  const value = Decimal.fromAtomics(coin.amount, meta.fractionalDigits).toString();
  return `${value} ${meta?.tickerSymbol}`;
}

/** A string representation of a balance in a human-readable format that can change at any time */
export function debugBalance(data: readonly Coin[], tokens: TokenConfiguration): string {
  return `[${data.map((b) => debugCoin(b, tokens)).join(", ")}]`;
}

/** A string representation of an account in a human-readable format that can change at any time */
export function debugAccount(account: MinimalAccount, tokens: TokenConfiguration): string {
  return `${account.address}: ${debugBalance(account.balance, tokens)}`;
}

export function logAccountsState(accounts: readonly MinimalAccount[], tokens: TokenConfiguration): void {
  if (accounts.length < 2) {
    throw new Error("List of accounts must contain at least one token holder and one distributor");
  }
  const holder = accounts[0];
  const distributors = accounts.slice(1);
  console.info("Holder:\n" + `  ${debugAccount(holder, tokens)}`);
  console.info("Distributors:\n" + distributors.map((r) => `  ${debugAccount(r, tokens)}`).join("\n"));
}

export function logSendJob(job: SendJob, tokens: TokenConfiguration): void {
  const from = job.sender;
  const to = job.recipient;
  const amount = debugCoin(job.amount, tokens);
  console.info(`Sending ${amount} from ${from} to ${to} ...`);
}
