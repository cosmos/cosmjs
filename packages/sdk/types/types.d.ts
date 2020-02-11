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
interface MsgTemplate {
  readonly type: string;
  readonly value: object;
}
/** A Cosmos SDK token transfer message */
export interface MsgSend extends MsgTemplate {
  readonly type: "cosmos-sdk/MsgSend";
  readonly value: {
    /** Bech32 account address */
    readonly from_address: string;
    /** Bech32 account address */
    readonly to_address: string;
    readonly amount: ReadonlyArray<Coin>;
  };
}
/**
 * Uploads Wam code to the chain
 *
 * @see https://github.com/cosmwasm/wasmd/blob/9842678d89/x/wasm/internal/types/msg.go#L17
 */
export interface MsgStoreCode extends MsgTemplate {
  readonly type: "wasm/store-code";
  readonly value: {
    /** Bech32 account address */
    readonly sender: string;
    /** Base64 encoded Wasm */
    readonly wasm_byte_code: string;
    /** A valid URI reference to the contract's source code. Can be empty. */
    readonly source: string;
    /** A docker tag. Can be empty. */
    readonly builder: string;
  };
}
/**
 * Creates an instance of contract that was uploaded before.
 *
 * @see https://github.com/cosmwasm/wasmd/blob/9842678d89/x/wasm/internal/types/msg.go#L73
 */
export interface MsgInstantiateContract extends MsgTemplate {
  readonly type: "wasm/instantiate";
  readonly value: {
    /** Bech32 account address */
    readonly sender: string;
    /** ID of the Wasm code that was uploaded before */
    readonly code_id: string;
    /** Init message as JavaScript object */
    readonly init_msg: object;
    readonly init_funds: ReadonlyArray<Coin>;
  };
}
/**
 * Creates an instance of contract that was uploaded before.
 *
 * @see https://github.com/cosmwasm/wasmd/blob/9842678d89/x/wasm/internal/types/msg.go#L103
 */
export interface MsgExecuteContract extends MsgTemplate {
  readonly type: "wasm/execute";
  readonly value: {
    /** Bech32 account address */
    readonly sender: string;
    /** Bech32 account address */
    readonly contract: string;
    /** Handle message as JavaScript object */
    readonly msg: object;
    readonly sent_funds: ReadonlyArray<Coin>;
  };
}
export declare type Msg = MsgSend | MsgStoreCode | MsgInstantiateContract | MsgExecuteContract | MsgTemplate;
export declare function isMsgSend(msg: Msg): msg is MsgSend;
export declare function isMsgStoreCode(msg: Msg): msg is MsgStoreCode;
export declare function isMsgInstantiateContract(msg: Msg): msg is MsgInstantiateContract;
export declare function isMsgExecuteContract(msg: Msg): msg is MsgExecuteContract;
export interface StdFee {
  readonly amount: ReadonlyArray<Coin>;
  readonly gas: string;
}
export interface Coin {
  readonly denom: string;
  readonly amount: string;
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
export declare type Bech32PubKey = string;
export interface CosmosSdkAccount {
  /** Bech32 account address */
  readonly address: string;
  readonly coins: ReadonlyArray<Coin>;
  readonly public_key: Bech32PubKey;
  readonly account_number: number;
  readonly sequence: number;
}
export interface CodeInfo {
  readonly id: number;
  /** Bech32 account address */
  readonly creator: string;
  /** Hex-encoded sha256 hash of the code stored here */
  readonly code_hash: string;
  readonly source?: string;
  readonly builder?: string;
}
export interface CodeDetails {
  readonly code: string;
}
export interface ContractInfo {
  readonly code_id: number;
  /** Bech32 account address */
  readonly creator: string;
  /** Argument passed on initialization of the contract */
  readonly init_msg: object;
}
export interface WasmData {
  readonly key: string;
  readonly val: string;
}
export interface Model {
  readonly key: Uint8Array;
  readonly val: Uint8Array;
}
export declare function parseWasmData({ key, val }: WasmData): Model;
export {};
