import { ChainConnector, ChainId } from "@iov/bcp";
import { CosmosConnection } from "./cosmosconnection";
import { CosmosBech32Prefix } from "./address";
import { TokenInfos } from "./types";
/**
 * A helper to connect to a cosmos-based chain at a given url
 */
export declare function createCosmosConnector(
  url: string,
  prefix: CosmosBech32Prefix,
  tokenInfo: TokenInfos,
  expectedChainId?: ChainId,
): ChainConnector<CosmosConnection>;
