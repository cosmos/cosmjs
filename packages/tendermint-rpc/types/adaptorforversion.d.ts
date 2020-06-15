import { Adaptor } from "./adaptor";
/**
 * Returns an Adaptor implementation for a given tendermint version.
 * Throws when version is not supported.
 *
 * @param version full Tendermint version string, e.g. "0.20.1"
 */
export declare function adaptorForVersion(version: string): Adaptor;
