import { Coin, CosmosSdkTx, PubKey, StdFee, StdSignature } from "@cosmwasm/sdk38";
import { Amount, Fee, FullSignature, PubkeyBundle, SignedTransaction, UnsignedTransaction } from "@iov/bcp";
import { BankToken, Erc20Token } from "./types";
export declare function encodePubkey(pubkey: PubkeyBundle): PubKey;
export declare function toErc20Amount(amount: Amount, erc20Token: Erc20Token): string;
export declare function toBankCoin(amount: Amount, tokens: readonly BankToken[]): Coin;
export declare function encodeFee(fee: Fee, tokens: readonly BankToken[]): StdFee;
export declare function encodeFullSignature(fullSignature: FullSignature): StdSignature;
export declare function buildUnsignedTx(
  tx: UnsignedTransaction,
  bankTokens: readonly BankToken[],
  erc20Tokens?: readonly Erc20Token[],
): CosmosSdkTx;
export declare function buildSignedTx(
  tx: SignedTransaction,
  bankTokens: readonly BankToken[],
  erc20Tokens?: readonly Erc20Token[],
): CosmosSdkTx;
