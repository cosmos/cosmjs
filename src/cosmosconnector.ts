import { ChainConnector, ChainId } from "@iov/bcp";

import { CosmosBech32Prefix } from "./address";
import { cosmosCodec } from "./cosmoscodec";
import { CosmosConnection } from "./cosmosconnection";
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
