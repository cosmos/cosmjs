import { LcdClient } from "@cosmjs/launchpad";
import { JsonObject, Model } from "../types";
export interface CodeInfo {
  readonly id: number;
  /** Bech32 account address */
  readonly creator: string;
  /** Hex-encoded sha256 hash of the code stored here */
  readonly data_hash: string;
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
export interface CodeDetails extends CodeInfo {
  /** Base64 encoded raw wasm data */
  readonly data: string;
}
export interface ContractInfo {
  readonly address: string;
  readonly code_id: number;
  /** Bech32 account address */
  readonly creator: string;
  /** Bech32-encoded admin address */
  readonly admin?: string;
  readonly label: string;
}
export interface ContractCodeHistoryEntry {
  readonly operation: string;
  readonly code_id: number;
  readonly msg: object;
}
/**
 * @see https://github.com/cosmwasm/wasmd/blob/master/x/wasm/client/rest/query.go#L19-L27
 */
export interface WasmExtension {
  readonly wasm: {
    readonly listCodeInfo: () => Promise<readonly CodeInfo[]>;
    /**
     * Downloads the original wasm bytecode by code ID.
     *
     * Throws an error if no code with this id
     */
    readonly getCode: (id: number) => Promise<CodeDetails>;
    readonly listContractsByCodeId: (id: number) => Promise<readonly ContractInfo[]>;
    /**
     * Returns null when contract was not found at this address.
     */
    readonly getContractInfo: (address: string) => Promise<ContractInfo | null>;
    /**
     * Returns all contract state.
     * This is an empty array if no such contract, or contract has no data.
     */
    readonly getAllContractState: (address: string) => Promise<readonly Model[]>;
    /**
     * Returns the data at the key if present (unknown decoded json),
     * or null if no data at this (contract address, key) pair
     */
    readonly queryContractRaw: (address: string, key: Uint8Array) => Promise<Uint8Array | null>;
    /**
     * Makes a smart query on the contract and parses the response as JSON.
     * Throws error if no such contract exists, the query format is invalid or the response is invalid.
     */
    readonly queryContractSmart: (address: string, query: object) => Promise<JsonObject>;
    /**
     * Returns null when contract history was not found for this address.
     */
    readonly getContractCodeHistory: (address: string) => Promise<ContractCodeHistoryEntry[] | null>;
  };
}
export declare function setupWasmExtension(base: LcdClient): WasmExtension;
