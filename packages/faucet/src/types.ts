import { Account, Coin } from "@cosmjs/launchpad";

export interface SendJob {
  readonly sender: string;
  readonly recipient: string;
  readonly amount: Coin;
}

export type MinimalAccount = Pick<Account, "address" | "balance">;
