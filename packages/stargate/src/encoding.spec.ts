/* eslint-disable @typescript-eslint/naming-convention */
import { getMsgType } from "./encoding";

describe("encoding", () => {
  describe("getMsgType", () => {
    it("works for known type url", () => {
      const msgType = getMsgType("/cosmos.staking.v1beta1.MsgDelegate");
      expect(msgType).toEqual("cosmos-sdk/MsgDelegate");
    });

    it("throws for unknown type url", () => {
      expect(() => getMsgType("/xxx.Unknown")).toThrowError(/type url not known/i);
    });
  });
});
