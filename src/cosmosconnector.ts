import { ChainConnector, ChainId } from "@iov/bcp";

import { cosmosCodec } from "./cosmoscodec";
import { CosmosConnection } from "./cosmosconnection";

/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export function createCosmosConnector(
  url: string,
  expectedChainId?: ChainId,
): ChainConnector<CosmosConnection> {
  return {
    establishConnection: async () => CosmosConnection.establish(url),
    codec: cosmosCodec,
    expectedChainId: expectedChainId,
  };
}
