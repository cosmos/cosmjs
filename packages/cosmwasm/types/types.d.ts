import { Coin } from "@cosmwasm/sdk38";
import { Msg } from "./msgs";
/** An Amino/Cosmos SDK StdTx */
export interface StdTx {
  readonly msg: ReadonlyArray<Msg>;
  readonly fee: StdFee;
  readonly signatures: ReadonlyArray<StdSignature>;
  readonly memo: string | undefined;
}
export declare function isStdTx(txValue: unknown): txValue is StdTx;
export interface CosmosSdkTx {
  readonly type: string;
  readonly value: StdTx;
}
export interface StdFee {
  readonly amount: ReadonlyArray<Coin>;
  readonly gas: string;
}
export interface StdSignature {
  readonly pub_key: PubKey;
  readonly signature: string;
}
export interface PubKey {
  readonly type: string;
  readonly value: string;
}
export declare const pubkeyType: {
  /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/ed25519/ed25519.go#L22 */
  secp256k1: "tendermint/PubKeySecp256k1";
  /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/secp256k1/secp256k1.go#L23 */
  ed25519: "tendermint/PubKeyEd25519";
  /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/sr25519/codec.go#L12 */
  sr25519: "tendermint/PubKeySr25519";
};
export declare const pubkeyTypes: readonly string[];
export interface WasmData {
  readonly key: string;
  readonly val: string;
}
export interface Model {
  readonly key: Uint8Array;
  readonly val: Uint8Array;
}
export declare function parseWasmData({ key, val }: WasmData): Model;
/**
 * An object containing a parsed JSON document. The result of JSON.parse().
 * This doen't privide any type safety over `any` but expresses intent in the code.
 */
export declare type JsonObject = any;
