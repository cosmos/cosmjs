import { CosmosAddressBech32Prefix } from "@cosmwasm/sdk";
import { ChainConnector, ChainId } from "@iov/bcp";
import { CosmWasmConnection, TokenConfiguration } from "./cosmwasmconnection";
/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export declare function createCosmWasmConnector(
  url: string,
  addressPrefix: CosmosAddressBech32Prefix,
  tokenConfig: TokenConfiguration,
  expectedChainId?: ChainId,
): ChainConnector<CosmWasmConnection>;
