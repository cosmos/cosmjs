import { fromHex, toHex } from "@cosmjs/encoding";
import * as bip39 from "bip39";

import { EnglishMnemonic } from "./englishmnemonic";

export class Bip39 {
  /**
   * Encodes raw entropy of length 16, 20, 24, 28 or 32 bytes as an English mnemonic between 12 and 24 words.
   *
   * | Entropy            | Words |
   * |--------------------|-------|
   * | 128 bit (16 bytes) |    12 |
   * | 160 bit (20 bytes) |    15 |
   * | 192 bit (24 bytes) |    18 |
   * | 224 bit (28 bytes) |    21 |
   * | 256 bit (32 bytes) |    24 |
   *
   *
   * @see https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#generating-the-mnemonic
   * @param entropy The entropy to be encoded. This must be cryptographically secure.
   */
  public static encode(entropy: Uint8Array): EnglishMnemonic {
    const allowedEntropyLengths: readonly number[] = [16, 20, 24, 28, 32];

    if (allowedEntropyLengths.indexOf(entropy.length) === -1) {
      throw new Error("invalid input length");
    }

    return new EnglishMnemonic(bip39.entropyToMnemonic(toHex(entropy)));
  }

  public static decode(mnemonic: EnglishMnemonic): Uint8Array {
    return fromHex(bip39.mnemonicToEntropy(mnemonic.toString()));
  }

  public static async mnemonicToSeed(mnemonic: EnglishMnemonic, password?: string): Promise<Uint8Array> {
    return new Uint8Array(await bip39.mnemonicToSeed(mnemonic.toString(), password));
  }
}
