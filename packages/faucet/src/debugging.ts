import { Account, Amount } from "@iov/bcp";
import { MultiChainSigner } from "@iov/multichain";

import { SendJob } from "./types";

export function amountToNumber(amount: Amount): number {
  const { quantity, fractionalDigits } = amount;
  if (!quantity.match(/^[0-9]+$/)) {
    throw new Error(`quantity must be a number, got ${quantity}`);
  }
  if (fractionalDigits < 0) {
    throw new Error(`invalid fractional digits: ${fractionalDigits}`);
  }
  // let's remove those leading zeros...
  const temp = quantity.replace(/^0+/, "");
  // unless we need them to reach a decimal point
  const pad = fractionalDigits - temp.length;
  const trimmed = pad > 0 ? "0".repeat(pad) + temp : temp;

  const cut = trimmed.length - fractionalDigits;
  const whole = cut === 0 ? "0" : trimmed.slice(0, cut);
  const decimal = fractionalDigits === 0 ? "" : `.${trimmed.slice(cut)}`;
  const value = `${whole}${decimal}`;

  return Number(value);
}

/** A string representation of a coin in a human-readable format that can change at any time */
export function debugCoin(coin: Amount): string {
  return `${amountToNumber(coin)} ${coin.tokenTicker}`;
}

/** A string representation of a balance in a human-readable format that can change at any time */
export function debugBalance(data: ReadonlyArray<Amount>): string {
  return `[${data.map(debugCoin).join(", ")}]`;
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
  console.info("Distributors:\n" + distributors.map(r => `  ${debugAccount(r)}`).join("\n"));
}

export function logSendJob(signer: MultiChainSigner, job: SendJob): void {
  const from = signer.identityToAddress(job.sender);
  const to = job.recipient;
  const amount = debugCoin(job.amount);
  console.info(`Sending ${amount} from ${from} to ${to} ...`);
}
