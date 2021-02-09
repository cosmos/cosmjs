/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, toBase64 } from "@cosmjs/encoding";
import {
  DirectSecp256k1HdWallet,
  encodePubkey,
  makeAuthInfoBytes,
  makeSignDoc,
  Registry,
} from "@cosmjs/proto-signing";
import { assert, sleep } from "@cosmjs/utils";
import { ReadonlyDate } from "readonly-date";

import { TxRaw } from "./codec/cosmos/tx/v1beta1/tx";
import { assertIsBroadcastTxSuccess, PrivateStargateClient, StargateClient } from "./stargateclient";
import {
  faucet,
  makeRandomAddress,
  nonExistentAddress,
  pendingWithoutSimapp,
  simapp,
  tendermintIdMatcher,
  unused,
  validator,
} from "./testutils.spec";

describe("StargateClient", () => {
  describe("connect", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      expect(client).toBeTruthy();
      client.disconnect();
    });
  });

  describe("getChainId", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      expect(await client.getChainId()).toEqual(simapp.chainId);
      client.disconnect();
    });

    it("caches chain ID", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      const openedClient = (client as unknown) as PrivateStargateClient;
      const getCodeSpy = spyOn(openedClient.tmClient, "status").and.callThrough();

      expect(await client.getChainId()).toEqual(simapp.chainId); // from network
      expect(await client.getChainId()).toEqual(simapp.chainId); // from cache

      expect(getCodeSpy).toHaveBeenCalledTimes(1);

      client.disconnect();
    });
  });

  describe("getHeight", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const height1 = await client.getHeight();
      expect(height1).toBeGreaterThan(0);
      await sleep(simapp.blockTime * 1.4); // tolerate chain being 40% slower than expected
      const height2 = await client.getHeight();
      expect(height2).toBeGreaterThanOrEqual(height1 + 1);
      expect(height2).toBeLessThanOrEqual(height1 + 2);

      client.disconnect();
    });
  });

  describe("getAccount", () => {
    it("works for unused account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getAccount(unused.address);
      assert(account);
      expect(account).toEqual({
        address: unused.address,
        pubkey: null,
        accountNumber: unused.accountNumber,
        sequence: unused.sequence,
      });

      client.disconnect();
    });

    it("works for account with pubkey and non-zero sequence", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getAccount(validator.delegatorAddress);
      assert(account);
      expect(account).toEqual({
        address: validator.delegatorAddress,
        pubkey: validator.pubkey,
        accountNumber: validator.accountNumber,
        sequence: validator.sequence,
      });

      client.disconnect();
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getAccount(nonExistentAddress);
      expect(account).toBeNull();

      client.disconnect();
    });
  });

  describe("getSequence", () => {
    it("works for unused account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getSequence(unused.address);
      assert(account);
      expect(account).toEqual({
        accountNumber: unused.accountNumber,
        sequence: unused.sequence,
      });

      client.disconnect();
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getSequence(nonExistentAddress);
      expect(account).toBeNull();

      client.disconnect();
    });
  });

  describe("getBlock", () => {
    it("works for latest block", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      const response = await client.getBlock();

      expect(response).toEqual(
        jasmine.objectContaining({
          id: jasmine.stringMatching(tendermintIdMatcher),
          header: jasmine.objectContaining({
            chainId: await client.getChainId(),
          }),
          txs: jasmine.arrayContaining([]),
        }),
      );

      expect(response.header.height).toBeGreaterThanOrEqual(1);
      expect(new ReadonlyDate(response.header.time).getTime()).toBeLessThan(ReadonlyDate.now());
      expect(new ReadonlyDate(response.header.time).getTime()).toBeGreaterThanOrEqual(
        ReadonlyDate.now() - 5_000,
      );

      client.disconnect();
    });

    it("works for block by height", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      const height = (await client.getBlock()).header.height;
      const response = await client.getBlock(height - 1);

      expect(response).toEqual(
        jasmine.objectContaining({
          id: jasmine.stringMatching(tendermintIdMatcher),
          header: jasmine.objectContaining({
            height: height - 1,
            chainId: await client.getChainId(),
          }),
          txs: jasmine.arrayContaining([]),
        }),
      );

      expect(new ReadonlyDate(response.header.time).getTime()).toBeLessThan(ReadonlyDate.now());
      expect(new ReadonlyDate(response.header.time).getTime()).toBeGreaterThanOrEqual(
        ReadonlyDate.now() - 5_000,
      );

      client.disconnect();
    });
  });

  describe("getBalance", () => {
    it("works for different existing balances", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const response1 = await client.getBalance(unused.address, simapp.denomFee);
      expect(response1).toEqual({
        amount: unused.balanceFee,
        denom: simapp.denomFee,
      });
      const response2 = await client.getBalance(unused.address, simapp.denomStaking);
      expect(response2).toEqual({
        amount: unused.balanceStaking,
        denom: simapp.denomStaking,
      });

      client.disconnect();
    });

    it("returns null for non-existent balance", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const response = await client.getBalance(unused.address, "gintonic");
      expect(response).toBeNull();

      client.disconnect();
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const response = await client.getBalance(nonExistentAddress, simapp.denomFee);
      expect(response).toBeNull();

      client.disconnect();
    });
  });

  describe("getAllBalancesUnverified", () => {
    it("returns all balances for unused account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const balances = await client.getAllBalancesUnverified(unused.address);
      expect(balances).toEqual([
        {
          amount: unused.balanceFee,
          denom: simapp.denomFee,
        },
        {
          amount: unused.balanceStaking,
          denom: simapp.denomStaking,
        },
      ]);

      client.disconnect();
    });

    it("returns an empty list for non-existent account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const balances = await client.getAllBalancesUnverified(nonExistentAddress);
      expect(balances).toEqual([]);

      client.disconnect();
    });
  });

  describe("broadcastTx", () => {
    it("broadcasts a transaction", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
      const pubkey = encodePubkey({
        type: "tendermint/PubKeySecp256k1",
        value: toBase64(pubkeyBytes),
      });
      const registry = new Registry();
      const txBodyFields = {
        typeUrl: "/cosmos.tx.v1beta1.TxBody",
        value: {
          messages: [
            {
              typeUrl: "/cosmos.bank.v1beta1.MsgSend",
              value: {
                fromAddress: address,
                toAddress: makeRandomAddress(),
                amount: [
                  {
                    denom: "ucosm",
                    amount: "1234567",
                  },
                ],
              },
            },
          ],
        },
      };
      const txBodyBytes = registry.encode(txBodyFields);
      const { accountNumber, sequence } = (await client.getSequence(address))!;
      const feeAmount = [
        {
          amount: "2000",
          denom: "ucosm",
        },
      ];
      const gasLimit = 200000;
      const authInfoBytes = makeAuthInfoBytes([pubkey], feeAmount, gasLimit, sequence);

      const chainId = await client.getChainId();
      const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
      const { signature } = await wallet.signDirect(address, signDoc);
      const txRaw = TxRaw.fromPartial({
        bodyBytes: txBodyBytes,
        authInfoBytes: authInfoBytes,
        signatures: [fromBase64(signature.signature)],
      });
      const txRawBytes = Uint8Array.from(TxRaw.encode(txRaw).finish());
      const txResult = await client.broadcastTx(txRawBytes);
      assertIsBroadcastTxSuccess(txResult);

      const { rawLog, transactionHash } = txResult;
      expect(rawLog).toMatch(/{"key":"amount","value":"1234567ucosm"}/);
      expect(transactionHash).toMatch(/^[0-9A-F]{64}$/);

      client.disconnect();
    });
  });
});
