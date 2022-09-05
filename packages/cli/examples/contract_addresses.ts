import { fromBech32, fromHex, fromUtf8, toAscii, toBech32, toHex, toUtf8 } from "@cosmjs/encoding";
import { Sha256, sha256 } from "@cosmjs/crypto";
import { Uint53 } from "@cosmjs/math";
import { assert } from "@cosmjs/utils";

/**
 * The "Basic Address" Hash from
 * https://github.com/cosmos/cosmos-sdk/blob/v0.45.8/docs/architecture/adr-028-public-key-addresses.md
 */
function hash(type: string, key: Uint8Array): Uint8Array {
  return new Sha256(sha256(toAscii(type))).update(key).digest();
}

/**
 * Takes an integer [0, 255] and returns a one-byte encoding of it.
 */
function toUint8(int: number): number {
  const checked = new Uint53(int).toNumber();
  if (checked > 255) {
    throw new Error("Integer exceeds uint8 range");
  }
  return checked;
}

/** See https://github.com/CosmWasm/wasmd/issues/942 */
function deterministicContractAddress(checksum: Uint8Array, creator: string, label: string, prefix: string) {
  assert(checksum.length === 32);
  const creatorData = fromBech32(creator).data;
  const labelData = toUtf8(label);

  const key = new Uint8Array([
    ...toAscii("wasm"),
    0x00,
    toUint8(checksum.length),
    ...checksum,
    toUint8(creatorData.length),
    ...creatorData,
    toUint8(labelData.length),
    ...labelData,
  ]);
  const addressData = hash("module", key);
  return toBech32(prefix, addressData);
}

function makeTestingAddress(length: number): string {
  let data = new Uint8Array(length);
  data.fill(0x99, 0);
  data.fill(0xaa, 5);
  data.fill(0xbb, 10);
  data.fill(0xcc, 15);
  data.fill(0xdd, 20);
  data.fill(0xee, 25);
  data.fill(0xff, 30);
  return toBech32("purple", data);
}

let out: Array<any> = [];

const checksums = [
  fromHex("13a1fc994cc6d1c81b746ee0c0ff6f90043875e0bf1d9be6b7d779fc978dc2a5"),
  fromHex("1da6c16de2cbaf7ad8cbb66f0925ba33f5c278cb2491762d04658c1480ea229b"),
];

for (let checksum of checksums) {
  for (let creator of [makeTestingAddress(20), makeTestingAddress(32)]) {
    for (let label of ["instance 1", "instance 2"]) {
      const contractAddress = deterministicContractAddress(checksum, creator, label, "purple");

      out.push({
        in: {
          checksum: toHex(checksum).toUpperCase(),
          creator,
          creatorData: toHex(fromBech32(creator).data).toUpperCase(),
          label,
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
