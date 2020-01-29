import { ChainId } from "@iov/bcp";
import { Sha256 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";

const { toHex, toUtf8 } = Encoding;

const hashedPrefix = "hashed-";

/**
 * Conversion between native chain IDs and CAIP-5 format
 *
 * @see https://github.com/ChainAgnostic/CAIPs/pull/9
 */
export class Caip5 {
  /**
   * @param native The `chain_id` field from Tendermint's genesis file
   */
  public static encode(native: string): ChainId {
    if (!native) throw new Error("Input must not be empty");

    if (!native.match(/^[-a-zA-Z0-9]{1,47}$/) || native.startsWith(hashedPrefix)) {
      const hash = toHex(new Sha256(toUtf8(native)).digest()).slice(0, 16);
      return `cosmos:${hashedPrefix}${hash}` as ChainId;
    } else {
      return `cosmos:${native}` as ChainId;
    }
  }

  public static decode(chainId: ChainId): string {
    const match = chainId.match(/^cosmos:([-a-zA-Z0-9]{1,47})$/);
    if (!match) {
      throw new Error("Chain ID not compatible with CAIP-5");
    }

    const reference = match[1];
    if (reference.startsWith(hashedPrefix)) {
      throw new Error("Hashed chain IDs cannot be decoded");
    }

    return reference;
  }
}
