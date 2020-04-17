import { Account, Amount } from "@iov/bcp";
import { Decimal } from "@iov/encoding";

import { identityToAddress } from "./addresses";
import { SendJob } from "./types";

/** A string representation of a coin in a human-readable format that can change at any time */
function debugAmount(amount: Amount): string {
  const value = Decimal.fromAtomics(amount.quantity, amount.fractionalDigits).toString();
  return `${value} ${amount.tokenTicker}`;
}

/** A string representation of a balance in a human-readable format that can change at any time */
export function debugBalance(data: ReadonlyArray<Amount>): string {
  return `[${data.map(debugAmount).join(", ")}]`;
}

/** A string representation of an account in a human-readable format that can change at any time */
export function debugAccount(account: Account): string {
  return `${account.address}: ${debugBalance(account.balance)}`;
}

export function logAccountsState(accounts: ReadonlyArray<Account>): void {
  if (accounts.length < 2) {
    throw new Error("List of accounts must contain at least one token holder and one distributor");
  }
  const holder = accounts[0];
  const distributors = accounts.slice(1);
  console.info("Holder:\n" + `  ${debugAccount(holder)}`);
  console.info("Distributors:\n" + distributors.map((r) => `  ${debugAccount(r)}`).join("\n"));
}

export function logSendJob(job: SendJob): void {
  const from = identityToAddress(job.sender);
  const to = job.recipient;
  const amount = debugAmount(job.amount);
  console.info(`Sending ${amount} from ${from} to ${to} ...`);
}
