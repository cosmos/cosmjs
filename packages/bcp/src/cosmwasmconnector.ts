import { ChainConnector, ChainId } from "@iov/bcp";

import { CosmosBech32Prefix } from "./address";
import { CosmWasmCodec } from "./cosmwasmcodec";
import { CosmWasmConnection, TokenConfiguration } from "./cosmwasmconnection";

/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export function createCosmWasmConnector(
  url: string,
  prefix: CosmosBech32Prefix,
  tokens: TokenConfiguration,
  expectedChainId?: ChainId,
): ChainConnector<CosmWasmConnection> {
  const codec = new CosmWasmCodec(prefix, tokens);
  return {
    establishConnection: async () => CosmWasmConnection.establish(url, prefix, tokens),
    codec: codec,
    expectedChainId: expectedChainId,
  };
}
