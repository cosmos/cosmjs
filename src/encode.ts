/* eslint-disable @typescript-eslint/camelcase */
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
import { Encoding } from "@iov/encoding";
import amino from "@tendermint/amino-js";

import { AminoTx } from "./types";

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

export function encodeAmount(amount: Amount): amino.Coin {
  if (amount.tokenTicker !== "ATOM") {
    throw new Error("Only ATOM amounts are supported");
  }
  return {
    denom: "uatom",
    amount: amount.quantity,
  };
}

export function encodeFee(fee: Fee): amino.StdFee {
  if (fee.tokens === undefined) {
    throw new Error("Cannot encode fee without tokens");
  }
  if (fee.gasLimit === undefined) {
    throw new Error("Cannot encode fee without gas limit");
  }
  return {
    amount: [encodeAmount(fee.tokens)],
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

export function buildUnsignedTx(tx: UnsignedTransaction): AminoTx {
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
            amount: [encodeAmount(tx.amount)],
          },
        },
      ],
      memo: tx.memo || "",
      signatures: [],
      fee: tx.fee
        ? encodeFee(tx.fee)
        : {
            amount: [],
            gas: "",
          },
    },
  };
}

export function buildSignedTx(tx: SignedTransaction): AminoTx {
  const built = buildUnsignedTx(tx.transaction);
  return {
    ...built,
    value: {
      ...built.value,
      signatures: tx.signatures.map(encodeFullSignature),
    },
  };
}
