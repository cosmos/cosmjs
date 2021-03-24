import { decodeSignature, makeSignDoc, serializeSignDoc } from "@cosmjs/amino";
import { Secp256k1, Secp256k1Signature, sha256 } from "@cosmjs/crypto";

import { WrappedStdTx } from "./tx";

/**
 * Serach for sequence s with `min` <= `s` < `upperBound` to find the sequence that was used to sign the transaction
 *
 * @param tx The signed transaction
 * @param chainId The chain ID for which this transaction was signed
 * @param accountNumber The account number for which this transaction was signed
 * @param upperBound The upper bound for the testing, i.e. sequence must be lower than this value
 * @param min The lowest sequence that is tested
 *
 * @returns the sequence if a match was found and undefined otherwise
 */
export async function findSequenceForSignedTx(
  tx: WrappedStdTx,
  chainId: string,
  accountNumber: number,
  upperBound: number,
  min = 0,
): Promise<number | undefined> {
  const firstSignature = tx.value.signatures.find(() => true);
  if (!firstSignature) throw new Error("Signature missing in tx");

  const { pubkey, signature } = decodeSignature(firstSignature);
  const secp256keSignature = Secp256k1Signature.fromFixedLength(signature);

  for (let s = min; s < upperBound; s++) {
    // console.log(`Trying sequence ${s}`);
    const signBytes = serializeSignDoc(
      makeSignDoc(tx.value.msg, tx.value.fee, chainId, tx.value.memo || "", accountNumber, s),
    );
    const prehashed = sha256(signBytes);
    const valid = await Secp256k1.verifySignature(secp256keSignature, prehashed, pubkey);
    if (valid) return s;
  }
  return undefined;
}
