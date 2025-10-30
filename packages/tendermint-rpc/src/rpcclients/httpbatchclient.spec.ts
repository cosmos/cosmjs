import { createJsonRpcRequest } from "../jsonrpc.js";
import { defaultInstance, tendermintEnabled } from "../testutil.spec.js";
import { HttpBatchClient } from "./httpbatchclient.js";

(tendermintEnabled ? describe : xdescribe)("HttpBatchClient", () => {
  const tendermintUrl = "http://" + defaultInstance.url;

  it("can make a simple call", async () => {
    const client = new HttpBatchClient(tendermintUrl);

    const healthResponse = await client.execute(createJsonRpcRequest("health"));
    expect(healthResponse.result).toEqual({});

    const statusResponse = await client.execute(createJsonRpcRequest("status"));
    expect(statusResponse.result).toBeTruthy();
    expect(statusResponse.result.node_info).toBeTruthy();

    await expectAsync(client.execute(createJsonRpcRequest("no-such-method"))).toBeRejected();

    client.disconnect();
  });

  it("dispatches requests as soon as batch size limit is reached", async () => {
    const client = new HttpBatchClient(tendermintUrl, {
      dispatchInterval: 3600_000 /* 1h to make test time out if this is not working */,
      batchSizeLimit: 3,
    });

    const healthResponse = await Promise.all([
      client.execute(createJsonRpcRequest("health")),
      client.execute(createJsonRpcRequest("health")),
      client.execute(createJsonRpcRequest("health")),
    ]);
    expect(healthResponse[0].result).toEqual({});
    expect(healthResponse[1].result).toEqual({});
    expect(healthResponse[2].result).toEqual({});

    client.disconnect();
  });
});
