import { toUtf8 } from "@iov/encoding";

import { Msg, StdFee, StdTx } from "./types";

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
  return toUtf8(json);
}

interface SignJson {
  readonly account_number: string;
  readonly chain_id: string;
  readonly fee: StdFee;
  readonly memo: string;
  readonly msgs: readonly Msg[];
  readonly sequence: string;
}

export function makeSignBytes(
  msgs: readonly Msg[],
  fee: StdFee,
  chainId: string,
  memo: string,
  accountNumber: number,
  sequence: number,
): Uint8Array {
  const signJson: SignJson = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    account_number: accountNumber.toString(),
    // eslint-disable-next-line @typescript-eslint/camelcase
    chain_id: chainId,
    fee: fee,
    memo: memo,
    msgs: msgs,
    sequence: sequence.toString(),
  };
  const signMsg = sortJson(signJson);
  return toUtf8(JSON.stringify(signMsg));
}
