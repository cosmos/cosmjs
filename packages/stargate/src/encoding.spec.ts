/* eslint-disable @typescript-eslint/naming-convention */
import { fromAminoMsgType, toAminoMsgType } from "./encoding";

describe("encoding", () => {
  describe("toAminoMsgType", () => {
    it("works for known type url", () => {
      const msgType = toAminoMsgType("/cosmos.staking.v1beta1.MsgDelegate");
      expect(msgType).toEqual("cosmos-sdk/MsgDelegate");
    });

    it("throws for unknown type url", () => {
      expect(() => toAminoMsgType("/xxx.Unknown")).toThrowError(
        /Type URL does not exist in the Amino message type register./i,
      );
    });
  });

  describe("fromAminoMsgType", () => {
    it("works for known type url", () => {
      const msgUrl = fromAminoMsgType("cosmos-sdk/MsgDelegate");
      expect(msgUrl).toEqual("/cosmos.staking.v1beta1.MsgDelegate");
    });

    it("throws for unknown type url", () => {
      expect(() => fromAminoMsgType("cosmos-sdk/MsgUnknown")).toThrowError(
        /Type does not exist in the Amino message type register./i,
      );
    });
  });
});
