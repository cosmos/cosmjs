import { ChainConnector, ChainId } from "@iov/bcp";

import { CosmosBech32Prefix } from "./address";
import { cosmWasmCodec } from "./cosmwasmcodec";
import { CosmWasmConnection } from "./cosmwasmconnection";
import { TokenInfos } from "./types";

/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export function createCosmWasmConnector(
  url: string,
  prefix: CosmosBech32Prefix,
  tokenInfo: TokenInfos,
  expectedChainId?: ChainId,
): ChainConnector<CosmWasmConnection> {
  return {
    establishConnection: async () => CosmWasmConnection.establish(url, prefix, tokenInfo),
    codec: cosmWasmCodec,
    expectedChainId: expectedChainId,
  };
}
