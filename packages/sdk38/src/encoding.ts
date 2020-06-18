import { toUtf8 } from "@cosmjs/encoding";

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
interface StdSignDoc {
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
  const signDoc: StdSignDoc = {
    account_number: accountNumber.toString(),
    chain_id: chainId,
    fee: fee,
    memo: memo,
    msgs: msgs,
    sequence: sequence.toString(),
  };
  const sortedSignDoc = sortJson(signDoc);
  return toUtf8(JSON.stringify(sortedSignDoc));
}
