import { CosmWasmCodec, CosmWasmConnection, TokenInfo } from "@cosmwasm/bcp";
import { TokenTicker, TxCodec } from "@iov/bcp";

const prefix = "cosmos";
const tokens: readonly TokenInfo[] = [
  {
    fractionalDigits: 6,
    tokenName: "Fee Token",
    tokenTicker: "COSM" as TokenTicker,
    denom: "cosm",
  },
  {
    fractionalDigits: 6,
    tokenName: "Staking Token",
    tokenTicker: "STAKE" as TokenTicker,
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
