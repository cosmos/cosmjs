import { Coin, types } from "@cosmwasm/sdk";
import { Amount, Fee, FullSignature, PubkeyBundle, SignedTransaction, UnsignedTransaction } from "@iov/bcp";
import { BankTokens, Erc20Token } from "./types";
export declare function encodePubkey(pubkey: PubkeyBundle): types.PubKey;
export declare function toErc20Amount(amount: Amount, erc20Token: Erc20Token): string;
export declare function toBankCoin(amount: Amount, tokens: BankTokens): Coin;
export declare function encodeFee(fee: Fee, tokens: BankTokens): types.StdFee;
export declare function encodeFullSignature(fullSignature: FullSignature): types.StdSignature;
export declare function buildUnsignedTx(
  tx: UnsignedTransaction,
  bankTokens: BankTokens,
  erc20Tokens?: readonly Erc20Token[],
): types.CosmosSdkTx;
export declare function buildSignedTx(
  tx: SignedTransaction,
  bankTokens: BankTokens,
  erc20Tokens?: readonly Erc20Token[],
): types.CosmosSdkTx;
