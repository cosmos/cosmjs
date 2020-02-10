import { CosmWasmCodec, CosmWasmConnection } from "@cosmwasm/bcp";
import { TxCodec } from "@iov/bcp";

import { tokenConfig } from "./constants";

const prefix = "cosmos";

export async function establishConnection(url: string): Promise<CosmWasmConnection> {
  return CosmWasmConnection.establish(url, prefix, tokenConfig);
}

export function codecImplementation(): TxCodec {
  return new CosmWasmCodec(prefix, tokenConfig.bankTokens);
}
