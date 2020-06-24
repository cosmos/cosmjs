import { JsonRpcRequest, JsonRpcSuccessResponse } from "@cosmjs/json-rpc";
import { Stream } from "xstream";

/**
 * An event emitted from Tendermint after subscribing via RPC.
 *
 * These events are passed as the `result` of JSON-RPC responses, which is kind
 * of hacky because it breaks the idea that exactly one JSON-RPC response belongs
 * to each JSON-RPC request. But this is how subscriptions work in Tendermint.
 */
export interface SubscriptionEvent {
  readonly query: string;
  readonly data: {
    readonly type: string;
    readonly value: any;
  };
}

export interface RpcClient {
  readonly execute: (request: JsonRpcRequest) => Promise<JsonRpcSuccessResponse>;
  readonly disconnect: () => void;
}

export interface RpcStreamingClient extends RpcClient {
  readonly listen: (request: JsonRpcRequest) => Stream<SubscriptionEvent>;
}

export function instanceOfRpcStreamingClient(client: RpcClient): client is RpcStreamingClient {
  return typeof (client as any).listen === "function";
}

// Helpers for all RPC clients

export function hasProtocol(url: string): boolean {
  return url.search("://") !== -1;
}
