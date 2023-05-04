export interface SearchByHeightQuery {
  readonly height: number;
}

export interface SearchBySentFromOrToQuery {
  readonly sentFromOrTo: string;
}

/**
 * This query type allows you to pass arbitrary key/value pairs to the backend.
 */
export type SearchTxQuery =
  | string
  | ReadonlyArray<{
      readonly key: string;
      readonly value: string;
    }>;
