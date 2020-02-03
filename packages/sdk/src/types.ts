// We will move all needed *interfaces* from amino-js here
// This means bcp can just import them from here (if needed at all)
export interface Tx {
  readonly type: string;
  // TODO
  readonly value: any;
}

export interface StdTx {
  readonly msg: ReadonlyArray<Msg>;
  readonly fee: StdFee;
  readonly signatures: ReadonlyArray<StdSignature>;
  readonly memo: string | undefined;
}

export interface Msg {
  readonly type: string;
  // TODO: make better union type
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

// AccountPubKey is bech32-encoded amino-binary encoded PubKey interface. oof.
export type AccountPubKey = string;

export interface BaseAccount {
  /** Bech32 account address */
  readonly address: string;
  readonly coins: ReadonlyArray<Coin>;
  readonly public_key: AccountPubKey;
  readonly account_number: string;
  readonly sequence: string;
}

export type AminoTx = Tx & { readonly value: StdTx };

export function isAminoStdTx(txValue: unknown): txValue is StdTx {
  const { memo, msg, fee, signatures } = txValue as StdTx;
  return (
    typeof memo === "string" && Array.isArray(msg) && typeof fee === "object" && Array.isArray(signatures)
  );
}

export interface TokenInfo {
  readonly denom: string;
  readonly ticker: string;
  /**
   * The number of fractional digits the token supports.
   *
   * A quantity is expressed as atomic units. 10^fractionalDigits of those
   * atomic units make up 1 token.
   *
   * E.g. in Ethereum 10^18 wei are 1 ETH and from the quantity 123000000000000000000
   * the last 18 digits are the fractional part and the rest the wole part.
   */
  readonly fractionalDigits: number;
}
