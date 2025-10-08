import { createJsonRpcRequest } from "../jsonrpc";
import { defaultInstance, tendermintEnabled } from "../testutil.spec";
import { http } from "./http";

const httpServerEnabled = !!globalThis.process?.env.HTTPSERVER_ENABLED;

const tendermintUrl = defaultInstance.url;
const echoUrl = "http://localhost:5555/echo_headers";

describe("http", () => {
  (tendermintEnabled ? it : it.skip)("can send a health request", async () => {
    const response = await http("POST", `http://${tendermintUrl}`, undefined, createJsonRpcRequest("health"));
    expect(response).toEqual(jasmine.objectContaining({ jsonrpc: "2.0" }));
  });

  (httpServerEnabled ? it : it.skip)("can POST to echo server", async () => {
    const response = await http("POST", echoUrl, undefined, createJsonRpcRequest("health"));
    expect(response).toEqual({
      request_headers: jasmine.objectContaining({
        // Basic headers from http client
        "Content-Type": "application/json",
      }),
    });
  });

  it("errors for non-open port", async () => {
    await expectAsync(
      http("POST", `http://localhost:56745`, undefined, createJsonRpcRequest("health")),
    ).toBeRejectedWithError(/(ECONNREFUSED|Failed to fetch|fetch failed|(request to .* failed))/i);
  });

  (httpServerEnabled ? it : it.skip)("can POST to echo server with custom headers", async () => {
    // With custom headers
    const response = await http(
      "POST",
      echoUrl,
      { foo: "bar123", Authorization: "Basic Z3Vlc3Q6bm9QYXNzMTIz" },
      createJsonRpcRequest("health"),
    );
    expect(response).toEqual({
      request_headers: jasmine.objectContaining({
        // Basic headers from http client
        "Content-Type": "application/json",
        // Custom headers
        foo: "bar123",
        Authorization: "Basic Z3Vlc3Q6bm9QYXNzMTIz",
      }),
    });
  });
});
