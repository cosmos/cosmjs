/* eslint-disable @typescript-eslint/naming-convention */
import Long from "long";

import { omitDefaults } from "./adr27";
import { cosmos } from "./codec";

const { SignDoc, AuthInfo } = cosmos.tx;

/**
 * Creates and serializes an AuthInfo document using SIGN_MODE_DIRECT.
 */
export function makeAuthInfo(pubkeys: readonly cosmos.crypto.IPublicKey[], gasLimit: number): Uint8Array {
  const authInfo = {
    signerInfos: pubkeys.map(
      (pubkey): cosmos.tx.ISignerInfo => ({
        publicKey: pubkey,
        modeInfo: {
          single: { mode: cosmos.tx.signing.SignMode.SIGN_MODE_DIRECT },
        },
      }),
    ),
    fee: { gasLimit: Long.fromNumber(gasLimit) },
  };
  return Uint8Array.from(AuthInfo.encode(authInfo).finish());
}

export function makeSignBytes(
  txBody: Uint8Array,
  authInfo: Uint8Array,
  chainId: string,
  accountNumber: number,
  sequence: number,
): Uint8Array {
  const signDoc = SignDoc.create(
    omitDefaults({
      bodyBytes: txBody,
      authInfoBytes: authInfo,
      chainId: chainId,
      accountNumber: accountNumber,
      accountSequence: sequence,
    }),
  );
  return Uint8Array.from(SignDoc.encode(signDoc).finish());
}
