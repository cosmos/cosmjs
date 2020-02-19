import { ChainConnector, ChainId } from "@iov/bcp";

import { CosmWasmCodec } from "./cosmwasmcodec";
import { CosmWasmConnection, TokenConfiguration } from "./cosmwasmconnection";

/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export function createCosmWasmConnector(
  url: string,
  addressPrefix: string,
  tokenConfig: TokenConfiguration,
  expectedChainId?: ChainId,
): ChainConnector<CosmWasmConnection> {
  const codec = new CosmWasmCodec(addressPrefix, tokenConfig.bankTokens, tokenConfig.erc20Tokens);
  return {
    establishConnection: async () => CosmWasmConnection.establish(url, addressPrefix, tokenConfig),
    codec: codec,
    expectedChainId: expectedChainId,
  };
}
