import { Decimal } from "@cosmjs/math";
import { Coin, IndexedTx, Msg, PubKey, StdFee, StdSignature, StdTx } from "@cosmjs/sdk38";
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
import { BankToken } from "./types";
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
): UnsignedTransaction;
export declare function parseFee(fee: StdFee, tokens: readonly BankToken[]): Fee;
export declare function parseUnsignedTx(
  txValue: StdTx,
  chainId: ChainId,
  tokens: readonly BankToken[],
): UnsignedTransaction;
export declare function parseSignedTx(
  txValue: StdTx,
  chainId: ChainId,
  nonce: Nonce,
  tokens: readonly BankToken[],
): SignedTransaction;
export declare function parseTxsResponseUnsigned(
  chainId: ChainId,
  currentHeight: number,
  response: IndexedTx,
  tokens: readonly BankToken[],
): ConfirmedTransaction<UnsignedTransaction>;
export declare function parseTxsResponseSigned(
  chainId: ChainId,
  currentHeight: number,
  nonce: Nonce,
  response: IndexedTx,
  tokens: readonly BankToken[],
): ConfirmedAndSignedTransaction<UnsignedTransaction>;
