import { Msg } from "./msgs";
import { StdFee } from "./types";
/** Returns a JSON string with objects sorted by key */
export declare function sortedJsonStringify(obj: any): string;
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
  readonly msgs: readonly Msg[];
  readonly memo: string;
}
export declare function makeSignDoc(
  msgs: readonly Msg[],
  fee: StdFee,
  chainId: string,
  memo: string,
  accountNumber: number | string,
  sequence: number | string,
): StdSignDoc;
export declare function serializeSignDoc(signDoc: StdSignDoc): Uint8Array;
