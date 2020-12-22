/* eslint-disable @typescript-eslint/naming-convention */
import { AminoTypes } from "./aminotypes";

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for known type url", () => {
      const msgType = new AminoTypes().toAmino("/cosmos.staking.v1beta1.MsgDelegate");
      expect(msgType).toEqual("cosmos-sdk/MsgDelegate");
    });

    it("works with custom type url", () => {
      const msgType = new AminoTypes({ "/my.CustomType": "my-sdk/CustomType" }).toAmino("/my.CustomType");
      expect(msgType).toEqual("my-sdk/CustomType");
    });

    it("works with overridden type url", () => {
      const msgType = new AminoTypes({
        "/cosmos.staking.v1beta1.MsgDelegate": "my-override/MsgDelegate",
      }).toAmino("/cosmos.staking.v1beta1.MsgDelegate");
      expect(msgType).toEqual("my-override/MsgDelegate");
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

    it("works with custom type url", () => {
      const msgType = new AminoTypes({ "/my.CustomType": "my-sdk/CustomType" }).fromAmino(
        "my-sdk/CustomType",
      );
      expect(msgType).toEqual("/my.CustomType");
    });

    it("works with overridden type url", () => {
      const msgType = new AminoTypes({
        "/my.OverrideType": "cosmos-sdk/MsgDelegate",
      }).fromAmino("cosmos-sdk/MsgDelegate");
      expect(msgType).toEqual("/my.OverrideType");
    });

    it("throws for unknown type url", () => {
      expect(() => new AminoTypes().fromAmino("cosmos-sdk/MsgUnknown")).toThrowError(
        /Type does not exist in the Amino message type register./i,
      );
    });
  });
});
