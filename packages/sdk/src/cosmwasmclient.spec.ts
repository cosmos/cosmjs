/* eslint-disable @typescript-eslint/camelcase */
import { Bech32, Encoding } from "@iov/encoding";
import { assert } from "@iov/utils";

import { CosmWasmClient } from "./cosmwasmclient";
import { makeSignBytes, marshalTx } from "./encoding";
import { findAttribute } from "./logs";
import { Secp256k1Pen } from "./pen";
import { RestClient } from "./restclient";
import cosmoshub from "./testdata/cosmoshub.json";
import { getRandomizedHackatom, makeRandomAddress } from "./testutils.spec";
import { Coin, CosmosSdkTx, MsgSend, StdFee } from "./types";

const { fromAscii, fromUtf8, toAscii } = Encoding;

const httpUrl = "http://localhost:1317";

function cosmosEnabled(): boolean {
  return !!process.env.COSMOS_ENABLED;
}

function pendingWithoutCosmos(): void {
  if (!cosmosEnabled()) {
    return pending("Set COSMOS_ENABLED to enable Cosmos node-based tests");
  }
}

const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};

const unusedAccount = {
  address: "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u",
};

interface HackatomInstance {
  readonly initMsg: {
    readonly verifier: string;
    readonly beneficiary: string;
  };
  readonly address: string;
}

describe("CosmWasmClient", () => {
  describe("makeReadOnly", () => {
    it("can be constructed", () => {
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      expect(client).toBeTruthy();
    });
  });

  describe("chainId", () => {
    it("works", async () => {
      pendingWithoutCosmos();
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      expect(await client.chainId()).toEqual("testing");
    });
  });

  describe("getNonce", () => {
    it("works", async () => {
      pendingWithoutCosmos();
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      expect(await client.getNonce(unusedAccount.address)).toEqual({
        accountNumber: 5,
        sequence: 0,
      });
    });
  });

  describe("getIdentifier", () => {
    it("works", async () => {
      pendingWithoutCosmos();
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      expect(await client.getIdentifier(cosmoshub.tx)).toEqual(cosmoshub.id);
    });
  });

  describe("postTx", () => {
    it("works", async () => {
      pendingWithoutCosmos();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = CosmWasmClient.makeReadOnly(httpUrl);

      const memo = "My first contract on chain";
      const sendMsg: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: faucet.address,
          to_address: makeRandomAddress(),
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

      const chainId = await client.chainId();
      const { accountNumber, sequence } = await client.getNonce(faucet.address);
      const signBytes = makeSignBytes([sendMsg], fee, chainId, memo, accountNumber, sequence);
      const signature = await pen.sign(signBytes);
      const signedTx = {
        msg: [sendMsg],
        fee: fee,
        memo: memo,
        signatures: [signature],
      };
      const { logs, transactionHash } = await client.postTx(marshalTx(signedTx));
      const amountAttr = findAttribute(logs, "transfer", "amount");
      expect(amountAttr.value).toEqual("1234567ucosm");
      expect(transactionHash).toMatch(/^[0-9A-F]{64}$/);
    });
  });

  describe("searchTx", () => {
    let posted:
      | {
          readonly sender: string;
          readonly recipient: string;
          readonly hash: string;
          readonly height: number;
          readonly tx: CosmosSdkTx;
        }
      | undefined;

    beforeAll(async () => {
      if (cosmosEnabled()) {
        pendingWithoutCosmos();
        const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
        const client = CosmWasmClient.makeReadOnly(httpUrl);

        const memo = "My first contract on chain";
        const sendMsg: MsgSend = {
          type: "cosmos-sdk/MsgSend",
          value: {
            from_address: faucet.address,
            to_address: makeRandomAddress(),
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

        const chainId = await client.chainId();
        const { accountNumber, sequence } = await client.getNonce(faucet.address);
        const signBytes = makeSignBytes([sendMsg], fee, chainId, memo, accountNumber, sequence);
        const signature = await pen.sign(signBytes);
        const signedTx = {
          msg: [sendMsg],
          fee: fee,
          memo: memo,
          signatures: [signature],
        };

        const result = await client.postTx(marshalTx(signedTx));
        const txDetails = await new RestClient(httpUrl).txsById(result.transactionHash);
        posted = {
          sender: sendMsg.value.from_address,
          recipient: sendMsg.value.to_address,
          hash: result.transactionHash,
          height: Number.parseInt(txDetails.height, 10),
          tx: txDetails.tx,
        };
      }
    });

    it("can search by ID", async () => {
      pendingWithoutCosmos();
      assert(posted, "value must be set in beforeAll()");
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      const result = await client.searchTx({ id: posted.hash });
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(
        jasmine.objectContaining({
          height: posted.height.toString(),
          txhash: posted.hash,
          tx: posted.tx,
        }),
      );
    });

    it("can search by ID (non existent)", async () => {
      pendingWithoutCosmos();
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      const nonExistentId = "0000000000000000000000000000000000000000000000000000000000000000";
      const result = await client.searchTx({ id: nonExistentId });
      expect(result.length).toEqual(0);
    });

    it("can search by height", async () => {
      pendingWithoutCosmos();
      assert(posted, "value must be set in beforeAll()");
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      const result = await client.searchTx({ height: posted.height });
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(
        jasmine.objectContaining({
          height: posted.height.toString(),
          txhash: posted.hash,
          tx: posted.tx,
        }),
      );
    });

    it("can search by sender", async () => {
      pendingWithoutCosmos();
      assert(posted, "value must be set in beforeAll()");
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      const result = await client.searchTx({ sentFromOrTo: posted.sender });
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[result.length - 1]).toEqual(
        jasmine.objectContaining({
          height: posted.height.toString(),
          txhash: posted.hash,
          tx: posted.tx,
        }),
      );
    });

    it("can search by recipient", async () => {
      pendingWithoutCosmos();
      assert(posted, "value must be set in beforeAll()");
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      const result = await client.searchTx({ sentFromOrTo: posted.recipient });
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[result.length - 1]).toEqual(
        jasmine.objectContaining({
          height: posted.height.toString(),
          txhash: posted.hash,
          tx: posted.tx,
        }),
      );
    });
  });

  describe("upload", () => {
    it("works", async () => {
      pendingWithoutCosmos();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = CosmWasmClient.makeWritable(httpUrl, faucet.address, signBytes => pen.sign(signBytes));
      const codeId = await client.upload(getRandomizedHackatom());
      expect(codeId).toBeGreaterThanOrEqual(1);
    });
  });

  describe("instantiate", () => {
    it("works with transfer amount", async () => {
      pendingWithoutCosmos();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = CosmWasmClient.makeWritable(httpUrl, faucet.address, signBytes => pen.sign(signBytes));
      const codeId = await client.upload(getRandomizedHackatom());

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
      const contractAddress = await client.instantiate(
        codeId,
        {
          verifier: faucet.address,
          beneficiary: beneficiaryAddress,
        },
        "Let's see",
        transferAmount,
      );

      const rest = new RestClient(httpUrl);
      const balance = (await rest.authAccounts(contractAddress)).result.value.coins;
      expect(balance).toEqual(transferAmount);
    });

    it("can instantiate one code multiple times", async () => {
      pendingWithoutCosmos();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = CosmWasmClient.makeWritable(httpUrl, faucet.address, signBytes => pen.sign(signBytes));
      const codeId = await client.upload(getRandomizedHackatom());

      const contractAddress1 = await client.instantiate(codeId, {
        verifier: faucet.address,
        beneficiary: makeRandomAddress(),
      });
      const contractAddress2 = await client.instantiate(codeId, {
        verifier: faucet.address,
        beneficiary: makeRandomAddress(),
      });
      expect(contractAddress1).not.toEqual(contractAddress2);
    });
  });

  describe("execute", () => {
    it("works", async () => {
      pendingWithoutCosmos();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = CosmWasmClient.makeWritable(httpUrl, faucet.address, signBytes => pen.sign(signBytes));
      const codeId = await client.upload(getRandomizedHackatom());

      // instantiate
      const transferAmount: readonly Coin[] = [
        {
          amount: "233444",
          denom: "ucosm",
        },
        {
          amount: "5454",
          denom: "ustake",
        },
      ];
      const beneficiaryAddress = makeRandomAddress();
      const contractAddress = await client.instantiate(
        codeId,
        {
          verifier: faucet.address,
          beneficiary: beneficiaryAddress,
        },
        undefined,
        transferAmount,
      );

      // execute
      const result = await client.execute(contractAddress, {}, undefined);
      const [firstLog] = result.logs;
      expect(firstLog.log).toEqual(`released funds to ${beneficiaryAddress}`);

      // Verify token transfer from contract to beneficiary
      const rest = new RestClient(httpUrl);
      const beneficiaryBalance = (await rest.authAccounts(beneficiaryAddress)).result.value.coins;
      expect(beneficiaryBalance).toEqual(transferAmount);
      const contractBalance = (await rest.authAccounts(contractAddress)).result.value.coins;
      expect(contractBalance).toEqual([]);
    });
  });

  describe("queryContractRaw", () => {
    const configKey = toAscii("config");
    const otherKey = toAscii("this_does_not_exist");
    let contract: HackatomInstance | undefined;

    beforeAll(async () => {
      if (cosmosEnabled()) {
        pendingWithoutCosmos();
        const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
        const client = CosmWasmClient.makeWritable(httpUrl, faucet.address, signBytes => pen.sign(signBytes));
        const codeId = await client.upload(getRandomizedHackatom());
        const initMsg = { verifier: makeRandomAddress(), beneficiary: makeRandomAddress() };
        const contractAddress = await client.instantiate(codeId, initMsg);
        contract = { initMsg: initMsg, address: contractAddress };
      }
    });

    it("can query existing key", async () => {
      pendingWithoutCosmos();
      assert(contract);

      const client = CosmWasmClient.makeReadOnly(httpUrl);
      const raw = await client.queryContractRaw(contract.address, configKey);
      assert(raw, "must get result");
      expect(JSON.parse(fromUtf8(raw))).toEqual({
        verifier: Array.from(Bech32.decode(contract.initMsg.verifier).data),
        beneficiary: Array.from(Bech32.decode(contract.initMsg.beneficiary).data),
        funder: Array.from(Bech32.decode(faucet.address).data),
      });
    });

    it("can query non-existent key", async () => {
      pendingWithoutCosmos();
      assert(contract);

      const client = CosmWasmClient.makeReadOnly(httpUrl);
      const raw = await client.queryContractRaw(contract.address, otherKey);
      expect(raw).toBeNull();
    });

    it("errors for non-existent contract", async () => {
      pendingWithoutCosmos();
      assert(contract);

      const nonExistentAddress = makeRandomAddress();
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      await client.queryContractRaw(nonExistentAddress, configKey).then(
        () => fail("must not succeed"),
        error => expect(error).toMatch(`No contract found at address "${nonExistentAddress}"`),
      );
    });
  });

  describe("queryContractSmart", () => {
    let contract: HackatomInstance | undefined;

    beforeAll(async () => {
      if (cosmosEnabled()) {
        pendingWithoutCosmos();
        const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
        const client = CosmWasmClient.makeWritable(httpUrl, faucet.address, signBytes => pen.sign(signBytes));
        const codeId = await client.upload(getRandomizedHackatom());
        const initMsg = { verifier: makeRandomAddress(), beneficiary: makeRandomAddress() };
        const contractAddress = await client.instantiate(codeId, initMsg);
        contract = { initMsg: initMsg, address: contractAddress };
      }
    });

    it("works", async () => {
      pendingWithoutCosmos();
      assert(contract);

      const client = CosmWasmClient.makeReadOnly(httpUrl);
      const verifier = await client.queryContractSmart(contract.address, { verifier: {} });
      expect(fromAscii(verifier)).toEqual(contract.initMsg.verifier);
    });

    it("errors for malformed query message", async () => {
      pendingWithoutCosmos();
      assert(contract);

      const client = CosmWasmClient.makeReadOnly(httpUrl);
      await client.queryContractSmart(contract.address, { broken: {} }).then(
        () => fail("must not succeed"),
        error => expect(error).toMatch(/Error parsing QueryMsg/i),
      );
    });

    it("errors for non-existent contract", async () => {
      pendingWithoutCosmos();

      const nonExistentAddress = makeRandomAddress();
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      await client.queryContractSmart(nonExistentAddress, { verifier: {} }).then(
        () => fail("must not succeed"),
        error => expect(error).toMatch(`No contract found at address "${nonExistentAddress}"`),
      );
    });
  });
});
