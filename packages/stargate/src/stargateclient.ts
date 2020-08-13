/* eslint-disable @typescript-eslint/naming-convention */
import { Bech32, toAscii, toHex } from "@cosmjs/encoding";
import {
  Block,
  Coin,
  decodeAminoPubkey,
  isSearchByHeightQuery,
  isSearchByIdQuery,
  PubKey,
  SearchTxFilter,
  SearchTxQuery,
} from "@cosmjs/launchpad";
import { Uint53, Uint64 } from "@cosmjs/math";
import { decodeAny } from "@cosmjs/proto-signing";
import { broadcastTxCommitSuccess, Client as TendermintClient, QueryString } from "@cosmjs/tendermint-rpc";
import { arrayContentEquals, assert, assertDefined } from "@cosmjs/utils";
import Long from "long";

import { cosmos } from "./generated/codecimpl";

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
  readonly data?: Uint8Array;
}

export interface BroadcastTxSuccess {
  readonly height: number;
  readonly transactionHash: string;
  readonly rawLog?: string;
  readonly data?: Uint8Array;
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

function uint64FromProto(input: number | Long): Uint64 {
  return Uint64.fromString(input.toString());
}

function decodeBaseAccount(data: Uint8Array, prefix: string): Account {
  const { address, pubKey, accountNumber, sequence } = cosmos.auth.BaseAccount.decode(data);
  // Pubkey is still Amino-encoded in BaseAccount (https://github.com/cosmos/cosmos-sdk/issues/6886)
  const pubkey = pubKey.length ? decodeAminoPubkey(pubKey) : null;
  return {
    address: Bech32.encode(prefix, address),
    pubkey: pubkey,
    accountNumber: uint64FromProto(accountNumber).toNumber(),
    sequence: uint64FromProto(sequence).toNumber(),
  };
}

function coinFromProto(input: cosmos.ICoin): Coin {
  assertDefined(input.amount);
  assertDefined(input.denom);
  assert(input.amount !== null);
  assert(input.denom !== null);
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
  private chainId: string | undefined;

  public static async connect(endpoint: string): Promise<StargateClient> {
    const tmClient = await TendermintClient.connect(endpoint);
    return new StargateClient(tmClient);
  }

  private constructor(tmClient: TendermintClient) {
    this.tmClient = tmClient;
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
    const { prefix, data: binAddress } = Bech32.decode(searchAddress);
    // https://github.com/cosmos/cosmos-sdk/blob/8cab43c8120fec5200c3459cbf4a92017bb6f287/x/auth/types/keys.go#L29-L32
    const accountKey = Uint8Array.from([0x01, ...binAddress]);
    const responseData = await this.queryVerified("acc", accountKey);

    if (responseData.length === 0) return null;

    const { typeUrl, value } = decodeAny(responseData);
    switch (typeUrl) {
      case "/cosmos.auth.BaseAccount": {
        return decodeBaseAccount(value, prefix);
      }
      default:
        throw new Error(`Unsupported type: '${typeUrl}'`);
    }
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
        time: response.block.header.time.toISOString(),
      },
      txs: response.block.txs,
    };
  }

  public async getBalance(address: string, searchDenom: string): Promise<Coin | null> {
    // balance key is a bit tricker, using some prefix stores
    // https://github.com/cosmwasm/cosmos-sdk/blob/80f7ff62f79777a487d0c7a53c64b0f7e43c47b9/x/bank/keeper/view.go#L74-L77
    // ("balances", binAddress, denom)
    // it seem like prefix stores just do a dumb concat with the keys (no tricks to avoid overlap)
    // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L61-L64
    // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L37-L43
    const binAddress = Bech32.decode(address).data;
    const bankKey = Uint8Array.from([...toAscii("balances"), ...binAddress, ...toAscii(searchDenom)]);

    const responseData = await this.queryVerified("bank", bankKey);
    const { amount, denom } = cosmos.Coin.decode(responseData);
    if (denom === "") {
      return null;
    } else {
      return {
        amount: amount,
        denom: denom,
      };
    }
  }

  /**
   * Queries all balances for all denoms that belong to this address.
   *
   * Uses the grpc queries (which iterates over the store internally), and we cannot get
   * proofs from such a method.
   */
  public async getAllBalancesUnverified(address: string): Promise<readonly Coin[]> {
    const path = "/cosmos.bank.Query/AllBalances";
    const request = cosmos.bank.QueryAllBalancesRequest.encode({
      address: Bech32.decode(address).data,
    }).finish();
    const responseData = await this.queryUnverified(path, request);
    const response = cosmos.bank.QueryAllBalancesResponse.decode(responseData);
    return response.balances.map(coinFromProto);
  }

  public async searchTx(query: SearchTxQuery, filter: SearchTxFilter = {}): Promise<readonly IndexedTx[]> {
    const minHeight = filter.minHeight || 0;
    const maxHeight = filter.maxHeight || Number.MAX_SAFE_INTEGER;

    if (maxHeight < minHeight) return []; // optional optimization

    let txs: readonly IndexedTx[];

    if (isSearchByIdQuery(query)) {
      txs = await this.txsQuery(`tx.hash='${query.id}'`);
    } else if (isSearchByHeightQuery(query)) {
      txs =
        query.height >= minHeight && query.height <= maxHeight
          ? await this.txsQuery(`tx.height=${query.height}`)
          : [];
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
        data: response.deliverTx?.data,
      };
    }
    return response.checkTx.code !== 0
      ? {
          height: response.height,
          code: response.checkTx.code,
          transactionHash: toHex(response.hash).toUpperCase(),
          rawLog: response.checkTx.log,
          data: response.checkTx.data,
        }
      : {
          height: response.height,
          code: response.deliverTx?.code,
          transactionHash: toHex(response.hash).toUpperCase(),
          rawLog: response.deliverTx?.log,
          data: response.deliverTx?.data,
        };
  }

  private async queryVerified(store: string, key: Uint8Array): Promise<Uint8Array> {
    const response = await this.tmClient.abciQuery({
      // we need the StoreKey for the module, not the module name
      // https://github.com/cosmos/cosmos-sdk/blob/8cab43c8120fec5200c3459cbf4a92017bb6f287/x/auth/types/keys.go#L12
      path: `/store/${store}/key`,
      data: key,
      prove: true,
    });

    if (response.code) {
      throw new Error(`Query failed with (${response.code}): ${response.log}`);
    }

    if (!arrayContentEquals(response.key, key)) {
      throw new Error(`Response key ${toHex(response.key)} doesn't match query key ${toHex(key)}`);
    }

    // TODO: implement proof verification
    // https://github.com/CosmWasm/cosmjs/issues/347

    return response.value;
  }

  private async queryUnverified(path: string, request: Uint8Array): Promise<Uint8Array> {
    const response = await this.tmClient.abciQuery({
      path: path,
      data: request,
      prove: false,
    });

    if (response.code) {
      throw new Error(`Query failed with (${response.code}): ${response.log}`);
    }

    return response.value;
  }

  private async txsQuery(query: string): Promise<readonly IndexedTx[]> {
    const params = {
      query: query as QueryString,
    };
    const results = await this.tmClient.txSearchAll(params);
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
