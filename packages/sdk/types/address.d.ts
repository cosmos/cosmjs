import { Bech32PubKey, PubKey } from "./types";
export declare type CosmosAddressBech32Prefix = "cosmos" | "cosmosvalcons" | "cosmosvaloper";
export declare type CosmosPubkeyBech32Prefix = "cosmospub" | "cosmosvalconspub" | "cosmosvaloperpub";
export declare type CosmosBech32Prefix = CosmosAddressBech32Prefix | CosmosPubkeyBech32Prefix;
export declare function decodeBech32Pubkey(bech: Bech32PubKey): PubKey;
export declare function isValidAddress(address: string): boolean;
export declare function pubkeyToAddress(pubkey: PubKey, prefix: string): string;
