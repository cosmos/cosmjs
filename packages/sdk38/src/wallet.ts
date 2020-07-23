import { Argon2id, Argon2idOptions, Sha256, Sha512, Slip10RawIndex } from "@cosmjs/crypto";
import { toAscii } from "@cosmjs/encoding";
import { assert } from "@cosmjs/utils";

import { StdSignature } from "./types";

export type PrehashType = "sha256" | "sha512" | null;

export type Algo = "secp256k1" | "ed25519" | "sr25519";

export interface AccountData {
  // bech32-encoded
  readonly address: string;
  readonly algo: Algo;
  readonly pubkey: Uint8Array;
}

export interface OfflineSigner {
  /**
   * Get AccountData array from wallet. Rejects if not enabled.
   */
  readonly getAccounts: () => Promise<readonly AccountData[]>;

  /**
   * Request signature from whichever key corresponds to provided bech32-encoded address. Rejects if not enabled.
   */
  readonly sign: (address: string, message: Uint8Array, prehashType?: PrehashType) => Promise<StdSignature>;
}

export function prehash(bytes: Uint8Array, type: PrehashType): Uint8Array {
  switch (type) {
    case null:
      return new Uint8Array([...bytes]);
    case "sha256":
      return new Sha256(bytes).digest();
    case "sha512":
      return new Sha512(bytes).digest();
    default:
      throw new Error("Unknown prehash type");
  }
}

/**
 * The Cosmoshub derivation path in the form `m/44'/118'/0'/0/a`
 * with 0-based account index `a`.
 */
export function makeCosmoshubPath(a: number): readonly Slip10RawIndex[] {
  return [
    Slip10RawIndex.hardened(44),
    Slip10RawIndex.hardened(118),
    Slip10RawIndex.hardened(0),
    Slip10RawIndex.normal(0),
    Slip10RawIndex.normal(a),
  ];
}

/**
 * A fixed salt is chosen to archive a deterministic password to key derivation.
 * This reduces the scope of a potential rainbow attack to all CosmJS users.
 * Must be 16 bytes due to implementation limitations.
 */
export const cosmjsSalt = toAscii("The CosmJS salt.");

export interface KdfConfiguration {
  /**
   * An algorithm identifier, such as "argon2id" or "scrypt".
   */
  readonly algorithm: string;
  /** A map of algorithm-specific parameters */
  readonly params: Record<string, unknown>;
}

export async function executeKdf(password: string, configuration: KdfConfiguration): Promise<Uint8Array> {
  switch (configuration.algorithm) {
    case "argon2id": {
      const { outputLength, opsLimit, memLimitKib } = configuration.params;
      assert(typeof outputLength === "number");
      assert(typeof opsLimit === "number");
      assert(typeof memLimitKib === "number");
      const options: Argon2idOptions = { outputLength, opsLimit, memLimitKib };
      return Argon2id.execute(password, cosmjsSalt, options);
    }
    default:
      throw new Error("Unsupported KDF algorithm");
  }
}
