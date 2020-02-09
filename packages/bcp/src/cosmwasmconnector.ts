import { CosmosAddressBech32Prefix } from "@cosmwasm/sdk";
import { ChainConnector, ChainId } from "@iov/bcp";

import { CosmWasmCodec } from "./cosmwasmcodec";
import { CosmWasmConnection, TokenConfiguration } from "./cosmwasmconnection";

/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export function createCosmWasmConnector(
  url: string,
  addressPrefix: CosmosAddressBech32Prefix,
  tokens: TokenConfiguration,
  expectedChainId?: ChainId,
): ChainConnector<CosmWasmConnection> {
  const codec = new CosmWasmCodec(addressPrefix, tokens.bank);
  return {
    establishConnection: async () => CosmWasmConnection.establish(url, addressPrefix, tokens),
    codec: codec,
    expectedChainId: expectedChainId,
  };
}
