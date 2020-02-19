import { Nonce } from "@iov/bcp";

export interface BankToken {
  readonly denom: string;
  readonly ticker: string;
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

export type BankTokens = ReadonlyArray<BankToken>;

export interface Erc20Token {
  readonly contractAddress: string;
  readonly ticker: string;
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

// eslint-disable-next-line no-bitwise
const maxAcct = 1 << 23;
// eslint-disable-next-line no-bitwise
const maxSeq = 1 << 20;

// this (lossily) encodes the two pieces of info (uint64) needed to sign into
// one (53-bit) number. Cross your fingers.
export function accountToNonce(accountNumber: number, sequence: number): Nonce {
  // we allow 23 bits (8 million) for accounts, and 20 bits (1 million) for tx/account
  // let's fix this soon
  if (accountNumber > maxAcct) {
    throw new Error("Account number is greater than 2^23, must update Nonce handler");
  }
  if (sequence > maxSeq) {
    throw new Error("Sequence is greater than 2^20, must update Nonce handler");
  }

  const val = accountNumber * maxSeq + sequence;
  return val as Nonce;
}

// this extracts info from nonce for signing
export function nonceToAccountNumber(nonce: Nonce): number {
  const acct = nonce / maxSeq;
  if (acct > maxAcct) {
    throw new Error("Invalid Nonce, account number is higher than can safely be encoded in Nonce");
  }
  return Math.round(acct);
}

// this extracts info from nonce for signing
export function nonceToSequence(nonce: Nonce): number {
  const seq = nonce % maxSeq;
  return Math.round(seq);
}
