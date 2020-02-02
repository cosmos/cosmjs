import { CosmWasmCodec, CosmWasmConnection, TokenConfiguration } from "@cosmwasm/bcp";
import { TxCodec } from "@iov/bcp";

const prefix = "cosmos";
const tokens: TokenConfiguration = [
  {
    fractionalDigits: 6,
    name: "Fee Token",
    ticker: "COSM",
    denom: "cosm",
  },
  {
    fractionalDigits: 6,
    name: "Staking Token",
    ticker: "STAKE",
    denom: "stake",
  },
];

export async function establishConnection(url: string): Promise<CosmWasmConnection> {
  return CosmWasmConnection.establish(url, prefix, tokens);
}

export function codecImplementation(): TxCodec {
  return new CosmWasmCodec(prefix, tokens);
}

export function codecDefaultFractionalDigits(): number {
  return 6;
}
