import { Coin } from "@cosmjs/launchpad";
export interface GetSequenceResult {
  readonly accountNumber: number;
  readonly sequence: number;
}
export declare class StargateClient {
  private readonly tmClient;
  static connect(endpoint: string): Promise<StargateClient>;
  private constructor();
  getSequence(address: string): Promise<GetSequenceResult>;
  getBalance(address: string, searchDenom: string): Promise<Coin | null>;
  /**
   * Queries all balances for all denoms that belong to this address.
   *
   * Uses the grpc queries (which iterates over the store internally), and we cannot get
   * proofs from such a method.
   */
  getUnverifiedAllBalances(address: string): Promise<readonly Coin[]>;
  disconnect(): void;
  private queryVerified;
  private queryUnverified;
}
