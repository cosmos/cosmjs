/* eslint-disable @typescript-eslint/naming-convention */
import { coins, Secp256k1HdWallet } from "@cosmjs/launchpad";

import { Cw1CosmWasmClient } from "./cw1cosmwasmclient";
import {
  alice,
  deployedCw1,
  launchpad,
  makeRandomAddress,
  pendingWithoutCw1,
  pendingWithoutLaunchpad,
} from "./testutils.spec";

describe("Cw1CosmWasmClient", () => {
  const contractAddress = deployedCw1.instances[0];
  const defaultToAddress = makeRandomAddress();
  const defaultMsg = {
    bank: {
      send: {
        from_address: contractAddress,
        to_address: defaultToAddress,
        amount: coins(1, "ucosm"),
      },
    },
  };

  describe("constructor", () => {
    it("can be constructed", async () => {
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1CosmWasmClient(launchpad.endpoint, alice.address0, wallet, contractAddress);
      expect(client).toBeTruthy();
    });
  });

  describe("canSend", () => {
    it("returns true if client signer can send", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1CosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.canSend(defaultMsg);

      expect(result).toEqual({ can_send: true });
    });

    it("returns false if client signer cannot send", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1CosmWasmClient(
        launchpad.endpoint,
        alice.address1,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.canSend(defaultMsg);

      expect(result).toEqual({ can_send: false });
    });

    it("returns true if supplied signer can send", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1CosmWasmClient(
        launchpad.endpoint,
        alice.address1,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.canSend(defaultMsg, alice.address0);

      expect(result).toEqual({ can_send: true });
    });

    it("returns false if supplied signer cannot send", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1CosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.canSend(defaultMsg, alice.address1);

      expect(result).toEqual({ can_send: false });
    });
  });

  describe("executeSubkey", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1CosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const result = await client.executeSubkey([defaultMsg]);

      expect(result.transactionHash).toBeTruthy();
    });

    it("works with a transfer", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw1();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw1CosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw1.instances[0],
      );
      const balanceBefore = parseInt((await client.getAccount())!.balance[0].amount, 10);
      const memo = "This time with coins";
      const transferAmount = coins(1000, "ucosm");
      const result = await client.executeSubkey([defaultMsg], memo, transferAmount);
      const balanceAfter = parseInt((await client.getAccount())!.balance[0].amount, 10);

      expect(result.transactionHash).toBeTruthy();
      expect(balanceAfter).toEqual(balanceBefore + 999);
    });
  });
});
