/* eslint-disable @typescript-eslint/naming-convention */
import { coin, coins, Secp256k1HdWallet } from "@cosmjs/launchpad";

import { Cw1SubkeyCosmWasmClient } from "./cw1subkeycosmwasmclient";
import {
  alice,
  deployedCw1,
  launchpad,
  makeRandomAddress,
  pendingWithoutCw1,
  pendingWithoutLaunchpad,
} from "./testutils.spec";

describe("Cw1SubkeyCosmWasmClient", () => {
  describe("getAdmins", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.getAdmins();

      expect(result).toEqual([alice.address0]);
    });
  });

  describe("isAdmin", () => {
    it("returns true if client signer is admin", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.isAdmin();

      expect(result).toEqual(true);
    });

    it("returns false if client signer is not admin", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address1,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.isAdmin();

      expect(result).toEqual(false);
    });

    it("returns true if supplied signer is admin", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address1,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.isAdmin(alice.address0);

      expect(result).toEqual(true);
    });

    it("returns false if supplied signer is not admin", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.isAdmin(alice.address1);

      expect(result).toEqual(false);
    });
  });

  describe("getAllAllowances", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.getAllAllowances();
      expect(result).toBeTruthy();
    });
  });

  describe("getAllowance", () => {
    it("works for client signer", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.getAllowance();

      expect(result).toEqual({ balance: [], expires: { never: {} } });
    });
  });

  describe("getAllPermissions", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.getAllPermissions();
      expect(result.length).toEqual(1);
      // TODO: test content of permissions
    });
  });

  describe("getPermissions", () => {
    it("works for client signer", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.getPermissions();

      expect(result).toEqual({
        delegate: false,
        redelegate: false,
        undelegate: false,
        withdraw: false,
      });
    });

    it("works for supplied signer", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.getPermissions(alice.address1);

      expect(result).toEqual({
        delegate: false,
        redelegate: false,
        undelegate: false,
        withdraw: false,
      });
    });
  });

  describe("addAdmin and removeAdmin", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const newAdmin = makeRandomAddress();
      expect(await client.isAdmin(newAdmin)).toBeFalse();

      const addResult = await client.addAdmin(newAdmin);
      expect(addResult.transactionHash).toBeTruthy();
      expect(await client.isAdmin(newAdmin)).toBeTrue();

      const removeResult = await client.removeAdmin(newAdmin);
      expect(removeResult.transactionHash).toBeTruthy();
      expect(await client.isAdmin(newAdmin)).toBeFalse();
    });
  });

  describe("increaseAllowance and decreaseAllowance", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const spender = makeRandomAddress();
      expect(await client.getAllowance(spender)).toEqual({ balance: [], expires: { never: {} } });

      const increaseAmount = coin(100, "ucosm");
      const increaseResult = await client.increaseAllowance(spender, increaseAmount);
      expect(increaseResult.transactionHash).toBeTruthy();
      expect(await client.getAllowance(spender)).toEqual({
        balance: [increaseAmount],
        expires: { never: {} },
      });

      const decreaseAmount = coin(20, "ucosm");
      const decreaseResult = await client.decreaseAllowance(spender, decreaseAmount);
      expect(decreaseResult.transactionHash).toBeTruthy();
      expect(await client.getAllowance(spender)).toEqual({
        balance: coins(80, "ucosm"),
        expires: { never: {} },
      });
    });

    it("works with expiration", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const spender = makeRandomAddress();
      expect(await client.getAllowance(spender)).toEqual({ balance: [], expires: { never: {} } });

      const increaseAmount = coin(100, "ucosm");
      const increaseExpiration = { at_height: 88888888888 };
      const increaseResult = await client.increaseAllowance(spender, increaseAmount, increaseExpiration);
      expect(increaseResult.transactionHash).toBeTruthy();
      expect(await client.getAllowance(spender)).toEqual({
        balance: [increaseAmount],
        expires: increaseExpiration,
      });

      const decreaseAmount = coin(20, "ucosm");
      const decreaseExpiration = { at_height: 99999999999 };
      const decreaseResult = await client.decreaseAllowance(spender, decreaseAmount, decreaseExpiration);
      expect(decreaseResult.transactionHash).toBeTruthy();
      expect(await client.getAllowance(spender)).toEqual({
        balance: coins(80, "ucosm"),
        expires: decreaseExpiration,
      });
    });
  });

  describe("setPermissions", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1SubkeyCosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const spender = makeRandomAddress();
      const defaultPermissions = {
        delegate: false,
        redelegate: false,
        undelegate: false,
        withdraw: false,
      };
      expect(await client.getPermissions(spender)).toEqual(defaultPermissions);

      const newPermissions = {
        delegate: true,
        redelegate: true,
        undelegate: true,
        withdraw: false,
      };
      const setPermissionsResult = await client.setPermissions(spender, newPermissions);
      expect(setPermissionsResult.transactionHash).toBeTruthy();
      expect(await client.getPermissions(spender)).toEqual(newPermissions);

      const resetPermissionsResult = await client.setPermissions(spender, defaultPermissions);
      expect(resetPermissionsResult.transactionHash).toBeTruthy();
      expect(await client.getPermissions(spender)).toEqual(defaultPermissions);
    });
  });
});
