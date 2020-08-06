import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";

export class StargateClient {
  private readonly tmClient: TendermintClient;

  public static async connect(endpoint: string): Promise<StargateClient> {
    const tmClient = await TendermintClient.connect(endpoint);
    return new StargateClient(tmClient);
  }

  private constructor(tmClient: TendermintClient) {
    this.tmClient = tmClient;
  }

  public disconnect(): void {
    this.tmClient.disconnect();
  }
}
