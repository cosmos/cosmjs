import { cosmos, google } from "./codec";
/**
 * Creates and serializes an AuthInfo document using SIGN_MODE_DIRECT.
 */
export declare function makeAuthInfoBytes(
  pubkeys: readonly google.protobuf.IAny[],
  feeAmount: readonly cosmos.base.v1beta1.Coin[],
  gasLimit: number,
  sequence: number,
  signMode?: cosmos.tx.signing.v1beta1.SignMode,
): Uint8Array;
export declare function makeSignDoc(
  bodyBytes: Uint8Array,
  authInfoBytes: Uint8Array,
  chainId: string,
  accountNumber: number,
): cosmos.tx.v1beta1.ISignDoc;
export declare function makeSignBytes({
  accountNumber,
  authInfoBytes,
  bodyBytes,
  chainId,
}: cosmos.tx.v1beta1.ISignDoc): Uint8Array;
