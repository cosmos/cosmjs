import { fromHex } from "@cosmjs/encoding";

import { decodeCosmosSdkDecFromProto } from "./utils";

describe("utils", () => {
  describe("decodeCosmosSdkDecFromProto", () => {
    it("works for string inputs", () => {
      expect(decodeCosmosSdkDecFromProto("0").toString()).toEqual("0");
      expect(decodeCosmosSdkDecFromProto("1").toString()).toEqual("0.000000000000000001");
      expect(decodeCosmosSdkDecFromProto("3000000").toString()).toEqual("0.000000000003");
      expect(decodeCosmosSdkDecFromProto("123456789123456789").toString()).toEqual("0.123456789123456789");
      expect(decodeCosmosSdkDecFromProto("1234567891234567890").toString()).toEqual("1.23456789123456789");
    });

    it("works for byte inputs", () => {
      expect(decodeCosmosSdkDecFromProto(fromHex("313330303033343138373830313631333938")).toString()).toEqual(
        "0.130003418780161398",
      );
    });
  });
});
