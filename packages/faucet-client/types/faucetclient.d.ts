export declare class FaucetClient {
  private readonly baseUrl;
  constructor(baseUrl: string);
  credit(address: string, denom: string): Promise<void>;
}
