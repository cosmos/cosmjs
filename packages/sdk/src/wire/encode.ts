/* eslint-disable @typescript-eslint/camelcase */
import * as types from "../types";
import * as data from "./data";
import { Base64, Integer } from "./encodings";

export function encodePubKey(pub: types.PubKey): data.PubKey {
  return {
    type: pub.type,
    value: Base64.encode(pub.value),
  };
}

export function encodeSignature(sig: types.StdSignature): data.StdSignature {
  return {
    pub_key: encodePubKey(sig.pub_key),
    signature: Base64.encode(sig.signature),
  };
}

export function encodeFee(fee: types.StdFee): data.StdFee {
  return {
    // note: there is no encode coin need... decoding is just asserting format
    amount: fee.amount,
    gas: Integer.encode(fee.gas),
  };
}

export function encodeMsgSend(msg: types.MsgSend): data.MsgSend {
  return msg;
}

export function encodeMsg(msg: types.Msg): data.Msg {
  if (msg.type === "cosmos-sdk/MsgSend") {
    return {
      type: msg.type,
      // TODO: why isn't this type auto-detected
      value: encodeMsgSend(msg.value as types.MsgSend),
    };
  }
  // unknown types passed through
  return msg;
}

export function encodeStdTx(tx: types.StdTx): data.StdTx {
  return {
    msg: tx.msg.map(encodeMsg),
    fee: encodeFee(tx.fee),
    signatures: tx.signatures.map(encodeSignature),
    memo: tx.memo || "",
  };
}

export function encodeAminoTx(tx: types.AminoTx): data.AminoTx {
  if (tx.type !== "cosmos-sdk/StdTx") {
    throw new Error(`Invalid Tx Type: ${tx.type}`);
  }
  return {
    type: tx.type,
    value: encodeStdTx(tx.value),
  };
}
