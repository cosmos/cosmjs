import { rawSecp256k1PubkeyToRawAddress } from "@cosmjs/amino";
import { Bech32 } from "@cosmjs/encoding";

export function rawSecp256k1PubkeyToAddress(pubkeyRaw: Uint8Array, prefix: string): string {
  return Bech32.encode(prefix, rawSecp256k1PubkeyToRawAddress(pubkeyRaw));
}
