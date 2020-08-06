/* eslint-disable @typescript-eslint/naming-convention */
import { Bech32 } from "@cosmjs/encoding";
import { BaseAccount, decodeAny } from "@cosmjs/proto-signing";
import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";
import { assert } from "@cosmjs/utils";

export interface GetSequenceResult {
  readonly accountNumber: number;
  readonly sequence: number;
}

export class StargateClient {
  private readonly tmClient: TendermintClient;

  public static async connect(endpoint: string): Promise<StargateClient> {
    const tmClient = await TendermintClient.connect(endpoint);
    return new StargateClient(tmClient);
  }

  private constructor(tmClient: TendermintClient) {
    this.tmClient = tmClient;
  }

  public async getSequence(address: string): Promise<GetSequenceResult> {
    const binAddress = Bech32.decode(address).data;

    // https://github.com/cosmos/cosmos-sdk/blob/8cab43c8120fec5200c3459cbf4a92017bb6f287/x/auth/types/keys.go#L29-L32
    const accountKey = Uint8Array.from([0x01, ...binAddress]);

    const response = await this.tmClient.abciQuery({
      // we need the StoreKey for the module, not the module name
      // https://github.com/cosmos/cosmos-sdk/blob/8cab43c8120fec5200c3459cbf4a92017bb6f287/x/auth/types/keys.go#L12
      path: "/store/acc/key",
      data: accountKey,
      prove: false,
    });

    const { typeUrl, value } = decodeAny(response.value);

    switch (typeUrl) {
      case "/cosmos.auth.BaseAccount": {
        const { account_number, sequence } = BaseAccount.decode(value);
        assert(account_number !== undefined);
        assert(sequence !== undefined);
        return {
          accountNumber: typeof account_number === "number" ? account_number : account_number.toNumber(),
          sequence: typeof sequence === "number" ? sequence : sequence.toNumber(),
        };
      }

      default:
        throw new Error(`Unsupported type: ${typeUrl}`);
    }
  }

  public disconnect(): void {
    this.tmClient.disconnect();
  }
}
