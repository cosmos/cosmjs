export declare class StargateClient {
  private readonly tmClient;
  static connect(endpoint: string): Promise<StargateClient>;
  private constructor();
  disconnect(): void;
}
