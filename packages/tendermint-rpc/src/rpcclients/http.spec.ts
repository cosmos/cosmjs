import { createJsonRpcRequest } from "../jsonrpc.ts";
import { defaultInstance, tendermintEnabled } from "../testutil.spec.ts";
import { http } from "./http.ts";

const httpServerEnabled = !!globalThis.process?.env.HTTPSERVER_ENABLED;

const tendermintUrl = defaultInstance.url;
const echoUrl = "http://localhost:5555/echo_headers";

describe("http", () => {
  (tendermintEnabled ? it : xit)("can send a health request", async () => {
    const response = await http("POST", `http://${tendermintUrl}`, undefined, createJsonRpcRequest("health"));
    expect(response).toEqual(jasmine.objectContaining({ jsonrpc: "2.0" }));
  });

  (httpServerEnabled ? it : xit)("can POST to echo server", async () => {
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

  it("includes response in error cause for bad status codes", async () => {
    const originalFetch = globalThis.fetch;
    const mockResponse = {
      status: 404,
      statusText: "Not Found",
      ok: false,
      text: jasmine.createSpy("text").and.resolveTo("Not Found Error Body"),
    } as unknown as Response;

    // Mock fetch to return a 404 response
    globalThis.fetch = jasmine.createSpy("fetch").and.resolveTo(mockResponse);

    try {
      const error = await http("POST", "http://example.com", undefined, createJsonRpcRequest("health")).catch(
        (err) => err,
      );
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toContain("Bad status on response: 404");
      expect(error.cause).toEqual({
        status: 404,
        body: "Not Found Error Body",
      });
      expect(mockResponse.text).toHaveBeenCalled();
    } finally {
      // Restore original fetch
      globalThis.fetch = originalFetch;
    }
  });

  (httpServerEnabled ? it : xit)("can POST to echo server with custom headers", async () => {
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
