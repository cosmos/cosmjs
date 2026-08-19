import { searchPairsToQueryString } from "./search";

describe("search", () => {
  describe("searchPairsToQueryString", () => {
    it("defaults to equality when no operator is given", () => {
      const query = searchPairsToQueryString([{ key: "transfer.recipient", value: "abc" }]);
      expect(query).toEqual("transfer.recipient='abc'");
    });

    it("defaults to equality for numeric values", () => {
      const query = searchPairsToQueryString([{ key: "tx.height", value: 5 }]);
      expect(query).toEqual("tx.height=5");
    });

    it("supports the > operator", () => {
      const query = searchPairsToQueryString([{ key: "tx.height", value: 5, operator: ">" }]);
      expect(query).toEqual("tx.height>5");
    });

    it("supports the >= operator", () => {
      const query = searchPairsToQueryString([{ key: "tx.height", value: 5, operator: ">=" }]);
      expect(query).toEqual("tx.height>=5");
    });

    it("supports the < operator", () => {
      const query = searchPairsToQueryString([{ key: "tx.height", value: 20, operator: "<" }]);
      expect(query).toEqual("tx.height<20");
    });

    it("supports the <= operator", () => {
      const query = searchPairsToQueryString([{ key: "tx.height", value: 20, operator: "<=" }]);
      expect(query).toEqual("tx.height<=20");
    });

    it("supports the explicit = operator", () => {
      const query = searchPairsToQueryString([{ key: "tx.height", value: 5, operator: "=" }]);
      expect(query).toEqual("tx.height=5");
    });

    it("keeps quotes around string values with a comparison operator", () => {
      const query = searchPairsToQueryString([{ key: "message.sender", value: "cosmos1abc", operator: ">" }]);
      expect(query).toEqual("message.sender>'cosmos1abc'");
    });

    it("supports bigint values with a comparison operator", () => {
      const query = searchPairsToQueryString([{ key: "tx.height", value: 5n, operator: ">=" }]);
      expect(query).toEqual("tx.height>=5");
    });

    it("combines a range query across two pairs on the same key", () => {
      const query = searchPairsToQueryString([
        { key: "tx.height", value: 10, operator: ">" },
        { key: "tx.height", value: 20, operator: "<=" },
      ]);
      expect(query).toEqual("tx.height>10 AND tx.height<=20");
    });

    it("mixes equality (implicit and explicit) with comparison operators", () => {
      const query = searchPairsToQueryString([
        { key: "message.action", value: "/cosmos.bank.v1beta1.MsgSend" },
        { key: "tx.height", value: 10, operator: ">=" },
      ]);
      expect(query).toEqual("message.action='/cosmos.bank.v1beta1.MsgSend' AND tx.height>=10");
    });
  });
});
