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

    it("can be used to reproduce ADR 027 test vector", () => {
      const proto = `
        // Article.proto

        package blog;
        syntax = "proto3";

        enum Type {
          UNSPECIFIED = 0;
          IMAGES = 1;
          NEWS = 2;
        };

        enum Review {
          UNSPECIFIED = 0;
          ACCEPTED = 1;
          REJECTED = 2;
        };

        message Article {
          string title = 1;
          string description = 2;
          uint64 created = 3;
          uint64 updated = 4;
          bool public = 5;
          bool promoted = 6;
          Type type = 7;
          Review review = 8;
          repeated string comments = 9;
          repeated string backlinks = 10;
        };
      `;
      const root = parse(proto).root;

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const Article = root.lookupType("blog.Article");
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const Type = root.lookupEnum("blog.Type");
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const Review = root.lookupEnum("blog.Review");

      const expected = fromHex(
        "0a1654686520776f726c64206e65656473206368616e676518e8bebec8bc2e280138024a084e696365206f6e654a095468616e6b20796f75",
      );

      const serialization = Uint8Array.from(
        Article.encode({
          title: omitDefault("The world needs change"),
          description: omitDefault(""),
          created: omitDefault(1596806111080),
          updated: omitDefault(0),
          public: omitDefault(true),
          promoted: omitDefault(false),
          type: omitDefault(Type.values["NEWS"]),
          review: omitDefault(Review.values["UNSPECIFIED"]),
          comments: omitDefault(["Nice one", "Thank you"]),
          backlinks: omitDefault([]),
        }).finish(),
      );
      expect(serialization).toEqual(expected);
    });
  });
});
