import { Bech32PubKey, PubKey } from "./types";
export declare function encodeSecp256k1Pubkey(pubkey: Uint8Array): PubKey;
export declare function decodeBech32Pubkey(bech: Bech32PubKey): PubKey;
