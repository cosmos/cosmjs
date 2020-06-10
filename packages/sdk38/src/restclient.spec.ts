/* eslint-disable @typescript-eslint/camelcase */
import { fromBase64 } from "@cosmjs/encoding";
import { assert, sleep } from "@cosmjs/utils";
import { ReadonlyDate } from "readonly-date";

import { rawSecp256k1PubkeyToAddress } from "./address";
import { isPostTxFailure } from "./cosmosclient";
import { makeSignBytes } from "./encoding";
import { parseLogs } from "./logs";
import { makeCosmoshubPath, Secp256k1Pen } from "./pen";
import { encodeBech32Pubkey } from "./pubkey";
import { RestClient, TxsResponse } from "./restclient";
import { SigningCosmosClient } from "./signingcosmosclient";
import cosmoshub from "./testdata/cosmoshub.json";
import {
  faucet,
  makeRandomAddress,
  nonNegativeIntegerMatcher,
  pendingWithoutWasmd,
  semverMatcher,
  tendermintAddressMatcher,
  tendermintIdMatcher,
  tendermintOptionalIdMatcher,
  tendermintShortHashMatcher,
  unused,
  wasmd,
  wasmdEnabled,
} from "./testutils.spec";
import { Msg, MsgSend, StdFee, StdSignature, StdTx } from "./types";

const emptyAddress = "cosmos1ltkhnmdcqemmd2tkhnx7qx66tq7e0wykw2j85k";

function makeSignedTx(firstMsg: Msg, fee: StdFee, memo: string, firstSignature: StdSignature): StdTx {
  return {
    msg: [firstMsg],
    fee: fee,
    memo: memo,
    signatures: [firstSignature],
  };
}

describe("RestClient", () => {
  it("can be constructed", () => {
    const client = new RestClient(wasmd.endpoint);
    expect(client).toBeTruthy();
  });

  // The /auth endpoints

  describe("authAccounts", () => {
    it("works for unused account without pubkey", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(wasmd.endpoint);
      const { height, result } = await client.authAccounts(unused.address);
      expect(height).toMatch(nonNegativeIntegerMatcher);
      expect(result).toEqual({
        type: "cosmos-sdk/Account",
        value: {
          address: unused.address,
          public_key: "", // not known to the chain
          coins: [
            {
              amount: "1000000000",
              denom: "ucosm",
            },
            {
              amount: "1000000000",
              denom: "ustake",
            },
          ],
          account_number: unused.accountNumber,
          sequence: 0,
        },
      });
    });

    // This fails in the first test run if you forget to run `./scripts/wasmd/init.sh`
    it("has correct pubkey for faucet", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(wasmd.endpoint);
      const { result } = await client.authAccounts(faucet.address);
      expect(result.value).toEqual(
        jasmine.objectContaining({
          public_key: encodeBech32Pubkey(faucet.pubkey, "cosmospub"),
        }),
      );
    });

    // This property is used by CosmWasmClient.getAccount
    it("returns empty address for non-existent account", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(wasmd.endpoint);
      const nonExistentAccount = makeRandomAddress();
      const { result } = await client.authAccounts(nonExistentAccount);
      expect(result).toEqual({
        type: "cosmos-sdk/Account",
        value: jasmine.objectContaining({ address: "" }),
      });
    });
  });

  // The /blocks endpoints

  describe("blocksLatest", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(wasmd.endpoint);
      const response = await client.blocksLatest();

      // id
      expect(response.block_id.hash).toMatch(tendermintIdMatcher);

      // header
      expect(response.block.header.version).toEqual({ block: "10", app: "0" });
      expect(parseInt(response.block.header.height, 10)).toBeGreaterThanOrEqual(1);
      expect(response.block.header.chain_id).toEqual(wasmd.chainId);
      expect(new ReadonlyDate(response.block.header.time).getTime()).toBeLessThan(ReadonlyDate.now());
      expect(new ReadonlyDate(response.block.header.time).getTime()).toBeGreaterThanOrEqual(
        ReadonlyDate.now() - 5_000,
      );
      expect(response.block.header.last_commit_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.last_block_id.hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.data_hash).toMatch(tendermintOptionalIdMatcher);
      expect(response.block.header.validators_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.next_validators_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.consensus_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.app_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.last_results_hash).toMatch(tendermintOptionalIdMatcher);
      expect(response.block.header.evidence_hash).toMatch(tendermintOptionalIdMatcher);
      expect(response.block.header.proposer_address).toMatch(tendermintAddressMatcher);

      // data
      expect(response.block.data.txs === null || Array.isArray(response.block.data.txs)).toEqual(true);
    });
  });

  describe("blocks", () => {
    it("works for block by height", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(wasmd.endpoint);
      const height = parseInt((await client.blocksLatest()).block.header.height, 10);
      const response = await client.blocks(height - 1);

      // id
      expect(response.block_id.hash).toMatch(tendermintIdMatcher);

      // header
      expect(response.block.header.version).toEqual({ block: "10", app: "0" });
      expect(response.block.header.height).toEqual(`${height - 1}`);
      expect(response.block.header.chain_id).toEqual(wasmd.chainId);
      expect(new ReadonlyDate(response.block.header.time).getTime()).toBeLessThan(ReadonlyDate.now());
      expect(new ReadonlyDate(response.block.header.time).getTime()).toBeGreaterThanOrEqual(
        ReadonlyDate.now() - 5_000,
      );
      expect(response.block.header.last_commit_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.last_block_id.hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.data_hash).toMatch(tendermintOptionalIdMatcher);
      expect(response.block.header.validators_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.next_validators_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.consensus_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.app_hash).toMatch(tendermintIdMatcher);
      expect(response.block.header.last_results_hash).toMatch(tendermintOptionalIdMatcher);
      expect(response.block.header.evidence_hash).toMatch(tendermintOptionalIdMatcher);
      expect(response.block.header.proposer_address).toMatch(tendermintAddressMatcher);

      // data
      expect(response.block.data.txs === null || Array.isArray(response.block.data.txs)).toEqual(true);
    });
  });

  // The /node_info endpoint

  describe("nodeInfo", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const client = new RestClient(wasmd.endpoint);
      const { node_info, application_version } = await client.nodeInfo();

      expect(node_info).toEqual({
        protocol_version: { p2p: "7", block: "10", app: "0" },
        id: jasmine.stringMatching(tendermintShortHashMatcher),
        listen_addr: "tcp://0.0.0.0:26656",
        network: wasmd.chainId,
        version: jasmine.stringMatching(/^0\.33\.[0-9]+$/),
        channels: "4020212223303800",
        moniker: wasmd.chainId,
        other: { tx_index: "on", rpc_address: "tcp://0.0.0.0:26657" },
      });
      expect(application_version).toEqual({
        name: "wasm",
        server_name: "wasmd",
        client_name: "wasmcli",
        version: jasmine.stringMatching(semverMatcher),
        commit: jasmine.stringMatching(tendermintShortHashMatcher),
        build_tags: "netgo,ledger",
        go: jasmine.stringMatching(/^go version go1\.[0-9]+\.[0-9]+ linux\/amd64$/),
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
      const client = new RestClient(wasmd.endpoint);
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
      const client = new RestClient(wasmd.endpoint);
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
        const txDetails = await new RestClient(wasmd.endpoint).txById(result.transactionHash);
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
      const client = new RestClient(wasmd.endpoint);
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
      const client = new RestClient(wasmd.endpoint);
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
      const client = new RestClient(wasmd.endpoint);
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
      const client = new RestClient(wasmd.endpoint);
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
      const client = new RestClient(wasmd.endpoint);
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
      const client = new RestClient(wasmd.endpoint);
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
      const client = new RestClient(wasmd.endpoint);
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
      const client = new RestClient(wasmd.endpoint);
      expect(await client.encodeTx(cosmoshub.tx)).toEqual(fromBase64(cosmoshub.tx_data));
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
          to_address: emptyAddress,
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

      const client = new RestClient(wasmd.endpoint);
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
          to_address: emptyAddress,
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

      const client = new RestClient(wasmd.endpoint);
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
          to_address: emptyAddress,
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
          to_address: emptyAddress,
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

      const client = new RestClient(wasmd.endpoint);
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
          to_address: emptyAddress,
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
          to_address: emptyAddress,
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

      const client = new RestClient(wasmd.endpoint);
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
          to_address: emptyAddress,
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
          to_address: emptyAddress,
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

      const client = new RestClient(wasmd.endpoint);
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
          to_address: emptyAddress,
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
          to_address: emptyAddress,
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

      const client = new RestClient(wasmd.endpoint);
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
