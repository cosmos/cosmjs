import { ChainConnector, ChainId } from "@iov/bcp";

import { cosmosCodec } from "./cosmoscodec";
import { CosmosConnection } from "./cosmosconnection";
import { CosmosBech32Prefix } from "./address";
import { TokenInfos } from "./types";

/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export function createCosmosConnector(
  url: string,
  prefix: CosmosBech32Prefix,
  tokenInfo: TokenInfos,
  expectedChainId?: ChainId,
): ChainConnector<CosmosConnection> {
  return {
    establishConnection: async () => CosmosConnection.establish(url, prefix, tokenInfo),
    codec: cosmosCodec,
    expectedChainId: expectedChainId,
  };
}
