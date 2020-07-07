/* eslint-disable @typescript-eslint/camelcase */
import { assert, sleep } from "@cosmjs/utils";

import { rawSecp256k1PubkeyToAddress } from "../address";
import { Coin } from "../coins";
import { isPostTxFailure } from "../cosmosclient";
import { makeSignBytes } from "../encoding";
import { parseLogs } from "../logs";
import { MsgSend } from "../msgs";
import { makeCosmoshubPath, Secp256k1Pen } from "../pen";
import { SigningCosmosClient } from "../signingcosmosclient";
import cosmoshub from "../testdata/cosmoshub.json";
import {
  faucet,
  makeRandomAddress,
  makeSignedTx,
  nonNegativeIntegerMatcher,
  pendingWithoutWasmd,
  tendermintIdMatcher,
  wasmd,
  wasmdEnabled,
} from "../testutils.spec";
import { StdFee } from "../types";
import { TxsResponse } from "./base";
import { LcdApiArray, LcdClient, normalizeArray } from "./lcdclient";

/** Deployed as part of scripts/wasmd/init.sh */
export const deployedErc20 = {
  codeId: 1,
  source: "https://crates.io/api/v1/crates/cw-erc20/0.5.1/download",
  builder: "cosmwasm/rust-optimizer:0.8.0",
  checksum: "3e97bf88bd960fee5e5959c77b972eb2927690bc10160792741b174f105ec0c5",
  instances: [
    "cosmos18vd8fpwxzck93qlwghaj6arh4p7c5n89uzcee5", // HASH
    "cosmos1hqrdl6wstt8qzshwc6mrumpjk9338k0lr4dqxd", // ISA
    "cosmos18r5szma8hm93pvx6lwpjwyxruw27e0k5uw835c", // JADE
  ],
};

describe("LcdClient", () => {
  const defaultRecipientAddress = makeRandomAddress();

  it("can be constructed", () => {
    const client = new LcdClient(wasmd.endpoint);
    expect(client).toBeTruthy();
  });

  describe("withModules", () => {
    interface CodeInfo {
      readonly id: number;
      /** Bech32 account address */
      readonly creator: string;
      /** Hex-encoded sha256 hash of the code stored here */
      readonly data_hash: string;
      readonly source?: string;
      readonly builder?: string;
    }

    type WasmResponse<T> = WasmSuccess<T> | WasmError;

    interface WasmSuccess<T> {
      readonly height: string;
      readonly result: T;
    }

    interface WasmError {
      readonly error: string;
    }

    function isWasmError<T>(resp: WasmResponse<T>): resp is WasmError {
      return (resp as WasmError).error !== undefined;
    }

    function unwrapWasmResponse<T>(response: WasmResponse<T>): T {
      if (isWasmError(response)) {
        throw new Error(response.error);
      }
      return response.result;
    }

    interface WasmModule extends Record<string, () => any> {
      listCodeInfo: () => Promise<readonly CodeInfo[]>;
    }

    it("works for no modules", async () => {
      const client = LcdClient.withModules({ apiUrl: wasmd.endpoint });
      expect(client).toBeTruthy();
    });

    it("works for one module", async () => {
      pendingWithoutWasmd();
      function wasmClientRegisterer(base: LcdClient): WasmModule {
        return {
          listCodeInfo: async (): Promise<readonly CodeInfo[]> => {
            const path = `/wasm/code`;
            const responseData = (await base.get(path)) as WasmResponse<LcdApiArray<CodeInfo>>;
            return normalizeArray(unwrapWasmResponse(responseData));
          },
        };
      }

      const client = LcdClient.withModules({ apiUrl: wasmd.endpoint }, wasmClientRegisterer);
      const codes = await client.listCodeInfo();
      expect(codes.length).toBeGreaterThanOrEqual(3);
      expect(codes[0].id).toEqual(deployedErc20.codeId);
      expect(codes[0].data_hash).toEqual(deployedErc20.checksum.toUpperCase());
      expect(codes[0].builder).toEqual(deployedErc20.builder);
      expect(codes[0].source).toEqual(deployedErc20.source);
    });

    it("works for two modules", async () => {
      pendingWithoutWasmd();
      function registerWasmModule(base: LcdClient): WasmModule {
        return {
          listCodeInfo: async (): Promise<readonly CodeInfo[]> => {
            const path = `/wasm/code`;
            const responseData = (await base.get(path)) as WasmResponse<LcdApiArray<CodeInfo>>;
            return normalizeArray(unwrapWasmResponse(responseData));
          },
        };
      }

      interface TotalSupplyAllReponse {
        readonly height: string;
        readonly result: LcdApiArray<Coin>;
      }

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      function setupSupplyModule(base: LcdClient) {
        return {
          totalSupplyAll: async (): Promise<TotalSupplyAllReponse> => {
            const path = `/supply/total`;
            return (await base.get(path)) as TotalSupplyAllReponse;
          },
        };
      }

      const client = LcdClient.withModules({ apiUrl: wasmd.endpoint }, registerWasmModule, setupSupplyModule);
      const codes = await client.listCodeInfo();
      expect(codes.length).toBeGreaterThanOrEqual(3);
      expect(codes[0].id).toEqual(deployedErc20.codeId);
      expect(codes[0].data_hash).toEqual(deployedErc20.checksum.toUpperCase());
      expect(codes[0].builder).toEqual(deployedErc20.builder);
      expect(codes[0].source).toEqual(deployedErc20.source);
      const supply = await client.totalSupplyAll();
      expect(supply).toEqual({
        height: jasmine.stringMatching(/^[0-9]+$/),
        result: [
          {
            amount: jasmine.stringMatching(/^[0-9]+$/),
            denom: "ucosm",
          },
          {
            amount: jasmine.stringMatching(/^[0-9]+$/),
            denom: "ustake",
          },
        ],
      });
    });
  });

  // The /txs endpoints

  describe("txById", () => {
    let successful:
      | {
          readonly sender: string;
          readonly recipient: string;
          readonly hash: string;
        }
      | undefined;
    let unsuccessful:
      | {
          readonly sender: string;
          readonly recipient: string;
          readonly hash: string;
        }
      | undefined;

    beforeAll(async () => {
      if (wasmdEnabled()) {
        const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
        const client = new SigningCosmosClient(wasmd.endpoint, faucet.address, (signBytes) =>
          pen.sign(signBytes),
        );

        {
          const recipient = makeRandomAddress();
          const transferAmount = {
            denom: "ucosm",
            amount: "1234567",
          };
          const result = await client.sendTokens(recipient, [transferAmount]);
          successful = {
            sender: faucet.address,
            recipient: recipient,
            hash: result.transactionHash,
          };
        }

        {
          const memo = "Sending more than I can afford";
          const recipient = makeRandomAddress();
          const transferAmount = [
            {
              denom: "ucosm",
              amount: "123456700000000",
            },
          ];
          const sendMsg: MsgSend = {
            type: "cosmos-sdk/MsgSend",
            value: {
              // eslint-disable-next-line @typescript-eslint/camelcase
              from_address: faucet.address,
              // eslint-disable-next-line @typescript-eslint/camelcase
              to_address: recipient,
              amount: transferAmount,
            },
          };
          const fee = {
            amount: [
              {
                denom: "ucosm",
                amount: "2000",
              },
            ],
            gas: "80000", // 80k
          };
          const { accountNumber, sequence } = await client.getNonce();
          const chainId = await client.getChainId();
          const signBytes = makeSignBytes([sendMsg], fee, chainId, memo, accountNumber, sequence);
          const signature = await pen.sign(signBytes);
          const signedTx = {
            msg: [sendMsg],
            fee: fee,
            memo: memo,
            signatures: [signature],
          };
          const transactionId = await client.getIdentifier({ type: "cosmos-sdk/StdTx", value: signedTx });
          const result = await client.postTx(signedTx);
          assert(isPostTxFailure(result));
          unsuccessful = {
            sender: faucet.address,
            recipient: recipient,
            hash: transactionId,
          };
        }

        await sleep(75); // wait until transactions are indexed
      }
    });

    it("works for successful transaction", async () => {
      pendingWithoutWasmd();
      assert(successful);
      const client = new LcdClient(wasmd.endpoint);
      const result = await client.txById(successful.hash);
      expect(result.height).toBeGreaterThanOrEqual(1);
      expect(result.txhash).toEqual(successful.hash);
      expect(result.codespace).toBeUndefined();
      expect(result.code).toBeUndefined();
      const logs = parseLogs(result.logs);
      expect(logs).toEqual([
        {
          msg_index: 0,
          log: "",
          events: [
            {
              type: "message",
              attributes: [
                { key: "action", value: "send" },
                { key: "sender", value: successful.sender },
                { key: "module", value: "bank" },
              ],
            },
            {
              type: "transfer",
              attributes: [
                { key: "recipient", value: successful.recipient },
                { key: "sender", value: successful.sender },
                { key: "amount", value: "1234567ucosm" },
              ],
            },
          ],
        },
      ]);
    });

    it("works for unsuccessful transaction", async () => {
      pendingWithoutWasmd();
      assert(unsuccessful);
      const client = new LcdClient(wasmd.endpoint);
      const result = await client.txById(unsuccessful.hash);
      expect(result.height).toBeGreaterThanOrEqual(1);
      expect(result.txhash).toEqual(unsuccessful.hash);
      expect(result.codespace).toEqual("sdk");
      expect(result.code).toEqual(5);
      expect(result.logs).toBeUndefined();
      expect(result.raw_log).toContain("insufficient funds");
    });
  });

  describe("txsQuery", () => {
    let posted:
      | {
          readonly sender: string;
          readonly recipient: string;
          readonly hash: string;
          readonly height: number;
          readonly tx: TxsResponse;
        }
      | undefined;

    beforeAll(async () => {
      if (wasmdEnabled()) {
        const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
        const client = new SigningCosmosClient(wasmd.endpoint, faucet.address, (signBytes) =>
          pen.sign(signBytes),
        );

        const recipient = makeRandomAddress();
        const transferAmount = [
          {
            denom: "ucosm",
            amount: "1234567",
          },
        ];
        const result = await client.sendTokens(recipient, transferAmount);

        await sleep(75); // wait until tx is indexed
        const txDetails = await new LcdClient(wasmd.endpoint).txById(result.transactionHash);
        posted = {
          sender: faucet.address,
          recipient: recipient,
          hash: result.transactionHash,
          height: Number.parseInt(txDetails.height, 10),
          tx: txDetails,
        };
      }
    });

    it("can query transactions by height", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new LcdClient(wasmd.endpoint);
      const result = await client.txsQuery(`tx.height=${posted.height}&limit=26`);
      expect(result).toEqual({
        count: jasmine.stringMatching(/^(1|2|3|4|5)$/), // 1-5 transactions as string
        limit: "26",
        page_number: "1",
        page_total: "1",
        total_count: jasmine.stringMatching(/^(1|2|3|4|5)$/), // 1-5 transactions as string
        txs: jasmine.arrayContaining([posted.tx]),
      });
    });

    it("can query transactions by ID", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new LcdClient(wasmd.endpoint);
      const result = await client.txsQuery(`tx.hash=${posted.hash}&limit=26`);
      expect(result).toEqual({
        count: "1",
        limit: "26",
        page_number: "1",
        page_total: "1",
        total_count: "1",
        txs: [posted.tx],
      });
    });

    it("can query transactions by sender", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new LcdClient(wasmd.endpoint);
      const result = await client.txsQuery(`message.sender=${posted.sender}&limit=200`);
      expect(parseInt(result.count, 10)).toBeGreaterThanOrEqual(1);
      expect(parseInt(result.limit, 10)).toEqual(200);
      expect(parseInt(result.page_number, 10)).toEqual(1);
      expect(parseInt(result.page_total, 10)).toEqual(1);
      expect(parseInt(result.total_count, 10)).toBeGreaterThanOrEqual(1);
      expect(result.txs.length).toBeGreaterThanOrEqual(1);
      expect(result.txs[result.txs.length - 1]).toEqual(posted.tx);
    });

    it("can query transactions by recipient", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new LcdClient(wasmd.endpoint);
      const result = await client.txsQuery(`transfer.recipient=${posted.recipient}&limit=200`);
      expect(parseInt(result.count, 10)).toEqual(1);
      expect(parseInt(result.limit, 10)).toEqual(200);
      expect(parseInt(result.page_number, 10)).toEqual(1);
      expect(parseInt(result.page_total, 10)).toEqual(1);
      expect(parseInt(result.total_count, 10)).toEqual(1);
      expect(result.txs.length).toBeGreaterThanOrEqual(1);
      expect(result.txs[result.txs.length - 1]).toEqual(posted.tx);
    });

    it("can filter by tx.hash and tx.minheight", async () => {
      pending("This combination is broken 🤷‍♂️. Handle client-side at higher level.");
      pendingWithoutWasmd();
      assert(posted);
      const client = new LcdClient(wasmd.endpoint);
      const hashQuery = `tx.hash=${posted.hash}`;

      {
        const { count } = await client.txsQuery(`${hashQuery}&tx.minheight=0`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${hashQuery}&tx.minheight=${posted.height - 1}`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${hashQuery}&tx.minheight=${posted.height}`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${hashQuery}&tx.minheight=${posted.height + 1}`);
        expect(count).toEqual("0");
      }
    });

    it("can filter by recipient and tx.minheight", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new LcdClient(wasmd.endpoint);
      const recipientQuery = `transfer.recipient=${posted.recipient}`;

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.minheight=0`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.minheight=${posted.height - 1}`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.minheight=${posted.height}`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.minheight=${posted.height + 1}`);
        expect(count).toEqual("0");
      }
    });

    it("can filter by recipient and tx.maxheight", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new LcdClient(wasmd.endpoint);
      const recipientQuery = `transfer.recipient=${posted.recipient}`;

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.maxheight=9999999999999`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.maxheight=${posted.height + 1}`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.maxheight=${posted.height}`);
        expect(count).toEqual("1");
      }

      {
        const { count } = await client.txsQuery(`${recipientQuery}&tx.maxheight=${posted.height - 1}`);
        expect(count).toEqual("0");
      }
    });
  });

  describe("encodeTx", () => {
    it("works for cosmoshub example", async () => {
      pendingWithoutWasmd();
      const client = new LcdClient(wasmd.endpoint);
      const response = await client.encodeTx(cosmoshub.tx);
      expect(response).toEqual(
        jasmine.objectContaining({
          tx: cosmoshub.tx_data,
        }),
      );
    });
  });

  describe("postTx", () => {
    it("can send tokens", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);

      const memo = "My first contract on chain";
      const theMsg: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: faucet.address,
          to_address: defaultRecipientAddress,
          amount: [
            {
              denom: "ucosm",
              amount: "1234567",
            },
          ],
        },
      };

      const fee: StdFee = {
        amount: [
          {
            amount: "5000",
            denom: "ucosm",
          },
        ],
        gas: "890000",
      };

      const client = new LcdClient(wasmd.endpoint);
      const { account_number, sequence } = (await client.authAccounts(faucet.address)).result.value;

      const signBytes = makeSignBytes([theMsg], fee, wasmd.chainId, memo, account_number, sequence);
      const signature = await pen.sign(signBytes);
      const signedTx = makeSignedTx(theMsg, fee, memo, signature);
      const result = await client.postTx(signedTx);
      expect(result.code).toBeUndefined();
      expect(result).toEqual({
        height: jasmine.stringMatching(nonNegativeIntegerMatcher),
        txhash: jasmine.stringMatching(tendermintIdMatcher),
        // code is not set
        raw_log: jasmine.stringMatching(/^\[.+\]$/i),
        logs: jasmine.any(Array),
        gas_wanted: jasmine.stringMatching(nonNegativeIntegerMatcher),
        gas_used: jasmine.stringMatching(nonNegativeIntegerMatcher),
      });
    });

    it("can't send transaction with additional signatures", async () => {
      pendingWithoutWasmd();
      const account1 = await Secp256k1Pen.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(0));
      const account2 = await Secp256k1Pen.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(1));
      const account3 = await Secp256k1Pen.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(2));
      const address1 = rawSecp256k1PubkeyToAddress(account1.pubkey, "cosmos");
      const address2 = rawSecp256k1PubkeyToAddress(account2.pubkey, "cosmos");
      const address3 = rawSecp256k1PubkeyToAddress(account3.pubkey, "cosmos");

      const memo = "My first contract on chain";
      const theMsg: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: address1,
          to_address: defaultRecipientAddress,
          amount: [
            {
              denom: "ucosm",
              amount: "1234567",
            },
          ],
        },
      };

      const fee: StdFee = {
        amount: [
          {
            amount: "5000",
            denom: "ucosm",
          },
        ],
        gas: "890000",
      };

      const client = new LcdClient(wasmd.endpoint);
      const { account_number: an1, sequence: sequence1 } = (await client.authAccounts(address1)).result.value;
      const { account_number: an2, sequence: sequence2 } = (await client.authAccounts(address2)).result.value;
      const { account_number: an3, sequence: sequence3 } = (await client.authAccounts(address3)).result.value;

      const signBytes1 = makeSignBytes([theMsg], fee, wasmd.chainId, memo, an1, sequence1);
      const signBytes2 = makeSignBytes([theMsg], fee, wasmd.chainId, memo, an2, sequence2);
      const signBytes3 = makeSignBytes([theMsg], fee, wasmd.chainId, memo, an3, sequence3);
      const signature1 = await account1.sign(signBytes1);
      const signature2 = await account2.sign(signBytes2);
      const signature3 = await account3.sign(signBytes3);
      const signedTx = {
        msg: [theMsg],
        fee: fee,
        memo: memo,
        signatures: [signature1, signature2, signature3],
      };
      const postResult = await client.postTx(signedTx);
      expect(postResult.code).toEqual(4);
      expect(postResult.raw_log).toContain("wrong number of signers");
    });

    it("can send multiple messages with one signature", async () => {
      pendingWithoutWasmd();
      const account1 = await Secp256k1Pen.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(0));
      const address1 = rawSecp256k1PubkeyToAddress(account1.pubkey, "cosmos");

      const memo = "My first contract on chain";
      const msg1: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: address1,
          to_address: defaultRecipientAddress,
          amount: [
            {
              denom: "ucosm",
              amount: "1234567",
            },
          ],
        },
      };
      const msg2: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: address1,
          to_address: defaultRecipientAddress,
          amount: [
            {
              denom: "ucosm",
              amount: "7654321",
            },
          ],
        },
      };

      const fee: StdFee = {
        amount: [
          {
            amount: "5000",
            denom: "ucosm",
          },
        ],
        gas: "890000",
      };

      const client = new LcdClient(wasmd.endpoint);
      const { account_number, sequence } = (await client.authAccounts(address1)).result.value;

      const signBytes = makeSignBytes([msg1, msg2], fee, wasmd.chainId, memo, account_number, sequence);
      const signature1 = await account1.sign(signBytes);
      const signedTx = {
        msg: [msg1, msg2],
        fee: fee,
        memo: memo,
        signatures: [signature1],
      };
      const postResult = await client.postTx(signedTx);
      expect(postResult.code).toBeUndefined();
    });

    it("can send multiple messages with multiple signatures", async () => {
      pendingWithoutWasmd();
      const account1 = await Secp256k1Pen.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(0));
      const account2 = await Secp256k1Pen.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(1));
      const address1 = rawSecp256k1PubkeyToAddress(account1.pubkey, "cosmos");
      const address2 = rawSecp256k1PubkeyToAddress(account2.pubkey, "cosmos");

      const memo = "My first contract on chain";
      const msg1: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: address1,
          to_address: defaultRecipientAddress,
          amount: [
            {
              denom: "ucosm",
              amount: "1234567",
            },
          ],
        },
      };
      const msg2: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: address2,
          to_address: defaultRecipientAddress,
          amount: [
            {
              denom: "ucosm",
              amount: "7654321",
            },
          ],
        },
      };

      const fee: StdFee = {
        amount: [
          {
            amount: "5000",
            denom: "ucosm",
          },
        ],
        gas: "890000",
      };

      const client = new LcdClient(wasmd.endpoint);
      const { account_number: an1, sequence: sequence1 } = (await client.authAccounts(address1)).result.value;
      const { account_number: an2, sequence: sequence2 } = (await client.authAccounts(address2)).result.value;

      const signBytes1 = makeSignBytes([msg2, msg1], fee, wasmd.chainId, memo, an1, sequence1);
      const signBytes2 = makeSignBytes([msg2, msg1], fee, wasmd.chainId, memo, an2, sequence2);
      const signature1 = await account1.sign(signBytes1);
      const signature2 = await account2.sign(signBytes2);
      const signedTx = {
        msg: [msg2, msg1],
        fee: fee,
        memo: memo,
        signatures: [signature2, signature1],
      };
      const postResult = await client.postTx(signedTx);
      expect(postResult.code).toBeUndefined();

      await sleep(500);
      const searched = await client.txsQuery(`tx.hash=${postResult.txhash}`);
      expect(searched.txs.length).toEqual(1);
      expect(searched.txs[0].tx.value.signatures).toEqual([signature2, signature1]);
    });

    it("can't send transaction with wrong signature order (1)", async () => {
      pendingWithoutWasmd();
      const account1 = await Secp256k1Pen.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(0));
      const account2 = await Secp256k1Pen.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(1));
      const address1 = rawSecp256k1PubkeyToAddress(account1.pubkey, "cosmos");
      const address2 = rawSecp256k1PubkeyToAddress(account2.pubkey, "cosmos");

      const memo = "My first contract on chain";
      const msg1: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: address1,
          to_address: defaultRecipientAddress,
          amount: [
            {
              denom: "ucosm",
              amount: "1234567",
            },
          ],
        },
      };
      const msg2: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: address2,
          to_address: defaultRecipientAddress,
          amount: [
            {
              denom: "ucosm",
              amount: "7654321",
            },
          ],
        },
      };

      const fee: StdFee = {
        amount: [
          {
            amount: "5000",
            denom: "ucosm",
          },
        ],
        gas: "890000",
      };

      const client = new LcdClient(wasmd.endpoint);
      const { account_number: an1, sequence: sequence1 } = (await client.authAccounts(address1)).result.value;
      const { account_number: an2, sequence: sequence2 } = (await client.authAccounts(address2)).result.value;

      const signBytes1 = makeSignBytes([msg1, msg2], fee, wasmd.chainId, memo, an1, sequence1);
      const signBytes2 = makeSignBytes([msg1, msg2], fee, wasmd.chainId, memo, an2, sequence2);
      const signature1 = await account1.sign(signBytes1);
      const signature2 = await account2.sign(signBytes2);
      const signedTx = {
        msg: [msg1, msg2],
        fee: fee,
        memo: memo,
        signatures: [signature2, signature1],
      };
      const postResult = await client.postTx(signedTx);
      expect(postResult.code).toEqual(8);
    });

    it("can't send transaction with wrong signature order (2)", async () => {
      pendingWithoutWasmd();
      const account1 = await Secp256k1Pen.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(0));
      const account2 = await Secp256k1Pen.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(1));
      const address1 = rawSecp256k1PubkeyToAddress(account1.pubkey, "cosmos");
      const address2 = rawSecp256k1PubkeyToAddress(account2.pubkey, "cosmos");

      const memo = "My first contract on chain";
      const msg1: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: address1,
          to_address: defaultRecipientAddress,
          amount: [
            {
              denom: "ucosm",
              amount: "1234567",
            },
          ],
        },
      };
      const msg2: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: address2,
          to_address: defaultRecipientAddress,
          amount: [
            {
              denom: "ucosm",
              amount: "7654321",
            },
          ],
        },
      };

      const fee: StdFee = {
        amount: [
          {
            amount: "5000",
            denom: "ucosm",
          },
        ],
        gas: "890000",
      };

      const client = new LcdClient(wasmd.endpoint);
      const { account_number: an1, sequence: sequence1 } = (await client.authAccounts(address1)).result.value;
      const { account_number: an2, sequence: sequence2 } = (await client.authAccounts(address2)).result.value;

      const signBytes1 = makeSignBytes([msg2, msg1], fee, wasmd.chainId, memo, an1, sequence1);
      const signBytes2 = makeSignBytes([msg2, msg1], fee, wasmd.chainId, memo, an2, sequence2);
      const signature1 = await account1.sign(signBytes1);
      const signature2 = await account2.sign(signBytes2);
      const signedTx = {
        msg: [msg2, msg1],
        fee: fee,
        memo: memo,
        signatures: [signature1, signature2],
      };
      const postResult = await client.postTx(signedTx);
      expect(postResult.code).toEqual(8);
    });
  });
});
