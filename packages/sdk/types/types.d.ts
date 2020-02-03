export interface Tx {
  type: string;
  value: any;
}
export interface StdTx {
  readonly msg: ReadonlyArray<Msg>;
  readonly fee: StdFee;
  readonly signatures: ReadonlyArray<StdSignature>;
  readonly memo: string | undefined;
}
export interface Msg {
  type: string;
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
  denom: string;
  amount: string;
}
export interface StdSignature {
  pub_key: PubKey;
  signature: string;
}
export interface PubKey {
  /** Amino registered name, e.g. `"tendermint/PubKeySecp256k1"` */
  type: string;
  /** Base64-encoded key bytes */
  value: string;
}
export declare type AminoTx = Tx & {
  readonly value: StdTx;
};
export declare function isAminoStdTx(txValue: unknown): txValue is StdTx;
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
