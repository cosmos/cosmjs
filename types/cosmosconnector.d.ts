import { ChainConnector, ChainId } from "@iov/bcp";
import { CosmosBech32Prefix } from "./address";
import { CosmosConnection } from "./cosmosconnection";
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
