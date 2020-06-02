import { Coin, IndexedTx, PubKey, StdSignature } from "@cosmwasm/sdk38";
import { Msg, StdFee, StdTx } from "@cosmwasm/sdk38/types/types";
import {
  Amount,
  ChainId,
  ConfirmedAndSignedTransaction,
  ConfirmedTransaction,
  Fee,
  FullSignature,
  Nonce,
  PubkeyBundle,
  SignatureBytes,
  SignedTransaction,
  UnsignedTransaction,
} from "@iov/bcp";
import { Decimal } from "@iov/encoding";
import { BankToken, Erc20Token } from "./types";
export declare function decodePubkey(pubkey: PubKey): PubkeyBundle;
export declare function decodeSignature(signature: string): SignatureBytes;
export declare function decodeFullSignature(signature: StdSignature, nonce: number): FullSignature;
export declare function coinToDecimal(tokens: readonly BankToken[], coin: Coin): readonly [Decimal, string];
export declare function decodeAmount(tokens: readonly BankToken[], coin: Coin): Amount;
export declare function parseMsg(
  msg: Msg,
  memo: string | undefined,
  chainId: ChainId,
  tokens: readonly BankToken[],
  erc20Tokens: readonly Erc20Token[],
): UnsignedTransaction;
export declare function parseFee(fee: StdFee, tokens: readonly BankToken[]): Fee;
export declare function parseUnsignedTx(
  txValue: StdTx,
  chainId: ChainId,
  tokens: readonly BankToken[],
  erc20Tokens: readonly Erc20Token[],
): UnsignedTransaction;
export declare function parseSignedTx(
  txValue: StdTx,
  chainId: ChainId,
  nonce: Nonce,
  tokens: readonly BankToken[],
  erc20Tokens: readonly Erc20Token[],
): SignedTransaction;
export declare function parseTxsResponseUnsigned(
  chainId: ChainId,
  currentHeight: number,
  response: IndexedTx,
  tokens: readonly BankToken[],
  erc20Tokens: readonly Erc20Token[],
): ConfirmedTransaction<UnsignedTransaction>;
export declare function parseTxsResponseSigned(
  chainId: ChainId,
  currentHeight: number,
  nonce: Nonce,
  response: IndexedTx,
  tokens: readonly BankToken[],
  erc20Tokens: readonly Erc20Token[],
): ConfirmedAndSignedTransaction<UnsignedTransaction>;
