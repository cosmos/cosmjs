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
  disconnect(): void;
  private queryVerified;
}
