import { Sha256, sha256 } from "@cosmjs/crypto";
import { fromBech32, toAscii, toBech32, toUtf8 } from "@cosmjs/encoding";
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

/**
 * Private function to export test vector data for https://github.com/cosmos/cosmjs/pull/1253.
 * Do not use in production code.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function _instantiate2AddressIntermediate(
  checksum: Uint8Array,
  creator: string,
  salt: Uint8Array,
  msg: string | null,
  prefix: string,
): { key: Uint8Array; addressData: Uint8Array; address: string } {
  assert(checksum.length === 32);
  const creatorData = fromBech32(creator).data;

  const msgData = typeof msg === "string" ? toUtf8(msg) : new Uint8Array();

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
    ...toUint64(msgData.length),
    ...msgData,
  ]);
  const addressData = hash("module", key);
  const address = toBech32(prefix, addressData);
  return { key, addressData, address };
}

/**
 * Predictable address generation for the MsgInstantiateContract2
 * introduced with wasmd 0.29.
 */
export function instantiate2Address(
  checksum: Uint8Array,
  creator: string,
  salt: Uint8Array,
  msg: string | null,
  prefix: string,
): string {
  return _instantiate2AddressIntermediate(checksum, creator, salt, msg, prefix).address;
}
