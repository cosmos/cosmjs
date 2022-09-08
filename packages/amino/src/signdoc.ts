/* eslint-disable @typescript-eslint/naming-convention */
import { toUtf8 } from "@cosmjs/encoding";
import { Uint53 } from "@cosmjs/math";

import { Coin } from "./coins";

export interface AminoMsg {
  readonly type: string;
  readonly value: any;
}

export interface StdFee {
  readonly amount: readonly Coin[];
  readonly gas: string;
}

/**
 * The document to be signed
 *
 * @see https://docs.cosmos.network/master/modules/auth/03_types.html#stdsigndoc
 */
export interface StdSignDoc {
  readonly chain_id: string;
  readonly account_number: string;
  readonly sequence: string;
  readonly fee: StdFee;
  readonly msgs: readonly AminoMsg[];
  readonly memo: string;
}

function sortedObject(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(sortedObject);
  }
  const sortedKeys = Object.keys(obj).sort();
  const result: Record<string, any> = {};
  // NOTE: Use forEach instead of reduce for performance with large objects eg Wasm code
  sortedKeys.forEach((key) => {
    result[key] = sortedObject(obj[key]);
  });
  return result;
}

/** Returns a JSON string with objects sorted by key */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function sortedJsonStringify(obj: any): string {
  return JSON.stringify(sortedObject(obj));
}

export function makeSignDoc(
  msgs: readonly AminoMsg[],
  fee: StdFee,
  chainId: string,
  memo: string | undefined,
  accountNumber: number | string,
  sequence: number | string,
): StdSignDoc {
  return {
    chain_id: chainId,
    account_number: Uint53.fromString(accountNumber.toString()).toString(),
    sequence: Uint53.fromString(sequence.toString()).toString(),
    fee: fee,
    msgs: msgs,
    memo: memo || "",
  };
}

export function serializeSignDoc(signDoc: StdSignDoc): Uint8Array {
  const fixedMsgs = signDoc.msgs.map((aminoMsg) => {
    if (aminoMsg.type.startsWith("regen")) {
      // regen ledger incorrectly implements amino signing.
      // this short term workaround makes cosmjs compatible with regen-ledger v4.0
      // until regen ledger upgrades with the fix in v5.0
      // ref: https://github.com/regen-network/regen-ledger/pull/1480
      return aminoMsg.value
    } else {
      return aminoMsg
    }
  })

  
  var fixedSignDoc: any = signDoc;
  fixedSignDoc.msgs = fixedMsgs;

  return toUtf8(sortedJsonStringify(fixedSignDoc));
}
