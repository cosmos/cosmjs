import { fromBech32, fromHex, toBech32, toHex, toUtf8 } from "@cosmjs/encoding";
import { _instantiate2AddressIntermediate } from "@cosmjs/cosmwasm-stargate";

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
        const { key, addressData, address } = _instantiate2AddressIntermediate(
          checksum,
          creator,
          salt,
          msg,
          "purple",
        );
        out.push({
          in: {
            checksum: toHex(checksum),
            creator,
            creatorData: toHex(fromBech32(creator).data),
            salt: toHex(salt),
            msg,
          },
          intermediate: {
            key: toHex(key),
            addressData: toHex(addressData),
          },
          out: {
            address: address,
          },
        });
      }
    }
  }
}

console.log(JSON.stringify(out, undefined, 2));
