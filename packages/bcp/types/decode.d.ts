import {
  Amount,
  ChainId,
  ConfirmedAndSignedTransaction,
  Fee,
  FullSignature,
  Nonce,
  PubkeyBundle,
  SendTransaction,
  SignatureBytes,
  SignedTransaction,
  UnsignedTransaction,
} from "@iov/bcp";
import amino from "@tendermint/amino-js";
import { TxsResponse } from "./restclient";
import { TokenInfos } from "./types";
export declare function decodePubkey(pubkey: amino.PubKey): PubkeyBundle;
export declare function decodeSignature(signature: string): SignatureBytes;
export declare function decodeFullSignature(signature: amino.StdSignature, nonce: number): FullSignature;
export declare const decodeAmount: (tokens: TokenInfos) => (coin: amino.Coin) => Amount;
export declare function parseMsg(msg: amino.Msg, chainId: ChainId, tokens: TokenInfos): SendTransaction;
export declare function parseFee(fee: amino.StdFee, tokens: TokenInfos): Fee;
export declare function parseTx(
  tx: amino.Tx,
  chainId: ChainId,
  nonce: Nonce,
  tokens: TokenInfos,
): SignedTransaction;
export declare function parseTxsResponse(
  chainId: ChainId,
  currentHeight: number,
  nonce: Nonce,
  response: TxsResponse,
  tokens: TokenInfos,
): ConfirmedAndSignedTransaction<UnsignedTransaction>;
