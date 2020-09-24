import { StdSignDoc } from "./encoding";
import { Msg } from "./msgs";
import { StdFee, StdSignature } from "./types";
/**
 * A Cosmos SDK StdTx
 *
 * @see https://docs.cosmos.network/master/modules/auth/03_types.html#stdtx
 */
export interface StdTx {
  readonly msg: readonly Msg[];
  readonly fee: StdFee;
  readonly signatures: readonly StdSignature[];
  readonly memo: string | undefined;
}
export declare function isStdTx(txValue: unknown): txValue is StdTx;
export declare function makeStdTx(
  content: Pick<StdSignDoc, "msgs" | "fee" | "memo">,
  signatures: StdSignature | readonly StdSignature[],
): StdTx;
/**
 * An Amino JSON wrapper around the Tx interface
 */
export interface WrappedTx {
  readonly type: string;
  readonly value: any;
}
/**
 * An Amino JSON wrapper around StdTx
 */
export interface WrappedStdTx extends WrappedTx {
  readonly type: "cosmos-sdk/StdTx";
  readonly value: StdTx;
}
export declare function isWrappedStdTx(wrapped: WrappedTx): wrapped is WrappedStdTx;
/** @deprecated use WrappedStdTx */
export declare type CosmosSdkTx = WrappedStdTx;
