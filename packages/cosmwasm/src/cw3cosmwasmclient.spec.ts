/* eslint-disable @typescript-eslint/naming-convention */
import { makeCosmoshubPath, Secp256k1HdWallet } from "@cosmjs/launchpad";
import { assert, sleep } from "@cosmjs/utils";

import { Cw3CosmWasmClient, Vote } from "./cw3cosmwasmclient";
import {
  alice,
  deployedCw3,
  launchpad,
  makeRandomAddress,
  pendingWithoutCw3,
  pendingWithoutLaunchpad,
} from "./testutils.spec";

describe("Cw3CosmWasmClient", () => {
  describe("constructor", () => {
    it("can be constructed", async () => {
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw3CosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw3.instances[0],
      );
      expect(client).toBeTruthy();
    });
  });

  describe("queries", () => {
    it("works", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw3();
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw3CosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw3.instances[0],
      );
      const result = await client.queryContractSmart(deployedCw3.instances[0], { threshold: {} });
      expect(result).toEqual({ absolute_count: { weight_needed: 1, total_weight: 3 } });
    });
  });

  describe("Proposal lifecycle", () => {
    it("proposal is accepted (proposer has enough weight alone)", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw3();
      const contractAddress = deployedCw3.instances[0];
      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw3CosmWasmClient(launchpad.endpoint, alice.address0, wallet, contractAddress);
      const toAddress = makeRandomAddress();
      const msg = {
        bank: {
          send: {
            from_address: contractAddress,
            to_address: toAddress,
            amount: [
              {
                amount: "1",
                denom: "ucosm",
              },
            ],
          },
        },
      };
      const { logs } = await client.createMultisigProposal(
        "My proposal",
        "A proposal to propose proposing proposals",
        [msg],
      );
      const wasmEvents = logs[0].events.find((event) => event.type === "wasm");
      assert(wasmEvents, "Wasm events not found in logs");
      const proposalIdAttribute = wasmEvents.attributes.find((log) => log.key === "proposal_id");
      assert(proposalIdAttribute, "Proposal ID not found in logs");
      const proposalId = parseInt(proposalIdAttribute.value, 10);

      const executeResult = await client.executeMultisigProposal(proposalId);
      expect(executeResult).toBeTruthy();
    });

    it("proposal is accepted (proposer does not have enough weight alone)", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw3();
      const contractAddress = deployedCw3.instances[1];
      const proposerWallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const proposer = new Cw3CosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        proposerWallet,
        contractAddress,
      );
      const voterWallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic, makeCosmoshubPath(1));
      const voter = new Cw3CosmWasmClient(launchpad.endpoint, alice.address1, voterWallet, contractAddress);
      const toAddress = makeRandomAddress();
      const msg = {
        bank: {
          send: {
            from_address: contractAddress,
            to_address: toAddress,
            amount: [
              {
                amount: "1",
                denom: "ucosm",
              },
            ],
          },
        },
      };
      const { logs } = await proposer.createMultisigProposal(
        "My proposal",
        "A proposal to propose proposing proposals",
        [msg],
      );
      const wasmEvents = logs[0].events.find((event) => event.type === "wasm");
      assert(wasmEvents, "Wasm events not found in logs");
      const proposalIdAttribute = wasmEvents.attributes.find((log) => log.key === "proposal_id");
      assert(proposalIdAttribute, "Proposal ID not found in logs");
      const proposalId = parseInt(proposalIdAttribute.value, 10);

      const voteResult = await voter.voteMultisigProposal(proposalId, Vote.Yes);
      expect(voteResult).toBeTruthy();

      const executeResult = await proposer.executeMultisigProposal(proposalId);
      expect(executeResult).toBeTruthy();
    });

    it("proposal is rejected", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw3();
      const contractAddress = deployedCw3.instances[1];
      const proposerWallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const proposer = new Cw3CosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        proposerWallet,
        contractAddress,
      );
      const voter1Wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic, makeCosmoshubPath(1));
      const voter1 = new Cw3CosmWasmClient(launchpad.endpoint, alice.address1, voter1Wallet, contractAddress);
      const voter2Wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic, makeCosmoshubPath(2));
      const voter2 = new Cw3CosmWasmClient(launchpad.endpoint, alice.address2, voter2Wallet, contractAddress);
      const toAddress = makeRandomAddress();
      const msg = {
        bank: {
          send: {
            from_address: contractAddress,
            to_address: toAddress,
            amount: [
              {
                amount: "1",
                denom: "ucosm",
              },
            ],
          },
        },
      };
      const currentHeight = await proposer.getHeight();
      const { logs } = await proposer.createMultisigProposal(
        "My proposal",
        "A proposal to propose proposing proposals",
        [msg],
        {
          at_height: currentHeight,
        },
        {
          at_height: currentHeight + 5,
        },
      );
      const wasmEvents = logs[0].events.find((event) => event.type === "wasm");
      assert(wasmEvents, "Wasm events not found in logs");
      const proposalIdAttribute = wasmEvents.attributes.find((log) => log.key === "proposal_id");
      assert(proposalIdAttribute, "Proposal ID not found in logs");
      const proposalId = parseInt(proposalIdAttribute.value, 10);

      const vote1Result = await voter1.voteMultisigProposal(proposalId, Vote.Abstain);
      expect(vote1Result).toBeTruthy();
      const vote2Result = await voter2.voteMultisigProposal(proposalId, Vote.No);
      expect(vote2Result).toBeTruthy();

      await sleep(2000);

      const closeResult = await proposer.closeMultisigProposal(proposalId);
      expect(closeResult).toBeTruthy();
    });
  });
});
