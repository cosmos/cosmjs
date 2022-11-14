/* eslint-disable @typescript-eslint/naming-convention */
import { createJsonRpcRequest } from "../jsonrpc";
import { defaultInstance, pendingWithoutTendermint } from "../testutil.spec";
import { http } from "./http";

function pendingWithoutHttpServer(): void {
  if (!process.env.HTTPSERVER_ENABLED) {
    pending("Set HTTPSERVER_ENABLED to enable HTTP tests");
  }
}

const tendermintUrl = defaultInstance.url;
const echoUrl = "http://localhost:5555/echo_headers";

describe("http", () => {
  it("can send a health request", async () => {
    pendingWithoutTendermint();
    const response = await http("POST", `http://${tendermintUrl}`, undefined, createJsonRpcRequest("health"));
    expect(response).toEqual(jasmine.objectContaining({ jsonrpc: "2.0" }));
  });

  it("errors for non-open port", async () => {
    await expectAsync(
      http("POST", `http://localhost:56745`, undefined, createJsonRpcRequest("health")),
    ).toBeRejectedWithError(/(ECONNREFUSED|Failed to fetch)/i);
  });

  it("can send custom headers", async () => {
    pendingWithoutHttpServer();
    // Without custom headers
    const response1 = await http("POST", echoUrl, undefined, createJsonRpcRequest("health"));
    expect(response1).toEqual({
      request_headers: jasmine.objectContaining({
        // Basic headers from http client
        Accept: jasmine.any(String),
        "Content-Length": jasmine.any(String),
        "Content-Type": "application/json",
        Host: jasmine.any(String),
        "User-Agent": jasmine.any(String),
      }),
    });

    // With custom headers
    const response2 = await http(
      "POST",
      echoUrl,
      { foo: "bar123", Authorization: "Basic Z3Vlc3Q6bm9QYXNzMTIz" },
      createJsonRpcRequest("health"),
    );
    expect(response2).toEqual({
      request_headers: jasmine.objectContaining({
        // Basic headers from http client
        "Content-Length": jasmine.any(String),
        "Content-Type": "application/json",
        Host: jasmine.any(String),
        "User-Agent": jasmine.any(String),
        // Custom headers
        foo: "bar123",
        Authorization: "Basic Z3Vlc3Q6bm9QYXNzMTIz",
      }),
    });
  });
});
