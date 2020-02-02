import { ChainConnector, ChainId } from "@iov/bcp";
import { CosmosBech32Prefix } from "./address";
import { CosmWasmConnection, TokenConfiguration } from "./cosmwasmconnection";
/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export declare function createCosmWasmConnector(
  url: string,
  prefix: CosmosBech32Prefix,
  tokens: TokenConfiguration,
  expectedChainId?: ChainId,
): ChainConnector<CosmWasmConnection>;
