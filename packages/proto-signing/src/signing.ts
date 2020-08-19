/* eslint-disable @typescript-eslint/naming-convention */
import { omitDefaults } from "./adr27";
import { cosmos } from "./codec";

const { SignDoc } = cosmos.tx;

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
