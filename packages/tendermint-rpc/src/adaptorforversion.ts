// This module exposes translators for multiple tendermint versions
// Pick a version that matches the server to properly encode the data types
import { Adaptor } from "./adaptor";
import { v0_31 } from "./v0-31";
import { v0_32 } from "./v0-32";

/**
 * Returns an Adaptor implementation for a given tendermint version.
 * Throws when version is not supported.
 *
 * @param version full Tendermint version string, e.g. "0.20.1"
 */
export function adaptorForVersion(version: string): Adaptor {
  if (version.startsWith("0.31.")) {
    return v0_31;
  } else if (version.startsWith("0.32.")) {
    return v0_32;
  } else {
    throw new Error(`Unsupported tendermint version: ${version}`);
  }
}
