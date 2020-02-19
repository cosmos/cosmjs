import { ChainConnector, ChainId } from "@iov/bcp";
import { CosmWasmConnection, TokenConfiguration } from "./cosmwasmconnection";
/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export declare function createCosmWasmConnector(
  url: string,
  addressPrefix: string,
  tokenConfig: TokenConfiguration,
  expectedChainId?: ChainId,
): ChainConnector<CosmWasmConnection>;
