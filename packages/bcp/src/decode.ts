import {
  Coin,
  IndexedTx,
  isMsgSend,
  isStdTx,
  Msg,
  PubKey,
  pubkeyType,
  StdFee,
  StdSignature,
  StdTx,
} from "@cosmwasm/sdk38";
import {
  Address,
  Algorithm,
  Amount,
  ChainId,
  ConfirmedAndSignedTransaction,
  ConfirmedTransaction,
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

import { BankToken } from "./types";

const { fromBase64 } = Encoding;

export function decodePubkey(pubkey: PubKey): PubkeyBundle {
  switch (pubkey.type) {
    case pubkeyType.secp256k1:
      return {
        algo: Algorithm.Secp256k1,
        data: fromBase64(pubkey.value) as PubkeyBytes,
      };
    case pubkeyType.ed25519:
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

export function decodeFullSignature(signature: StdSignature, nonce: number): FullSignature {
  return {
    nonce: nonce as Nonce,
    pubkey: decodePubkey(signature.pub_key),
    signature: decodeSignature(signature.signature),
  };
}

export function coinToDecimal(tokens: readonly BankToken[], coin: Coin): readonly [Decimal, string] {
  const match = tokens.find(({ denom }) => denom === coin.denom);
  if (!match) {
    throw Error(`unknown denom: ${coin.denom}`);
  }
  const value = Decimal.fromAtomics(coin.amount, match.fractionalDigits);
  return [value, match.ticker];
}

export function decodeAmount(tokens: readonly BankToken[], coin: Coin): Amount {
  const [value, ticker] = coinToDecimal(tokens, coin);
  return {
    quantity: value.atomics,
    fractionalDigits: value.fractionalDigits,
    tokenTicker: ticker as TokenTicker,
  };
}

export function parseMsg(
  msg: Msg,
  memo: string | undefined,
  chainId: ChainId,
  tokens: readonly BankToken[],
): UnsignedTransaction {
  if (isMsgSend(msg)) {
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

export function parseFee(fee: StdFee, tokens: readonly BankToken[]): Fee {
  if (fee.amount.length !== 1) {
    throw new Error("Only fee with one amount is supported");
  }
  return {
    tokens: decodeAmount(tokens, fee.amount[0]),
    gasLimit: fee.gas,
  };
}

export function parseUnsignedTx(
  txValue: StdTx,
  chainId: ChainId,
  tokens: readonly BankToken[],
): UnsignedTransaction {
  if (!isStdTx(txValue)) {
    throw new Error("Only StdTx is supported");
  }
  if (txValue.msg.length !== 1) {
    throw new Error("Only single-message transactions currently supported");
  }

  const msg = parseMsg(txValue.msg[0], txValue.memo, chainId, tokens);
  const fee = parseFee(txValue.fee, tokens);

  return {
    ...msg,
    chainId: chainId,
    fee: fee,
  };
}

export function parseSignedTx(
  txValue: StdTx,
  chainId: ChainId,
  nonce: Nonce,
  tokens: readonly BankToken[],
): SignedTransaction {
  const [primarySignature] = txValue.signatures.map((signature) => decodeFullSignature(signature, nonce));
  return {
    transaction: parseUnsignedTx(txValue, chainId, tokens),
    signatures: [primarySignature],
  };
}

export function parseTxsResponseUnsigned(
  chainId: ChainId,
  currentHeight: number,
  response: IndexedTx,
  tokens: readonly BankToken[],
): ConfirmedTransaction<UnsignedTransaction> {
  return {
    transaction: parseUnsignedTx(response.tx.value, chainId, tokens),
    height: response.height,
    confirmations: currentHeight - response.height + 1,
    transactionId: response.hash as TransactionId,
    log: response.rawLog,
  };
}

export function parseTxsResponseSigned(
  chainId: ChainId,
  currentHeight: number,
  nonce: Nonce,
  response: IndexedTx,
  tokens: readonly BankToken[],
): ConfirmedAndSignedTransaction<UnsignedTransaction> {
  return {
    ...parseSignedTx(response.tx.value, chainId, nonce, tokens),
    height: response.height,
    confirmations: currentHeight - response.height + 1,
    transactionId: response.hash as TransactionId,
    log: response.rawLog,
  };
}
