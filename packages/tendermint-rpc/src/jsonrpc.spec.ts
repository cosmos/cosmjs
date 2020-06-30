import { createJsonRpcRequest } from "./jsonrpc";

describe("jsonrpc", () => {
  describe("createJsonRpcRequest", () => {
    it("generates proper object with correct method", () => {
      const request = createJsonRpcRequest("do_something");
      expect(request.jsonrpc).toEqual("2.0");
      expect(request.id.toString()).toMatch(/^[1-9]{12}$/);
      expect(request.method).toEqual("do_something");
    });

    it("generates distinct IDs", () => {
      const request1 = createJsonRpcRequest("foo");
      const request2 = createJsonRpcRequest("foo");
      expect(request2.id).not.toEqual(request1.id);
    });

    it("copies params", () => {
      const params = { foo: "bar" };
      const request = createJsonRpcRequest("some_method", params);
      expect(request.params).toEqual(params);
      expect(request.params).not.toBe(params);
    });
  });
});
