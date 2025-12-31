import { isNonNullObject } from "@cosmjs/utils";
import { argon2id, ArgonOpts } from "@noble/hashes/argon2.js";

/**
 * @deprecated This is just a thin wrapper around argon2id from @noble/hashes and will likely be removed.
 * @see https://github.com/cosmos/cosmjs/issues/1796
 */
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

/**
 * @deprecated This is just a thin wrapper around argon2id from @noble/hashes and will likely be removed.
 * @see https://github.com/cosmos/cosmjs/issues/1796
 */
export function isArgon2idOptions(thing: unknown): thing is Argon2idOptions {
  if (!isNonNullObject(thing)) return false;
  if (typeof (thing as Argon2idOptions).outputLength !== "number") return false;
  if (typeof (thing as Argon2idOptions).opsLimit !== "number") return false;
  if (typeof (thing as Argon2idOptions).memLimitKib !== "number") return false;
  return true;
}

/**
 * @deprecated This is just a thin wrapper around argon2id from @noble/hashes and will likely be removed.
 * @see https://github.com/cosmos/cosmjs/issues/1796
 */
export class Argon2id {
  // This is async for historic reasons. If we switch to a Wasm implementation or get argon2 in WebCrypto,
  // this is needed again.
  public static async execute(
    password: string,
    salt: Uint8Array,
    options: Argon2idOptions,
  ): Promise<Uint8Array> {
    const opts: ArgonOpts = {
      t: options.opsLimit, // Time cost, iterations count
      m: options.memLimitKib, // Memory cost (in KB)
      p: 1, // parallelism
      dkLen: options.outputLength, // Desired number of returned bytes
    };

    if (salt.length !== 16) {
      throw new Error(`Got invalid salt length ${salt.length}. Must be 16.`);
    }

    return argon2id(password, salt, opts);
  }
}
