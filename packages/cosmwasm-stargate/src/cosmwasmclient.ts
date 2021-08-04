/* eslint-disable @typescript-eslint/naming-convention */
import { fromAscii, toHex } from "@cosmjs/encoding";
import { Uint53 } from "@cosmjs/math";
import {
  Account,
  accountFromAny,
  AuthExtension,
  BankExtension,
  Block,
  BroadcastTxResponse,
  Coin,
  IndexedTx,
  isSearchByHeightQuery,
  isSearchBySentFromOrToQuery,
  isSearchByTagsQuery,
  QueryClient,
  SearchTxFilter,
  SearchTxQuery,
  SequenceResponse,
  setupAuthExtension,
  setupBankExtension,
  TimeoutError,
} from "@cosmjs/stargate";
import { Tendermint34Client, toRfc3339WithNanoseconds } from "@cosmjs/tendermint-rpc";
import { assert, sleep } from "@cosmjs/utils";
import { CodeInfoResponse } from "cosmjs-types/cosmwasm/wasm/v1/query";
import { ContractCodeHistoryOperationType } from "cosmjs-types/cosmwasm/wasm/v1/types";

import { JsonObject, setupWasmExtension, WasmExtension } from "./queries";

// Re-exports that belong to public CosmWasmClient interfaces
export {
  JsonObject, // returned by CosmWasmClient.queryContractSmart
};

export interface Code {
  readonly id: number;
  /** Bech32 account address */
  readonly creator: string;
  /** Hex-encoded sha256 hash of the code stored here */
  readonly checksum: string;

  // `source` and `builder` were removed in wasmd 0.18
  // https://github.com/CosmWasm/wasmd/issues/540
}

export interface CodeDetails extends Code {
  /** The original Wasm bytes */
  readonly data: Uint8Array;
}

export interface Contract {
  readonly address: string;
  readonly codeId: number;
  /** Bech32 account address */
  readonly creator: string;
  /** Bech32-encoded admin address */
  readonly admin: string | undefined;
  readonly label: string;
  /**
   * The IBC port ID assigned to this contract by wasmd.
   *
   * This is set for all IBC contracts (https://github.com/CosmWasm/wasmd/blob/v0.16.0/x/wasm/keeper/keeper.go#L299-L306).
   */
  readonly ibcPortId: string | undefined;
}

export interface ContractCodeHistoryEntry {
  /** The source of this history entry */
  readonly operation: "Genesis" | "Init" | "Migrate";
  readonly codeId: number;
  readonly msg: Record<string, unknown>;
}

/** Use for testing only */
export interface PrivateCosmWasmClient {
  readonly tmClient: Tendermint34Client | undefined;
  readonly queryClient: (QueryClient & AuthExtension & BankExtension & WasmExtension) | undefined;
}

export class CosmWasmClient {
  private readonly tmClient: Tendermint34Client | undefined;
  private readonly queryClient: (QueryClient & AuthExtension & BankExtension & WasmExtension) | undefined;
  private readonly codesCache = new Map<number, CodeDetails>();
  private chainId: string | undefined;

  public static async connect(endpoint: string): Promise<CosmWasmClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new CosmWasmClient(tmClient);
  }

  protected constructor(tmClient: Tendermint34Client | undefined) {
    if (tmClient) {
      this.tmClient = tmClient;
      this.queryClient = QueryClient.withExtensions(
        tmClient,
        setupAuthExtension,
        setupBankExtension,
        setupWasmExtension,
      );
    }
  }

  protected getTmClient(): Tendermint34Client | undefined {
    return this.tmClient;
  }

  protected forceGetTmClient(): Tendermint34Client {
    if (!this.tmClient) {
      throw new Error(
        "Tendermint client not available. You cannot use online functionality in offline mode.",
      );
    }
    return this.tmClient;
  }

  protected getQueryClient(): (QueryClient & AuthExtension & BankExtension & WasmExtension) | undefined {
    return this.queryClient;
  }

  protected forceGetQueryClient(): QueryClient & AuthExtension & BankExtension & WasmExtension {
    if (!this.queryClient) {
      throw new Error("Query client not available. You cannot use online functionality in offline mode.");
    }
    return this.queryClient;
  }

  public async getChainId(): Promise<string> {
    if (!this.chainId) {
      const response = await this.forceGetTmClient().status();
      const chainId = response.nodeInfo.network;
      if (!chainId) throw new Error("Chain ID must not be empty");
      this.chainId = chainId;
    }

    return this.chainId;
  }

  public async getHeight(): Promise<number> {
    const status = await this.forceGetTmClient().status();
    return status.syncInfo.latestBlockHeight;
  }

  public async getAccount(searchAddress: string): Promise<Account | null> {
    try {
      const account = await this.forceGetQueryClient().auth.account(searchAddress);
      return account ? accountFromAny(account) : null;
    } catch (error) {
      if (/rpc error: code = NotFound/i.test(error)) {
        return null;
      }
      throw error;
    }
  }

  public async getSequence(address: string): Promise<SequenceResponse> {
    const account = await this.getAccount(address);
    if (!account) {
      throw new Error(
        "Account does not exist on chain. Send some tokens there before trying to query sequence.",
      );
    }
    return {
      accountNumber: account.accountNumber,
      sequence: account.sequence,
    };
  }

  public async getBlock(height?: number): Promise<Block> {
    const response = await this.forceGetTmClient().block(height);
    return {
      id: toHex(response.blockId.hash).toUpperCase(),
      header: {
        version: {
          block: new Uint53(response.block.header.version.block).toString(),
          app: new Uint53(response.block.header.version.app).toString(),
        },
        height: response.block.header.height,
        chainId: response.block.header.chainId,
        time: toRfc3339WithNanoseconds(response.block.header.time),
      },
      txs: response.block.txs,
    };
  }

  public async getBalance(address: string, searchDenom: string): Promise<Coin> {
    return this.forceGetQueryClient().bank.balance(address, searchDenom);
  }

  public async getTx(id: string): Promise<IndexedTx | null> {
    const results = await this.txsQuery(`tx.hash='${id}'`);
    return results[0] ?? null;
  }

  public async searchTx(query: SearchTxQuery, filter: SearchTxFilter = {}): Promise<readonly IndexedTx[]> {
    const minHeight = filter.minHeight || 0;
    const maxHeight = filter.maxHeight || Number.MAX_SAFE_INTEGER;

    if (maxHeight < minHeight) return []; // optional optimization

    function withFilters(originalQuery: string): string {
      return `${originalQuery} AND tx.height>=${minHeight} AND tx.height<=${maxHeight}`;
    }

    let txs: readonly IndexedTx[];

    if (isSearchByHeightQuery(query)) {
      txs =
        query.height >= minHeight && query.height <= maxHeight
          ? await this.txsQuery(`tx.height=${query.height}`)
          : [];
    } else if (isSearchBySentFromOrToQuery(query)) {
      const sentQuery = withFilters(`message.module='bank' AND transfer.sender='${query.sentFromOrTo}'`);
      const receivedQuery = withFilters(
        `message.module='bank' AND transfer.recipient='${query.sentFromOrTo}'`,
      );
      const [sent, received] = await Promise.all(
        [sentQuery, receivedQuery].map((rawQuery) => this.txsQuery(rawQuery)),
      );
      const sentHashes = sent.map((t) => t.hash);
      txs = [...sent, ...received.filter((t) => !sentHashes.includes(t.hash))];
    } else if (isSearchByTagsQuery(query)) {
      const rawQuery = withFilters(query.tags.map((t) => `${t.key}='${t.value}'`).join(" AND "));
      txs = await this.txsQuery(rawQuery);
    } else {
      throw new Error("Unknown query type");
    }

    const filtered = txs.filter((tx) => tx.height >= minHeight && tx.height <= maxHeight);
    return filtered;
  }

  public disconnect(): void {
    if (this.tmClient) this.tmClient.disconnect();
  }

  /**
   * Broadcasts a signed transaction to the network and monitors its inclusion in a block.
   *
   * If broadcasting is rejected by the node for some reason (e.g. because of a CheckTx failure),
   * an error is thrown.
   *
   * If the transaction is not included in a block before the provided timeout, this errors with a `TimeoutError`.
   *
   * If the transaction is included in a block, a `BroadcastTxResponse` is returned. The caller then
   * usually needs to check for execution success or failure.
   */
  // NOTE: This method is tested against slow chains and timeouts in the @cosmjs/stargate package.
  // Make sure it is kept in sync!
  public async broadcastTx(
    tx: Uint8Array,
    timeoutMs = 60_000,
    pollIntervalMs = 3_000,
  ): Promise<BroadcastTxResponse> {
    let timedOut = false;
    const txPollTimeout = setTimeout(() => {
      timedOut = true;
    }, timeoutMs);

    const pollForTx = async (txId: string): Promise<BroadcastTxResponse> => {
      if (timedOut) {
        throw new TimeoutError(
          `Transaction with ID ${txId} was submitted but was not yet found on the chain. You might want to check later.`,
          txId,
        );
      }
      await sleep(pollIntervalMs);
      const result = await this.getTx(txId);
      return result
        ? {
            code: result.code,
            height: result.height,
            rawLog: result.rawLog,
            transactionHash: txId,
            gasUsed: result.gasUsed,
            gasWanted: result.gasWanted,
          }
        : pollForTx(txId);
    };

    const broadcasted = await this.forceGetTmClient().broadcastTxSync({ tx });
    if (broadcasted.code) {
      throw new Error(
        `Broadcasting transaction failed with code ${broadcasted.code} (codespace: ${broadcasted.codeSpace}). Log: ${broadcasted.log}`,
      );
    }
    const transactionId = toHex(broadcasted.hash).toUpperCase();
    return new Promise((resolve, reject) =>
      pollForTx(transactionId).then(
        (value) => {
          clearTimeout(txPollTimeout);
          resolve(value);
        },
        (error) => {
          clearTimeout(txPollTimeout);
          reject(error);
        },
      ),
    );
  }

  public async getCodes(): Promise<readonly Code[]> {
    const { codeInfos } = await this.forceGetQueryClient().wasm.listCodeInfo();
    return (codeInfos || []).map((entry: CodeInfoResponse): Code => {
      assert(entry.creator && entry.codeId && entry.dataHash, "entry incomplete");
      return {
        id: entry.codeId.toNumber(),
        creator: entry.creator,
        checksum: toHex(entry.dataHash),
      };
    });
  }

  public async getCodeDetails(codeId: number): Promise<CodeDetails> {
    const cached = this.codesCache.get(codeId);
    if (cached) return cached;

    const { codeInfo, data } = await this.forceGetQueryClient().wasm.getCode(codeId);
    assert(
      codeInfo && codeInfo.codeId && codeInfo.creator && codeInfo.dataHash && data,
      "codeInfo missing or incomplete",
    );
    const codeDetails: CodeDetails = {
      id: codeInfo.codeId.toNumber(),
      creator: codeInfo.creator,
      checksum: toHex(codeInfo.dataHash),
      data: data,
    };
    this.codesCache.set(codeId, codeDetails);
    return codeDetails;
  }

  public async getContracts(codeId: number): Promise<readonly string[]> {
    // TODO: handle pagination - accept as arg or auto-loop
    const { contracts } = await this.forceGetQueryClient().wasm.listContractsByCodeId(codeId);
    return contracts;
  }

  /**
   * Throws an error if no contract was found at the address
   */
  public async getContract(address: string): Promise<Contract> {
    const { address: retrievedAddress, contractInfo } = await this.forceGetQueryClient().wasm.getContractInfo(
      address,
    );
    if (!contractInfo) throw new Error(`No contract found at address "${address}"`);
    assert(retrievedAddress, "address missing");
    assert(contractInfo.codeId && contractInfo.creator && contractInfo.label, "contractInfo incomplete");
    return {
      address: retrievedAddress,
      codeId: contractInfo.codeId.toNumber(),
      creator: contractInfo.creator,
      admin: contractInfo.admin || undefined,
      label: contractInfo.label,
      ibcPortId: contractInfo.ibcPortId || undefined,
    };
  }

  /**
   * Throws an error if no contract was found at the address
   */
  public async getContractCodeHistory(address: string): Promise<readonly ContractCodeHistoryEntry[]> {
    const result = await this.forceGetQueryClient().wasm.getContractCodeHistory(address);
    if (!result) throw new Error(`No contract history found for address "${address}"`);
    const operations: Record<number, "Init" | "Genesis" | "Migrate"> = {
      [ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT]: "Init",
      [ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS]: "Genesis",
      [ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE]: "Migrate",
    };
    return (result.entries || []).map((entry): ContractCodeHistoryEntry => {
      assert(entry.operation && entry.codeId && entry.msg);
      return {
        operation: operations[entry.operation],
        codeId: entry.codeId.toNumber(),
        msg: JSON.parse(fromAscii(entry.msg)),
      };
    });
  }

  /**
   * Returns the data at the key if present (raw contract dependent storage data)
   * or null if no data at this key.
   *
   * Promise is rejected when contract does not exist.
   */
  public async queryContractRaw(address: string, key: Uint8Array): Promise<Uint8Array | null> {
    // just test contract existence
    await this.getContract(address);

    const { data } = await this.forceGetQueryClient().wasm.queryContractRaw(address, key);
    return data ?? null;
  }

  /**
   * Makes a smart query on the contract, returns the parsed JSON document.
   *
   * Promise is rejected when contract does not exist.
   * Promise is rejected for invalid query format.
   * Promise is rejected for invalid response format.
   */
  public async queryContractSmart(address: string, queryMsg: Record<string, unknown>): Promise<JsonObject> {
    try {
      return await this.forceGetQueryClient().wasm.queryContractSmart(address, queryMsg);
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
    const results = await this.forceGetTmClient().txSearchAll({ query: query });
    return results.txs.map((tx) => {
      return {
        height: tx.height,
        hash: toHex(tx.hash).toUpperCase(),
        code: tx.result.code,
        rawLog: tx.result.log || "",
        tx: tx.tx,
        gasUsed: tx.result.gasUsed,
        gasWanted: tx.result.gasWanted,
      };
    });
  }
}
