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
import { Encoding } from "@iov/encoding";
import amino from "@tendermint/amino-js";

import { TxsResponse } from "./restclient";
import { isAminoStdTx } from "./types";

const { fromBase64 } = Encoding;

const atom = "ATOM" as TokenTicker;

export function decodePubkey(pubkey: amino.PubKey): PubkeyBundle {
  return {
    algo: Algorithm.Secp256k1,
    data: fromBase64(pubkey.value) as PubkeyBytes,
  };
}

export function decodeSignature(signature: string): SignatureBytes {
  return fromBase64(signature) as SignatureBytes;
}

export function decodeFullSignature(signature: amino.StdSignature, nonce: number): FullSignature {
  return {
    nonce: nonce as Nonce,
    pubkey: decodePubkey(signature.pub_key),
    signature: decodeSignature(signature.signature),
  };
}

export function decodeAmount(amount: amino.Coin): Amount {
  // TODO: more uglyness here (breaks unit tests)
  if (amount.denom !== "uatom") {
    throw new Error("Only ATOM amounts are supported");
  }
  return {
    fractionalDigits: 6,
    quantity: amount.amount,
    tokenTicker: atom,
    // tokenTicker: amount.denom as TokenTicker,
  };
}

export function parseMsg(msg: amino.Msg, chainId: ChainId): SendTransaction {
  if (msg.type !== "cosmos-sdk/MsgSend") {
    throw new Error("Unknown message type in transaction");
  }
  if (!(msg.value as amino.MsgSend).from_address) {
    throw new Error("Only MsgSend is supported");
  }
  const msgValue = msg.value as amino.MsgSend;
  if (msgValue.amount.length !== 1) {
    throw new Error("Only MsgSend with one amount is supported");
  }
  return {
    kind: "bcp/send",
    chainId: chainId,
    sender: msgValue.from_address as Address,
    recipient: msgValue.to_address as Address,
    amount: decodeAmount(msgValue.amount[0]),
  };
}

export function parseFee(fee: amino.StdFee): Fee {
  if (fee.amount.length !== 1) {
    throw new Error("Only fee with one amount is supported");
  }
  return {
    tokens: decodeAmount(fee.amount[0]),
    gasLimit: fee.gas,
  };
}

export function parseTx(tx: amino.Tx, chainId: ChainId, nonce: Nonce): SignedTransaction {
  const txValue = tx.value;
  if (!isAminoStdTx(txValue)) {
    throw new Error("Only Amino StdTx is supported");
  }
  if (txValue.msg.length !== 1) {
    throw new Error("Only single-message transactions currently supported");
  }

  const [primarySignature] = txValue.signatures.map(signature => decodeFullSignature(signature, nonce));
  const msg = parseMsg(txValue.msg[0], chainId);
  const fee = parseFee(txValue.fee);

  const transaction = {
    ...msg,
    chainId: chainId,
    memo: txValue.memo,
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
): ConfirmedAndSignedTransaction<UnsignedTransaction> {
  const height = parseInt(response.height, 10);
  return {
    ...parseTx(response.tx, chainId, nonce),
    height: height,
    confirmations: currentHeight - height + 1,
    transactionId: response.txhash as TransactionId,
    log: response.raw_log,
  };
}
