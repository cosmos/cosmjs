import { IntegerString, Base64String } from "./encodings";

export interface AminoTx {
  readonly type: "cosmos-sdk/StdTx";
  readonly value: StdTx;
}

export interface StdTx {
  readonly msg: ReadonlyArray<Msg>;
  readonly fee: StdFee;
  readonly signatures: ReadonlyArray<StdSignature>;
  readonly memo: string;
}

export function isAminoStdTx(txValue: unknown): txValue is StdTx {
  const { memo, msg, fee, signatures } = txValue as StdTx;
  return (
    typeof memo === "string" && Array.isArray(msg) && typeof fee === "object" && Array.isArray(signatures)
  );
}

export function isAminoTx(tx: unknown): tx is AminoTx {
  const { type, value } = tx as AminoTx;
  return type === "cosmos-sdk/StdTx" && isAminoStdTx(value);
}

export type Msg = MsgSendTyped | MsgUnknownTyped;

export interface MsgUnknownTyped {
  readonly type: string;
  readonly value: unknown;
}

export interface MsgSendTyped {
  readonly type: "cosmos-sdk/MsgSend";
  readonly value: MsgSend;
}

export interface MsgSend {
  /** Bech32 account address */
  readonly from_address: string;
  /** Bech32 account address */
  readonly to_address: string;
  readonly amount: ReadonlyArray<Coin>;
}

export interface StdFee {
  readonly amount: ReadonlyArray<Coin>;
  // integer string
  readonly gas: IntegerString;
}

export interface Coin {
  readonly denom: string;
  // integer string
  readonly amount: string;
}

export interface StdSignature {
  readonly pub_key: PubKey;
  readonly signature: Base64String;
}

export interface PubKey {
  readonly type: string;
  readonly value: Base64String;
}

// AccountPubKey is bech32-encoded amino-binary encoded PubKey interface. oof.
// TODO: let's translate
export type AccountPubKey = string;

export interface BaseAccount {
  /** Bech32 account address */
  readonly address: string;
  readonly coins: ReadonlyArray<Coin>;
  readonly public_key: AccountPubKey;
  // both integer strings
  readonly account_number: IntegerString;
  readonly sequence: IntegerString;
}
