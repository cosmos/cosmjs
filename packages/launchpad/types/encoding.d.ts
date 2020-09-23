import { Msg } from "./msgs";
import { StdFee } from "./types";
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
export declare function makeStdSignDoc(
  msgs: readonly Msg[],
  fee: StdFee,
  chainId: string,
  memo: string,
  accountNumber: number | string,
  sequence: number | string,
): StdSignDoc;
export declare function serializeSignDoc(signDoc: StdSignDoc): Uint8Array;
/** A convenience helper to create the StdSignDoc and serialize it */
export declare function makeSignBytes(
  msgs: readonly Msg[],
  fee: StdFee,
  chainId: string,
  memo: string,
  accountNumber: number | string,
  sequence: number | string,
): Uint8Array;
