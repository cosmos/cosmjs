import { Bech32 } from "@cosmjs/encoding";
import { encodePubkey } from "@cosmjs/proto-signing";
import Long from "long";

import { MultisigThresholdPubkey, pubkeyToAddress } from "../../amino/build";
import { CompactBitArray, MultiSignature } from "./codec/cosmos/crypto/multisig/v1beta1/multisig";
import { SignMode } from "./codec/cosmos/tx/signing/v1beta1/signing";
import { AuthInfo, SignerInfo } from "./codec/cosmos/tx/v1beta1/tx";
import { TxRaw } from "./codec/cosmos/tx/v1beta1/tx";
import { StdFee } from "./fee";

export function makeMultisignedTx(
  multisigPubkey: MultisigThresholdPubkey,
  sequence: number,
  fee: StdFee,
  bodyBytes: Uint8Array,
  signatures: Map<string, Uint8Array>,
): TxRaw {
  const addresses = Array.from(signatures.keys());
  const prefix = Bech32.decode(addresses[0]).prefix;

  let bits = 0;
  const signaturesList = new Array<Uint8Array>();
  for (let i = 0; i < multisigPubkey.value.pubkeys.length; i++) {
    const signerAddress = pubkeyToAddress(multisigPubkey.value.pubkeys[i], prefix);
    const signature = signatures.get(signerAddress);
    if (signature) {
      // eslint-disable-next-line no-bitwise
      bits |= 0b1 << (8 - 1 - i);
      signaturesList.push(signature);
    }
  }

  const signerInfo: SignerInfo = {
    publicKey: encodePubkey(multisigPubkey),
    modeInfo: {
      multi: {
        bitarray: CompactBitArray.fromPartial({
          elems: new Uint8Array([bits]),
          extraBitsStored: multisigPubkey.value.pubkeys.length,
        }),
        modeInfos: signaturesList.map((_) => ({ single: { mode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON } })),
      },
    },
    sequence: Long.fromNumber(sequence),
  };

  const authInfo = AuthInfo.fromPartial({
    signerInfos: [signerInfo],
    fee: {
      amount: [...fee.amount],
      gasLimit: Long.fromString(fee.gas),
    },
  });

  const authInfoBytes = AuthInfo.encode(authInfo).finish();
  const signedTx = TxRaw.fromPartial({
    bodyBytes: bodyBytes,
    authInfoBytes: authInfoBytes,
    signatures: [MultiSignature.encode(MultiSignature.fromPartial({ signatures: signaturesList })).finish()],
  });
  return signedTx;
}
