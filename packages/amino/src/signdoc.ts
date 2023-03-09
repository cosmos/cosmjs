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
  /** The granter address that is used for paying with feegrants */
  readonly granter?: string;
  /** The fee payer address. The payer must have signed the transaction. */
  readonly payer?: string;
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

export function escapeCharacters(encodedArray: Uint8Array): Uint8Array {
  const AmpersandUnicode = new Uint8Array([92, 117, 48, 48, 50, 54]);
  const LtSignUnicode = new Uint8Array([92, 117, 48, 48, 51, 99]);
  const GtSignUnicode = new Uint8Array([92, 117, 48, 48, 51, 101]);

  const AmpersandAscii = 38;
  const LtSign = 60; // <
  const GtSign = 62; // >

  const filteredIndex: number[] = [];
  encodedArray.forEach((value, index) => {
    if (value === AmpersandAscii || value === LtSign || value === GtSign) filteredIndex.push(index);
  });

  let result = new Uint8Array([...encodedArray]);
  const reversedFilteredIndex = filteredIndex.reverse();
  reversedFilteredIndex.forEach((value) => {
    let unicode = AmpersandUnicode;
    if (result[value] === LtSign) {
      unicode = LtSignUnicode;
    } else if (result[value] === GtSign) {
      unicode = GtSignUnicode;
    }
    result = new Uint8Array([...result.slice(0, value), ...unicode, ...result.slice(value + 1)]);
  });

  return result;
}

export function serializeSignDoc(signDoc: StdSignDoc): Uint8Array {
  return escapeCharacters(toUtf8(sortedJsonStringify(signDoc)));
}
