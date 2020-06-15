import { defaultInstance } from "../config.spec";
import { createJsonRpcRequest } from "../jsonrpc";
import { Method } from "../requests";
import { HttpClient } from "./httpclient";

function pendingWithoutTendermint(): void {
  if (!process.env.TENDERMINT_ENABLED) {
    pending("Set TENDERMINT_ENABLED to enable tendermint rpc tests");
  }
}

describe("HttpClient", () => {
  const tendermintUrl = defaultInstance.url;

  it("can make a simple call", async () => {
    pendingWithoutTendermint();
    const client = new HttpClient(tendermintUrl);

    const healthResponse = await client.execute(createJsonRpcRequest(Method.Health));
    expect(healthResponse.result).toEqual({});

    const statusResponse = await client.execute(createJsonRpcRequest(Method.Status));
    expect(statusResponse.result).toBeTruthy();
    expect(statusResponse.result.node_info).toBeTruthy();

    await client
      .execute(createJsonRpcRequest("no-such-method"))
      .then(() => fail("must not resolve"))
      .catch((error) => expect(error).toBeTruthy());

    client.disconnect();
  });
});
