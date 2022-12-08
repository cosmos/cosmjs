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

  it("can POST to echo server", async () => {
    pendingWithoutHttpServer();

    const response = await http("POST", echoUrl, undefined, createJsonRpcRequest("health"));
    expect(response).toEqual({
      request_headers: jasmine.objectContaining({
        // Basic headers from http client
        Accept: jasmine.any(String),
        "Content-Length": jasmine.any(String),
        "Content-Type": "application/json",
        Host: jasmine.any(String),
        "User-Agent": jasmine.any(String),
      }),
    });
  });

  it("errors for non-open port", async () => {
    await expectAsync(
      http("POST", `http://localhost:56745`, undefined, createJsonRpcRequest("health")),
    ).toBeRejectedWithError(/(ECONNREFUSED|Failed to fetch)/i);
  });

  it("can POST to echo server with custom headers", async () => {
    pendingWithoutHttpServer();

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
