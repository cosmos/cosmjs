import { createJsonRpcRequest } from "../jsonrpc";
import { defaultInstance } from "../testutil.spec";
import { http, HttpClient } from "./httpclient";

function pendingWithoutTendermint(): void {
  if (!process.env.TENDERMINT_ENABLED) {
    pending("Set TENDERMINT_ENABLED to enable tendermint rpc tests");
  }
}

const tendermintUrl = defaultInstance.url;

describe("http", () => {
  it("can send a health request", async () => {
    pendingWithoutTendermint();
    const response = await http("POST", `http://${tendermintUrl}`, createJsonRpcRequest("health"));
    expect(response).toEqual(jasmine.objectContaining({ jsonrpc: "2.0" }));
  });

  it("errors for non-open port", async () => {
    await expectAsync(
      http("POST", `http://localhost:56745`, createJsonRpcRequest("health")),
    ).toBeRejectedWithError(/(ECONNREFUSED|Failed to fetch)/i);
  });
});

describe("HttpClient", () => {
  it("can make a simple call", async () => {
    pendingWithoutTendermint();
    const client = new HttpClient(tendermintUrl);

    const healthResponse = await client.execute(createJsonRpcRequest("health"));
    expect(healthResponse.result).toEqual({});

    const statusResponse = await client.execute(createJsonRpcRequest("status"));
    expect(statusResponse.result).toBeTruthy();
    expect(statusResponse.result.node_info).toBeTruthy();

    await client
      .execute(createJsonRpcRequest("no-such-method"))
      .then(() => fail("must not resolve"))
      .catch((error) => expect(error).toBeTruthy());

    client.disconnect();
  });
});
