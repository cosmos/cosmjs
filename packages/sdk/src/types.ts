import amino from "@tendermint/amino-js";

export type AminoTx = amino.Tx & { readonly value: amino.StdTx };

export function isAminoStdTx(txValue: amino.TxValue): txValue is amino.StdTx {
  const { memo, msg, fee, signatures } = txValue as amino.StdTx;
  return (
    typeof memo === "string" && Array.isArray(msg) && typeof fee === "object" && Array.isArray(signatures)
  );
}
