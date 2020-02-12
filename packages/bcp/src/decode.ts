import { TxsResponse, types } from "@cosmwasm/sdk";
import {
  Address,
  Algorithm,
  Amount,
  ChainId,
  ConfirmedAndSignedTransaction,
  Fee,
  FullSignature,
  Nonce,
  PubkeyBundle,
  PubkeyBytes,
  SendTransaction,
  SignatureBytes,
  SignedTransaction,
  TokenTicker,
  TransactionId,
  UnsignedTransaction,
} from "@iov/bcp";
import { Decimal, Encoding } from "@iov/encoding";

import { BankTokens } from "./types";

const { fromBase64 } = Encoding;

export function decodePubkey(pubkey: types.PubKey): PubkeyBundle {
  switch (pubkey.type) {
    case types.pubkeyType.secp256k1:
      return {
        algo: Algorithm.Secp256k1,
        data: fromBase64(pubkey.value) as PubkeyBytes,
      };
    case types.pubkeyType.ed25519:
      return {
        algo: Algorithm.Ed25519,
        data: fromBase64(pubkey.value) as PubkeyBytes,
      };
    default:
      throw new Error("Unsupported pubkey type");
  }
}

export function decodeSignature(signature: string): SignatureBytes {
  return fromBase64(signature) as SignatureBytes;
}

export function decodeFullSignature(signature: types.StdSignature, nonce: number): FullSignature {
  return {
    nonce: nonce as Nonce,
    pubkey: decodePubkey(signature.pub_key),
    signature: decodeSignature(signature.signature),
  };
}

export function coinToDecimal(tokens: BankTokens, coin: types.Coin): readonly [Decimal, string] {
  const match = tokens.find(({ denom }) => denom === coin.denom);
  if (!match) {
    throw Error(`unknown denom: ${coin.denom}`);
  }
  const value = Decimal.fromAtomics(coin.amount, match.fractionalDigits);
  return [value, match.ticker];
}

export function decodeAmount(tokens: BankTokens, coin: types.Coin): Amount {
  const [value, ticker] = coinToDecimal(tokens, coin);
  return {
    quantity: value.atomics,
    fractionalDigits: value.fractionalDigits,
    tokenTicker: ticker as TokenTicker,
  };
}

export function parseMsg(
  msg: types.Msg,
  memo: string | undefined,
  chainId: ChainId,
  tokens: BankTokens,
): UnsignedTransaction {
  if (types.isMsgSend(msg)) {
    if (msg.value.amount.length !== 1) {
      throw new Error("Only MsgSend with one amount is supported");
    }
    const send: SendTransaction = {
      kind: "bcp/send",
      chainId: chainId,
      sender: msg.value.from_address as Address,
      recipient: msg.value.to_address as Address,
      amount: decodeAmount(tokens, msg.value.amount[0]),
      memo: memo,
    };
    return send;
  } else {
    // Unknown transaction type
    const unknown = {
      chainId: chainId,
      kind: "bcp/unknown",
    };
    return unknown;
  }
}

export function parseFee(fee: types.StdFee, tokens: BankTokens): Fee {
  if (fee.amount.length !== 1) {
    throw new Error("Only fee with one amount is supported");
  }
  return {
    tokens: decodeAmount(tokens, fee.amount[0]),
    gasLimit: fee.gas,
  };
}

export function parseSignedTx(
  txValue: types.StdTx,
  chainId: ChainId,
  nonce: Nonce,
  tokens: BankTokens,
): SignedTransaction {
  if (!types.isStdTx(txValue)) {
    throw new Error("Only StdTx is supported");
  }
  if (txValue.msg.length !== 1) {
    throw new Error("Only single-message transactions currently supported");
  }

  const [primarySignature] = txValue.signatures.map(signature => decodeFullSignature(signature, nonce));
  const msg = parseMsg(txValue.msg[0], txValue.memo, chainId, tokens);
  const fee = parseFee(txValue.fee, tokens);

  const transaction: UnsignedTransaction = {
    ...msg,
    chainId: chainId,
    fee: fee,
  };

  return {
    transaction: transaction,
    signatures: [primarySignature],
  };
}

export function parseTxsResponse(
  chainId: ChainId,
  currentHeight: number,
  nonce: Nonce,
  response: TxsResponse,
  tokens: BankTokens,
): ConfirmedAndSignedTransaction<UnsignedTransaction> {
  const height = parseInt(response.height, 10);
  return {
    ...parseSignedTx(response.tx.value, chainId, nonce, tokens),
    height: height,
    confirmations: currentHeight - height + 1,
    transactionId: response.txhash as TransactionId,
    log: response.raw_log,
  };
}
