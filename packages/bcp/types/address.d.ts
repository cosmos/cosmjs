import { Address, PubkeyBundle } from "@iov/bcp";
export declare function decodeCosmosPubkey(encodedPubkey: string): PubkeyBundle;
export declare function pubkeyToAddress(pubkey: PubkeyBundle, prefix: string): Address;
