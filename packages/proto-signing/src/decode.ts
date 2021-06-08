import { AuthInfo, TxBody, TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";

export interface DecodedTxRaw {
  readonly authInfo: AuthInfo;
  readonly body: TxBody;
  readonly signatures: readonly Uint8Array[];
}

/**
 * Takes a serialized TxRaw (the bytes stored in Tendermint) and decodes it into something usable.
 */
export function decodeTxRaw(tx: Uint8Array): DecodedTxRaw {
  const txRaw = TxRaw.decode(tx);
  return {
    authInfo: AuthInfo.decode(txRaw.authInfoBytes),
    body: TxBody.decode(txRaw.bodyBytes),
    signatures: txRaw.signatures,
  };
}
