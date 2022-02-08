import { Coin } from "@cosmjs/stargate";

import { MinimalAccount, SendJob } from "./types";

/** A string representation of a coin in a human-readable format that can change at any time */
function debugCoin(coin: Coin): string {
  return `${coin.amount} ${coin.denom}`;
}

/** A string representation of a balance in a human-readable format that can change at any time */
export function debugBalance(data: readonly Coin[]): string {
  return `[${data.map((b) => debugCoin(b)).join(", ")}]`;
}

/** A string representation of an account in a human-readable format that can change at any time */
export function debugAccount(account: MinimalAccount): string {
  return `${account.address}: ${debugBalance(account.balance)}`;
}

export function logAccountsState(accounts: readonly MinimalAccount[]): void {
  if (accounts.length < 2) {
    throw new Error("List of accounts must contain at least one token holder and one distributor");
  }
  const holder = accounts[0];
  const distributors = accounts.slice(1);
  console.info("Holder:\n" + `  ${debugAccount(holder)}`);
  console.info("Distributors:\n" + distributors.map((r) => `  ${debugAccount(r)}`).join("\n"));
}

export function logSendJob(job: SendJob): void {
  const from = job.sender;
  const to = job.recipient;
  const amount = debugCoin(job.amount);
  console.info(`Sending ${amount} from ${from} to ${to} ...`);
}
