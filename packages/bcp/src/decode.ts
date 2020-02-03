import { coinToDecimal, TxsResponse, types } from "@cosmwasm/sdk";
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

import { TokenInfos } from "./types";

const { fromBase64 } = Encoding;

export function decodePubkey(pubkey: types.PubKey): PubkeyBundle {
  switch (pubkey.type) {
    // https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/secp256k1/secp256k1.go#L23
    case "tendermint/PubKeySecp256k1":
      return {
        algo: Algorithm.Secp256k1,
        data: fromBase64(pubkey.value) as PubkeyBytes,
      };
    // https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/ed25519/ed25519.go#L22
    case "tendermint/PubKeyEd25519":
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

export function decodeAmount(tokens: TokenInfos, coin: types.Coin): Amount {
  const [value, ticker] = coinToDecimal(tokens, coin);
  return {
    quantity: value.atomics,
    fractionalDigits: value.fractionalDigits,
    tokenTicker: ticker as TokenTicker,
  };
}

export function parseMsg(msg: types.Msg, chainId: ChainId, tokens: TokenInfos): SendTransaction {
  if (msg.type !== "cosmos-sdk/MsgSend") {
    throw new Error("Unknown message type in transaction");
  }
  if (!(msg.value as types.MsgSend).from_address) {
    throw new Error("Only MsgSend is supported");
  }
  const msgValue = msg.value as types.MsgSend;
  if (msgValue.amount.length !== 1) {
    throw new Error("Only MsgSend with one amount is supported");
  }
  return {
    kind: "bcp/send",
    chainId: chainId,
    sender: msgValue.from_address as Address,
    recipient: msgValue.to_address as Address,
    amount: decodeAmount(tokens, msgValue.amount[0]),
  };
}

export function parseFee(fee: types.StdFee, tokens: TokenInfos): Fee {
  if (fee.amount.length !== 1) {
    throw new Error("Only fee with one amount is supported");
  }
  return {
    tokens: decodeAmount(tokens, fee.amount[0]),
    gasLimit: fee.gas,
  };
}

export function parseTx(tx: types.Tx, chainId: ChainId, nonce: Nonce, tokens: TokenInfos): SignedTransaction {
  const txValue = tx.value;
  if (!types.isAminoStdTx(txValue)) {
    throw new Error("Only Amino StdTx is supported");
  }
  if (txValue.msg.length !== 1) {
    throw new Error("Only single-message transactions currently supported");
  }

  const [primarySignature] = txValue.signatures.map(signature => decodeFullSignature(signature, nonce));
  const msg = parseMsg(txValue.msg[0], chainId, tokens);
  const fee = parseFee(txValue.fee, tokens);

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
  tokens: TokenInfos,
): ConfirmedAndSignedTransaction<UnsignedTransaction> {
  const height = parseInt(response.height, 10);
  return {
    ...parseTx(response.tx, chainId, nonce, tokens),
    height: height,
    confirmations: currentHeight - height + 1,
    transactionId: response.txhash as TransactionId,
    log: response.raw_log,
  };
}
