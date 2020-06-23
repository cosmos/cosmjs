/* eslint-disable @typescript-eslint/naming-convention */
import { Coin } from "./coins";

export interface Msg {
  readonly type: string;
  readonly value: any;
}

/** A Cosmos SDK token transfer message */
export interface MsgSend extends Msg {
  readonly type: "cosmos-sdk/MsgSend";
  readonly value: {
    /** Bech32 account address */
    readonly from_address: string;
    /** Bech32 account address */
    readonly to_address: string;
    readonly amount: ReadonlyArray<Coin>;
  };
}

export function isMsgSend(msg: Msg): msg is MsgSend {
  return (msg as MsgSend).type === "cosmos-sdk/MsgSend";
}

/**
 * A Cosmos SDK MsgDelegate
 *
 * @see https://docs.cosmos.network/master/modules/staking/03_messages.html#msgdelegate
 */
export interface MsgDelegate extends Msg {
  readonly type: "cosmos-sdk/MsgDelegate";
  readonly value: {
    /** Bech32 encoded delegator address */
    readonly delegator_address: string;
    /** Bech32 encoded validator address */
    readonly validator_address: string;
    readonly amount: Coin;
  };
}

export function isMsgDelegate(msg: Msg): msg is MsgDelegate {
  return (msg as MsgDelegate).type === "cosmos-sdk/MsgDelegate";
}
