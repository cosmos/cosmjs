/* eslint-disable @typescript-eslint/naming-convention */
import { addCoins } from "@cosmjs/amino";
import { CometClient, connectComet, HttpEndpoint } from "@cosmjs/tendermint-rpc";
import { assert } from "@cosmjs/utils";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { QueryDelegatorDelegationsResponse } from "cosmjs-types/cosmos/staking/v1beta1/query";
import { DelegationResponse } from "cosmjs-types/cosmos/staking/v1beta1/staking";

import { Account, AccountParser } from "./accounts";
import { Block, Client, DeliverTxResponse, IndexedTx, SequenceResponse } from "./client";
import {
  AuthExtension,
  BankExtension,
  setupAuthExtension,
  setupBankExtension,
  setupStakingExtension,
  setupTxExtension,
  StakingExtension,
  TxExtension,
} from "./modules";
import { QueryClient } from "./queryclient";
import { SearchTxQuery } from "./search";

/** Use for testing only */
export interface PrivateStargateClient {
  readonly client: {
    readonly cometClient: CometClient | undefined;
  };
}

export interface StargateClientOptions {
  readonly accountParser?: AccountParser;
}

export class StargateClient {
  private readonly client: Client;

  /** We maintain out own query client since the Client instance does not offer what we need here */
  private readonly queryClient:
    | (QueryClient & AuthExtension & BankExtension & StakingExtension & TxExtension)
    | undefined;

  /**
   * Creates an instance by connecting to the given Tendermint RPC endpoint.
   *
   * This uses auto-detection to decide between a Tendermint 0.37 and 0.34 client.
   * To set the Tendermint client explicitly, use `create`.
   */
  public static async connect(
    endpoint: string | HttpEndpoint,
    options: StargateClientOptions = {},
  ): Promise<StargateClient> {
    const cometClient = await connectComet(endpoint);
    return StargateClient.create(cometClient, options);
  }

  /**
   * Creates an instance from a manually created Tendermint client.
   * Use this to use `Tendermint37Client` instead of `Tendermint34Client`.
   */
  public static async create(
    cometClient: CometClient,
    options: StargateClientOptions = {},
  ): Promise<StargateClient> {
    return new StargateClient(cometClient, options);
  }

  protected constructor(cometClient: CometClient | undefined, options: StargateClientOptions) {
    if (cometClient) {
      this.queryClient = QueryClient.withExtensions(
        cometClient,
        setupAuthExtension,
        setupBankExtension,
        setupStakingExtension,
        setupTxExtension,
      );
    }
    this.client = new Client(cometClient, undefined, options);
  }

  protected getTmClient(): CometClient | undefined {
    return this.client.getCometClient();
  }

  protected forceGetTmClient(): CometClient {
    return this.client.forceGetCometClient();
  }

  protected getQueryClient():
    | (QueryClient & AuthExtension & BankExtension & StakingExtension & TxExtension)
    | undefined {
    return this.queryClient;
  }

  protected forceGetQueryClient(): QueryClient &
    AuthExtension &
    BankExtension &
    StakingExtension &
    TxExtension {
    if (!this.queryClient) {
      throw new Error("Query client not available. You cannot use online functionality in offline mode.");
    }
    return this.queryClient;
  }

  public async getChainId(): Promise<string> {
    return this.client.getChainId();
  }

  public async getHeight(): Promise<number> {
    const status = await this.forceGetTmClient().status();
    return status.syncInfo.latestBlockHeight;
  }

  public async getAccount(searchAddress: string): Promise<Account | null> {
    return this.client.getAccount(searchAddress);
  }

  public async getSequence(address: string): Promise<SequenceResponse> {
    return this.client.getSequence(address);
  }

  public async getBlock(height?: number): Promise<Block> {
    return this.client.getBlock(height);
  }

  public async getBalance(address: string, searchDenom: string): Promise<Coin> {
    return this.forceGetQueryClient().bank.balance(address, searchDenom);
  }

  /**
   * Queries all balances for all denoms that belong to this address.
   *
   * Uses the grpc queries (which iterates over the store internally), and we cannot get
   * proofs from such a method.
   */
  public async getAllBalances(address: string): Promise<readonly Coin[]> {
    return this.forceGetQueryClient().bank.allBalances(address);
  }

  public async getBalanceStaked(address: string): Promise<Coin | null> {
    const allDelegations = [];
    let startAtKey: Uint8Array | undefined = undefined;
    do {
      const { delegationResponses, pagination }: QueryDelegatorDelegationsResponse =
        await this.forceGetQueryClient().staking.delegatorDelegations(address, startAtKey);

      const loadedDelegations = delegationResponses || [];
      allDelegations.push(...loadedDelegations);
      startAtKey = pagination?.nextKey;
    } while (startAtKey !== undefined && startAtKey.length !== 0);

    const sumValues = allDelegations.reduce(
      (previousValue: Coin | null, currentValue: DelegationResponse): Coin => {
        // Safe because field is set to non-nullable (https://github.com/cosmos/cosmos-sdk/blob/v0.45.3/proto/cosmos/staking/v1beta1/staking.proto#L295)
        assert(currentValue.balance);
        return previousValue !== null ? addCoins(previousValue, currentValue.balance) : currentValue.balance;
      },
      null,
    );

    return sumValues;
  }

  public async getDelegation(delegatorAddress: string, validatorAddress: string): Promise<Coin | null> {
    let delegatedAmount: Coin | undefined;
    try {
      delegatedAmount = (
        await this.forceGetQueryClient().staking.delegation(delegatorAddress, validatorAddress)
      ).delegationResponse?.balance;
    } catch (e: any) {
      if (e.toString().includes("key not found")) {
        // ignore, `delegatedAmount` remains undefined
      } else {
        throw e;
      }
    }
    return delegatedAmount || null;
  }

  public async getTx(id: string): Promise<IndexedTx | null> {
    return this.client.getTx(id);
  }

  public async searchTx(query: SearchTxQuery): Promise<IndexedTx[]> {
    return this.client.searchTx(query);
  }

  public disconnect(): void {
    this.client.disconnect();
  }

  /**
   * Broadcasts a signed transaction to the network and monitors its inclusion in a block.
   *
   * If broadcasting is rejected by the node for some reason (e.g. because of a CheckTx failure),
   * an error is thrown.
   *
   * If the transaction is not included in a block before the provided timeout, this errors with a `TimeoutError`.
   *
   * If the transaction is included in a block, a `DeliverTxResponse` is returned. The caller then
   * usually needs to check for execution success or failure.
   */
  public async broadcastTx(
    tx: Uint8Array,
    timeoutMs = 60_000,
    pollIntervalMs = 3_000,
  ): Promise<DeliverTxResponse> {
    return this.client.broadcastTx(tx, timeoutMs, pollIntervalMs);
  }

  /**
   * Broadcasts a signed transaction to the network without monitoring it.
   *
   * If broadcasting is rejected by the node for some reason (e.g. because of a CheckTx failure),
   * an error is thrown.
   *
   * If the transaction is broadcasted, a `string` containing the hash of the transaction is returned. The caller then
   * usually needs to check if the transaction was included in a block and was successful.
   *
   * @returns Returns the hash of the transaction
   */
  public async broadcastTxSync(tx: Uint8Array): Promise<string> {
    return this.client.broadcastTxSync(tx);
  }

  private async txsQuery(query: string): Promise<IndexedTx[]> {
    return this.client.txsQuery(query);
  }
}
