/* eslint-disable @typescript-eslint/naming-convention */
import { toUtf8 } from "@cosmjs/encoding";

import { uint64ToString } from "./lcdapi";
import { Msg } from "./msgs";
import { StdFee } from "./types";

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

/**
 * The document to be signed
 *
 * @see https://docs.cosmos.network/master/modules/auth/03_types.html#stdsigndoc
 */
export interface StdSignDoc {
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
  accountNumber: number | string,
  sequence: number | string,
): Uint8Array {
  const signDoc: StdSignDoc = {
    account_number: uint64ToString(accountNumber),
    chain_id: chainId,
    fee: fee,
    memo: memo,
    msgs: msgs,
    sequence: uint64ToString(sequence),
  };
  const sortedSignDoc = sortJson(signDoc);
  return toUtf8(JSON.stringify(sortedSignDoc));
}
