import { CosmosBech32Prefix, isValidAddress } from "@cosmwasm/sdk";
import { Address, Algorithm, PubkeyBundle, PubkeyBytes } from "@iov/bcp";
export { CosmosBech32Prefix, isValidAddress };
export declare function decodeCosmosPubkey(
  encodedPubkey: string,
): {
  readonly algo: Algorithm;
  readonly data: PubkeyBytes;
};
export declare function pubkeyToAddress(pubkey: PubkeyBundle, prefix: CosmosBech32Prefix): Address;
