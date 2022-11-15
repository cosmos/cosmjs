/* eslint-disable @typescript-eslint/naming-convention */
import { createJsonRpcRequest } from "../jsonrpc";
import { defaultInstance } from "../testutil.spec";
import { HttpBatchClient } from "./httpbatchclient";

function pendingWithoutTendermint(): void {
  if (!process.env.TENDERMINT_ENABLED) {
    pending("Set TENDERMINT_ENABLED to enable Tendermint RPC tests");
  }
}

const tendermintUrl = defaultInstance.url;

describe("HttpBatchClient", () => {
  it("can make a simple call", async () => {
    pendingWithoutTendermint();
    const client = new HttpBatchClient(tendermintUrl);

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

  it("dispatches requests as soon as batch size limit is reached", async () => {
    pendingWithoutTendermint();
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
