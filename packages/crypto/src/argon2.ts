import { assert, isNonNullObject } from "@cosmjs/utils";
import { type IArgon2Options, argon2id } from "hash-wasm";

export interface Argon2idOptions {
  /** Output length in bytes */
  readonly outputLength: number;
  /**
   * An integer between 1 and 4294967295 representing the computational difficulty.
   *
   * @see https://libsodium.gitbook.io/doc/password_hashing/default_phf#key-derivation
   */
  readonly opsLimit: number;
  /**
   * Memory limit measured in KiB (like argon2 command line tool)
   *
   * Note: only approximately 16 MiB of memory are available using the non-sumo version of libsodium.js
   *
   * @see https://libsodium.gitbook.io/doc/password_hashing/default_phf#key-derivation
   */
  readonly memLimitKib: number;
}

export function isArgon2idOptions(thing: unknown): thing is Argon2idOptions {
  if (!isNonNullObject(thing)) return false;
  if (typeof (thing as Argon2idOptions).outputLength !== "number") return false;
  if (typeof (thing as Argon2idOptions).opsLimit !== "number") return false;
  if (typeof (thing as Argon2idOptions).memLimitKib !== "number") return false;
  return true;
}

export class Argon2id {
  public static async execute(
    password: string,
    salt: Uint8Array,
    options: Argon2idOptions,
  ): Promise<Uint8Array> {
    const opts: IArgon2Options = {
      password,
      salt,
      outputType: "binary",
      iterations: options.opsLimit,
      memorySize: options.memLimitKib,
      parallelism: 1, // no parallelism allowed, just like libsodium
      hashLength: options.outputLength,
    };

    if (salt.length !== 16) {
      throw new Error(`Got invalid salt length ${salt.length}. Must be 16.`);
    }

    const hash = await argon2id(opts);
    // guaranteed by outputType: 'binary'
    assert(typeof hash !== "string");
    return hash;
  }
}
