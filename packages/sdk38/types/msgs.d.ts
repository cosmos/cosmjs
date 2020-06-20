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
export declare function isMsgSend(msg: Msg): msg is MsgSend;
