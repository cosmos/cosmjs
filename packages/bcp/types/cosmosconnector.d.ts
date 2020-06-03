import { ChainConnector, ChainId } from "@iov/bcp";
import { CosmosConnection, TokenConfiguration } from "./cosmosconnection";
/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export declare function createCosmosConnector(
  url: string,
  addressPrefix: string,
  tokenConfig: TokenConfiguration,
  expectedChainId?: ChainId,
): ChainConnector<CosmosConnection>;
