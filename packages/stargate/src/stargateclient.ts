/* eslint-disable @typescript-eslint/naming-convention */
import { toHex } from "@cosmjs/encoding";
import {
  Block,
  isSearchByHeightQuery,
  isSearchBySentFromOrToQuery,
  isSearchByTagsQuery,
  PubKey,
  SearchTxFilter,
  SearchTxQuery,
} from "@cosmjs/launchpad";
import { Uint53, Uint64 } from "@cosmjs/math";
import { decodePubkey } from "@cosmjs/proto-signing";
import {
  adaptor34,
  broadcastTxCommitSuccess,
  Client as TendermintClient,
  DateTime,
} from "@cosmjs/tendermint-rpc";
import { assert, assertDefinedAndNotNull } from "@cosmjs/utils";
import Long from "long";

import { BaseAccount } from "./codec/cosmos/auth/v1beta1/auth";
import { MsgData, TxMsgData } from "./codec/cosmos/base/abci/v1beta1/abci";
import { Coin } from "./codec/cosmos/base/v1beta1/coin";
import { AuthExtension, BankExtension, QueryClient, setupAuthExtension, setupBankExtension } from "./queries";

/** A transaction that is indexed as part of the transaction history */
export interface IndexedTx {
  readonly height: number;
  /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
  readonly hash: string;
  /** Transaction execution error code. 0 on success. */
  readonly code: number;
  readonly rawLog: string;
  readonly tx: Uint8Array;
}

export interface Account {
  /** Bech32 account address */
  readonly address: string;
  readonly pubkey: PubKey | null;
  readonly accountNumber: number;
  readonly sequence: number;
}

export interface SequenceResponse {
  readonly accountNumber: number;
  readonly sequence: number;
}

export interface BroadcastTxFailure {
  readonly height: number;
  readonly code: number;
  readonly transactionHash: string;
  readonly rawLog?: string;
  readonly data?: readonly MsgData[];
}

export interface BroadcastTxSuccess {
  readonly height: number;
  readonly transactionHash: string;
  readonly rawLog?: string;
  readonly data?: readonly MsgData[];
}

export type BroadcastTxResponse = BroadcastTxSuccess | BroadcastTxFailure;

export function isBroadcastTxFailure(result: BroadcastTxResponse): result is BroadcastTxFailure {
  return !!(result as BroadcastTxFailure).code;
}

export function isBroadcastTxSuccess(result: BroadcastTxResponse): result is BroadcastTxSuccess {
  return !isBroadcastTxFailure(result);
}

/**
 * Ensures the given result is a success. Throws a detailed error message otherwise.
 */
export function assertIsBroadcastTxSuccess(
  result: BroadcastTxResponse,
): asserts result is BroadcastTxSuccess {
  if (isBroadcastTxFailure(result)) {
    throw new Error(
      `Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`,
    );
  }
}

function uint64FromProto(input: number | Long | null | undefined): Uint64 {
  if (!input) return Uint64.fromNumber(0);
  return Uint64.fromString(input.toString());
}

export function accountFromProto(input: BaseAccount): Account {
  const { address, pubKey, accountNumber, sequence } = input;
  const pubkey = decodePubkey(pubKey);
  assert(address);
  return {
    address: address,
    pubkey: pubkey,
    accountNumber: uint64FromProto(accountNumber).toNumber(),
    sequence: uint64FromProto(sequence).toNumber(),
  };
}

export function coinFromProto(input: Coin): Coin {
  assertDefinedAndNotNull(input.amount);
  assertDefinedAndNotNull(input.denom);
  return {
    amount: input.amount,
    denom: input.denom,
  };
}

/** Use for testing only */
export interface PrivateStargateClient {
  readonly tmClient: TendermintClient;
}

export class StargateClient {
  private readonly tmClient: TendermintClient;
  private readonly queryClient: QueryClient & AuthExtension & BankExtension;
  private chainId: string | undefined;

  public static async connect(endpoint: string): Promise<StargateClient> {
    const tmClient = await TendermintClient.connect(endpoint, adaptor34);
    return new StargateClient(tmClient);
  }

  protected constructor(tmClient: TendermintClient) {
    this.tmClient = tmClient;
    this.queryClient = QueryClient.withExtensions(tmClient, setupAuthExtension, setupBankExtension);
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

  /**
   * Queries all balances for all denoms that belong to this address.
   *
   * Uses the grpc queries (which iterates over the store internally), and we cannot get
   * proofs from such a method.
   */
  public async getAllBalancesUnverified(address: string): Promise<readonly Coin[]> {
    const balances = await this.queryClient.bank.unverified.allBalances(address);
    return balances.map(coinFromProto);
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
