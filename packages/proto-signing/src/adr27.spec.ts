import { fromHex } from "@cosmjs/encoding";
import { parse } from "protobufjs";

import { omitDefault } from "./adr27";

describe("adr27", () => {
  describe("omitDefault", () => {
    it("works for strings", () => {
      expect(omitDefault("abc")).toEqual("abc");
      expect(omitDefault("")).toEqual(null);
    });

    it("works for bytes", () => {
      expect(omitDefault(fromHex("ab"))).toEqual(fromHex("ab"));
      expect(omitDefault(fromHex(""))).toEqual(null);
    });

    it("works for integers", () => {
      expect(omitDefault(123)).toEqual(123);
      expect(omitDefault(0)).toEqual(null);
    });

    it("works for floats", () => {
      expect(omitDefault(1.234)).toEqual(1.234);
      expect(omitDefault(0.0)).toEqual(null);
    });

    it("works for repeaded", () => {
      expect(omitDefault(["a", "b", "c"])).toEqual(["a", "b", "c"]);
      expect(omitDefault([])).toEqual(null);
    });

    it("works for enums", () => {
      const proto = `
        package blog;
        syntax = "proto3";

        enum Review {
          UNSPECIFIED = 0;
          ACCEPTED = 1;
          REJECTED = 2;
        };
      `;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const Review = parse(proto).root.lookupEnum("blog.Review");
      expect(omitDefault(Review.values["ACCEPTED"])).toEqual(Review.values["ACCEPTED"]);
      expect(omitDefault(Review.values["UNSPECIFIED"])).toEqual(null);
    });
  });
});
