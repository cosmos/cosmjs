import { cosmos } from "./codec";
/**
 * Creates and serializes an AuthInfo document using SIGN_MODE_DIRECT.
 */
export declare function makeAuthInfo(
  pubkeys: readonly cosmos.crypto.IPublicKey[],
  gasLimit: number,
): Uint8Array;
export declare function makeSignBytes(
  txBody: Uint8Array,
  authInfo: Uint8Array,
  chainId: string,
  accountNumber: number,
  sequence: number,
): Uint8Array;
