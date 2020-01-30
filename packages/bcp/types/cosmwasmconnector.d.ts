import { ChainConnector, ChainId } from "@iov/bcp";
import { CosmosBech32Prefix } from "./address";
import { CosmWasmConnection } from "./cosmwasmconnection";
import { TokenInfo } from "./types";
/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export declare function createCosmWasmConnector(
  url: string,
  prefix: CosmosBech32Prefix,
  tokenInfo: readonly TokenInfo[],
  expectedChainId?: ChainId,
): ChainConnector<CosmWasmConnection>;
