import { Account, Coin } from "@cosmjs/sdk38";

export interface SendJob {
  readonly sender: string;
  readonly recipient: string;
  readonly amount: Coin;
}

export interface BankTokenMeta {
  readonly denom: string;
  /**
   * The token ticker symbol, e.g. ATOM or ETH.
   */
  readonly tickerSymbol: string;
  /**
   * The number of fractional digits the token supports.
   *
   * A quantity is expressed as atomic units. 10^fractionalDigits of those
   * atomic units make up 1 token.
   *
   * E.g. in Ethereum 10^18 wei are 1 ETH and from the quantity 123000000000000000000
   * the last 18 digits are the fractional part and the rest the wole part.
   */
  readonly fractionalDigits: number;
}

export interface TokenConfiguration {
  /** Supported tokens of the Cosmos SDK bank module */
  readonly bankTokens: readonly BankTokenMeta[];
}

export type MinimalAccount = Pick<Account, "address" | "balance">;
