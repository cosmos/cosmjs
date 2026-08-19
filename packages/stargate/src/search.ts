/** A comparison operator for range queries against a composite key */
export type SearchPairOperator = "=" | ">" | ">=" | "<" | "<=";

/** A key value pair for searching transactions */
export interface SearchPair {
  readonly key: string;
  readonly value: string | number | bigint;
  /**
   * The comparison operator to apply between `key` and `value`. Defaults to
   * `=` (equality) when omitted, which matches the behaviour of every
   * `SearchPair` created before this field existed.
   *
   * Combine multiple `SearchPair`s with `>`/`>=`/`<`/`<=` on the same key to
   * express range queries, e.g. `tx.height > 5 AND tx.height <= 10`.
   *
   * The CometBFT query grammar only accepts ordering operators (`>`, `>=`,
   * `<`, `<=`) against number, date or time operands. A generic (non-date)
   * string `value` combined with an ordering operator will be rejected by the
   * node's query parser at request time; only use ordering operators with
   * numeric or date/time values.
   */
  readonly operator?: SearchPairOperator;
}

/**
 * This query type allows you to pass arbitrary key/value pairs to the backend.
 */
export type SearchTxQuery = string | readonly SearchPair[];

export function isSearchTxQueryArray(query: SearchTxQuery): query is readonly SearchPair[] {
  return Array.isArray(query);
}

/**
 * Turns an array of {@link SearchPair}s into the raw Tendermint/CometBFT query
 * string sent to the RPC, e.g. `tx.height>5`. A pair without an explicit
 * `operator` defaults to `=`.
 */
export function searchPairsToQueryString(pairs: readonly SearchPair[]): string {
  return pairs
    .map((pair) => {
      const operator = pair.operator ?? "=";
      // numeric values must not have quotes https://github.com/cosmos/cosmjs/issues/1462
      if (typeof pair.value === "string") return `${pair.key}${operator}'${pair.value}'`;
      else return `${pair.key}${operator}${pair.value}`;
    })
    .join(" AND ");
}
