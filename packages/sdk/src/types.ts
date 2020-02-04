// We will move all needed *interfaces* from amino-js here
// This means bcp can just import them from here (if needed at all)
export interface Tx {
  readonly type: string;
  // TODO
  readonly value: unknown;
}

export interface StdTx {
  readonly msg: ReadonlyArray<Msg>;
  readonly fee: StdFee;
  readonly signatures: ReadonlyArray<StdSignature>;
  readonly memo: string | undefined;
}

export type AminoTx = Tx & { readonly value: StdTx };

export function isAminoStdTx(txValue: unknown): txValue is StdTx {
  const { memo, msg, fee, signatures } = txValue as StdTx;
  return (
    typeof memo === "string" && Array.isArray(msg) && typeof fee === "object" && Array.isArray(signatures)
  );
}

interface MsgTemplate {
  readonly type: string;
  readonly value: object;
}

export interface ValueSend {
  /** Bech32 account address */
  readonly from_address: string;
  /** Bech32 account address */
  readonly to_address: string;
  readonly amount: ReadonlyArray<Coin>;
}

export interface MsgSend extends MsgTemplate {
  readonly type: "cosmos-sdk/MsgSend";
  readonly value: ValueSend;
}

export interface ValueStoreCode {
  /** Bech32 account address */
  readonly sender: string;
  /** Base64 encoded Wasm */
  readonly wasm_byte_code: string;
  /** A valid URI reference to the contract's source code, optional */
  readonly source?: string;
  /** A docker tag, optional */
  readonly builder?: string;
}

export interface MsgStoreCode extends MsgTemplate {
  readonly type: "wasm/store-code";
  readonly value: ValueStoreCode;
}

export interface ValueInstantiateContract {
  /** Bech32 account address */
  readonly sender: string;
  /** ID of the Wasm code that was uploaded before */
  readonly code_id: string;
  /** Init message as JavaScript object */
  readonly init_msg: object;
  readonly init_funds: ReadonlyArray<Coin>;
}

export interface MsgInstantiateContract extends MsgTemplate {
  readonly type: "wasm/instantiate";
  readonly value: ValueInstantiateContract;
}

export type Msg = MsgSend | MsgStoreCode | MsgInstantiateContract | MsgTemplate;

export function isMsgSend(msg: Msg): msg is MsgSend {
  return (msg as MsgSend).type === "cosmos-sdk/MsgSend";
}

export function isMsgStoreCode(msg: Msg): msg is MsgStoreCode {
  return (msg as MsgStoreCode).type === "wasm/store-code";
}

export function isMsgInstantiateContract(msg: Msg): msg is MsgInstantiateContract {
  return (msg as MsgInstantiateContract).type === "wasm/instantiate";
}

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

// value field is base64-encoded in all cases
export type PubKey = PubKeyEd25519 | PubKeySecp256k1 | PubKeySr25519;

export interface PubKeySecp256k1 {
  readonly type: "tendermint/PubKeySecp256k1";
  // Note: this contains a Secp256k1 COMPRESSED pubkey - to encode from bcp/keycontrol land, you must compress it first
  readonly value: string;
}

export interface PubKeyEd25519 {
  readonly type: "tendermint/PubKeyEd25519";
  readonly value: string;
}

export interface PubKeySr25519 {
  readonly type: "tendermint/PubKeySr25519";
  readonly value: string;
}

// Bech32PubKey is bech32-encoded amino-binary encoded PubKey interface. oof.
export type Bech32PubKey = string;

export interface BaseAccount {
  /** Bech32 account address */
  readonly address: string;
  readonly coins: ReadonlyArray<Coin>;
  readonly public_key: Bech32PubKey;
  readonly account_number: number;
  readonly sequence: number;
}

/** The data we need from BaseAccount to create a nonce */
export type NonceInfo = Pick<BaseAccount, "account_number" | "sequence">;
