import amino from "@tendermint/amino-js";

export type AminoTx = amino.Tx & { readonly value: amino.StdTx };
