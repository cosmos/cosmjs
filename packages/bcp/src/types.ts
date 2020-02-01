import { Amount, Nonce, Token } from "@iov/bcp";
import amino from "@tendermint/amino-js";

export interface TokenInfo extends Token {
  readonly denom: string;
}

export type TokenInfos = ReadonlyArray<TokenInfo>;

// TODO: return null vs throw exception for undefined???
export function amountToCoin(lookup: ReadonlyArray<TokenInfo>, amount: Amount): amino.Coin {
  const match = lookup.find(({ tokenTicker }) => tokenTicker === amount.tokenTicker);
  if (!match) {
    throw Error(`unknown ticker: ${amount.tokenTicker}`);
  }
  return {
    denom: match.denom,
    amount: amount.quantity,
  };
}

// TODO: return null vs throw exception for undefined???
export function coinToAmount(tokens: TokenInfos, coin: amino.Coin): Amount {
  const match = tokens.find(({ denom }) => denom === coin.denom);
  if (!match) {
    throw Error(`unknown denom: ${coin.denom}`);
  }
  return {
    tokenTicker: match.tokenTicker,
    fractionalDigits: match.fractionalDigits,
    quantity: coin.amount,
  };
}

// tslint:disable-next-line:no-bitwise
const maxAcct = 1 << 23;
// tslint:disable-next-line:no-bitwise
const maxSeq = 1 << 20;

// NonceInfo is the data we need from account to create a nonce
// Use this so no confusion about order of arguments
export interface NonceInfo {
  readonly account_number: string;
  readonly sequence: string;
}

// this (lossily) encodes the two pieces of info (uint64) needed to sign into
// one (53-bit) number. Cross your fingers.
/* eslint-disable-next-line @typescript-eslint/camelcase */
export function accountToNonce({ account_number, sequence }: NonceInfo): Nonce {
  const acct = parseInt(account_number, 10);
  const seq = parseInt(sequence, 10);

  // we allow 23 bits (8 million) for accounts, and 20 bits (1 million) for tx/account
  // let's fix this soon
  if (acct > maxAcct) {
    throw new Error("Account number is greater than 2^23, must update Nonce handler");
  }
  if (seq > maxSeq) {
    throw new Error("Sequence is greater than 2^20, must update Nonce handler");
  }

  const val = acct * maxSeq + seq;
  return val as Nonce;
}

// this extracts info from nonce for signing
export function nonceToAccountNumber(nonce: Nonce): string {
  const acct = nonce / maxSeq;
  if (acct > maxAcct) {
    throw new Error("Invalid Nonce, account number is higher than can safely be encoded in Nonce");
  }
  return Math.round(acct).toString();
}

// this extracts info from nonce for signing
export function nonceToSequence(nonce: Nonce): string {
  const seq = nonce % maxSeq;
  return Math.round(seq).toString();
}
