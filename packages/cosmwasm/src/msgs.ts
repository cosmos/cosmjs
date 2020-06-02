import { Coin } from "@cosmwasm/sdk38";

interface MsgTemplate {
  readonly type: string;
  readonly value: any;
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
    /** Human-readable label for this contract */
    readonly label: string;
    /** Init message as JavaScript object */
    readonly init_msg: any;
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
    readonly msg: any;
    readonly sent_funds: ReadonlyArray<Coin>;
  };
}

export type Msg = MsgSend | MsgStoreCode | MsgInstantiateContract | MsgExecuteContract | MsgTemplate;

export function isMsgSend(msg: Msg): msg is MsgSend {
  return (msg as MsgSend).type === "cosmos-sdk/MsgSend";
}

export function isMsgStoreCode(msg: Msg): msg is MsgStoreCode {
  return (msg as MsgStoreCode).type === "wasm/store-code";
}

export function isMsgInstantiateContract(msg: Msg): msg is MsgInstantiateContract {
  return (msg as MsgInstantiateContract).type === "wasm/instantiate";
}

export function isMsgExecuteContract(msg: Msg): msg is MsgExecuteContract {
  return (msg as MsgExecuteContract).type === "wasm/execute";
}
