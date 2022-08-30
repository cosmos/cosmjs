import { fromBech32, fromUtf8, toAscii, toBech32, toHex, toUtf8 } from "@cosmjs/encoding";
import { Random, Sha256, sha256 } from "@cosmjs/crypto";
import { Uint64 } from "@cosmjs/math";

/**
 * The "Basic Address" Hash from
 * https://github.com/cosmos/cosmos-sdk/blob/v0.45.8/docs/architecture/adr-028-public-key-addresses.md
 */
function hash(type: Uint8Array, key: Uint8Array): Uint8Array {
  return new Sha256(sha256(type)).update(key).digest();
}

/** See https://github.com/CosmWasm/wasmd/issues/942 */
function deterministicContractAddress(codeId: number, creator: string, label: string, prefix: string) {
  const codeIdUint64 = Uint64.fromNumber(codeId);
  const creatorData = fromBech32(creator).data;
  const creatorDataLen = Uint64.fromNumber(creatorData.length);

  const key1 = new Uint8Array([
    ...codeIdUint64.toBytesBigEndian(),
    ...creatorDataLen.toBytesBigEndian(),
    ...creatorData,
    ...toUtf8(label),
  ]);
  const key2 = new Uint8Array([...toAscii("wasm"), 0x00, ...key1]);
  const addressData = hash(toAscii("module"), key2);
  return toBech32(prefix, addressData);
}

function makeRandomAddress(length: number): string {
  return toBech32("purple", Random.getBytes(length));
}

let out: Array<any> = [];

for (let codeId of [1, Number.MAX_SAFE_INTEGER]) {
for (let creator of [makeRandomAddress(20), makeRandomAddress(32)]) {
    for (let label of ["instance 1", "instance 2"]) {
      const contractAddress = deterministicContractAddress(codeId, creator, label, "purple");

      out.push({
        in: {
          codeId,
          label,
          creator,
          creatorData: toHex(fromBech32(creator).data).toUpperCase(),
        },
        out: {
          contractAddress,
          contractAddressData: toHex(fromBech32(contractAddress).data).toUpperCase(),
        },
      });
    }
  }
}

console.log(JSON.stringify(out, undefined, 2));
