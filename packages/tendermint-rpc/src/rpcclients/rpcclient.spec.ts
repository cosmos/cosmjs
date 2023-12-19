import { createJsonRpcRequest } from "../jsonrpc";
import { defaultInstance } from "../testutil.spec";
import { HttpClient } from "./httpclient";
import { hasProtocol, instanceOfRpcStreamingClient } from "./rpcclient";
import { WebsocketClient } from "./websocketclient";

function pendingWithoutTendermint(): void {
  if (!process.env.TENDERMINT_ENABLED) {
    pending("Set TENDERMINT_ENABLED to enable Tendermint RPC tests");
  }
}

describe("RpcClient", () => {
  const httpUrl = "http://" + defaultInstance.url;
  const wsUrl = "ws://" + defaultInstance.url;

  it("has working instanceOfRpcStreamingClient()", async () => {
    pendingWithoutTendermint();

    const httpClient = new HttpClient(httpUrl);
    const wsClient = new WebsocketClient(wsUrl);

    expect(instanceOfRpcStreamingClient(httpClient)).toEqual(false);
    expect(instanceOfRpcStreamingClient(wsClient)).toEqual(true);

    httpClient.disconnect();
    await wsClient.connected();
    wsClient.disconnect();
  });

  it("should also work with trailing slashes", async () => {
    pendingWithoutTendermint();

    const statusRequest = createJsonRpcRequest("status");

    const httpClient = new HttpClient(httpUrl + "/");
    expect(await httpClient.execute(statusRequest)).toBeDefined();
    httpClient.disconnect();

    const wsClient = new WebsocketClient(wsUrl + "/");
    expect(await wsClient.execute(statusRequest)).toBeDefined();
    wsClient.disconnect();
  });
});

describe("hasProtocol", () => {
  it("works", () => {
    expect(hasProtocol("https://my.rpc.net")).toEqual(true);
    expect(hasProtocol("https://my.rpc.net:443")).toEqual(true);
    expect(hasProtocol("https://my.rpc.net:443/somewhere")).toEqual(true);
    expect(hasProtocol("http://my.rpc.net")).toEqual(true);
    expect(hasProtocol("http://my.rpc.net:443")).toEqual(true);
    expect(hasProtocol("http://my.rpc.net:443/somewhere")).toEqual(true);
    expect(hasProtocol("wss://my.rpc.net")).toEqual(true);
    expect(hasProtocol("wss://my.rpc.net:443")).toEqual(true);
    expect(hasProtocol("wss://my.rpc.net:443/somewhere")).toEqual(true);
    expect(hasProtocol("ws://my.rpc.net")).toEqual(true);
    expect(hasProtocol("ws://my.rpc.net:443")).toEqual(true);
    expect(hasProtocol("ws://my.rpc.net:443/somewhere")).toEqual(true);
    expect(hasProtocol("ws://my.rpc.net:443/somewhere")).toEqual(true);
    expect(hasProtocol("file:///Users/joe/Library/CloudStorage/Notes.pdf")).toEqual(true);

    // Protocols without double slash is not what we want to see here
    expect(hasProtocol("tel:+1-201-555-0123")).toEqual(false);

    // No protocols
    expect(hasProtocol("")).toEqual(false);
    expect(hasProtocol(" ")).toEqual(false);
    expect(hasProtocol("/")).toEqual(false);
  });
});
