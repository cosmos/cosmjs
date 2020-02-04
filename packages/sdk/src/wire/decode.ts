import { Integer, assertArray, assertSet, assertString, optional, Base64 } from "./encodings";
import * as data from "./data";
import * as types from "../types";

export function decodeAminoTx(tx: data.AminoTx): types.AminoTx {
  if (tx.type !== "cosmos-sdk/StdTx") {
    throw new Error(`Invalid Tx Type: ${tx.type}`);
  }
  return {
    type: tx.type,
    value: decodeStdTx(tx.value),
  };
}

export function decodeStdTx(tx: data.StdTx): types.StdTx {
  return {
    msg: assertArray(tx.msg).map(decodeMsg),
    fee: decodeFee(assertSet(tx.fee)),
    // fee: may(tx.fee, decodeFee), ??
    signatures: assertArray(tx.signatures).map(decodeSignature),
    memo: assertString(optional(tx.memo, "")),
  };
}

export function decodeFee(fee: data.StdFee): types.StdFee {
  return {
    amount: assertArray(fee.amount).map(decodeCoin),
    gas: Integer.parse(assertSet(fee.gas)),
  };
}

export function decodeMsg(msg: data.Msg): types.Msg {
  if (msg.type === "cosmos-sdk/MsgSend") {
    return {
      type: msg.type,
      // TODO: why isn't this type auto-detected
      value: decodeMsgSend(msg.value as data.MsgSend),
    };
  }
  // unknown types passed through
  return msg;
}

export function decodeMsgSend(msg: data.MsgSend): types.MsgSend {
  return {
    from_address: assertString(msg.from_address),
    to_address: assertString(msg.to_address),
    amount: assertArray(msg.amount).map(decodeCoin),
  }
}

export function decodeCoin(coin: data.Coin): types.Coin {
  return {
    denom: assertString(coin.denom),
    amount: assertString(coin.amount),  // TODO: regexp? [0-9]+
  }
}

export function decodeSignature(sig: data.StdSignature): types.StdSignature {
  return {
    pub_key: decodePubKey(sig.pub_key),
    signature: Base64.decode(assertSet(sig.signature)),
  }
}

export function decodePubKey(pub: data.PubKey): types.PubKey {
  const value = Base64.decode(assertSet(pub.value));
  if (pub.type !== "tendermint/PubKeyEd25519" && pub.type !== "tendermint/PubKeySecp256k1" && pub.type !== "tendermint/PubKeySr25519") {
    throw new Error(`Unknown pubkey type: ${pub.type}`);
  }
  return {
    type: pub.type,
    value: value,
  }
}

