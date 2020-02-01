/* eslint-disable @typescript-eslint/camelcase */
import { Address, Algorithm, TokenTicker } from "@iov/bcp";
import { Encoding } from "@iov/encoding";
import amino from "@tendermint/amino-js";

import {
  decodeAmount,
  decodeFullSignature,
  decodePubkey,
  decodeSignature,
  parseFee,
  parseMsg,
  parseTx,
  parseTxsResponse,
} from "./decode";
import { chainId, nonce, signedTxJson, txId } from "./testdata.spec";
import data from "./testdata/cosmoshub.json";
import { TokenInfos } from "./types";

const { fromBase64 } = Encoding;

describe("decode", () => {
  const defaultPubkey = {
    algo: Algorithm.Secp256k1,
    data: fromBase64("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP"),
  };
  const defaultSignature = fromBase64(
    "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
  );
  const defaultFullSignature = {
    nonce: nonce,
    pubkey: defaultPubkey,
    signature: defaultSignature,
  };
  const defaultAmount = {
    fractionalDigits: 6,
    quantity: "11657995",
    tokenTicker: "ATOM" as TokenTicker,
  };
  const defaultSendTransaction = {
    kind: "bcp/send" as const,
    chainId: chainId,
    sender: "cosmos1h806c7khnvmjlywdrkdgk2vrayy2mmvf9rxk2r" as Address,
    recipient: "cosmos1z7g5w84ynmjyg0kqpahdjqpj7yq34v3suckp0e" as Address,
    amount: defaultAmount,
  };
  const defaultFee = {
    tokens: {
      fractionalDigits: 6,
      quantity: "5000",
      tokenTicker: "ATOM" as TokenTicker,
    },
    gasLimit: "200000",
  };
  const defaultTokens: TokenInfos = [
    {
      fractionalDigits: 6,
      ticker: "ATOM",
      denom: "uatom",
    },
  ];

  describe("decodePubkey", () => {
    it("works", () => {
      const pubkey = {
        type: "tendermint/PubKeySecp256k1",
        value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
      };
      expect(decodePubkey(pubkey)).toEqual(defaultPubkey);
    });
  });

  describe("decodeSignature", () => {
    it("works", () => {
      const signature =
        "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==";
      expect(decodeSignature(signature)).toEqual(defaultSignature);
    });
  });

  describe("decodeFullSignature", () => {
    it("works", () => {
      const fullSignature = {
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
        },
        signature: "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
      };
      expect(decodeFullSignature(fullSignature, nonce)).toEqual(defaultFullSignature);
    });
  });

  describe("decodeAmount", () => {
    it("works", () => {
      const amount: amino.Coin = {
        denom: "uatom",
        amount: "11657995",
      };
      expect(decodeAmount(defaultTokens, amount)).toEqual(defaultAmount);
    });
  });

  describe("parseMsg", () => {
    it("works", () => {
      const msg: amino.Msg = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: "cosmos1h806c7khnvmjlywdrkdgk2vrayy2mmvf9rxk2r",
          to_address: "cosmos1z7g5w84ynmjyg0kqpahdjqpj7yq34v3suckp0e",
          amount: [
            {
              denom: "uatom",
              amount: "11657995",
            },
          ],
        },
      };
      expect(parseMsg(msg, chainId, defaultTokens)).toEqual(defaultSendTransaction);
    });
  });

  describe("parseFee", () => {
    it("works", () => {
      const fee = {
        amount: [
          {
            denom: "uatom",
            amount: "5000",
          },
        ],
        gas: "200000",
      };
      expect(parseFee(fee, defaultTokens)).toEqual(defaultFee);
    });
  });

  describe("parseTx", () => {
    it("works", () => {
      expect(parseTx(data.tx, chainId, nonce, defaultTokens)).toEqual(signedTxJson);
    });
  });

  describe("parseTxsResponse", () => {
    it("works", () => {
      const currentHeight = 2923;
      const txsResponse = {
        height: "2823",
        txhash: txId,
        raw_log: '[{"msg_index":0,"success":true,"log":""}]',
        tx: data.tx,
      };
      const expected = {
        ...signedTxJson,
        height: 2823,
        confirmations: 101,
        transactionId: txId,
        log: '[{"msg_index":0,"success":true,"log":""}]',
      };
      expect(parseTxsResponse(chainId, currentHeight, nonce, txsResponse, defaultTokens)).toEqual(expected);
    });
  });
});
