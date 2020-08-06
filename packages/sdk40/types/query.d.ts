import { google } from "@cosmjs/proto-signing";
import { Client } from "@cosmjs/tendermint-rpc";
import { Coin } from "./structs";
export declare function proveAccount(client: Client, address: string): Promise<google.protobuf.Any>;
export declare function proveBalance(client: Client, address: string, denom: string): Promise<Coin>;
