import { TxsResponse, types } from "@cosmwasm/sdk";
import {
  Amount,
  ChainId,
  ConfirmedAndSignedTransaction,
  Fee,
  FullSignature,
  Nonce,
  PubkeyBundle,
  SignatureBytes,
  SignedTransaction,
  UnsignedTransaction,
} from "@iov/bcp";
import { Decimal } from "@iov/encoding";
import { BankTokens } from "./types";
export declare function decodePubkey(pubkey: types.PubKey): PubkeyBundle;
export declare function decodeSignature(signature: string): SignatureBytes;
export declare function decodeFullSignature(signature: types.StdSignature, nonce: number): FullSignature;
export declare function coinToDecimal(tokens: BankTokens, coin: types.Coin): readonly [Decimal, string];
export declare function decodeAmount(tokens: BankTokens, coin: types.Coin): Amount;
export declare function parseMsg(
  msg: types.Msg,
  memo: string | undefined,
  chainId: ChainId,
  tokens: BankTokens,
): UnsignedTransaction;
export declare function parseFee(fee: types.StdFee, tokens: BankTokens): Fee;
export declare function parseSignedTx(
  txValue: types.StdTx,
  chainId: ChainId,
  nonce: Nonce,
  tokens: BankTokens,
): SignedTransaction;
export declare function parseTxsResponse(
  chainId: ChainId,
  currentHeight: number,
  nonce: Nonce,
  response: TxsResponse,
  tokens: BankTokens,
): ConfirmedAndSignedTransaction<UnsignedTransaction>;
