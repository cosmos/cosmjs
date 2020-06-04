import { PostableBytes, PrehashType } from "@iov/bcp";
import { toUtf8 } from "@iov/encoding";

import { CosmosCodec } from "./cosmoscodec";
import { chainId, nonce, sendTxJson, signedTxBin, signedTxEncodedJson, signedTxJson } from "./testdata.spec";
import { BankToken } from "./types";

const defaultPrefix = "cosmos";

const defaultBankTokens: readonly BankToken[] = [
  {
    fractionalDigits: 6,
    ticker: "ATOM",
    denom: "uatom",
  },
];

describe("CosmosCodec", () => {
  const codec = new CosmosCodec(defaultPrefix, defaultBankTokens);

  describe("isValidAddress", () => {
    it("accepts valid addresses", () => {
      expect(codec.isValidAddress("cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6")).toEqual(true);
    });

    it("rejects invalid addresses", () => {
      // Bad size
      expect(codec.isValidAddress("cosmos10q82zkzzmaku5lazhsvxv7hsg4ntpuhh8289f")).toEqual(false);
      // Bad checksum
      expect(codec.isValidAddress("cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs7")).toEqual(false);
      // Bad prefix
      expect(codec.isValidAddress("cosmot10q82zkzzmaku5lazhsvxv7hsg4ntpuhd8j5266")).toEqual(false);
      expect(codec.isValidAddress("cosmosvalcons10q82zkzzmaku5lazhsvxv7hsg4ntpuhdwadmss")).toEqual(false);
      expect(codec.isValidAddress("cosmosvaloper17mggn4znyeyg25wd7498qxl7r2jhgue8u4qjcq")).toEqual(false);
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
      expect(codec.bytesToSign(sendTxJson, nonce)).toEqual(expected);
    });
  });

  describe("bytesToPost", () => {
    it("works for SendTransaction via bank module", () => {
      const encoded = codec.bytesToPost(signedTxJson);
      expect(encoded).toEqual(signedTxEncodedJson);
    });
  });

  describe("parseBytes", () => {
    it("throws when trying to decode a transaction without a nonce", () => {
      expect(() => codec.parseBytes(signedTxBin as PostableBytes, chainId)).toThrowError(
        /nonce is required/i,
      );
    });

    it("properly decodes transactions", () => {
      const decoded = codec.parseBytes(signedTxEncodedJson as PostableBytes, chainId, nonce);
      expect(decoded).toEqual(signedTxJson);
    });

    it("round trip works", () => {
      const encoded = codec.bytesToPost(signedTxJson);
      const decoded = codec.parseBytes(encoded, chainId, nonce);
      expect(decoded).toEqual(signedTxJson);
    });
  });
});
