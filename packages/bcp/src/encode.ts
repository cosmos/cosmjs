/* eslint-disable @typescript-eslint/camelcase */
import { AminoTx } from "@cosmwasm/sdk";
import {
  Algorithm,
  Amount,
  Fee,
  FullSignature,
  isSendTransaction,
  PubkeyBundle,
  SignedTransaction,
  UnsignedTransaction,
} from "@iov/bcp";
import { Secp256k1 } from "@iov/crypto";
import { Decimal, Encoding } from "@iov/encoding";
import amino from "@tendermint/amino-js";

import { TokenInfos } from "./types";

const { toBase64 } = Encoding;

export function encodePubkey(pubkey: PubkeyBundle): amino.PubKey {
  switch (pubkey.algo) {
    case Algorithm.Secp256k1:
      return {
        type: "tendermint/PubKeySecp256k1",
        value: toBase64(pubkey.data),
      };
    case Algorithm.Ed25519:
      return {
        type: "tendermint/PubKeyEd25519",
        value: toBase64(pubkey.data),
      };
    default:
      throw new Error("Unsupported pubkey algo");
  }
}

export function decimalToCoin(lookup: TokenInfos, value: Decimal, ticker: string): amino.Coin {
  const match = lookup.find(token => token.ticker === ticker);
  if (!match) {
    throw Error(`unknown ticker: ${ticker}`);
  }
  if (match.fractionalDigits !== value.fractionalDigits) {
    throw new Error(
      "Mismatch in fractional digits between token and value. If you really want, implement a conversion here. However, this indicates a bug in the caller code.",
    );
  }
  return {
    denom: match.denom,
    amount: value.atomics,
  };
}

export function encodeAmount(amount: Amount, tokens: TokenInfos): amino.Coin {
  return decimalToCoin(
    tokens,
    Decimal.fromAtomics(amount.quantity, amount.fractionalDigits),
    amount.tokenTicker,
  );
}

export function encodeFee(fee: Fee, tokens: TokenInfos): amino.StdFee {
  if (fee.tokens === undefined) {
    throw new Error("Cannot encode fee without tokens");
  }
  if (fee.gasLimit === undefined) {
    throw new Error("Cannot encode fee without gas limit");
  }
  return {
    amount: [encodeAmount(fee.tokens, tokens)],
    gas: fee.gasLimit,
  };
}

export function encodeFullSignature(fullSignature: FullSignature): amino.StdSignature {
  return {
    pub_key: {
      type: "tendermint/PubKeySecp256k1",
      value: toBase64(Secp256k1.compressPubkey(fullSignature.pubkey.data)),
    },
    // Recovery seems to be unused
    signature: toBase64(Secp256k1.trimRecoveryByte(fullSignature.signature)),
  };
}

export function buildUnsignedTx(tx: UnsignedTransaction, tokens: TokenInfos): AminoTx {
  if (!isSendTransaction(tx)) {
    throw new Error("Received transaction of unsupported kind");
  }
  return {
    type: "cosmos-sdk/StdTx",
    value: {
      msg: [
        {
          type: "cosmos-sdk/MsgSend",
          value: {
            from_address: tx.sender,
            to_address: tx.recipient,
            amount: [encodeAmount(tx.amount, tokens)],
          },
        },
      ],
      memo: tx.memo || "",
      signatures: [],
      fee: tx.fee
        ? encodeFee(tx.fee, tokens)
        : {
            amount: [],
            gas: "",
          },
    },
  };
}

export function buildSignedTx(tx: SignedTransaction, tokens: TokenInfos): AminoTx {
  const built = buildUnsignedTx(tx.transaction, tokens);
  return {
    ...built,
    value: {
      ...built.value,
      signatures: tx.signatures.map(encodeFullSignature),
    },
  };
}
