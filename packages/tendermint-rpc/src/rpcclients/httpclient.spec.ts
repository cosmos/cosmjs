import { createJsonRpcRequest } from "../jsonrpc";
import { defaultInstance, tendermintEnabled } from "../testutil.spec";
import { HttpClient } from "./httpclient";

(tendermintEnabled ? describe : xdescribe)("HttpClient", () => {
  const tendermintUrl = "http://" + defaultInstance.url;

  it("can make a simple call", async () => {
    const client = new HttpClient(tendermintUrl);

    const healthResponse = await client.execute(createJsonRpcRequest("health"));
    expect(healthResponse.result).toEqual({});

    const statusResponse = await client.execute(createJsonRpcRequest("status"));
    expect(statusResponse.result).toBeTruthy();
    expect(statusResponse.result.node_info).toBeTruthy();

    await client
      .execute(createJsonRpcRequest("no-such-method"))
      .then(() => {
        throw new Error("must not resolve");
      })
      .catch((error) => {
        expect(error).toBeTruthy();
      });

    client.disconnect();
  });
});
