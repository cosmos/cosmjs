import { google } from "@cosmjs/proto-signing";
import { Client } from "@cosmjs/tendermint-rpc";
import { Coin } from "./structs";
export declare function getAccount(client: Client, address: string): Promise<google.protobuf.Any>;
export declare function getBalance(client: Client, address: string, denom: string): Promise<Coin>;
