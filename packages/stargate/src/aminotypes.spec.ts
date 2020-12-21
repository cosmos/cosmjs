/* eslint-disable @typescript-eslint/naming-convention */
import { AminoTypes } from "./aminotypes";

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for known type url", () => {
      const msgType = new AminoTypes().toAmino("/cosmos.staking.v1beta1.MsgDelegate");
      expect(msgType).toEqual("cosmos-sdk/MsgDelegate");
    });

    it("throws for unknown type url", () => {
      expect(() => new AminoTypes().toAmino("/xxx.Unknown")).toThrowError(
        /Type URL does not exist in the Amino message type register./i,
      );
    });
  });

  describe("fromAmino", () => {
    it("works for known type url", () => {
      const msgUrl = new AminoTypes().fromAmino("cosmos-sdk/MsgDelegate");
      expect(msgUrl).toEqual("/cosmos.staking.v1beta1.MsgDelegate");
    });

    it("throws for unknown type url", () => {
      expect(() => new AminoTypes().fromAmino("cosmos-sdk/MsgUnknown")).toThrowError(
        /Type does not exist in the Amino message type register./i,
      );
    });
  });
});
