import amino from "@tendermint/amino-js";
export declare type AminoTx = amino.Tx & {
  readonly value: amino.StdTx;
};
export declare function isAminoStdTx(txValue: amino.TxValue): txValue is amino.StdTx;
