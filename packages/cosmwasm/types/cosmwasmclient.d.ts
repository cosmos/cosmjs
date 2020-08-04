import {
  AuthExtension,
  BroadcastMode,
  BroadcastTxResult,
  Coin,
  CosmosSdkTx,
  IndexedTx,
  LcdClient,
  PubKey,
  StdTx,
} from "@cosmjs/launchpad";
import { WasmExtension } from "./lcdapi/wasm";
import { JsonObject } from "./types";
export interface GetSequenceResult {
  readonly accountNumber: number;
  readonly sequence: number;
}
export interface Account {
  /** Bech32 account address */
  readonly address: string;
  readonly balance: readonly Coin[];
  readonly pubkey: PubKey | undefined;
  readonly accountNumber: number;
  readonly sequence: number;
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
  readonly tags: ReadonlyArray<{
    readonly key: string;
    readonly value: string;
  }>;
}
export declare type SearchTxQuery =
  | SearchByIdQuery
  | SearchByHeightQuery
  | SearchBySentFromOrToQuery
  | SearchByTagsQuery;
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
  /**
   * An URL to a .tar.gz archive of the source code of the contract, which can be used to reproducibly build the Wasm bytecode.
   *
   * @see https://github.com/CosmWasm/cosmwasm-verify
   */
  readonly source?: string;
  /**
   * A docker image (including version) to reproducibly build the Wasm bytecode from the source code.
   *
   * @example ```cosmwasm/rust-optimizer:0.8.0```
   * @see https://github.com/CosmWasm/cosmwasm-verify
   */
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
  /** Bech32-encoded admin address */
  readonly admin: string | undefined;
  readonly label: string;
}
export interface ContractCodeHistoryEntry {
  /** The source of this history entry */
  readonly operation: "Genesis" | "Init" | "Migrate";
  readonly codeId: number;
  readonly msg: Record<string, unknown>;
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
  readonly txs: readonly Uint8Array[];
}
/** Use for testing only */
export interface PrivateCosmWasmClient {
  readonly lcdClient: LcdClient & AuthExtension & WasmExtension;
}
export declare class CosmWasmClient {
  protected readonly lcdClient: LcdClient & AuthExtension & WasmExtension;
  /** Any address the chain considers valid (valid bech32 with proper prefix) */
  protected anyValidAddress: string | undefined;
  private readonly codesCache;
  private chainId;
  /**
   * Creates a new client to interact with a CosmWasm blockchain.
   *
   * This instance does a lot of caching. In order to benefit from that you should try to use one instance
   * for the lifetime of your application. When switching backends, a new instance must be created.
   *
   * @param apiUrl The URL of a Cosmos SDK light client daemon API (sometimes called REST server or REST API)
   * @param broadcastMode Defines at which point of the transaction processing the broadcastTx method returns
   */
  constructor(apiUrl: string, broadcastMode?: BroadcastMode);
  getChainId(): Promise<string>;
  getHeight(): Promise<number>;
  /**
   * Returns a 32 byte upper-case hex transaction hash (typically used as the transaction ID)
   */
  getIdentifier(tx: CosmosSdkTx): Promise<string>;
  /**
   * Returns account number and sequence.
   *
   * Throws if the account does not exist on chain.
   *
   * @param address returns data for this address. When unset, the client's sender adddress is used.
   */
  getSequence(address: string): Promise<GetSequenceResult>;
  getAccount(address: string): Promise<Account | undefined>;
  /**
   * Gets block header and meta
   *
   * @param height The height of the block. If undefined, the latest height is used.
   */
  getBlock(height?: number): Promise<Block>;
  searchTx(query: SearchTxQuery, filter?: SearchTxFilter): Promise<readonly IndexedTx[]>;
  broadcastTx(tx: StdTx): Promise<BroadcastTxResult>;
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
