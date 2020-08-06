/* eslint-disable @typescript-eslint/naming-convention */
import { Bech32, toHex } from "@cosmjs/encoding";
import { Uint64 } from "@cosmjs/math";
import { BaseAccount, decodeAny } from "@cosmjs/proto-signing";
import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";
import { assert } from "@cosmjs/utils";
import Long from "long";

export interface GetSequenceResult {
  readonly accountNumber: number;
  readonly sequence: number;
}

function uint64FromProto(input: number | Long): Uint64 {
  return Uint64.fromString(input.toString());
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
    const responseData = await this.queryVerified("acc", accountKey);

    const { typeUrl, value } = decodeAny(responseData);
    switch (typeUrl) {
      case "/cosmos.auth.BaseAccount": {
        const { account_number, sequence } = BaseAccount.decode(value);
        assert(account_number !== undefined);
        assert(sequence !== undefined);
        return {
          accountNumber: uint64FromProto(account_number).toNumber(),
          sequence: uint64FromProto(sequence).toNumber(),
        };
      }
      default:
        throw new Error(`Unsupported type: ${typeUrl}`);
    }
  }

  public disconnect(): void {
    this.tmClient.disconnect();
  }

  private async queryVerified(store: string, key: Uint8Array): Promise<Uint8Array> {
    const response = await this.tmClient.abciQuery({
      // we need the StoreKey for the module, not the module name
      // https://github.com/cosmos/cosmos-sdk/blob/8cab43c8120fec5200c3459cbf4a92017bb6f287/x/auth/types/keys.go#L12
      path: `/store/${store}/key`,
      data: key,
      prove: true,
    });

    if (response.code) {
      throw new Error(`Query failed with (${response.code}): ${response.log}`);
    }

    // TODO: better way to compare?
    if (toHex(response.key) !== toHex(key)) {
      throw new Error(`Response key ${toHex(response.key)} doesn't match query key ${toHex(key)}`);
    }

    // TODO: implement proof verification
    // https://github.com/CosmWasm/cosmjs/issues/347

    return response.value;
  }
}
