import { fromHex, toHex, toUtf8 } from "@cosmjs/encoding";
import * as bip39 from "bip39";
import { pbkdf2 } from "pbkdf2";
import * as unorm from "unorm";

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
    // reimplementation of bip39.mnemonicToSeed using the asynchronous
    // interface of https://www.npmjs.com/package/pbkdf2
    const mnemonicBytes = toUtf8(unorm.nfkd(mnemonic.toString()));
    const salt = "mnemonic" + (password ? unorm.nfkd(password) : "");
    const saltBytes = toUtf8(salt);
    return this.pbkdf2(mnemonicBytes, saltBytes, 2048, 64, "sha512");
  }

  // convert pbkdf2's callback interface to Promise interface
  private static async pbkdf2(
    secret: Uint8Array,
    salt: Uint8Array,
    iterations: number,
    keylen: number,
    digest: string,
  ): Promise<Uint8Array> {
    return new Promise<any>((resolve, reject) => {
      pbkdf2(secret, salt, iterations, keylen, digest, (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(new Uint8Array(derivedKey));
        }
      });
    });
  }
}
