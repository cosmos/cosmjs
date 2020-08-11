import { PubKey } from "./types";
export declare function encodeSecp256k1Pubkey(pubkey: Uint8Array): PubKey;
/**
 * Decodes a pubkey in the Amino binary format to a type/value object.
 */
export declare function decodeAminoPubkey(data: Uint8Array): PubKey;
/**
 * Decodes a bech32 pubkey to Amino binary, which is then decoded to a type/value object.
 * The bech32 prefix is ignored and discareded.
 *
 * @param bechEncoded the bech32 encoded pubkey
 */
export declare function decodeBech32Pubkey(bechEncoded: string): PubKey;
/**
 * Encodes a public key to binary Amino.
 */
export declare function encodeAminoPubkey(pubkey: PubKey): Uint8Array;
/**
 * Encodes a public key to binary Amino and then to bech32.
 *
 * @param pubkey the public key to encode
 * @param prefix the bech32 prefix (human readable part)
 */
export declare function encodeBech32Pubkey(pubkey: PubKey, prefix: string): string;
