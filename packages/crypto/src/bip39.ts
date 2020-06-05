import { fromHex, toHex } from "@iov/encoding";
import * as bip39 from "bip39";
import { pbkdf2 } from "pbkdf2";
import * as unorm from "unorm";

import { EnglishMnemonic } from "./englishmnemonic";

export class Bip39 {
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
    const mnemonicBytes = Buffer.from(unorm.nfkd(mnemonic.toString()), "utf8");
    const salt = "mnemonic" + (password ? unorm.nfkd(password) : "");
    const saltBytes = Buffer.from(salt, "utf8");
    return this.pbkdf2(mnemonicBytes, saltBytes, 2048, 64, "sha512");
  }

  // convert pbkdf2's calllback interface to Promise interface
  private static async pbkdf2(
    secret: Uint8Array,
    salt: Uint8Array,
    iterations: number,
    keylen: number,
    digest: string,
  ): Promise<Uint8Array> {
    return new Promise<any>((resolve, reject) => {
      // TODO: Patch @types/pbkdf2 to allow Uint8Array as secret and salt argument
      pbkdf2(Buffer.from(secret), Buffer.from(salt), iterations, keylen, digest, (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(new Uint8Array(derivedKey));
        }
      });
    });
  }
}
