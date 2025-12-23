import { fromHex } from "@cosmjs/encoding";

import { instantiate2Address } from "./instantiate2";

describe("instantiate2", () => {
  describe("instantiate2Address", () => {
    it("works", () => {
      // Some entries from https://gist.github.com/webmaster128/e4d401d414bd0e7e6f70482f11877fbe
      {
        const checksum = fromHex("13a1fc994cc6d1c81b746ee0c0ff6f90043875e0bf1d9be6b7d779fc978dc2a5");
        const creator = "purple1nxvenxve42424242hwamhwamenxvenxvhxf2py";
        const salt = fromHex("61");
        expect(instantiate2Address(checksum, creator, salt, "purple")).toEqual(
          "purple1t6r960j945lfv8mhl4mage2rg97w63xeynwrupum2s2l7em4lprs9ce5hk",
        );
      }
      {
        const checksum = fromHex("13a1fc994cc6d1c81b746ee0c0ff6f90043875e0bf1d9be6b7d779fc978dc2a5");
        const creator = "purple1nxvenxve42424242hwamhwamenxvenxvhxf2py";
        const salt = fromHex(
          "aabbccddeeffffeeddbbccddaa66551155aaaabbcc787878789900aabbccddeeffffeeddbbccddaa66551155aaaabbcc787878789900aabbbbcc221100acadae",
        );
        expect(instantiate2Address(checksum, creator, salt, "purple")).toEqual(
          "purple1jwzvvfyvpwchrccxl476pxf7c83qawsqv3f2820q0zyrav6eg4jqdcq7gc",
        );
      }
      {
        const checksum = fromHex("13a1fc994cc6d1c81b746ee0c0ff6f90043875e0bf1d9be6b7d779fc978dc2a5");
        const creator = "purple1nxvenxve42424242hwamhwamenxvenxvmhwamhwaamhwamhwlllsatsy6m";
        const salt = fromHex("61");
        expect(instantiate2Address(checksum, creator, salt, "purple")).toEqual(
          "purple1juj7jn6j3k9h35euyhealntquc2zmzlxp2ek76jmtypkl4g4vrdsfwmwxk",
        );
      }
      {
        const checksum = fromHex("13a1fc994cc6d1c81b746ee0c0ff6f90043875e0bf1d9be6b7d779fc978dc2a5");
        const creator = "purple1nxvenxve42424242hwamhwamenxvenxvmhwamhwaamhwamhwlllsatsy6m";
        const salt = fromHex("61");
        expect(instantiate2Address(checksum, creator, salt, "purple")).toEqual(
          "purple1juj7jn6j3k9h35euyhealntquc2zmzlxp2ek76jmtypkl4g4vrdsfwmwxk",
        );
      }
      {
        const checksum = fromHex("1da6c16de2cbaf7ad8cbb66f0925ba33f5c278cb2491762d04658c1480ea229b");
        const creator = "purple1nxvenxve42424242hwamhwamenxvenxvhxf2py";
        const salt = fromHex("61");
        expect(instantiate2Address(checksum, creator, salt, "purple")).toEqual(
          "purple1h9wyvusc6sy2p7fsgmez0dhvullpsyel7vq38k6d9fa7ehlv59qsvnyh36",
        );
      }
    });
  });
});
