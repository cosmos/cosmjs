/* eslint-disable @typescript-eslint/naming-convention */
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { AuthInfo, SignDoc, SignerInfo } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Any } from "cosmjs-types/google/protobuf/any";
import Long from "long";

/**
 * Creates and serializes an AuthInfo document using SIGN_MODE_DIRECT.
 */
export function makeAuthInfoBytes(
  pubkeys: readonly Any[],
  feeAmount: readonly Coin[],
  gasLimit: number,
  sequences: number[],
  signMode = SignMode.SIGN_MODE_DIRECT,
): Uint8Array {
  const authInfo = {
    signerInfos: pubkeys.map(
      (pubkey, index): SignerInfo => ({
        publicKey: pubkey,
        modeInfo: {
          single: { mode: signMode },
        },
        sequence: Long.fromNumber(sequences[index]),
      }),
    ),
    fee: {
      amount: [...feeAmount],
      gasLimit: Long.fromNumber(gasLimit),
    },
  };
  return AuthInfo.encode(AuthInfo.fromPartial(authInfo)).finish();
}

export function makeSignDoc(
  bodyBytes: Uint8Array,
  authInfoBytes: Uint8Array,
  chainId: string,
  accountNumber: number,
): SignDoc {
  return {
    bodyBytes: bodyBytes,
    authInfoBytes: authInfoBytes,
    chainId: chainId,
    accountNumber: Long.fromNumber(accountNumber),
  };
}

export function makeSignBytes({ accountNumber, authInfoBytes, bodyBytes, chainId }: SignDoc): Uint8Array {
  const signDoc = SignDoc.fromPartial({
    accountNumber: accountNumber,
    authInfoBytes: authInfoBytes,
    bodyBytes: bodyBytes,
    chainId: chainId,
  });
  return SignDoc.encode(signDoc).finish();
}
