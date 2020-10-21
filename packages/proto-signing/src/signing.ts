/* eslint-disable @typescript-eslint/naming-convention */
import Long from "long";

import { omitDefaults } from "./adr27";
import { cosmos, google } from "./codec";

const { SignDoc, AuthInfo } = cosmos.tx.v1beta1;

/**
 * Creates and serializes an AuthInfo document using SIGN_MODE_DIRECT.
 */
export function makeAuthInfoBytes(
  pubkeys: readonly google.protobuf.IAny[],
  feeAmount: readonly cosmos.base.v1beta1.Coin[],
  gasLimit: number,
  sequence: number,
): Uint8Array {
  const authInfo = {
    signerInfos: pubkeys.map(
      (pubkey): cosmos.tx.v1beta1.ISignerInfo => ({
        publicKey: pubkey,
        modeInfo: {
          single: { mode: cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT },
        },
        sequence: sequence ? Long.fromNumber(sequence) : undefined,
      }),
    ),
    fee: { amount: [...feeAmount], gasLimit: Long.fromNumber(gasLimit) },
  };
  return Uint8Array.from(AuthInfo.encode(authInfo).finish());
}

export function makeSignDoc(
  bodyBytes: Uint8Array,
  authInfoBytes: Uint8Array,
  chainId: string,
  accountNumber: number,
): cosmos.tx.v1beta1.ISignDoc {
  return {
    bodyBytes: bodyBytes,
    authInfoBytes: authInfoBytes,
    chainId: chainId,
    accountNumber: Long.fromNumber(accountNumber),
  };
}

export function makeSignBytes({
  accountNumber,
  authInfoBytes,
  bodyBytes,
  chainId,
}: cosmos.tx.v1beta1.ISignDoc): Uint8Array {
  const signDoc = SignDoc.create(
    omitDefaults({
      accountNumber: accountNumber,
      authInfoBytes: authInfoBytes,
      bodyBytes: bodyBytes,
      chainId: chainId,
    }),
  );
  return Uint8Array.from(SignDoc.encode(signDoc).finish());
}
