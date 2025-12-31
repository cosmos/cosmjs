import { fixUint8Array, fromHex, toHex } from "@cosmjs/encoding";
import { assert } from "@cosmjs/utils";
import { secp256k1 } from "@noble/curves/secp256k1.js";

import { ExtendedSecp256k1Signature, Secp256k1Signature } from "./secp256k1signature";

export interface Secp256k1Keypair {
  /** A 32 byte private key */
  readonly pubkey: Uint8Array;
  /**
   * A raw secp256k1 public key.
   *
   * The type itself does not give you any guarantee if this is
   * compressed or uncompressed. If you are unsure where the data
   * is coming from, use `Secp256k1.compressPubkey` or
   * `Secp256k1.uncompressPubkey` (both idempotent) before processing it.
   */
  readonly privkey: Uint8Array;
}

function unsignedBigIntToBytes(a: bigint): Uint8Array<ArrayBuffer> {
  assert(a >= 0n);
  let hex = a.toString(16);
  if (hex.length % 2) hex = "0" + hex;
  return fromHex(hex);
}

function bytesToUnsignedBigInt(a: Uint8Array): bigint {
  return BigInt("0x" + toHex(a));
}

export class Secp256k1 {
  /**
   * Takes a 32 byte private key and returns a privkey/pubkey pair.
   *
   * The resulting pubkey is uncompressed. For the use in Cosmos it should
   * be compressed first using `Secp256k1.compressPubkey`.
   */
  public static makeKeypair(privkey: Uint8Array): Secp256k1Keypair {
    if (privkey.length !== 32) {
      throw new Error("input data is not a valid secp256k1 private key");
    }

    if (!secp256k1.utils.isValidSecretKey(privkey)) {
      // not strictly smaller than N
      throw new Error("input data is not a valid secp256k1 private key");
    }

    const out: Secp256k1Keypair = {
      privkey: privkey,
      // encodes uncompressed as
      // - 1-byte prefix "04"
      // - 32-byte x coordinate
      // - 32-byte y coordinate
      pubkey: secp256k1.getPublicKey(privkey, false),
    };
    return out;
  }

  /**
   * Creates a signature that is
   * - deterministic (RFC 6979)
   * - lowS signature
   * - DER encoded
   */
  public static createSignature(messageHash: Uint8Array, privkey: Uint8Array): ExtendedSecp256k1Signature {
    if (messageHash.length === 0) {
      throw new Error("Message hash must not be empty");
    }
    if (messageHash.length > 32) {
      throw new Error("Message hash length must not exceed 32 bytes");
    }

    const signature = secp256k1.Signature.fromBytes(
      secp256k1.sign(messageHash, privkey, {
        prehash: false,
        lowS: true,
        format: "recovered",
      }),
      "recovered",
    );
    const { recovery, r, s } = signature;
    if (typeof recovery !== "number") throw new Error("Recovery param missing");
    return new ExtendedSecp256k1Signature(unsignedBigIntToBytes(r), unsignedBigIntToBytes(s), recovery);
  }

  public static verifySignature(
    signature: Secp256k1Signature,
    messageHash: Uint8Array,
    pubkey: Uint8Array,
  ): boolean {
    if (messageHash.length === 0) {
      throw new Error("Message hash must not be empty");
    }
    if (messageHash.length > 32) {
      throw new Error("Message hash length must not exceed 32 bytes");
    }

    return secp256k1.verify(signature.toDer(), messageHash, pubkey, {
      prehash: false,
      lowS: false,
      format: "der",
    });
  }

  public static recoverPubkey(
    signature: ExtendedSecp256k1Signature,
    messageHash: Uint8Array,
  ): Uint8Array<ArrayBuffer> {
    const pk = new secp256k1.Signature(
      bytesToUnsignedBigInt(signature.r()),
      bytesToUnsignedBigInt(signature.s()),
      signature.recovery,
    ).recoverPublicKey(messageHash);
    return fixUint8Array(pk.toBytes(false));
  }

  /**
   * Takes a compressed or uncompressed pubkey and return a compressed one.
   *
   * This function is idempotent.
   */
  public static compressPubkey(pubkey: Uint8Array): Uint8Array<ArrayBuffer> {
    switch (pubkey.length) {
      case 33:
        return fixUint8Array(pubkey);
      case 65:
        return fixUint8Array(secp256k1.Point.fromBytes(pubkey).toBytes(true));
      default:
        throw new Error("Invalid pubkey length");
    }
  }

  /**
   * Takes a compressed or uncompressed pubkey and returns an uncompressed one.
   *
   * This function is idempotent.
   */
  public static uncompressPubkey(pubkey: Uint8Array): Uint8Array<ArrayBuffer> {
    switch (pubkey.length) {
      case 33:
        return fixUint8Array(secp256k1.Point.fromBytes(pubkey).toBytes(false));
      case 65:
        return fixUint8Array(pubkey);
      default:
        throw new Error("Invalid pubkey length");
    }
  }

  public static trimRecoveryByte(signature: Uint8Array): Uint8Array<ArrayBuffer> {
    switch (signature.length) {
      case 64:
        return fixUint8Array(signature);
      case 65:
        return signature.slice(0, 64);
      default:
        throw new Error("Invalid signature length");
    }
  }
}
