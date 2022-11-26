/* eslint-disable @typescript-eslint/naming-convention */
import { assert } from "@cosmjs/utils";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { AuthInfo, SignDoc, SignerInfo } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Any } from "cosmjs-types/google/protobuf/any";
import Long from "long";

/**
 * Create signer infos from the provided signers.
 *
 * This implementation does not support different signing modes for the different signers.
 */
function makeSignerInfos(
  signers: ReadonlyArray<{ readonly pubkey: Any; readonly sequence: number }>,
  signMode: SignMode,
): SignerInfo[] {
  return signers.map(
    ({ pubkey, sequence }): SignerInfo => ({
      publicKey: pubkey,
      modeInfo: {
        single: { mode: signMode },
      },
      sequence: Long.fromNumber(sequence),
    }),
  );
}

/**
 * Creates and serializes an AuthInfo document.
 *
 * This implementation does not support different signing modes for the different signers.
 */
export function makeAuthInfoBytes(
  signers: ReadonlyArray<{ readonly pubkey: Any; readonly sequence: number }>,
  feeAmount: readonly Coin[],
  gasLimit: number,
  feeGranter: string | undefined,
  feePayer: string | undefined,
  signMode = SignMode.SIGN_MODE_DIRECT,
): Uint8Array {
  // Required arguments 4 and 5 were added in CosmJS 0.29. Use runtime checks to help our non-TS users.
  assert(
    feeGranter === undefined || typeof feeGranter === "string",
    "feeGranter must be undefined or string",
  );
  assert(feePayer === undefined || typeof feePayer === "string", "feePayer must be undefined or string");

  const authInfo = AuthInfo.fromPartial({
    signerInfos: makeSignerInfos(signers, signMode),
    fee: {
      amount: [...feeAmount],
      gasLimit: Long.fromNumber(gasLimit),
      granter: feeGranter,
      payer: feePayer,
    },
  });
  return AuthInfo.encode(authInfo).finish();
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
