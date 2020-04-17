/* eslint-disable @typescript-eslint/camelcase */
import { encodeSecp256k1Pubkey, encodeSecp256k1Signature, types } from "@cosmwasm/sdk";
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

import { BankTokens, Erc20Token } from "./types";

const { toBase64 } = Encoding;

// TODO: This function seems to be unused and is not well tested (e.g. uncompressed secp256k1 or ed25519)
export function encodePubkey(pubkey: PubkeyBundle): types.PubKey {
  switch (pubkey.algo) {
    case Algorithm.Secp256k1:
      return encodeSecp256k1Pubkey(pubkey.data);
    case Algorithm.Ed25519:
      return {
        type: types.pubkeyType.ed25519,
        value: toBase64(pubkey.data),
      };
    default:
      throw new Error("Unsupported pubkey algo");
  }
}

export function toErc20Amount(amount: Amount, erc20Token: Erc20Token): string {
  if (amount.tokenTicker !== erc20Token.ticker) throw new Error("Ticker mismatch between amount and token");
  if (amount.fractionalDigits !== erc20Token.fractionalDigits) {
    throw new Error("Fractional digits mismatch between amount and token");
  }
  return amount.quantity;
}

export function toBankCoin(amount: Amount, tokens: BankTokens): types.Coin {
  const match = tokens.find((token) => token.ticker === amount.tokenTicker);
  if (!match) throw Error(`unknown ticker: ${amount.tokenTicker}`);
  if (match.fractionalDigits !== amount.fractionalDigits) {
    throw new Error(
      "Mismatch in fractional digits between token and value. If you really want, implement a conversion here. However, this indicates a bug in the caller code.",
    );
  }
  return {
    denom: match.denom,
    amount: amount.quantity,
  };
}

export function encodeFee(fee: Fee, tokens: BankTokens): types.StdFee {
  if (fee.tokens === undefined) {
    throw new Error("Cannot encode fee without tokens");
  }
  if (fee.gasLimit === undefined) {
    throw new Error("Cannot encode fee without gas limit");
  }
  return {
    amount: [toBankCoin(fee.tokens, tokens)],
    gas: fee.gasLimit,
  };
}

export function encodeFullSignature(fullSignature: FullSignature): types.StdSignature {
  switch (fullSignature.pubkey.algo) {
    case Algorithm.Secp256k1: {
      const compressedPubkey = Secp256k1.compressPubkey(fullSignature.pubkey.data);
      const normalizedSignature = Secp256k1.trimRecoveryByte(fullSignature.signature);
      return encodeSecp256k1Signature(compressedPubkey, normalizedSignature);
    }
    default:
      throw new Error("Unsupported signing algorithm");
  }
}

export function buildUnsignedTx(
  tx: UnsignedTransaction,
  bankTokens: BankTokens,
  erc20Tokens: readonly Erc20Token[] = [],
): types.CosmosSdkTx {
  if (!isSendTransaction(tx)) {
    throw new Error("Received transaction of unsupported kind");
  }

  const matchingBankToken = bankTokens.find((t) => t.ticker === tx.amount.tokenTicker);
  const matchingErc20Token = erc20Tokens.find((t) => t.ticker === tx.amount.tokenTicker);

  if (!tx.fee) throw new Error("Transaction fee must be set");

  if (matchingBankToken) {
    return {
      type: "cosmos-sdk/StdTx",
      value: {
        msg: [
          {
            type: "cosmos-sdk/MsgSend",
            value: {
              from_address: tx.sender,
              to_address: tx.recipient,
              amount: [toBankCoin(tx.amount, bankTokens)],
            },
          },
        ],
        memo: tx.memo || "",
        signatures: [],
        fee: encodeFee(tx.fee, bankTokens),
      },
    };
  } else if (matchingErc20Token) {
    return {
      type: "cosmos-sdk/StdTx",
      value: {
        msg: [
          {
            type: "wasm/execute",
            value: {
              sender: tx.sender,
              contract: matchingErc20Token.contractAddress,
              msg: {
                transfer: {
                  amount: toErc20Amount(tx.amount, matchingErc20Token),
                  recipient: tx.recipient,
                },
              },
              sent_funds: [],
            },
          },
        ],
        memo: tx.memo || "",
        signatures: [],
        fee: encodeFee(tx.fee, bankTokens),
      },
    };
  } else {
    throw new Error("Cannot encode this type of transaction");
  }
}

export function buildSignedTx(
  tx: SignedTransaction,
  bankTokens: BankTokens,
  erc20Tokens: readonly Erc20Token[] = [],
): types.CosmosSdkTx {
  const built = buildUnsignedTx(tx.transaction, bankTokens, erc20Tokens);
  return {
    ...built,
    value: {
      ...built.value,
      signatures: tx.signatures.map(encodeFullSignature),
    },
  };
}
