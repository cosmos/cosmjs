import { fromBinary, toBinary } from "./encoding";

describe("encoding", () => {
  describe("toBinary", () => {
    it("works for objects", () => {
      // echo -n "{}" | base64
      expect(toBinary({})).toEqual("e30=");

      // echo -n '{"swap":{"max_spread":"0.25"}}' | base64
      // eslint-disable-next-line @typescript-eslint/naming-convention
      expect(toBinary({ swap: { max_spread: "0.25" } })).toEqual("eyJzd2FwIjp7Im1heF9zcHJlYWQiOiIwLjI1In19");

      // echo -n '{"num":3.45,"null":null,"bool":true,"obj":{"str":"bar"}}' | base64
      expect(
        toBinary({ num: 3.45, null: null, bool: true, obj: { str: "bar" }, omitted: undefined }),
      ).toEqual("eyJudW0iOjMuNDUsIm51bGwiOm51bGwsImJvb2wiOnRydWUsIm9iaiI6eyJzdHIiOiJiYXIifX0=");
    });

    it("works for strings", () => {
      // echo -n '""' | base64
      expect(toBinary("")).toEqual("IiI=");

      // echo -n '"hi"' | base64
      expect(toBinary("hi")).toEqual("ImhpIg==");
    });

    it("works for arrays", () => {
      // echo -n '[]' | base64
      expect(toBinary([])).toEqual("W10=");

      // echo -n '[1,2,3]' | base64
      expect(toBinary([1, 2, 3])).toEqual("WzEsMiwzXQ==");
    });

    it("works for booleans", () => {
      // echo -n 'true' | base64
      expect(toBinary(true)).toEqual("dHJ1ZQ==");
    });

    it("works for numbers", () => {
      // echo -n '12.21' | base64
      expect(toBinary(12.21)).toEqual("MTIuMjE=");
    });

    it("works for null", () => {
      // echo -n 'null' | base64
      expect(toBinary(null)).toEqual("bnVsbA==");
    });
  });

  describe("fromBinary", () => {
    it("works for objects", () => {
      // echo -n "{}" | base64
      expect(fromBinary("e30=")).toEqual({});

      // echo -n '{"swap":{"max_spread":"0.25"}}' | base64
      expect(fromBinary("eyJzd2FwIjp7Im1heF9zcHJlYWQiOiIwLjI1In19")).toEqual({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        swap: { max_spread: "0.25" },
      });

      // echo -n '{"num":3.45,"null":null,"bool":true,"obj":{"str":"bar"}}' | base64
      expect(
        fromBinary("eyJudW0iOjMuNDUsIm51bGwiOm51bGwsImJvb2wiOnRydWUsIm9iaiI6eyJzdHIiOiJiYXIifX0="),
      ).toEqual({ num: 3.45, null: null, bool: true, obj: { str: "bar" } });
    });

    it("works for strings", () => {
      // echo -n '""' | base64
      expect(fromBinary("IiI=")).toEqual("");

      // echo -n '"hi"' | base64
      expect(fromBinary("ImhpIg==")).toEqual("hi");
    });

    it("works for arrays", () => {
      // echo -n '[]' | base64
      expect(fromBinary("W10=")).toEqual([]);

      // echo -n '[1,2,3]' | base64
      expect(fromBinary("WzEsMiwzXQ==")).toEqual([1, 2, 3]);
    });

    it("works for booleans", () => {
      // echo -n 'true' | base64
      expect(fromBinary("dHJ1ZQ==")).toEqual(true);
    });

    it("works for numbers", () => {
      // echo -n '12.21' | base64
      expect(fromBinary("MTIuMjE=")).toEqual(12.21);
    });

    it("works for null", () => {
      // echo -n 'null' | base64
      expect(fromBinary("bnVsbA==")).toEqual(null);
    });
  });
});
