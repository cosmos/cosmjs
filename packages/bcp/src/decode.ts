import { IndexedTx, types } from "@cosmwasm/sdk";
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
import BN from "bn.js";

import { BankTokens, Erc20Token } from "./types";

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
  erc20Tokens: readonly Erc20Token[],
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
  } else if (types.isMsgExecuteContract(msg)) {
    const matchingTokenContract = erc20Tokens.find((t) => t.contractAddress === msg.value.contract);
    if (!matchingTokenContract) {
      return {
        chainId: chainId,
        kind: "bcp/unknown",
      };
    }

    const recipient: string | undefined = msg.value.msg.transfer?.recipient;
    if (!recipient) throw new Error("Could not read recipient");

    const amount: string | undefined = msg.value.msg.transfer?.amount;
    if (!amount) throw new Error("Could not read recipient");

    const send: SendTransaction = {
      kind: "bcp/send",
      chainId: chainId,
      sender: msg.value.sender as Address,
      recipient: recipient as Address,
      amount: {
        quantity: new BN(amount).toString(),
        fractionalDigits: matchingTokenContract.fractionalDigits,
        tokenTicker: matchingTokenContract.ticker as TokenTicker,
      },
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

export function parseUnsignedTx(
  txValue: types.StdTx,
  chainId: ChainId,
  tokens: BankTokens,
  erc20Tokens: readonly Erc20Token[],
): UnsignedTransaction {
  if (!types.isStdTx(txValue)) {
    throw new Error("Only StdTx is supported");
  }
  if (txValue.msg.length !== 1) {
    throw new Error("Only single-message transactions currently supported");
  }

  const msg = parseMsg(txValue.msg[0], txValue.memo, chainId, tokens, erc20Tokens);
  const fee = parseFee(txValue.fee, tokens);

  return {
    ...msg,
    chainId: chainId,
    fee: fee,
  };
}

export function parseSignedTx(
  txValue: types.StdTx,
  chainId: ChainId,
  nonce: Nonce,
  tokens: BankTokens,
  erc20Tokens: readonly Erc20Token[],
): SignedTransaction {
  const [primarySignature] = txValue.signatures.map((signature) => decodeFullSignature(signature, nonce));
  return {
    transaction: parseUnsignedTx(txValue, chainId, tokens, erc20Tokens),
    signatures: [primarySignature],
  };
}

export function parseTxsResponseUnsigned(
  chainId: ChainId,
  currentHeight: number,
  response: IndexedTx,
  tokens: BankTokens,
  erc20Tokens: readonly Erc20Token[],
): ConfirmedTransaction<UnsignedTransaction> {
  return {
    transaction: parseUnsignedTx(response.tx.value, chainId, tokens, erc20Tokens),
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
  tokens: BankTokens,
  erc20Tokens: readonly Erc20Token[],
): ConfirmedAndSignedTransaction<UnsignedTransaction> {
  return {
    ...parseSignedTx(response.tx.value, chainId, nonce, tokens, erc20Tokens),
    height: response.height,
    confirmations: currentHeight - response.height + 1,
    transactionId: response.hash as TransactionId,
    log: response.rawLog,
  };
}
