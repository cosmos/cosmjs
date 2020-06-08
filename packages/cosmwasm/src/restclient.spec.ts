/* eslint-disable @typescript-eslint/camelcase */
import {
  Coin,
  encodeBech32Pubkey,
  makeCosmoshubPath,
  makeSignBytes,
  Msg,
  MsgSend,
  Pen,
  PostTxsResponse,
  rawSecp256k1PubkeyToAddress,
  Secp256k1Pen,
  StdFee,
  StdSignature,
  StdTx,
} from "@cosmjs/sdk38";
import { Sha256 } from "@iov/crypto";
import { fromAscii, fromBase64, fromHex, toAscii, toBase64, toHex } from "@iov/encoding";
import { assert, sleep } from "@iov/utils";
import { ReadonlyDate } from "readonly-date";

import { findAttribute, parseLogs } from "./logs";
import {
  isMsgInstantiateContract,
  isMsgStoreCode,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgStoreCode,
} from "./msgs";
import { RestClient, TxsResponse } from "./restclient";
import { SigningCosmWasmClient } from "./signingcosmwasmclient";
import cosmoshub from "./testdata/cosmoshub.json";
import {
  alice,
  bech32AddressMatcher,
  ContractUploadInstructions,
  deployedErc20,
  fromOneElementArray,
  getHackatom,
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

const emptyAddress = "cosmos1ltkhnmdcqemmd2tkhnx7qx66tq7e0wykw2j85k";

function makeSignedTx(firstMsg: Msg, fee: StdFee, memo: string, firstSignature: StdSignature): StdTx {
  return {
    msg: [firstMsg],
    fee: fee,
    memo: memo,
    signatures: [firstSignature],
  };
}

async function uploadContract(
  client: RestClient,
  pen: Pen,
  contract: ContractUploadInstructions,
): Promise<PostTxsResponse> {
  const memo = "My first contract on chain";
  const theMsg: MsgStoreCode = {
    type: "wasm/store-code",
    value: {
      sender: alice.address0,
      wasm_byte_code: toBase64(contract.data),
      source: contract.source || "",
      builder: contract.builder || "",
    },
  };
  const fee: StdFee = {
    amount: [
      {
        amount: "5000000",
        denom: "ucosm",
      },
    ],
    gas: "89000000",
  };

  const { account_number, sequence } = (await client.authAccounts(alice.address0)).result.value;
  const signBytes = makeSignBytes([theMsg], fee, wasmd.chainId, memo, account_number, sequence);
  const signature = await pen.sign(signBytes);
  const signedTx = makeSignedTx(theMsg, fee, memo, signature);
  return client.postTx(signedTx);
}

async function instantiateContract(
  client: RestClient,
  pen: Pen,
  codeId: number,
  beneficiaryAddress: string,
  transferAmount?: readonly Coin[],
): Promise<PostTxsResponse> {
  const memo = "Create an escrow instance";
  const theMsg: MsgInstantiateContract = {
    type: "wasm/instantiate",
    value: {
      sender: alice.address0,
      code_id: codeId.toString(),
      label: "my escrow",
      init_msg: {
        verifier: alice.address0,
        beneficiary: beneficiaryAddress,
      },
      init_funds: transferAmount || [],
    },
  };
  const fee: StdFee = {
    amount: [
      {
        amount: "5000000",
        denom: "ucosm",
      },
    ],
    gas: "89000000",
  };

  const { account_number, sequence } = (await client.authAccounts(alice.address0)).result.value;
  const signBytes = makeSignBytes([theMsg], fee, wasmd.chainId, memo, account_number, sequence);
  const signature = await pen.sign(signBytes);
  const signedTx = makeSignedTx(theMsg, fee, memo, signature);
  return client.postTx(signedTx);
}

async function executeContract(
  client: RestClient,
  pen: Pen,
  contractAddress: string,
): Promise<PostTxsResponse> {
  const memo = "Time for action";
  const theMsg: MsgExecuteContract = {
    type: "wasm/execute",
    value: {
      sender: alice.address0,
      contract: contractAddress,
      msg: { release: {} },
      sent_funds: [],
    },
  };
  const fee: StdFee = {
    amount: [
      {
        amount: "5000000",
        denom: "ucosm",
      },
    ],
    gas: "89000000",
  };

  const { account_number, sequence } = (await client.authAccounts(alice.address0)).result.value;
  const signBytes = makeSignBytes([theMsg], fee, wasmd.chainId, memo, account_number, sequence);
  const signature = await pen.sign(signBytes);
  const signedTx = makeSignedTx(theMsg, fee, memo, signature);
  return client.postTx(signedTx);
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
      const { result } = await client.authAccounts(alice.address0);
      expect(result.value).toEqual(
        jasmine.objectContaining({
          public_key: encodeBech32Pubkey(alice.pubkey0, "cosmospub"),
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
        const pen = await Secp256k1Pen.fromMnemonic(alice.mnemonic);
        const client = new SigningCosmWasmClient(wasmd.endpoint, alice.address0, (signBytes) =>
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
            sender: alice.address0,
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
              from_address: alice.address0,
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
          try {
            await client.postTx(signedTx);
          } catch (error) {
            // postTx() throws on execution failures, which is a questionable design. Ignore for now.
            // console.log(error);
          }
          unsuccessful = {
            sender: alice.address0,
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
        const pen = await Secp256k1Pen.fromMnemonic(alice.mnemonic);
        const client = new SigningCosmWasmClient(wasmd.endpoint, alice.address0, (signBytes) =>
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
          sender: alice.address0,
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

    it("can query by tags (module + code_id)", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new RestClient(wasmd.endpoint);
      const result = await client.txsQuery(`message.module=wasm&message.code_id=${deployedErc20.codeId}`);
      expect(parseInt(result.count, 10)).toBeGreaterThanOrEqual(4);

      // Check first 4 results
      const [store, hash, isa, jade] = result.txs.map((tx) => fromOneElementArray(tx.tx.value.msg));
      assert(isMsgStoreCode(store));
      assert(isMsgInstantiateContract(hash));
      assert(isMsgInstantiateContract(isa));
      assert(isMsgInstantiateContract(jade));
      expect(store.value).toEqual(
        jasmine.objectContaining({
          sender: alice.address0,
          source: deployedErc20.source,
          builder: deployedErc20.builder,
        }),
      );
      expect(hash.value).toEqual({
        code_id: deployedErc20.codeId.toString(),
        init_funds: [],
        init_msg: jasmine.objectContaining({
          symbol: "HASH",
        }),
        label: "HASH",
        sender: alice.address0,
      });
      expect(isa.value).toEqual({
        code_id: deployedErc20.codeId.toString(),
        init_funds: [],
        init_msg: jasmine.objectContaining({ symbol: "ISA" }),
        label: "ISA",
        sender: alice.address0,
      });
      expect(jade.value).toEqual({
        code_id: deployedErc20.codeId.toString(),
        init_funds: [],
        init_msg: jasmine.objectContaining({ symbol: "JADE" }),
        label: "JADE",
        sender: alice.address0,
      });
    });

    // Like previous test but filtered by message.action=store-code and message.action=instantiate
    it("can query by tags (module + code_id + action)", async () => {
      pendingWithoutWasmd();
      assert(posted);
      const client = new RestClient(wasmd.endpoint);

      {
        const uploads = await client.txsQuery(
          `message.module=wasm&message.code_id=${deployedErc20.codeId}&message.action=store-code`,
        );
        expect(parseInt(uploads.count, 10)).toEqual(1);
        const store = fromOneElementArray(uploads.txs[0].tx.value.msg);
        assert(isMsgStoreCode(store));
        expect(store.value).toEqual(
          jasmine.objectContaining({
            sender: alice.address0,
            source: deployedErc20.source,
            builder: deployedErc20.builder,
          }),
        );
      }

      {
        const instantiations = await client.txsQuery(
          `message.module=wasm&message.code_id=${deployedErc20.codeId}&message.action=instantiate`,
        );
        expect(parseInt(instantiations.count, 10)).toBeGreaterThanOrEqual(3);
        const [hash, isa, jade] = instantiations.txs.map((tx) => fromOneElementArray(tx.tx.value.msg));
        assert(isMsgInstantiateContract(hash));
        assert(isMsgInstantiateContract(isa));
        assert(isMsgInstantiateContract(jade));
        expect(hash.value).toEqual({
          code_id: deployedErc20.codeId.toString(),
          init_funds: [],
          init_msg: jasmine.objectContaining({
            symbol: "HASH",
          }),
          label: "HASH",
          sender: alice.address0,
        });
        expect(isa.value).toEqual({
          code_id: deployedErc20.codeId.toString(),
          init_funds: [],
          init_msg: jasmine.objectContaining({ symbol: "ISA" }),
          label: "ISA",
          sender: alice.address0,
        });
        expect(jade.value).toEqual({
          code_id: deployedErc20.codeId.toString(),
          init_funds: [],
          init_msg: jasmine.objectContaining({ symbol: "JADE" }),
          label: "JADE",
          sender: alice.address0,
        });
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
      const pen = await Secp256k1Pen.fromMnemonic(alice.mnemonic);

      const memo = "My first contract on chain";
      const theMsg: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: alice.address0,
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
      const { account_number, sequence } = (await client.authAccounts(alice.address0)).result.value;

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
      const account1 = await Secp256k1Pen.fromMnemonic(alice.mnemonic, makeCosmoshubPath(0));
      const account2 = await Secp256k1Pen.fromMnemonic(alice.mnemonic, makeCosmoshubPath(1));
      const account3 = await Secp256k1Pen.fromMnemonic(alice.mnemonic, makeCosmoshubPath(2));
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
      // console.log(postResult.raw_log);
      expect(postResult.code).toEqual(4);
      expect(postResult.raw_log).toContain("wrong number of signers");
    });

    it("can send multiple messages with one signature", async () => {
      pendingWithoutWasmd();
      const account1 = await Secp256k1Pen.fromMnemonic(alice.mnemonic, makeCosmoshubPath(0));
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
      // console.log(postResult.raw_log);
      expect(postResult.code).toBeUndefined();
    });

    it("can send multiple messages with multiple signatures", async () => {
      pendingWithoutWasmd();
      const account1 = await Secp256k1Pen.fromMnemonic(alice.mnemonic, makeCosmoshubPath(0));
      const account2 = await Secp256k1Pen.fromMnemonic(alice.mnemonic, makeCosmoshubPath(1));
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
      // console.log(postResult.raw_log);
      expect(postResult.code).toBeUndefined();

      await sleep(500);
      const searched = await client.txsQuery(`tx.hash=${postResult.txhash}`);
      expect(searched.txs.length).toEqual(1);
      expect(searched.txs[0].tx.value.signatures).toEqual([signature2, signature1]);
    });

    it("can't send transaction with wrong signature order (1)", async () => {
      pendingWithoutWasmd();
      const account1 = await Secp256k1Pen.fromMnemonic(alice.mnemonic, makeCosmoshubPath(0));
      const account2 = await Secp256k1Pen.fromMnemonic(alice.mnemonic, makeCosmoshubPath(1));
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
      // console.log(postResult.raw_log);
      expect(postResult.code).toEqual(8);
    });

    it("can't send transaction with wrong signature order (2)", async () => {
      pendingWithoutWasmd();
      const account1 = await Secp256k1Pen.fromMnemonic(alice.mnemonic, makeCosmoshubPath(0));
      const account2 = await Secp256k1Pen.fromMnemonic(alice.mnemonic, makeCosmoshubPath(1));
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
      // console.log(postResult.raw_log);
      expect(postResult.code).toEqual(8);
    });

    it("can upload, instantiate and execute wasm", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(alice.mnemonic);
      const client = new RestClient(wasmd.endpoint);

      const transferAmount: readonly Coin[] = [
        {
          amount: "1234",
          denom: "ucosm",
        },
        {
          amount: "321",
          denom: "ustake",
        },
      ];
      const beneficiaryAddress = makeRandomAddress();

      let codeId: number;

      // upload
      {
        // console.log("Raw log:", result.raw_log);
        const result = await uploadContract(client, pen, getHackatom());
        expect(result.code).toBeFalsy();
        const logs = parseLogs(result.logs);
        const codeIdAttr = findAttribute(logs, "message", "code_id");
        codeId = Number.parseInt(codeIdAttr.value, 10);
        expect(codeId).toBeGreaterThanOrEqual(1);
        expect(codeId).toBeLessThanOrEqual(200);
      }

      let contractAddress: string;

      // instantiate
      {
        const result = await instantiateContract(client, pen, codeId, beneficiaryAddress, transferAmount);
        expect(result.code).toBeFalsy();
        // console.log("Raw log:", result.raw_log);
        const logs = parseLogs(result.logs);
        const contractAddressAttr = findAttribute(logs, "message", "contract_address");
        contractAddress = contractAddressAttr.value;
        const amountAttr = findAttribute(logs, "transfer", "amount");
        expect(amountAttr.value).toEqual("1234ucosm,321ustake");

        const balance = (await client.authAccounts(contractAddress)).result.value.coins;
        expect(balance).toEqual(transferAmount);
      }

      // execute
      {
        const result = await executeContract(client, pen, contractAddress);
        expect(result.code).toBeFalsy();
        // console.log("Raw log:", result.logs);
        const logs = parseLogs(result.logs);
        const wasmEvent = logs.find(() => true)?.events.find((e) => e.type === "wasm");
        assert(wasmEvent, "Event of type wasm expected");
        expect(wasmEvent.attributes).toContain({ key: "action", value: "release" });
        expect(wasmEvent.attributes).toContain({
          key: "destination",
          value: beneficiaryAddress,
        });

        // Verify token transfer from contract to beneficiary
        const beneficiaryBalance = (await client.authAccounts(beneficiaryAddress)).result.value.coins;
        expect(beneficiaryBalance).toEqual(transferAmount);
        const contractBalance = (await client.authAccounts(contractAddress)).result.value.coins;
        expect(contractBalance).toEqual([]);
      }
    });
  });

  // The /wasm endpoints

  describe("query", () => {
    it("can list upload code", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(alice.mnemonic);
      const client = new RestClient(wasmd.endpoint);

      // check with contracts were here first to compare
      const existingInfos = await client.listCodeInfo();
      existingInfos.forEach((val, idx) => expect(val.id).toEqual(idx + 1));
      const numExisting = existingInfos.length;

      // upload data
      const hackatom = getHackatom();
      const result = await uploadContract(client, pen, hackatom);
      expect(result.code).toBeFalsy();
      const logs = parseLogs(result.logs);
      const codeIdAttr = findAttribute(logs, "message", "code_id");
      const codeId = Number.parseInt(codeIdAttr.value, 10);

      // ensure we were added to the end of the list
      const newInfos = await client.listCodeInfo();
      expect(newInfos.length).toEqual(numExisting + 1);
      const lastInfo = newInfos[newInfos.length - 1];
      expect(lastInfo.id).toEqual(codeId);
      expect(lastInfo.creator).toEqual(alice.address0);

      // ensure metadata is present
      expect(lastInfo.source).toEqual(hackatom.source);
      expect(lastInfo.builder).toEqual(hackatom.builder);

      // check code hash matches expectation
      const wasmHash = new Sha256(hackatom.data).digest();
      expect(lastInfo.data_hash.toLowerCase()).toEqual(toHex(wasmHash));

      // download code and check against auto-gen
      const { data } = await client.getCode(codeId);
      expect(fromBase64(data)).toEqual(hackatom.data);
    });

    it("can list contracts and get info", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(alice.mnemonic);
      const client = new RestClient(wasmd.endpoint);
      const beneficiaryAddress = makeRandomAddress();
      const transferAmount: readonly Coin[] = [
        {
          amount: "707707",
          denom: "ucosm",
        },
      ];

      // reuse an existing contract, or upload if needed
      let codeId: number;
      const existingInfos = await client.listCodeInfo();
      if (existingInfos.length > 0) {
        codeId = existingInfos[existingInfos.length - 1].id;
      } else {
        const uploadResult = await uploadContract(client, pen, getHackatom());
        expect(uploadResult.code).toBeFalsy();
        const uploadLogs = parseLogs(uploadResult.logs);
        const codeIdAttr = findAttribute(uploadLogs, "message", "code_id");
        codeId = Number.parseInt(codeIdAttr.value, 10);
      }

      // create new instance and compare before and after
      const existingContractsByCode = await client.listContractsByCodeId(codeId);
      for (const contract of existingContractsByCode) {
        expect(contract.address).toMatch(bech32AddressMatcher);
        expect(contract.code_id).toEqual(codeId);
        expect(contract.creator).toMatch(bech32AddressMatcher);
        expect(contract.label).toMatch(/^.+$/);
      }

      const result = await instantiateContract(client, pen, codeId, beneficiaryAddress, transferAmount);
      expect(result.code).toBeFalsy();
      const logs = parseLogs(result.logs);
      const contractAddressAttr = findAttribute(logs, "message", "contract_address");
      const myAddress = contractAddressAttr.value;

      const newContractsByCode = await client.listContractsByCodeId(codeId);
      expect(newContractsByCode.length).toEqual(existingContractsByCode.length + 1);
      const newContract = newContractsByCode[newContractsByCode.length - 1];
      expect(newContract).toEqual(
        jasmine.objectContaining({
          code_id: codeId,
          creator: alice.address0,
          label: "my escrow",
        }),
      );

      // check out info
      const myInfo = await client.getContractInfo(myAddress);
      assert(myInfo);
      expect(myInfo.code_id).toEqual(codeId);
      expect(myInfo.creator).toEqual(alice.address0);
      expect((myInfo.init_msg as any).beneficiary).toEqual(beneficiaryAddress);

      // make sure random addresses don't give useful info
      const nonExistentAddress = makeRandomAddress();
      expect(await client.getContractInfo(nonExistentAddress)).toBeNull();
    });

    describe("contract state", () => {
      const client = new RestClient(wasmd.endpoint);
      const noContract = makeRandomAddress();
      const expectedKey = toAscii("config");
      let contractAddress: string | undefined;

      beforeAll(async () => {
        if (wasmdEnabled()) {
          const pen = await Secp256k1Pen.fromMnemonic(alice.mnemonic);
          const uploadResult = await uploadContract(client, pen, getHackatom());
          assert(!uploadResult.code);
          const uploadLogs = parseLogs(uploadResult.logs);
          const codeId = Number.parseInt(findAttribute(uploadLogs, "message", "code_id").value, 10);
          const instantiateResult = await instantiateContract(client, pen, codeId, makeRandomAddress());
          assert(!instantiateResult.code);
          const instantiateLogs = parseLogs(instantiateResult.logs);
          const contractAddressAttr = findAttribute(instantiateLogs, "message", "contract_address");
          contractAddress = contractAddressAttr.value;
        }
      });

      it("can get all state", async () => {
        pendingWithoutWasmd();

        // get contract state
        const state = await client.getAllContractState(contractAddress!);
        expect(state.length).toEqual(1);
        const data = state[0];
        expect(data.key).toEqual(expectedKey);
        const value = JSON.parse(fromAscii(data.val));
        expect(value.verifier).toBeDefined();
        expect(value.beneficiary).toBeDefined();

        // bad address is empty array
        const noContractState = await client.getAllContractState(noContract);
        expect(noContractState).toEqual([]);
      });

      it("can query by key", async () => {
        pendingWithoutWasmd();

        // query by one key
        const raw = await client.queryContractRaw(contractAddress!, expectedKey);
        assert(raw, "must get result");
        const model = JSON.parse(fromAscii(raw));
        expect(model.verifier).toBeDefined();
        expect(model.beneficiary).toBeDefined();

        // missing key is null
        const missing = await client.queryContractRaw(contractAddress!, fromHex("cafe0dad"));
        expect(missing).toBeNull();

        // bad address is null
        const noContractModel = await client.queryContractRaw(noContract, expectedKey);
        expect(noContractModel).toBeNull();
      });

      it("can make smart queries", async () => {
        pendingWithoutWasmd();

        // we can query the verifier properly
        const resultDocument = await client.queryContractSmart(contractAddress!, { verifier: {} });
        expect(resultDocument).toEqual({ verifier: alice.address0 });

        // invalid query syntax throws an error
        await client.queryContractSmart(contractAddress!, { nosuchkey: {} }).then(
          () => fail("shouldn't succeed"),
          (error) =>
            expect(error).toMatch(/query wasm contract failed: parsing hackatom::contract::QueryMsg/),
        );

        // invalid address throws an error
        await client.queryContractSmart(noContract, { verifier: {} }).then(
          () => fail("shouldn't succeed"),
          (error) => expect(error).toMatch("not found"),
        );
      });
    });
  });
});
