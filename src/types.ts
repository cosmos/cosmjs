import { Amount, Token } from "@iov/bcp";
import amino from "@tendermint/amino-js";

export type AminoTx = amino.Tx & { readonly value: amino.StdTx };

export function isAminoStdTx(txValue: amino.TxValue): txValue is amino.StdTx {
  const { memo, msg, fee, signatures } = txValue as amino.StdTx;
  return (
    typeof memo === "string" && Array.isArray(msg) && typeof fee === "object" && Array.isArray(signatures)
  );
}

export interface TokenInfo extends Token {
  readonly denom: string;
}

// TODO: alias amino types
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

export function coinToAmount(lookup: ReadonlyArray<TokenInfo>, coin: amino.Coin): Amount {
  const match = lookup.find(({ denom }) => denom === coin.denom);
  if (!match) {
    throw Error(`unknown denom: ${coin.denom}`);
  }
  return {
    tokenTicker: match.tokenTicker,
    fractionalDigits: match.fractionalDigits,
    quantity: coin.amount,
  };
}
