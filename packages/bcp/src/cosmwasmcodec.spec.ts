import { PostableBytes, PrehashType } from "@iov/bcp";
import { Encoding } from "@iov/encoding";

import { cosmWasmCodec } from "./cosmwasmcodec";
import { chainId, nonce, sendTxJson, signedTxBin, signedTxEncodedJson, signedTxJson } from "./testdata.spec";

const { toUtf8 } = Encoding;

describe("cosmWasmCodec", () => {
  describe("isValidAddress", () => {
    it("accepts valid addresses", () => {
      expect(cosmWasmCodec.isValidAddress("cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6")).toEqual(true);
      expect(cosmWasmCodec.isValidAddress("cosmosvalcons10q82zkzzmaku5lazhsvxv7hsg4ntpuhdwadmss")).toEqual(
        true,
      );
      expect(cosmWasmCodec.isValidAddress("cosmosvaloper17mggn4znyeyg25wd7498qxl7r2jhgue8u4qjcq")).toEqual(
        true,
      );
    });

    it("rejects invalid addresses", () => {
      // Bad size
      expect(cosmWasmCodec.isValidAddress("cosmos10q82zkzzmaku5lazhsvxv7hsg4ntpuhh8289f")).toEqual(false);
      // Bad checksum
      expect(cosmWasmCodec.isValidAddress("cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs7")).toEqual(false);
      // Bad prefix
      expect(cosmWasmCodec.isValidAddress("cosmot10q82zkzzmaku5lazhsvxv7hsg4ntpuhd8j5266")).toEqual(false);
    });
  });

  describe("bytesToSign", () => {
    it("works for SendTransaction via bank module", () => {
      const expected = {
        bytes: toUtf8(
          '{"account_number":"0","chain_id":"cosmoshub-3","fee":{"amount":[{"amount":"2500","denom":"uatom"}],"gas":"100000"},"memo":"","msgs":[{"type":"cosmos-sdk/MsgSend","value":{"amount":[{"amount":"35997500","denom":"uatom"}],"from_address":"cosmos1txqfn5jmcts0x0q7krdxj8tgf98tj0965vqlmq","to_address":"cosmos1nynns8ex9fq6sjjfj8k79ymkdz4sqth06xexae"}}],"sequence":"99"}',
        ),
        prehashType: PrehashType.Sha256,
      };
      expect(cosmWasmCodec.bytesToSign(sendTxJson, nonce)).toEqual(expected);
    });
  });

  describe("bytesToPost", () => {
    it("works for SendTransaction via bank module", () => {
      const encoded = cosmWasmCodec.bytesToPost(signedTxJson);
      expect(encoded).toEqual(signedTxEncodedJson);
    });
  });

  describe("parseBytes", () => {
    it("throws when trying to decode a transaction without a nonce", () => {
      expect(() => cosmWasmCodec.parseBytes(signedTxBin as PostableBytes, chainId)).toThrowError(
        /nonce is required/i,
      );
    });

    it("properly decodes transactions", () => {
      const decoded = cosmWasmCodec.parseBytes(signedTxEncodedJson as PostableBytes, chainId, nonce);
      expect(decoded).toEqual(signedTxJson);
    });

    it("round trip works", () => {
      const encoded = cosmWasmCodec.bytesToPost(signedTxJson);
      const decoded = cosmWasmCodec.parseBytes(encoded, chainId, nonce);
      expect(decoded).toEqual(signedTxJson);
    });
  });
});
