/* eslint-disable @typescript-eslint/camelcase */
import {
  Address,
  Algorithm,
  Amount,
  ChainId,
  Nonce,
  PubkeyBytes,
  SendTransaction,
  SignatureBytes,
  SignedTransaction,
  TokenTicker,
} from "@iov/bcp";
import { Encoding } from "@iov/encoding";

import {
  buildSignedTx,
  buildUnsignedTx,
  encodeFee,
  encodeFullSignature,
  encodePubkey,
  toBankCoin,
  toErc20Amount,
} from "./encode";
import { BankTokens, Erc20Token } from "./types";

const { fromBase64 } = Encoding;

describe("encode", () => {
  const atom = "ATOM" as TokenTicker;
  // https://rpc.cosmos.network:26657/tx?hash=0x2268EB5AB730B45F8426078827BB5BB49819CE2B0D74B2C1D191070BADB379F1&prove=true
  const defaultPubkey = {
    algo: Algorithm.Secp256k1,
    data: fromBase64("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP") as PubkeyBytes,
  };
  const defaultChainId = "not-used" as ChainId;
  const defaultSender = "cosmos1h806c7khnvmjlywdrkdgk2vrayy2mmvf9rxk2r" as Address;
  const defaultRecipient = "cosmos1z7g5w84ynmjyg0kqpahdjqpj7yq34v3suckp0e" as Address;
  const defaultAmount: Amount = {
    fractionalDigits: 6,
    quantity: "11657995",
    tokenTicker: atom,
  };
  const defaultMemo = "hello cosmos hub";
  const defaultTokens: BankTokens = [
    {
      fractionalDigits: 6,
      ticker: "ATOM",
      denom: "uatom",
    },
  ];
  const defaultErc20Tokens: Erc20Token[] = [
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

  describe("encodePubkey", () => {
    it("works for compressed public key", () => {
      expect(encodePubkey(defaultPubkey)).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
      });
    });
  });

  describe("toErc20Amount", () => {
    const [ash, bash] = defaultErc20Tokens;

    it("encodes an amount", () => {
      const amount: Amount = {
        quantity: "789",
        fractionalDigits: 0,
        tokenTicker: "BASH" as TokenTicker,
      };
      expect(toErc20Amount(amount, bash)).toEqual("789");
    });

    it("throws on ticker mismatch", () => {
      const amount: Amount = {
        quantity: "789",
        fractionalDigits: 0,
        tokenTicker: "BASH" as TokenTicker,
      };
      expect(() => toErc20Amount(amount, ash)).toThrowError(/ticker mismatch/i);
    });

    it("throws on ticker mismatch", () => {
      const amount: Amount = {
        quantity: "789",
        fractionalDigits: 2,
        tokenTicker: "BASH" as TokenTicker,
      };
      expect(() => toErc20Amount(amount, bash)).toThrowError(/fractional digits mismatch/i);
    });
  });

  describe("toBankCoin", () => {
    it("encodes an amount", () => {
      expect(toBankCoin(defaultAmount, defaultTokens)).toEqual({
        denom: "uatom",
        amount: "11657995",
      });
    });
  });

  describe("encodeFee", () => {
    it("throws without tokens", () => {
      const fee = {
        gasLimit: "200000",
      };
      expect(() => encodeFee(fee, defaultTokens)).toThrowError(/cannot encode fee without tokens/i);
    });

    it("throws without gas limit", () => {
      const fee = {
        tokens: {
          fractionalDigits: 6,
          quantity: "5000",
          tokenTicker: atom,
        },
      };
      expect(() => encodeFee(fee, defaultTokens)).toThrowError(/cannot encode fee without gas limit/i);
    });

    it("encodes a fee", () => {
      const fee = {
        tokens: {
          fractionalDigits: 6,
          quantity: "5000",
          tokenTicker: atom,
        },
        gasLimit: "200000",
      };
      expect(encodeFee(fee, defaultTokens)).toEqual({
        amount: [{ denom: "uatom", amount: "5000" }],
        gas: "200000",
      });
    });
  });

  describe("encodeFullSignature", () => {
    it("encodes a full signature", () => {
      const signature = {
        nonce: 0 as Nonce,
        pubkey: {
          algo: Algorithm.Secp256k1,
          data: fromBase64("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP") as PubkeyBytes,
        },
        signature: fromBase64(
          "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
        ) as SignatureBytes,
      };
      expect(encodeFullSignature(signature)).toEqual({
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
        },
        signature: "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
      });
    });

    it("compresses uncompressed public keys", () => {
      const signature = {
        nonce: 0 as Nonce,
        pubkey: {
          algo: Algorithm.Secp256k1,
          data: fromBase64(
            "BE8EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQE7WHpoHoNswYeoFkuYpYSKK4mzFzMV/dB0DVAy4lnNU=",
          ) as PubkeyBytes,
        },
        signature: fromBase64(
          "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
        ) as SignatureBytes,
      };
      expect(encodeFullSignature(signature)).toEqual({
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
        },
        signature: "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
      });
    });

    it("removes recovery values from signature data", () => {
      const signature = {
        nonce: 0 as Nonce,
        pubkey: {
          algo: Algorithm.Secp256k1,
          data: fromBase64("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP") as PubkeyBytes,
        },
        signature: Uint8Array.from([
          ...fromBase64(
            "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
          ),
          99,
        ]) as SignatureBytes,
      };
      expect(encodeFullSignature(signature)).toEqual({
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
        },
        signature: "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
      });
    });
  });

  describe("buildUnsignedTx", () => {
    it("throws for unsupported transaction", () => {
      const tx = {
        kind: "bns/return_escrow",
        chainId: defaultChainId,
        escrowId: "defg",
      };
      expect(() => buildUnsignedTx(tx, defaultTokens)).toThrowError(
        /received transaction of unsupported kind/i,
      );
    });

    it("builds a send transaction without fee", () => {
      const tx = {
        kind: "bcp/send",
        chainId: defaultChainId,
        amount: defaultAmount,
        sender: defaultSender,
        recipient: defaultRecipient,
        memo: defaultMemo,
      };
      expect(buildUnsignedTx(tx, defaultTokens)).toEqual({
        type: "cosmos-sdk/StdTx",
        value: {
          msg: [
            {
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
            },
          ],
          signatures: [],
          memo: defaultMemo,
          fee: {
            amount: [],
            gas: "",
          },
        },
      });
    });

    it("builds a send transaction with fee", () => {
      const tx = {
        kind: "bcp/send",
        chainId: defaultChainId,
        amount: defaultAmount,
        sender: defaultSender,
        recipient: defaultRecipient,
        memo: defaultMemo,
        fee: {
          tokens: {
            fractionalDigits: 6,
            quantity: "5000",
            tokenTicker: atom,
          },
          gasLimit: "200000",
        },
      };
      expect(buildUnsignedTx(tx, defaultTokens)).toEqual({
        type: "cosmos-sdk/StdTx",
        value: {
          msg: [
            {
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
            },
          ],
          fee: {
            amount: [{ denom: "uatom", amount: "5000" }],
            gas: "200000",
          },
          signatures: [],
          memo: defaultMemo,
        },
      });
    });

    it("works for ERC20 send", () => {
      const bashSendTx: SendTransaction = {
        kind: "bcp/send",
        chainId: defaultChainId,
        sender: "cosmos1txqfn5jmcts0x0q7krdxj8tgf98tj0965vqlmq" as Address,
        recipient: "cosmos1dddd" as Address,
        memo: defaultMemo,
        amount: {
          fractionalDigits: 0,
          quantity: "345",
          tokenTicker: "BASH" as TokenTicker,
        },
        fee: {
          tokens: {
            fractionalDigits: 6,
            quantity: "3333",
            tokenTicker: "ATOM" as TokenTicker,
          },
          gasLimit: "234000",
        },
      };
      expect(buildUnsignedTx(bashSendTx, defaultTokens, defaultErc20Tokens)).toEqual({
        type: "cosmos-sdk/StdTx",
        value: {
          msg: [
            {
              type: "wasm/execute",
              value: {
                sender: "cosmos1txqfn5jmcts0x0q7krdxj8tgf98tj0965vqlmq",
                contract: "cosmos1hqrdl6wstt8qzshwc6mrumpjk9338k0lr4dqxd",
                msg: {
                  transfer: {
                    recipient: "cosmos1dddd",
                    amount: "345",
                  },
                },
                sent_funds: [],
              },
            },
          ],
          fee: {
            amount: [{ denom: "uatom", amount: "3333" }],
            gas: "234000",
          },
          signatures: [],
          memo: defaultMemo,
        },
      });
    });
  });

  describe("buildSignedTx", () => {
    it("builds a send transaction", () => {
      const tx: SignedTransaction<SendTransaction> = {
        transaction: {
          kind: "bcp/send",
          chainId: defaultChainId,
          amount: defaultAmount,
          sender: defaultSender,
          recipient: defaultRecipient,
          memo: defaultMemo,
          fee: {
            tokens: {
              fractionalDigits: 6,
              quantity: "5000",
              tokenTicker: atom,
            },
            gasLimit: "200000",
          },
        },
        signatures: [
          {
            nonce: 0 as Nonce,
            pubkey: {
              algo: Algorithm.Secp256k1,
              data: fromBase64("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP") as PubkeyBytes,
            },
            signature: fromBase64(
              "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
            ) as SignatureBytes,
          },
        ],
      };
      expect(buildSignedTx(tx, defaultTokens)).toEqual({
        type: "cosmos-sdk/StdTx",
        value: {
          msg: [
            {
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
            },
          ],
          fee: {
            amount: [{ denom: "uatom", amount: "5000" }],
            gas: "200000",
          },
          signatures: [
            {
              pub_key: {
                type: "tendermint/PubKeySecp256k1",
                value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
              },
              signature:
                "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
            },
          ],
          memo: defaultMemo,
        },
      });
    });
  });
});
