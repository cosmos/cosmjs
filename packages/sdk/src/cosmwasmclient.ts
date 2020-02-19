import { Sha256 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";

import { Log, parseLogs } from "./logs";
import { BlockResponse, BroadcastMode, RestClient, TxsResponse } from "./restclient";
import { CodeInfo, CosmosSdkAccount, CosmosSdkTx } from "./types";

export interface GetNonceResult {
  readonly accountNumber: number;
  readonly sequence: number;
}

export interface PostTxResult {
  readonly logs: readonly Log[];
  readonly rawLog: string;
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-exmpty upper-case hex */
  readonly transactionHash: string;
}

export interface SearchByIdQuery {
  readonly id: string;
}

export interface SearchByHeightQuery {
  readonly height: number;
}

export interface SearchBySentFromOrToQuery {
  readonly sentFromOrTo: string;
}

export type SearchTxQuery = SearchByIdQuery | SearchByHeightQuery | SearchBySentFromOrToQuery;

function isSearchByIdQuery(query: SearchTxQuery): query is SearchByIdQuery {
  return (query as SearchByIdQuery).id !== undefined;
}

function isSearchByHeightQuery(query: SearchTxQuery): query is SearchByHeightQuery {
  return (query as SearchByHeightQuery).height !== undefined;
}

function isSearchBySentFromOrToQuery(query: SearchTxQuery): query is SearchBySentFromOrToQuery {
  return (query as SearchBySentFromOrToQuery).sentFromOrTo !== undefined;
}

export class CosmWasmClient {
  protected readonly restClient: RestClient;

  public constructor(url: string, broadcastMode = BroadcastMode.Block) {
    this.restClient = new RestClient(url, broadcastMode);
  }

  public async chainId(): Promise<string> {
    const response = await this.restClient.nodeInfo();
    return response.node_info.network;
  }

  /**
   * Returns a 32 byte upper-case hex transaction hash (typically used as the transaction ID)
   */
  public async getIdentifier(tx: CosmosSdkTx): Promise<string> {
    // We consult the REST API because we don't have a local amino encoder
    const bytes = await this.restClient.encodeTx(tx);
    const hash = new Sha256(bytes).digest();
    return Encoding.toHex(hash).toUpperCase();
  }

  /**
   * Returns account number and sequence.
   *
   * Throws if the account does not exist on chain.
   *
   * @param address returns data for this address. When unset, the client's sender adddress is used.
   */
  public async getNonce(address: string): Promise<GetNonceResult> {
    const account = await this.getAccount(address);
    if (!account) {
      throw new Error(
        "Account does not exist on chain. Send some tokens there before trying to query nonces.",
      );
    }
    return {
      accountNumber: account.account_number,
      sequence: account.sequence,
    };
  }

  public async getAccount(address: string): Promise<CosmosSdkAccount | undefined> {
    const account = await this.restClient.authAccounts(address);
    const value = account.result.value;
    return value.address === "" ? undefined : value;
  }

  /**
   * Gets block header and meta
   *
   * @param height The height of the block. If undefined, the latest height is used.
   */
  public async getBlock(height?: number): Promise<BlockResponse> {
    if (height !== undefined) {
      return this.restClient.blocks(height);
    } else {
      return this.restClient.blocksLatest();
    }
  }

  public async listCodeInfo(): Promise<readonly CodeInfo[]> {
    return this.restClient.listCodeInfo();
  }

  public async listContractAddresses(): Promise<readonly string[]> {
    return this.restClient.listContractAddresses();
  }

  public async searchTx(query: SearchTxQuery): Promise<readonly TxsResponse[]> {
    // TODO: we need proper pagination support
    function limited(originalQuery: string): string {
      return `${originalQuery}&limit=75`;
    }

    if (isSearchByIdQuery(query)) {
      return (await this.restClient.txs(`tx.hash=${query.id}`)).txs;
    } else if (isSearchByHeightQuery(query)) {
      return (await this.restClient.txs(`tx.height=${query.height}`)).txs;
    } else if (isSearchBySentFromOrToQuery(query)) {
      // We cannot get both in one request (see https://github.com/cosmos/gaia/issues/75)
      const sent = (await this.restClient.txs(limited(`message.sender=${query.sentFromOrTo}`))).txs;
      const received = (await this.restClient.txs(limited(`transfer.recipient=${query.sentFromOrTo}`))).txs;
      const sentHashes = sent.map(t => t.txhash);
      return [...sent, ...received.filter(t => !sentHashes.includes(t.txhash))];
    } else {
      throw new Error("Unknown query type");
    }
  }

  public async postTx(tx: Uint8Array): Promise<PostTxResult> {
    const result = await this.restClient.postTx(tx);
    if (result.code) {
      throw new Error(`Error when posting tx. Code: ${result.code}; Raw log: ${result.raw_log}`);
    }

    if (!result.txhash.match(/^([0-9A-F][0-9A-F])+$/)) {
      throw new Error("Received ill-formatted txhash. Must be non-empty upper-case hex");
    }

    return {
      logs: result.logs ? parseLogs(result.logs) : [],
      rawLog: result.raw_log || "",
      transactionHash: result.txhash,
    };
  }

  /**
   * Returns the data at the key if present (raw contract dependent storage data)
   * or null if no data at this key.
   *
   * Promise is rejected when contract does not exist.
   */
  public async queryContractRaw(address: string, key: Uint8Array): Promise<Uint8Array | null> {
    // just test contract existence
    const _info = await this.restClient.getContractInfo(address);

    return this.restClient.queryContractRaw(address, key);
  }

  /**
   * Makes a "smart query" on the contract, returns raw data
   *
   * Promise is rejected when contract does not exist.
   * Promise is rejected for invalid query format.
   */
  public async queryContractSmart(address: string, queryMsg: object): Promise<Uint8Array> {
    try {
      return await this.restClient.queryContractSmart(address, queryMsg);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "not found: contract") {
          throw new Error(`No contract found at address "${address}"`);
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }
}
