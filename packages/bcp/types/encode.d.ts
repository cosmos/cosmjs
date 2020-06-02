import { Coin, types } from "@cosmwasm/sdk38";
import { Amount, Fee, FullSignature, PubkeyBundle, SignedTransaction, UnsignedTransaction } from "@iov/bcp";
import { BankToken, Erc20Token } from "./types";
export declare function encodePubkey(pubkey: PubkeyBundle): types.PubKey;
export declare function toErc20Amount(amount: Amount, erc20Token: Erc20Token): string;
export declare function toBankCoin(amount: Amount, tokens: readonly BankToken[]): Coin;
export declare function encodeFee(fee: Fee, tokens: readonly BankToken[]): types.StdFee;
export declare function encodeFullSignature(fullSignature: FullSignature): types.StdSignature;
export declare function buildUnsignedTx(
  tx: UnsignedTransaction,
  bankTokens: readonly BankToken[],
  erc20Tokens?: readonly Erc20Token[],
): types.CosmosSdkTx;
export declare function buildSignedTx(
  tx: SignedTransaction,
  bankTokens: readonly BankToken[],
  erc20Tokens?: readonly Erc20Token[],
): types.CosmosSdkTx;
