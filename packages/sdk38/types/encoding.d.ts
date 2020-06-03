import { Msg, StdFee, StdTx } from "./types";
export declare function marshalTx(tx: StdTx): Uint8Array;
export declare function makeSignBytes(
  msgs: readonly Msg[],
  fee: StdFee,
  chainId: string,
  memo: string,
  accountNumber: number,
  sequence: number,
): Uint8Array;
