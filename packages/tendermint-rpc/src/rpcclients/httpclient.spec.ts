import { createJsonRpcRequest } from "../jsonrpc.js";
import { defaultInstance, tendermintEnabled } from "../testutil.spec.js";
import { HttpClient } from "./httpclient.js";

(tendermintEnabled ? describe : xdescribe)("HttpClient", () => {
  const tendermintUrl = "http://" + defaultInstance.url;

  it("can make a simple call", async () => {
    const client = new HttpClient(tendermintUrl);

    const healthResponse = await client.execute(createJsonRpcRequest("health"));
    expect(healthResponse.result).toEqual({});

    const statusResponse = await client.execute(createJsonRpcRequest("status"));
    expect(statusResponse.result).toBeTruthy();
    expect(statusResponse.result.node_info).toBeTruthy();

    await expectAsync(client.execute(createJsonRpcRequest("no-such-method"))).toBeRejected();

    client.disconnect();
  });
});
