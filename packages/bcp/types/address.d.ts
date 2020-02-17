import { CosmosAddressBech32Prefix } from "@cosmwasm/sdk";
import { Address, PubkeyBundle } from "@iov/bcp";
export declare function decodeCosmosPubkey(encodedPubkey: string): PubkeyBundle;
export declare function pubkeyToAddress(pubkey: PubkeyBundle, prefix: CosmosAddressBech32Prefix): Address;
