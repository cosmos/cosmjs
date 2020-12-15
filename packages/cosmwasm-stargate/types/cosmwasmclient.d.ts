import { Code, CodeDetails, Contract, ContractCodeHistoryEntry, JsonObject } from "@cosmjs/cosmwasm";
import { Block, Coin, SearchTxFilter, SearchTxQuery } from "@cosmjs/launchpad";
import {
  Account,
  AuthExtension,
  BankExtension,
  BroadcastTxResponse,
  IndexedTx,
  QueryClient,
  SequenceResponse,
} from "@cosmjs/stargate";
import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";
import { WasmExtension } from "./queries";
/** Use for testing only */
export interface PrivateCosmWasmClient {
  readonly tmClient: TendermintClient;
  readonly queryClient: QueryClient & AuthExtension & BankExtension & WasmExtension;
}
export declare class CosmWasmClient {
  private readonly tmClient;
  private readonly queryClient;
  private readonly codesCache;
  private chainId;
  static connect(endpoint: string): Promise<CosmWasmClient>;
  protected constructor(tmClient: TendermintClient);
  getChainId(): Promise<string>;
  getHeight(): Promise<number>;
  getAccount(searchAddress: string): Promise<Account | null>;
  getSequence(address: string): Promise<SequenceResponse | null>;
  getBlock(height?: number): Promise<Block>;
  getBalance(address: string, searchDenom: string): Promise<Coin | null>;
  getTx(id: string): Promise<IndexedTx | null>;
  searchTx(query: SearchTxQuery, filter?: SearchTxFilter): Promise<readonly IndexedTx[]>;
  disconnect(): void;
  broadcastTx(tx: Uint8Array): Promise<BroadcastTxResponse>;
  getCodes(): Promise<readonly Code[]>;
  getCodeDetails(codeId: number): Promise<CodeDetails>;
  getContracts(codeId: number): Promise<readonly Contract[]>;
  /**
   * Throws an error if no contract was found at the address
   */
  getContract(address: string): Promise<Contract>;
  /**
   * Throws an error if no contract was found at the address
   */
  getContractCodeHistory(address: string): Promise<readonly ContractCodeHistoryEntry[]>;
  /**
   * Returns the data at the key if present (raw contract dependent storage data)
   * or null if no data at this key.
   *
   * Promise is rejected when contract does not exist.
   */
  queryContractRaw(address: string, key: Uint8Array): Promise<Uint8Array | null>;
  /**
   * Makes a smart query on the contract, returns the parsed JSON document.
   *
   * Promise is rejected when contract does not exist.
   * Promise is rejected for invalid query format.
   * Promise is rejected for invalid response format.
   */
  queryContractSmart(address: string, queryMsg: Record<string, unknown>): Promise<JsonObject>;
  private txsQuery;
}
