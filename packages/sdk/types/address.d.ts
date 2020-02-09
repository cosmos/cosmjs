import { PubKey } from "./types";
export declare type CosmosAddressBech32Prefix = "cosmos" | "cosmosvalcons" | "cosmosvaloper";
export declare type CosmosPubkeyBech32Prefix = "cosmospub" | "cosmosvalconspub" | "cosmosvaloperpub";
export declare function isValidAddress(address: string): boolean;
export declare function encodeAddress(pubkey: PubKey, prefix: string): string;
