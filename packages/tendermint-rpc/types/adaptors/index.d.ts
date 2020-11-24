import { Adaptor } from "../adaptor";
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
export declare const adaptor33: Adaptor;
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
export declare const adaptor34: Adaptor;
/**
 * Returns an Adaptor implementation for a given tendermint version.
 * Throws when version is not supported.
 *
 * @param version full Tendermint version string, e.g. "0.20.1"
 */
export declare function adaptorForVersion(version: string): Adaptor;
