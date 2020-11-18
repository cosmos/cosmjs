/* eslint-disable @typescript-eslint/naming-convention */
import { Adaptor } from "../adaptor";
import { v0_33 } from "./v0-33";

/**
 * Adaptor for Tendermint 0.33.
 *
 * Use this to skip auto-detection:
 *
 * ```
 * import { adaptor33, Client as TendermintClient } from "@cosmjs/tendermint-rpc";
 * // ...
 * const client = await TendermintClient.connect(url, adaptor33);
 * ```
 */
export const adaptor33 = v0_33;

/**
 * Adaptor for Tendermint 0.34.
 *
 * Use this to skip auto-detection:
 *
 * ```
 * import { adaptor34, Client as TendermintClient } from "@cosmjs/tendermint-rpc";
 * // ...
 * const client = await TendermintClient.connect(url, adaptor34);
 * ```
 */
export const adaptor34 = v0_33; // With this alias we can swap out the implementation without affecting caller code.

const hashes = {
  v0_34: [
    "ca2c9df", // v0.34.0-rc6
  ],
};

/**
 * Returns an Adaptor implementation for a given tendermint version.
 * Throws when version is not supported.
 *
 * @param version full Tendermint version string, e.g. "0.20.1"
 */
export function adaptorForVersion(version: string): Adaptor {
  if (version.startsWith("0.33.") || version.startsWith("0.34.") || hashes.v0_34.includes(version)) {
    return v0_33;
  } else {
    throw new Error(`Unsupported tendermint version: ${version}`);
  }
}
