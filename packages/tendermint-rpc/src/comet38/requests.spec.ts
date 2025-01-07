import { buildQuery } from "./requests";

describe("Requests", () => {
  describe("buildQuery", () => {
    it("works for no input", () => {
      const query = buildQuery({});
      expect(query).toEqual("");
    });

    it("works for one tags", () => {
      const query = buildQuery({ tags: [{ key: "abc", value: "def" }] });
      expect(query).toEqual("abc='def'");
    });

    it("works for two tags", () => {
      const query = buildQuery({
        tags: [
          { key: "k", value: "9" },
          { key: "L", value: "7" },
        ],
      });
      expect(query).toEqual("k='9' AND L='7'");
    });

    it("works for raw input", () => {
      const query = buildQuery({ raw: "aabbCCDD" });
      expect(query).toEqual("aabbCCDD");
    });

    it("works for mixed input", () => {
      const query = buildQuery({
        tags: [
          { key: "k", value: "9" },
          { key: "L", value: "7" },
        ],
        raw: "aabbCCDD",
      });
      expect(query).toEqual("k='9' AND L='7' AND aabbCCDD");
    });
  });
});
