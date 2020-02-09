import { PubKey } from "./types";
export declare type CosmosAddressBech32Prefix = "cosmos" | "cosmosvalcons" | "cosmosvaloper";
export declare function isValidAddress(address: string): boolean;
export declare function encodeAddress(pubkey: PubKey, prefix: string): string;
