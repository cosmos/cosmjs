import { makeJsonRpcId } from "./id";

describe("id", () => {
  describe("makeJsonRpcId", () => {
    it("returns a string or number", () => {
      const id = makeJsonRpcId();
      expect(["string", "number"]).toContain(typeof id);
    });

    it("returns unique values", () => {
      const ids = new Set([
        makeJsonRpcId(),
        makeJsonRpcId(),
        makeJsonRpcId(),
        makeJsonRpcId(),
        makeJsonRpcId(),
      ]);
      expect(ids.size).toEqual(5);
    });
  });
});
