import { CosmosAddressBech32Prefix } from "@cosmwasm/sdk";
import { Address, PostableBytes, PrehashType, SendTransaction, TokenTicker } from "@iov/bcp";
import { Encoding } from "@iov/encoding";

import { CosmWasmCodec } from "./cosmwasmcodec";
import { chainId, nonce, sendTxJson, signedTxBin, signedTxEncodedJson, signedTxJson } from "./testdata.spec";
import { BankToken, Erc20Token } from "./types";

const { toUtf8 } = Encoding;

const defaultPrefix = "cosmos" as CosmosAddressBech32Prefix;

const defaultBankTokens: readonly BankToken[] = [
  {
    fractionalDigits: 6,
    ticker: "ATOM",
    denom: "uatom",
  },
];

const defaultErc20Tokens: readonly Erc20Token[] = [
  {
    contractAddress: "cosmos18vd8fpwxzck93qlwghaj6arh4p7c5n89uzcee5",
    fractionalDigits: 5,
    ticker: "ASH",
  },
  {
    contractAddress: "cosmos1hqrdl6wstt8qzshwc6mrumpjk9338k0lr4dqxd",
    fractionalDigits: 0,
    ticker: "BASH",
  },
  {
    contractAddress: "cosmos18r5szma8hm93pvx6lwpjwyxruw27e0k5uw835c",
    fractionalDigits: 18,
    ticker: "CASH",
  },
];

describe("CosmWasmCodec", () => {
  const codec = new CosmWasmCodec(defaultPrefix, defaultBankTokens, defaultErc20Tokens);

  describe("isValidAddress", () => {
    it("accepts valid addresses", () => {
      expect(codec.isValidAddress("cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6")).toEqual(true);
      expect(codec.isValidAddress("cosmosvalcons10q82zkzzmaku5lazhsvxv7hsg4ntpuhdwadmss")).toEqual(true);
      expect(codec.isValidAddress("cosmosvaloper17mggn4znyeyg25wd7498qxl7r2jhgue8u4qjcq")).toEqual(true);
    });

    it("rejects invalid addresses", () => {
      // Bad size
      expect(codec.isValidAddress("cosmos10q82zkzzmaku5lazhsvxv7hsg4ntpuhh8289f")).toEqual(false);
      // Bad checksum
      expect(codec.isValidAddress("cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs7")).toEqual(false);
      // Bad prefix
      expect(codec.isValidAddress("cosmot10q82zkzzmaku5lazhsvxv7hsg4ntpuhd8j5266")).toEqual(false);
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

    it("works for ERC20 send", () => {
      const bashSendTx: SendTransaction = {
        kind: "bcp/send",
        chainId: chainId,
        sender: "cosmos1txqfn5jmcts0x0q7krdxj8tgf98tj0965vqlmq" as Address,
        recipient: "cosmos1dddd" as Address,
        memo: "My first BASH payment",
        amount: {
          fractionalDigits: 0,
          quantity: "345",
          tokenTicker: "BASH" as TokenTicker,
        },
        fee: {
          tokens: {
            fractionalDigits: 6,
            quantity: "2500",
            tokenTicker: "ATOM" as TokenTicker,
          },
          gasLimit: "100000",
        },
      };

      const expected = {
        bytes: toUtf8(
          '{"account_number":"0","chain_id":"cosmoshub-3","fee":{"amount":[{"amount":"2500","denom":"uatom"}],"gas":"100000"},"memo":"My first BASH payment","msgs":[{"type":"wasm/execute","value":{"contract":"cosmos1hqrdl6wstt8qzshwc6mrumpjk9338k0lr4dqxd","msg":{"transfer":{"amount":"345","recipient":"cosmos1dddd"}},"sender":"cosmos1txqfn5jmcts0x0q7krdxj8tgf98tj0965vqlmq","sent_funds":[]}}],"sequence":"99"}',
        ),
        prehashType: PrehashType.Sha256,
      };

      expect(codec.bytesToSign(bashSendTx, nonce)).toEqual(expected);
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
