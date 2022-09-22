import { fromBech32, fromHex, fromUtf8, toAscii, toBech32, toHex, toUtf8 } from "@cosmjs/encoding";
import { Sha256, sha256 } from "@cosmjs/crypto";
import { Uint64 } from "@cosmjs/math";
import { assert } from "@cosmjs/utils";

/**
 * The "Basic Address" Hash from
 * https://github.com/cosmos/cosmos-sdk/blob/v0.45.8/docs/architecture/adr-028-public-key-addresses.md
 */
function hash(type: string, key: Uint8Array): Uint8Array {
  return new Sha256(sha256(toAscii(type))).update(key).digest();
}

/**
 * Takes an integer [0, 2**64-1] and returns a one-byte encoding of it.
 */
function toUint64(int: number): Uint8Array {
  return Uint64.fromNumber(int).toBytesBigEndian();
}

/** See https://github.com/CosmWasm/wasmd/pull/1014 */
function deterministicContractAddress(
  checksum: Uint8Array,
  creator: string,
  salt: Uint8Array,
  msg: Uint8Array,
  prefix: string,
) {
  assert(checksum.length === 32);
  const creatorData = fromBech32(creator).data;

  // Validate inputs
  if (salt.length < 1 || salt.length > 64) throw new Error("Salt must be between 1 and 64 bytes");

  const key = new Uint8Array([
    ...toAscii("wasm"),
    0x00,
    ...toUint64(checksum.length),
    ...checksum,
    ...toUint64(creatorData.length),
    ...creatorData,
    ...toUint64(salt.length),
    ...salt,
    ...toUint64(msg.length),
    ...msg,
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
const salts = [
  toUtf8("a"),
  fromHex(
    "AABBCCDDEEFFFFEEDDBBCCDDAA66551155aaaaBBCC787878789900AABBCCDDEEFFFFEEDDBBCCDDAA66551155aaaaBBCC787878789900aabbbbcc221100acadae",
  ),
];
const msgs = [null, JSON.stringify({}), JSON.stringify({ some: 123, structure: { nested: ["ok", true] } })];

for (let checksum of checksums) {
  for (let creator of [makeTestingAddress(20), makeTestingAddress(32)]) {
    for (let salt of salts) {
      for (let msg of msgs) {
        const encodedMsg = typeof msg === "string" ? toUtf8(msg) : new Uint8Array();
        const contractAddress = deterministicContractAddress(checksum, creator, salt, encodedMsg, "purple");
        out.push({
          in: {
            checksum: toHex(checksum),
            creator,
            creatorData: toHex(fromBech32(creator).data),
            salt: toHex(checksum),
            msg,
          },
          out: {
            contractAddress,
            contractAddressData: toHex(fromBech32(contractAddress).data),
          },
        });
      }
    }
  }
}

console.log(JSON.stringify(out, undefined, 2));
