/**
 * This query type allows you to pass arbitrary key/value pairs to the backend.
 */
export type SearchTxQuery =
  | string
  | ReadonlyArray<{
      readonly key: string;
      readonly value: string;
    }>;
