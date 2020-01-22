import { Amount, Token } from "@iov/bcp";
import amino from "@tendermint/amino-js";
export declare type AminoTx = amino.Tx & {
  readonly value: amino.StdTx;
};
export declare function isAminoStdTx(txValue: amino.TxValue): txValue is amino.StdTx;
export interface TokenInfo extends Token {
  readonly denom: string;
}
export declare type TokenInfos = ReadonlyArray<TokenInfo>;
export declare function amountToCoin(lookup: ReadonlyArray<TokenInfo>, amount: Amount): amino.Coin;
export declare function coinToAmount(tokens: TokenInfos, coin: amino.Coin): Amount;
