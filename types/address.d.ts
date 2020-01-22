import { Address, PubkeyBundle } from "@iov/bcp";
export declare type CosmosAddressBech32Prefix =
  | "cosmos"
  | "cosmosvalcons"
  | "cosmosvaloper";
export declare type CosmosPubkeyBech32Prefix =
  | "cosmospub"
  | "cosmosvalconspub"
  | "cosmosvaloperpub";
export declare type CosmosBech32Prefix =
  | CosmosAddressBech32Prefix
  | CosmosPubkeyBech32Prefix;
export declare function decodeCosmosAddress(
  address: Address
): {
  readonly prefix: CosmosAddressBech32Prefix;
  readonly data: Uint8Array;
};
export declare function isValidAddress(address: string): boolean;
export declare function pubkeyToAddress(
  pubkey: PubkeyBundle,
  prefix: CosmosBech32Prefix
): Address;
