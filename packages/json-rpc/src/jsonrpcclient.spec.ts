/// <reference lib="dom" />

import { Producer, Stream } from "xstream";

import { JsonRpcClient, SimpleMessagingConnection } from "./jsonrpcclient";
import { parseJsonRpcResponse } from "./parse";
import { JsonRpcRequest, JsonRpcResponse } from "./types";

function pendingWithoutWorker(): void {
  if (typeof Worker === "undefined") {
    pending("Environment without WebWorker support detected. Marked as pending.");
  }
}

function makeSimpleMessagingConnection(
  worker: Worker,
): SimpleMessagingConnection<JsonRpcRequest, JsonRpcResponse> {
  const producer: Producer<JsonRpcResponse> = {
    start: (listener) => {
      worker.onmessage = (event) => {
        listener.next(parseJsonRpcResponse(event.data));
      };
    },
    stop: () => {
      worker.onmessage = null;
    },
  };

  return {
    responseStream: Stream.create(producer),
    sendRequest: (request) => worker.postMessage(request),
  };
}

describe("JsonRpcClient", () => {
  const dummyserviceKarmaUrl = "/base/dist/web/dummyservice.worker.js";

  it("can be constructed with a Worker", () => {
    pendingWithoutWorker();

    const worker = new Worker(dummyserviceKarmaUrl);
    const client = new JsonRpcClient(makeSimpleMessagingConnection(worker));
    expect(client).toBeTruthy();
    worker.terminate();
  });

  it("can communicate with worker", async () => {
    pendingWithoutWorker();

    const worker = new Worker(dummyserviceKarmaUrl);

    const client = new JsonRpcClient(makeSimpleMessagingConnection(worker));
    const response = await client.run({
      jsonrpc: "2.0",
      id: 123,
      method: "getIdentities",
      params: ["Who are you?"],
    });
    expect(response.jsonrpc).toEqual("2.0");
    expect(response.id).toEqual(123);
    expect(response.result).toEqual(`Called getIdentities("Who are you?")`);

    worker.terminate();
  });

  it("supports params as dictionary", async () => {
    pendingWithoutWorker();

    const worker = new Worker(dummyserviceKarmaUrl);

    const client = new JsonRpcClient(makeSimpleMessagingConnection(worker));
    const response = await client.run({
      jsonrpc: "2.0",
      id: 123,
      method: "getIdentities",
      params: {
        a: "Who are you?",
      },
    });
    expect(response.jsonrpc).toEqual("2.0");
    expect(response.id).toEqual(123);
    expect(response.result).toEqual(`Called getIdentities({"a":"Who are you?"})`);

    worker.terminate();
  });
});
