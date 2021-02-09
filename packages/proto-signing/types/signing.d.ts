import { Coin } from "./codec/cosmos/base/v1beta1/coin";
import { SignMode } from "./codec/cosmos/tx/signing/v1beta1/signing";
import { SignDoc } from "./codec/cosmos/tx/v1beta1/tx";
import { Any } from "./codec/google/protobuf/any";
/**
 * Creates and serializes an AuthInfo document using SIGN_MODE_DIRECT.
 */
export declare function makeAuthInfoBytes(
  pubkeys: readonly Any[],
  feeAmount: readonly Coin[],
  gasLimit: number,
  sequence: number,
  signMode?: SignMode,
): Uint8Array;
export declare function makeSignDoc(
  bodyBytes: Uint8Array,
  authInfoBytes: Uint8Array,
  chainId: string,
  accountNumber: number,
): SignDoc;
export declare function makeSignBytes({
  accountNumber,
  authInfoBytes,
  bodyBytes,
  chainId,
}: SignDoc): Uint8Array;
