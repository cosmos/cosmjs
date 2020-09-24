import { WrappedStdTx } from "./tx";
/**
 * Serach for sequence s with `min` <= `s` < `upperBound` to find the sequence that was used to sign the transaction
 *
 * @param tx The signed transaction
 * @param chainId The chain ID for which this transaction was signed
 * @param accountNumber The account number for which this transaction was signed
 * @param upperBound The upper bound for the testing, i.e. sequence must be lower than this value
 * @param min The lowest sequence that is tested
 *
 * @returns the sequence if a match was found and undefined otherwise
 */
export declare function findSequenceForSignedTx(
  tx: WrappedStdTx,
  chainId: string,
  accountNumber: number,
  upperBound: number,
  min?: number,
): Promise<number | undefined>;
