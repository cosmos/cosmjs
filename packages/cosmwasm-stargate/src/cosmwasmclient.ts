/* eslint-disable @typescript-eslint/naming-convention */
import {
  Code,
  CodeDetails,
  Contract,
  ContractCodeHistoryEntry,
  JsonObject,
} from "@cosmjs/cosmwasm-launchpad";
import { fromAscii, toHex } from "@cosmjs/encoding";
import {
  Block,
  Coin,
  isSearchByHeightQuery,
  isSearchBySentFromOrToQuery,
  isSearchByTagsQuery,
  SearchTxFilter,
  SearchTxQuery,
} from "@cosmjs/launchpad";
import { Uint53 } from "@cosmjs/math";
import {
  Account,
  accountFromProto,
  AuthExtension,
  BankExtension,
  BroadcastTxResponse,
  codec,
  coinFromProto,
  IndexedTx,
  QueryClient,
  SequenceResponse,
  setupAuthExtension,
  setupBankExtension,
} from "@cosmjs/stargate";
import {
  adaptor34,
  broadcastTxCommitSuccess,
  Client as TendermintClient,
  DateTime,
} from "@cosmjs/tendermint-rpc";
import { assert } from "@cosmjs/utils";

import { cosmwasm } from "./codec";
import { setupWasmExtension, WasmExtension } from "./queries";

type ICodeInfoResponse = cosmwasm.wasm.v1beta1.ICodeInfoResponse;
type ContractCodeHistoryOperationType = cosmwasm.wasm.v1beta1.ContractCodeHistoryOperationType;

const { TxMsgData } = codec.cosmos.base.abci.v1beta1;
const { ContractCodeHistoryOperationType } = cosmwasm.wasm.v1beta1;

/** Use for testing only */
export interface PrivateCosmWasmClient {
  readonly tmClient: TendermintClient;
  readonly queryClient: QueryClient & AuthExtension & BankExtension & WasmExtension;
}

export class CosmWasmClient {
  private readonly tmClient: TendermintClient;
  private readonly queryClient: QueryClient & AuthExtension & BankExtension & WasmExtension;
  private readonly codesCache = new Map<number, CodeDetails>();
  private chainId: string | undefined;

  public static async connect(endpoint: string): Promise<CosmWasmClient> {
    const tmClient = await TendermintClient.connect(endpoint, adaptor34);
    return new CosmWasmClient(tmClient);
  }

  protected constructor(tmClient: TendermintClient) {
    this.tmClient = tmClient;
    this.queryClient = QueryClient.withExtensions(
      tmClient,
      setupAuthExtension,
      setupBankExtension,
      setupWasmExtension,
    );
  }

  public async getChainId(): Promise<string> {
    if (!this.chainId) {
      const response = await this.tmClient.status();
      const chainId = response.nodeInfo.network;
      if (!chainId) throw new Error("Chain ID must not be empty");
      this.chainId = chainId;
    }

    return this.chainId;
  }

  public async getHeight(): Promise<number> {
    const status = await this.tmClient.status();
    return status.syncInfo.latestBlockHeight;
  }

  public async getAccount(searchAddress: string): Promise<Account | null> {
    const account = await this.queryClient.auth.account(searchAddress);
    return account ? accountFromProto(account) : null;
  }

  public async getSequence(address: string): Promise<SequenceResponse | null> {
    const account = await this.getAccount(address);
    if (account) {
      return {
        accountNumber: account.accountNumber,
        sequence: account.sequence,
      };
    } else {
      return null;
    }
  }

  public async getBlock(height?: number): Promise<Block> {
    const response = await this.tmClient.block(height);
    return {
      id: toHex(response.blockId.hash).toUpperCase(),
      header: {
        version: {
          block: new Uint53(response.block.header.version.block).toString(),
          app: new Uint53(response.block.header.version.app).toString(),
        },
        height: response.block.header.height,
        chainId: response.block.header.chainId,
        time: DateTime.encode(response.block.header.time),
      },
      txs: response.block.txs,
    };
  }

  public async getBalance(address: string, searchDenom: string): Promise<Coin | null> {
    const balance = await this.queryClient.bank.balance(address, searchDenom);
    return balance ? coinFromProto(balance) : null;
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
    this.tmClient.disconnect();
  }

  public async broadcastTx(tx: Uint8Array): Promise<BroadcastTxResponse> {
    const response = await this.tmClient.broadcastTxCommit({ tx });
    if (broadcastTxCommitSuccess(response)) {
      return {
        height: response.height,
        transactionHash: toHex(response.hash).toUpperCase(),
        rawLog: response.deliverTx?.log,
        data: response.deliverTx?.data ? TxMsgData.decode(response.deliverTx?.data).data : undefined,
      };
    }
    return response.checkTx.code !== 0
      ? {
          height: response.height,
          code: response.checkTx.code,
          transactionHash: toHex(response.hash).toUpperCase(),
          rawLog: response.checkTx.log,
          data: response.checkTx.data ? TxMsgData.decode(response.checkTx.data).data : undefined,
        }
      : {
          height: response.height,
          code: response.deliverTx?.code,
          transactionHash: toHex(response.hash).toUpperCase(),
          rawLog: response.deliverTx?.log,
          data: response.deliverTx?.data ? TxMsgData.decode(response.deliverTx?.data).data : undefined,
        };
  }

  public async getCodes(): Promise<readonly Code[]> {
    const { codeInfos } = await this.queryClient.unverified.wasm.listCodeInfo();
    return (codeInfos || []).map(
      (entry: ICodeInfoResponse): Code => {
        assert(entry.creator && entry.codeId && entry.dataHash, "entry incomplete");
        return {
          id: entry.codeId.toNumber(),
          creator: entry.creator,
          checksum: toHex(entry.dataHash),
          source: entry.source || undefined,
          builder: entry.builder || undefined,
        };
      },
    );
  }

  public async getCodeDetails(codeId: number): Promise<CodeDetails> {
    const cached = this.codesCache.get(codeId);
    if (cached) return cached;

    const { codeInfo, data } = await this.queryClient.unverified.wasm.getCode(codeId);
    assert(
      codeInfo && codeInfo.codeId && codeInfo.creator && codeInfo.dataHash && data,
      "codeInfo missing or incomplete",
    );
    const codeDetails: CodeDetails = {
      id: codeInfo.codeId.toNumber(),
      creator: codeInfo.creator,
      checksum: toHex(codeInfo.dataHash),
      source: codeInfo.source || undefined,
      builder: codeInfo.builder || undefined,
      data: data,
    };
    this.codesCache.set(codeId, codeDetails);
    return codeDetails;
  }

  public async getContracts(codeId: number): Promise<readonly Contract[]> {
    const { contractInfos } = await this.queryClient.unverified.wasm.listContractsByCodeId(codeId);
    return (contractInfos || []).map(
      ({ address, contractInfo }): Contract => {
        assert(address, "address missing");
        assert(
          contractInfo && contractInfo.codeId && contractInfo.creator && contractInfo.label,
          "contractInfo missing or incomplete",
        );
        return {
          address: address,
          codeId: contractInfo.codeId.toNumber(),
          creator: contractInfo.creator,
          admin: contractInfo.admin || undefined,
          label: contractInfo.label,
        };
      },
    );
  }

  /**
   * Throws an error if no contract was found at the address
   */
  public async getContract(address: string): Promise<Contract> {
    const {
      address: retrievedAddress,
      contractInfo,
    } = await this.queryClient.unverified.wasm.getContractInfo(address);
    if (!contractInfo) throw new Error(`No contract found at address "${address}"`);
    assert(retrievedAddress, "address missing");
    assert(contractInfo.codeId && contractInfo.creator && contractInfo.label, "contractInfo incomplete");
    return {
      address: retrievedAddress,
      codeId: contractInfo.codeId.toNumber(),
      creator: contractInfo.creator,
      admin: contractInfo.admin || undefined,
      label: contractInfo.label,
    };
  }

  /**
   * Throws an error if no contract was found at the address
   */
  public async getContractCodeHistory(address: string): Promise<readonly ContractCodeHistoryEntry[]> {
    const result = await this.queryClient.unverified.wasm.getContractCodeHistory(address);
    if (!result) throw new Error(`No contract history found for address "${address}"`);
    const operations: Record<number, "Init" | "Genesis" | "Migrate"> = {
      [ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT]: "Init",
      [ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS]: "Genesis",
      [ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE]: "Migrate",
    };
    return (result.entries || []).map(
      (entry): ContractCodeHistoryEntry => {
        assert(entry.operation && entry.codeId && entry.msg);
        return {
          operation: operations[entry.operation],
          codeId: entry.codeId.toNumber(),
          msg: JSON.parse(fromAscii(entry.msg)),
        };
      },
    );
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

    const { data } = await this.queryClient.unverified.wasm.queryContractRaw(address, key);
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
      return await this.queryClient.unverified.wasm.queryContractSmart(address, queryMsg);
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
    const results = await this.tmClient.txSearchAll({ query: query });
    return results.txs.map((tx) => {
      return {
        height: tx.height,
        hash: toHex(tx.hash).toUpperCase(),
        code: tx.result.code,
        rawLog: tx.result.log || "",
        tx: tx.tx,
      };
    });
  }
}
