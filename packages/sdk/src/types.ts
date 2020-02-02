import amino from "@tendermint/amino-js";

export type AminoTx = amino.Tx & { readonly value: amino.StdTx };

export function isAminoStdTx(txValue: amino.TxValue): txValue is amino.StdTx {
  const { memo, msg, fee, signatures } = txValue as amino.StdTx;
  return (
    typeof memo === "string" && Array.isArray(msg) && typeof fee === "object" && Array.isArray(signatures)
  );
}

export interface TokenInfo {
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
