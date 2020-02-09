import { Bech32PubKey, PubKey } from "./types";
export declare function encodeSecp256k1Pubkey(pubkey: Uint8Array): PubKey;
export declare type CosmosPubkeyBech32Prefix = "cosmospub" | "cosmosvalconspub" | "cosmosvaloperpub";
export declare function decodeBech32Pubkey(bech: Bech32PubKey): PubKey;
export declare function encodeBech32Pubkey(pubkey: PubKey, prefix: CosmosPubkeyBech32Prefix): Bech32PubKey;
