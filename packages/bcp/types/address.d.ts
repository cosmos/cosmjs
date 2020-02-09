import { CosmosAddressBech32Prefix } from "@cosmwasm/sdk";
import { Address, Algorithm, PubkeyBundle, PubkeyBytes } from "@iov/bcp";
export declare function decodeCosmosPubkey(
  encodedPubkey: string,
): {
  readonly algo: Algorithm;
  readonly data: PubkeyBytes;
};
export declare function pubkeyToAddress(pubkey: PubkeyBundle, prefix: CosmosAddressBech32Prefix): Address;
