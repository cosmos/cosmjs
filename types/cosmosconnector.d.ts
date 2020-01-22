import { ChainConnector, ChainId } from "@iov/bcp";
import { CosmosConnection } from "./cosmosconnection";
/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export declare function createCosmosConnector(
  url: string,
  expectedChainId?: ChainId,
): ChainConnector<CosmosConnection>;
