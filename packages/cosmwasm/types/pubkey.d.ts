import { PubKey } from "./types";
export declare function encodeSecp256k1Pubkey(pubkey: Uint8Array): PubKey;
export declare function decodeBech32Pubkey(bechEncoded: string): PubKey;
export declare function encodeBech32Pubkey(pubkey: PubKey, prefix: string): string;
