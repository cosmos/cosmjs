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

import { AminoTx, TokenInfos, amountToCoin } from "./types";

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

export function encodeAmount(amount: Amount, tokens: TokenInfos): amino.Coin {
  return amountToCoin(tokens, amount);
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
