/* eslint-disable @typescript-eslint/naming-convention */
// This module exposes translators for multiple tendermint versions
// Pick a version that matches the server to properly encode the data types
import { Adaptor } from "./adaptor";
import { v0_33 } from "./v0-33";

/**
 * Returns an Adaptor implementation for a given tendermint version.
 * Throws when version is not supported.
 *
 * @param version full Tendermint version string, e.g. "0.20.1"
 */
export function adaptorForVersion(version: string): Adaptor {
  if (version.startsWith("0.33.") || version.startsWith("0.34.")) {
    return v0_33;
  } else {
    throw new Error(`Unsupported tendermint version: ${version}`);
  }
}
