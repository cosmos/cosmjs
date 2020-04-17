import { Sha256 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";

import { Log, parseLogs } from "./logs";
import { decodeBech32Pubkey } from "./pubkey";
import { BroadcastMode, RestClient } from "./restclient";
import { Coin, CosmosSdkTx, PubKey, StdTx } from "./types";

export interface GetNonceResult {
  readonly accountNumber: number;
  readonly sequence: number;
}

export interface Account {
  /** Bech32 account address */
  readonly address: string;
  readonly balance: ReadonlyArray<Coin>;
  readonly pubkey: PubKey | undefined;
  readonly accountNumber: number;
  readonly sequence: number;
}

export interface PostTxResult {
  readonly logs: readonly Log[];
  readonly rawLog: string;
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
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

/**
 * This query type allows you to pass arbitrary key/value pairs to the backend. It is
 * more powerful and slightly lower level than the other search options.
 */
export interface SearchByTagsQuery {
  readonly tags: readonly { readonly key: string; readonly value: string }[];
}

export type SearchTxQuery =
  | SearchByIdQuery
  | SearchByHeightQuery
  | SearchBySentFromOrToQuery
  | SearchByTagsQuery;

function isSearchByIdQuery(query: SearchTxQuery): query is SearchByIdQuery {
  return (query as SearchByIdQuery).id !== undefined;
}

function isSearchByHeightQuery(query: SearchTxQuery): query is SearchByHeightQuery {
  return (query as SearchByHeightQuery).height !== undefined;
}

function isSearchBySentFromOrToQuery(query: SearchTxQuery): query is SearchBySentFromOrToQuery {
  return (query as SearchBySentFromOrToQuery).sentFromOrTo !== undefined;
}

function isSearchByTagsQuery(query: SearchTxQuery): query is SearchByTagsQuery {
  return (query as SearchByTagsQuery).tags !== undefined;
}

export interface SearchTxFilter {
  readonly minHeight?: number;
  readonly maxHeight?: number;
}

export interface Code {
  readonly id: number;
  /** Bech32 account address */
  readonly creator: string;
  /** Hex-encoded sha256 hash of the code stored here */
  readonly checksum: string;
  readonly source?: string;
  readonly builder?: string;
}

export interface CodeDetails extends Code {
  /** The original wasm bytes */
  readonly data: Uint8Array;
}

export interface Contract {
  readonly address: string;
  readonly codeId: number;
  /** Bech32 account address */
  readonly creator: string;
  readonly label: string;
}

export interface ContractDetails extends Contract {
  /** Argument passed on initialization of the contract */
  readonly initMsg: object;
}

/** A transaction that is indexed as part of the transaction history */
export interface IndexedTx {
  readonly height: number;
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly hash: string;
  /** Transaction execution error code. 0 on success. */
  readonly code: number;
  readonly rawLog: string;
  readonly logs: readonly Log[];
  readonly tx: CosmosSdkTx;
  /** The gas limit as set by the user */
  readonly gasWanted?: number;
  /** The gas used by the execution */
  readonly gasUsed?: number;
  /** An RFC 3339 time string like e.g. '2020-02-15T10:39:10.4696305Z' */
  readonly timestamp: string;
}

export interface BlockHeader {
  readonly version: {
    readonly block: string;
    readonly app: string;
  };
  readonly height: number;
  readonly chainId: string;
  /** An RFC 3339 time string like e.g. '2020-02-15T10:39:10.4696305Z' */
  readonly time: string;
}

export interface Block {
  /** The ID is a hash of the block header (uppercase hex) */
  readonly id: string;
  readonly header: BlockHeader;
  /** Array of raw transactions */
  readonly txs: ReadonlyArray<Uint8Array>;
}

/** Use for testing only */
export interface PrivateCosmWasmClient {
  readonly restClient: RestClient;
}

export class CosmWasmClient {
  protected readonly restClient: RestClient;
  /** Any address the chain considers valid (valid bech32 with proper prefix) */
  protected anyValidAddress: string | undefined;

  private readonly codesCache = new Map<number, CodeDetails>();
  private chainId: string | undefined;

  /**
   * Creates a new client to interact with a CosmWasm blockchain.
   *
   * This instance does a lot of caching. In order to benefit from that you should try to use one instance
   * for the lifetime of your application. When switching backends, a new instance must be created.
   *
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param broadcastMode Defines at which point of the transaction processing the postTx method (i.e. transaction broadcasting) returns
   */
  public constructor(apiUrl: string, broadcastMode = BroadcastMode.Block) {
    this.restClient = new RestClient(apiUrl, broadcastMode);
  }

  public async getChainId(): Promise<string> {
    if (!this.chainId) {
      const response = await this.restClient.nodeInfo();
      const chainId = response.node_info.network;
      if (!chainId) throw new Error("Chain ID must not be empty");
      this.chainId = chainId;
    }

    return this.chainId;
  }

  public async getHeight(): Promise<number> {
    if (this.anyValidAddress) {
      const { height } = await this.restClient.authAccounts(this.anyValidAddress);
      return parseInt(height, 10);
    } else {
      // Note: this gets inefficient when blocks contain a lot of transactions since it
      // requires downloading and deserializing all transactions in the block.
      const latest = await this.restClient.blocksLatest();
      return parseInt(latest.block.header.height, 10);
    }
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
      accountNumber: account.accountNumber,
      sequence: account.sequence,
    };
  }

  public async getAccount(address: string): Promise<Account | undefined> {
    const account = await this.restClient.authAccounts(address);
    const value = account.result.value;
    if (value.address === "") {
      return undefined;
    } else {
      this.anyValidAddress = value.address;
      return {
        address: value.address,
        balance: value.coins,
        pubkey: value.public_key ? decodeBech32Pubkey(value.public_key) : undefined,
        accountNumber: value.account_number,
        sequence: value.sequence,
      };
    }
  }

  /**
   * Gets block header and meta
   *
   * @param height The height of the block. If undefined, the latest height is used.
   */
  public async getBlock(height?: number): Promise<Block> {
    const response =
      height !== undefined ? await this.restClient.blocks(height) : await this.restClient.blocksLatest();

    return {
      id: response.block_id.hash,
      header: {
        version: response.block.header.version,
        time: response.block.header.time,
        height: parseInt(response.block.header.height, 10),
        chainId: response.block.header.chain_id,
      },
      txs: (response.block.data.txs || []).map((encoded) => Encoding.fromBase64(encoded)),
    };
  }

  public async searchTx(query: SearchTxQuery, filter: SearchTxFilter = {}): Promise<readonly IndexedTx[]> {
    const minHeight = filter.minHeight || 0;
    const maxHeight = filter.maxHeight || Number.MAX_SAFE_INTEGER;

    if (maxHeight < minHeight) return []; // optional optimization

    function withFilters(originalQuery: string): string {
      return `${originalQuery}&tx.minheight=${minHeight}&tx.maxheight=${maxHeight}`;
    }

    let txs: readonly IndexedTx[];
    if (isSearchByIdQuery(query)) {
      txs = await this.txsQuery(`tx.hash=${query.id}`);
    } else if (isSearchByHeightQuery(query)) {
      // optional optimization to avoid network request
      if (query.height < minHeight || query.height > maxHeight) {
        txs = [];
      } else {
        txs = await this.txsQuery(`tx.height=${query.height}`);
      }
    } else if (isSearchBySentFromOrToQuery(query)) {
      // We cannot get both in one request (see https://github.com/cosmos/gaia/issues/75)
      const sentQuery = withFilters(`message.module=bank&message.sender=${query.sentFromOrTo}`);
      const receivedQuery = withFilters(`message.module=bank&transfer.recipient=${query.sentFromOrTo}`);
      const sent = await this.txsQuery(sentQuery);
      const received = await this.txsQuery(receivedQuery);

      const sentHashes = sent.map((t) => t.hash);
      txs = [...sent, ...received.filter((t) => !sentHashes.includes(t.hash))];
    } else if (isSearchByTagsQuery(query)) {
      const rawQuery = withFilters(query.tags.map((t) => `${t.key}=${t.value}`).join("&"));
      txs = await this.txsQuery(rawQuery);
    } else {
      throw new Error("Unknown query type");
    }

    // backend sometimes messes up with min/max height filtering
    const filtered = txs.filter((tx) => tx.height >= minHeight && tx.height <= maxHeight);

    return filtered;
  }

  public async postTx(tx: StdTx): Promise<PostTxResult> {
    const result = await this.restClient.postTx(tx);
    if (!result.txhash.match(/^([0-9A-F][0-9A-F])+$/)) {
      throw new Error("Received ill-formatted txhash. Must be non-empty upper-case hex");
    }

    if (result.code) {
      throw new Error(
        `Error when posting tx ${result.txhash}. Code: ${result.code}; Raw log: ${result.raw_log}`,
      );
    }

    return {
      logs: result.logs ? parseLogs(result.logs) : [],
      rawLog: result.raw_log || "",
      transactionHash: result.txhash,
    };
  }

  public async getCodes(): Promise<readonly Code[]> {
    const result = await this.restClient.listCodeInfo();
    return result.map(
      (entry): Code => {
        this.anyValidAddress = entry.creator;
        return {
          id: entry.id,
          creator: entry.creator,
          checksum: Encoding.toHex(Encoding.fromHex(entry.data_hash)),
          source: entry.source || undefined,
          builder: entry.builder || undefined,
        };
      },
    );
  }

  public async getCodeDetails(codeId: number): Promise<CodeDetails> {
    const cached = this.codesCache.get(codeId);
    if (cached) return cached;

    const getCodeResult = await this.restClient.getCode(codeId);
    const codeDetails: CodeDetails = {
      id: getCodeResult.id,
      creator: getCodeResult.creator,
      checksum: Encoding.toHex(Encoding.fromHex(getCodeResult.data_hash)),
      source: getCodeResult.source || undefined,
      builder: getCodeResult.builder || undefined,
      data: Encoding.fromBase64(getCodeResult.data),
    };
    this.codesCache.set(codeId, codeDetails);
    return codeDetails;
  }

  public async getContracts(codeId: number): Promise<readonly Contract[]> {
    const result = await this.restClient.listContractsByCodeId(codeId);
    return result.map(
      (entry): Contract => ({
        address: entry.address,
        codeId: entry.code_id,
        creator: entry.creator,
        label: entry.label,
      }),
    );
  }

  /**
   * Throws an error if no contract was found at the address
   */
  public async getContract(address: string): Promise<ContractDetails> {
    const result = await this.restClient.getContractInfo(address);
    if (!result) throw new Error(`No contract found at address "${address}"`);
    return {
      address: result.address,
      codeId: result.code_id,
      creator: result.creator,
      label: result.label,
      initMsg: result.init_msg,
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
    const _info = await this.getContract(address);

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
        if (error.message.startsWith("not found: contract")) {
          throw new Error(`No contract found at address "${address}"`);
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }

  private async txsQuery(query: string): Promise<readonly IndexedTx[]> {
    // TODO: we need proper pagination support
    const limit = 100;
    const result = await this.restClient.txsQuery(`${query}&limit=${limit}`);
    const pages = parseInt(result.page_total, 10);
    if (pages > 1) {
      throw new Error(
        `Found more results on the backend than we can process currently. Results: ${result.total_count}, supported: ${limit}`,
      );
    }
    return result.txs.map(
      (restItem): IndexedTx => ({
        height: parseInt(restItem.height, 10),
        hash: restItem.txhash,
        code: restItem.code || 0,
        rawLog: restItem.raw_log,
        logs: parseLogs(restItem.logs || []),
        tx: restItem.tx,
        timestamp: restItem.timestamp,
      }),
    );
  }
}
