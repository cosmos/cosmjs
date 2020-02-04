import { Secp256k1 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";

import { Msg, NonceInfo, StdFee, StdSignature, StdTx } from "./types";

const { toBase64, toUtf8 } = Encoding;

function sortJson(json: any): any {
  if (typeof json !== "object" || json === null) {
    return json;
  }
  if (Array.isArray(json)) {
    return json.map(sortJson);
  }
  const sortedKeys = Object.keys(json).sort();
  const result = sortedKeys.reduce(
    (accumulator, key) => ({
      ...accumulator,
      [key]: sortJson(json[key]),
    }),
    {},
  );
  return result;
}

export function marshalTx(tx: StdTx): Uint8Array {
  const json = JSON.stringify(tx);
  return Encoding.toUtf8(json);
}

export function makeSignBytes(
  msg: Msg,
  fee: StdFee,
  chainId: string,
  memo: string,
  account: NonceInfo,
): Uint8Array {
  const signMsg = sortJson({
    // eslint-disable-next-line @typescript-eslint/camelcase
    account_number: account.account_number.toString(),
    // eslint-disable-next-line @typescript-eslint/camelcase
    chain_id: chainId,
    fee: fee,
    memo: memo,
    msgs: msg,
    sequence: account.sequence.toString(),
  });
  return toUtf8(JSON.stringify(signMsg));
}

export function encodeSecp256k1Signature(pubkey: Uint8Array, signature: Uint8Array): StdSignature {
  return {
    // eslint-disable-next-line @typescript-eslint/camelcase
    pub_key: {
      type: "tendermint/PubKeySecp256k1",
      value: toBase64(Secp256k1.compressPubkey(pubkey)),
    },
    // Recovery seems to be unused
    signature: toBase64(Secp256k1.trimRecoveryByte(signature)),
  };
}
