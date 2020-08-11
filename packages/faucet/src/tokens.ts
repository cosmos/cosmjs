import { Uint53 } from "@cosmjs/math";

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

const parseBankTokenPattern = /^([a-zA-Z]{2,20})=10\^([0-9]+)([a-zA-Z]{2,20})$/;

export function parseBankToken(input: string): BankTokenMeta {
  const match = input.replace(/\s/g, "").match(parseBankTokenPattern);
  if (!match) {
    throw new Error("Token could not be parsed. Format: DISPLAY=10^DIGITSbase, e.g. ATOM=10^6uatom");
  }
  return {
    tickerSymbol: match[1],
    fractionalDigits: Uint53.fromString(match[2]).toNumber(),
    denom: match[3],
  };
}

export function parseBankTokens(input: string): BankTokenMeta[] {
  return input
    .trim()
    .split(",")
    .filter((part) => part.trim() !== "")
    .map((part) => parseBankToken(part));
}
