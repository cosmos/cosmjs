/* eslint-disable @typescript-eslint/naming-convention */
import { sha256 } from "@cosmjs/crypto";
import { toHex } from "@cosmjs/encoding";
import {
  assertIsBroadcastTxSuccess,
  AuthExtension,
  coin,
  coins,
  GasPrice,
  LcdClient,
  MsgDelegate,
  Secp256k1HdWallet,
  setupAuthExtension,
} from "@cosmjs/launchpad";
import { assert } from "@cosmjs/utils";

import { PrivateCosmWasmClient } from "./cosmwasmclient";
import { setupWasmExtension, WasmExtension } from "./lcdapi/wasm";
import { SigningCosmWasmClient, UploadMeta } from "./signingcosmwasmclient";
import {
  alice,
  getHackatom,
  launchpad,
  makeRandomAddress,
  pendingWithoutLaunchpad,
  unused,
} from "./testutils.spec";

function makeWasmClient(apiUrl: string): LcdClient & AuthExtension & WasmExtension {
  return LcdClient.withExtensions({ apiUrl }, setupAuthExtension, setupWasmExtension);
}

describe("SigningCosmWasmClient", () => {
  describe("makeReadOnly", () => {
    it("can be constructed", async () => {
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);
      expect(client).toBeTruthy();
    });

    it("can be constructed with custom gas price", async () => {
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const gasPrice = GasPrice.fromString("3.14utest");
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet, gasPrice);
      expect(client.fees).toEqual({
        upload: {
          amount: [
            {
              amount: "4710000",
              denom: "utest",
            },
          ],
          gas: "1500000",
        },
        init: {
          amount: [
            {
              amount: "1570000",
              denom: "utest",
            },
          ],
          gas: "500000",
        },
        migrate: {
          amount: [
            {
              amount: "628000",
              denom: "utest",
            },
          ],
          gas: "200000",
        },
        exec: {
          amount: [
            {
              amount: "628000",
              denom: "utest",
            },
          ],
          gas: "200000",
        },
        send: {
          amount: [
            {
              amount: "251200",
              denom: "utest",
            },
          ],
          gas: "80000",
        },
        changeAdmin: {
          amount: [
            {
              amount: "251200",
              denom: "utest",
            },
          ],
          gas: "80000",
        },
      });
    });

    it("can be constructed with custom gas limits", async () => {
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const gasLimits = {
        send: 160000,
      };
      const client = new SigningCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        undefined,
        gasLimits,
      );
      expect(client.fees).toEqual({
        upload: {
          amount: [
            {
              amount: "37500",
              denom: "ucosm",
            },
          ],
          gas: "1500000",
        },
        init: {
          amount: [
            {
              amount: "12500",
              denom: "ucosm",
            },
          ],
          gas: "500000",
        },
        migrate: {
          amount: [
            {
              amount: "5000",
              denom: "ucosm",
            },
          ],
          gas: "200000",
        },
        exec: {
          amount: [
            {
              amount: "5000",
              denom: "ucosm",
            },
          ],
          gas: "200000",
        },
        send: {
          amount: [
            {
              amount: "4000",
              denom: "ucosm",
            },
          ],
          gas: "160000",
        },
        changeAdmin: {
          amount: [
            {
              amount: "2000",
              denom: "ucosm",
            },
          ],
          gas: "80000",
        },
      });
    });

    it("can be constructed with custom gas price and gas limits", async () => {
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const gasPrice = GasPrice.fromString("3.14utest");
      const gasLimits = {
        send: 160000,
      };
      const client = new SigningCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        gasPrice,
        gasLimits,
      );
      expect(client.fees).toEqual({
        upload: {
          amount: [
            {
              amount: "4710000",
              denom: "utest",
            },
          ],
          gas: "1500000",
        },
        init: {
          amount: [
            {
              amount: "1570000",
              denom: "utest",
            },
          ],
          gas: "500000",
        },
        migrate: {
          amount: [
            {
              amount: "628000",
              denom: "utest",
            },
          ],
          gas: "200000",
        },
        exec: {
          amount: [
            {
              amount: "628000",
              denom: "utest",
            },
          ],
          gas: "200000",
        },
        send: {
          amount: [
            {
              amount: "502400",
              denom: "utest",
            },
          ],
          gas: "160000",
        },
        changeAdmin: {
          amount: [
            {
              amount: "251200",
              denom: "utest",
            },
          ],
          gas: "80000",
        },
      });
    });
  });

  describe("getHeight", () => {
    it("always uses authAccount implementation", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);

      const openedClient = (client as unknown) as PrivateCosmWasmClient;
      const blockLatestSpy = spyOn(openedClient.lcdClient, "blocksLatest").and.callThrough();
      const authAccountsSpy = spyOn(openedClient.lcdClient.auth, "account").and.callThrough();

      const height = await client.getHeight();
      expect(height).toBeGreaterThan(0);

      expect(blockLatestSpy).toHaveBeenCalledTimes(0);
      expect(authAccountsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("upload", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);
      const wasm = getHackatom().data;
      const {
        codeId,
        originalChecksum,
        originalSize,
        compressedChecksum,
        compressedSize,
      } = await client.upload(wasm);
      expect(originalChecksum).toEqual(toHex(sha256(wasm)));
      expect(originalSize).toEqual(wasm.length);
      expect(compressedChecksum).toMatch(/^[0-9a-f]{64}$/);
      expect(compressedSize).toBeLessThan(wasm.length * 0.5);
      expect(codeId).toBeGreaterThanOrEqual(1);
    });

    it("can set builder and source", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);
      const hackatom = getHackatom();

      const meta: UploadMeta = {
        source: "https://crates.io/api/v1/crates/cw-nameservice/0.1.0/download",
        builder: "confio/cosmwasm-opt:0.6.2",
      };
      const { codeId } = await client.upload(hackatom.data, meta);

      const codeDetails = await client.getCodeDetails(codeId);
      expect(codeDetails.source).toEqual(meta.source);
      expect(codeDetails.builder).toEqual(meta.builder);
    });
  });

  describe("instantiate", () => {
    it("works with transfer amount", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);
      const { codeId } = await client.upload(getHackatom().data);

      const funds = [coin(1234, "ucosm"), coin(321, "ustake")];
      const beneficiaryAddress = makeRandomAddress();
      const { contractAddress } = await client.instantiate(
        codeId,
        {
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        },
        "My cool label",
        {
          memo: "Let's see if the memo is used",
          transferAmount: funds,
        },
      );

      const lcdClient = makeWasmClient(launchpad.endpoint);
      const balance = (await lcdClient.auth.account(contractAddress)).result.value.coins;
      expect(balance).toEqual(funds);
    });

    it("works with admin", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);
      const { codeId } = await client.upload(getHackatom().data);

      const beneficiaryAddress = makeRandomAddress();
      const { contractAddress } = await client.instantiate(
        codeId,
        {
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        },
        "My cool label",
        { admin: unused.address },
      );

      const lcdClient = makeWasmClient(launchpad.endpoint);
      const contract = await lcdClient.wasm.getContractInfo(contractAddress);
      assert(contract);
      expect(contract.admin).toEqual(unused.address);
    });

    it("can instantiate one code multiple times", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);
      const { codeId } = await client.upload(getHackatom().data);

      const contractAddress1 = await client.instantiate(
        codeId,
        {
          verifier: alice.address0,
          beneficiary: makeRandomAddress(),
        },
        "contract 1",
      );
      const contractAddress2 = await client.instantiate(
        codeId,
        {
          verifier: alice.address0,
          beneficiary: makeRandomAddress(),
        },
        "contract 2",
      );
      expect(contractAddress1).not.toEqual(contractAddress2);
    });
  });

  describe("updateAdmin", () => {
    it("can update an admin", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);
      const { codeId } = await client.upload(getHackatom().data);

      const beneficiaryAddress = makeRandomAddress();
      const { contractAddress } = await client.instantiate(
        codeId,
        {
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        },
        "My cool label",
        {
          admin: alice.address0,
        },
      );

      const lcdClient = makeWasmClient(launchpad.endpoint);
      const state1 = await lcdClient.wasm.getContractInfo(contractAddress);
      assert(state1);
      expect(state1.admin).toEqual(alice.address0);

      await client.updateAdmin(contractAddress, unused.address);

      const state2 = await lcdClient.wasm.getContractInfo(contractAddress);
      assert(state2);
      expect(state2.admin).toEqual(unused.address);
    });
  });

  describe("clearAdmin", () => {
    it("can clear an admin", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);
      const { codeId } = await client.upload(getHackatom().data);

      const beneficiaryAddress = makeRandomAddress();
      const { contractAddress } = await client.instantiate(
        codeId,
        {
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        },
        "My cool label",
        {
          admin: alice.address0,
        },
      );

      const lcdClient = makeWasmClient(launchpad.endpoint);
      const state1 = await lcdClient.wasm.getContractInfo(contractAddress);
      assert(state1);
      expect(state1.admin).toEqual(alice.address0);

      await client.clearAdmin(contractAddress);

      const state2 = await lcdClient.wasm.getContractInfo(contractAddress);
      assert(state2);
      expect(state2.admin).toBeUndefined();
    });
  });

  describe("migrate", () => {
    it("can can migrate from one code ID to another", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);
      const { codeId: codeId1 } = await client.upload(getHackatom().data);
      const { codeId: codeId2 } = await client.upload(getHackatom().data);

      const beneficiaryAddress = makeRandomAddress();
      const { contractAddress } = await client.instantiate(
        codeId1,
        {
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        },
        "My cool label",
        {
          admin: alice.address0,
        },
      );

      const lcdClient = makeWasmClient(launchpad.endpoint);
      const state1 = await lcdClient.wasm.getContractInfo(contractAddress);
      assert(state1);
      expect(state1.admin).toEqual(alice.address0);

      const newVerifier = makeRandomAddress();
      await client.migrate(contractAddress, codeId2, { verifier: newVerifier });

      const state2 = await lcdClient.wasm.getContractInfo(contractAddress);
      assert(state2);
      expect(state2).toEqual({
        ...state1,
        code_id: codeId2,
      });
    });
  });

  describe("execute", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);
      const { codeId } = await client.upload(getHackatom().data);

      // instantiate
      const funds = [coin(233444, "ucosm"), coin(5454, "ustake")];
      const beneficiaryAddress = makeRandomAddress();
      const { contractAddress } = await client.instantiate(
        codeId,
        {
          verifier: alice.address0,
          beneficiary: beneficiaryAddress,
        },
        "amazing random contract",
        {
          transferAmount: funds,
        },
      );

      // execute
      const result = await client.execute(contractAddress, { release: {} }, undefined);
      const wasmEvent = result.logs.find(() => true)?.events.find((e) => e.type === "wasm");
      assert(wasmEvent, "Event of type wasm expected");
      expect(wasmEvent.attributes).toContain({ key: "action", value: "release" });
      expect(wasmEvent.attributes).toContain({
        key: "destination",
        value: beneficiaryAddress,
      });

      // Verify token transfer from contract to beneficiary
      const lcdClient = makeWasmClient(launchpad.endpoint);
      const beneficiaryBalance = (await lcdClient.auth.account(beneficiaryAddress)).result.value.coins;
      expect(beneficiaryBalance).toEqual(funds);
      const contractBalance = (await lcdClient.auth.account(contractAddress)).result.value.coins;
      expect(contractBalance).toEqual([]);
    });
  });

  describe("sendTokens", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);

      const transferAmount = coins(7890, "ucosm");
      const beneficiaryAddress = makeRandomAddress();

      // no tokens here
      const before = await client.getAccount(beneficiaryAddress);
      expect(before).toBeUndefined();

      // send
      const result = await client.sendTokens(beneficiaryAddress, transferAmount, "for dinner");
      assertIsBroadcastTxSuccess(result);
      const [firstLog] = result.logs;
      expect(firstLog).toBeTruthy();

      // got tokens
      const after = await client.getAccount(beneficiaryAddress);
      assert(after);
      expect(after.balance).toEqual(transferAmount);
    });
  });

  describe("signAndBroadcast", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new SigningCosmWasmClient(launchpad.endpoint, alice.address0, wallet);

      const msg: MsgDelegate = {
        type: "cosmos-sdk/MsgDelegate",
        value: {
          delegator_address: alice.address0,
          validator_address: launchpad.validator.address,
          amount: coin(1234, "ustake"),
        },
      };
      const fee = {
        amount: coins(2000, "ucosm"),
        gas: "180000", // 180k
      };
      const result = await client.signAndBroadcast([msg], fee, "Use your power wisely");
      assertIsBroadcastTxSuccess(result);
    });
  });
});
