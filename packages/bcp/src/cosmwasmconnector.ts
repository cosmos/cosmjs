import { ChainConnector, ChainId } from "@iov/bcp";

import { CosmosBech32Prefix } from "./address";
import { CosmWasmCodec } from "./cosmwasmcodec";
import { CosmWasmConnection } from "./cosmwasmconnection";
import { TokenInfo } from "./types";

/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export function createCosmWasmConnector(
  url: string,
  prefix: CosmosBech32Prefix,
  tokenInfo: readonly TokenInfo[],
  expectedChainId?: ChainId,
): ChainConnector<CosmWasmConnection> {
  const codec = new CosmWasmCodec(prefix, tokenInfo);
  return {
    establishConnection: async () => CosmWasmConnection.establish(url, prefix, tokenInfo),
    codec: codec,
    expectedChainId: expectedChainId,
  };
}
