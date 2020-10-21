import { AccountData, OfflineSigner as OfflineAminoSigner, StdSignature } from "@cosmjs/launchpad";

import { cosmos } from "./codec";

export interface DirectSignResponse {
  /**
   * The sign doc that was signed.
   * This may be different from the input signDoc when the signer modifies it as part of the signing process.
   */
  readonly signed: cosmos.tx.v1beta1.ISignDoc;
  readonly signature: StdSignature;
}

export interface OfflineDirectSigner {
  readonly getAccounts: () => Promise<readonly AccountData[]>;
  readonly signDirect: (
    signerAddress: string,
    signDoc: cosmos.tx.v1beta1.ISignDoc,
  ) => Promise<DirectSignResponse>;
}

export type OfflineSigner = OfflineAminoSigner | OfflineDirectSigner;

export function isOfflineDirectSigner(signer: OfflineSigner): signer is OfflineDirectSigner {
  return (signer as any).signDirect !== undefined;
}
