import { Sha256 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";

import { Log, parseLogs } from "./logs";
import { BlockResponse, BroadcastMode, RestClient, TxsResponse } from "./restclient";
import { CosmosSdkAccount, CosmosSdkTx, StdTx } from "./types";

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

  public async searchTx(query: SearchTxQuery, filter: SearchTxFilter = {}): Promise<readonly TxsResponse[]> {
    const minHeight = filter.minHeight || 0;
    const maxHeight = filter.maxHeight || Number.MAX_SAFE_INTEGER;

    if (maxHeight < minHeight) return []; // optional optimization

    function withFilters(originalQuery: string): string {
      return `${originalQuery}&tx.minheight=${minHeight}&tx.maxheight=${maxHeight}`;
    }

    let txs: readonly TxsResponse[];
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
      const sent = await this.txsQuery(withFilters(`message.sender=${query.sentFromOrTo}`));
      const received = await this.txsQuery(withFilters(`transfer.recipient=${query.sentFromOrTo}`));

      const sentHashes = sent.map(t => t.txhash);
      txs = [...sent, ...received.filter(t => !sentHashes.includes(t.txhash))];
    } else {
      throw new Error("Unknown query type");
    }

    // backend sometimes messes up with min/max height filtering
    const filtered = txs.filter(tx => {
      const txHeight = parseInt(tx.height, 10);
      return txHeight >= minHeight && txHeight <= maxHeight;
    });

    return filtered;
  }

  public async postTx(tx: StdTx): Promise<PostTxResult> {
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

  public async getCodes(): Promise<readonly Code[]> {
    const result = await this.restClient.listCodeInfo();
    return result.map(
      (entry): Code => ({
        id: entry.id,
        creator: entry.creator,
        checksum: Encoding.toHex(Encoding.fromHex(entry.code_hash)),
        source: entry.source || undefined,
        builder: entry.builder || undefined,
      }),
    );
  }

  public async getCodeDetails(codeId: number): Promise<CodeDetails> {
    // TODO: implement as one request when https://github.com/cosmwasm/wasmd/issues/90 is done
    const [codeInfos, getCodeResult] = await Promise.all([this.getCodes(), this.restClient.getCode(codeId)]);

    const codeInfo = codeInfos.find(code => code.id === codeId);
    if (!codeInfo) throw new Error("No code info found");

    return {
      ...codeInfo,
      data: getCodeResult,
    };
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

  private async txsQuery(query: string): Promise<readonly TxsResponse[]> {
    // TODO: we need proper pagination support
    const limit = 100;
    const result = await this.restClient.txsQuery(`${query}&limit=${limit}`);
    const pages = parseInt(result.page_total, 10);
    if (pages > 1) {
      throw new Error(
        `Found more results on the backend than we can process currently. Results: ${result.total_count}, supported: ${limit}`,
      );
    }
    return result.txs;
  }
}
