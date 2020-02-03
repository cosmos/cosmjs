import { TxsResponse, types } from "@cosmwasm/sdk";
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
import { TokenInfos } from "./types";
export declare function decodePubkey(pubkey: types.PubKey): PubkeyBundle;
export declare function decodeSignature(signature: string): SignatureBytes;
export declare function decodeFullSignature(signature: types.StdSignature, nonce: number): FullSignature;
export declare function decodeAmount(tokens: TokenInfos, coin: types.Coin): Amount;
export declare function parseMsg(msg: types.Msg, chainId: ChainId, tokens: TokenInfos): SendTransaction;
export declare function parseFee(fee: types.StdFee, tokens: TokenInfos): Fee;
export declare function parseTx(
  tx: types.Tx,
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
