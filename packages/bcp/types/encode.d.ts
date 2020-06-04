import { Coin, CosmosSdkTx, PubKey, StdFee, StdSignature } from "@cosmjs/sdk38";
import { Amount, Fee, FullSignature, PubkeyBundle, SignedTransaction, UnsignedTransaction } from "@iov/bcp";
import { BankToken } from "./types";
export declare function encodePubkey(pubkey: PubkeyBundle): PubKey;
export declare function toBankCoin(amount: Amount, tokens: readonly BankToken[]): Coin;
export declare function encodeFee(fee: Fee, tokens: readonly BankToken[]): StdFee;
export declare function encodeFullSignature(fullSignature: FullSignature): StdSignature;
export declare function buildUnsignedTx(
  tx: UnsignedTransaction,
  bankTokens: readonly BankToken[],
): CosmosSdkTx;
export declare function buildSignedTx(tx: SignedTransaction, bankTokens: readonly BankToken[]): CosmosSdkTx;
