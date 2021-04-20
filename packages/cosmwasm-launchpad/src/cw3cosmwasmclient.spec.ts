/* eslint-disable @typescript-eslint/naming-convention */
import { makeCosmoshubPath, Secp256k1HdWallet } from "@cosmjs/launchpad";
import { assert } from "@cosmjs/utils";

import { Cw3CosmWasmClient, Vote } from "./cw3cosmwasmclient";
import {
  alice,
  cw3Enabled,
  deployedCw3,
  launchpad,
  launchpadEnabled,
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
    const contractAddress = deployedCw3.instances[0];
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
    let proposalId: number | undefined;
    let expirationHeight: number | undefined;

    beforeAll(async () => {
      if (launchpadEnabled() && cw3Enabled()) {
        const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
        const client = new Cw3CosmWasmClient(launchpad.endpoint, alice.address0, wallet, contractAddress);
        const currentHeight = await client.getHeight();
        expirationHeight = currentHeight + 1;
        const { logs } = await client.createMultisigProposal(
          "My proposal",
          "A proposal to propose proposing proposals",
          [msg],
          undefined,
          { at_height: expirationHeight },
        );
        const wasmEvents = logs[0].events.find((event) => event.type === "wasm");
        assert(wasmEvents, "Wasm events not found in logs");
        const proposalIdAttribute = wasmEvents.attributes.find((log) => log.key === "proposal_id");
        assert(proposalIdAttribute, "Proposal ID not found in logs");
        proposalId = parseInt(proposalIdAttribute.value, 10);
      }
    });

    it("getThreshold", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw3();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw3CosmWasmClient(
        launchpad.endpoint,
        alice.address0,
        wallet,
        deployedCw3.instances[0],
      );
      const result = await client.getThreshold();

      expect(result).toEqual({ absolute_count: { weight_needed: 1, total_weight: 3 } });
    });

    it("getProposal", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw3();
      assert(proposalId, "value must be set in beforeAll()");
      assert(expirationHeight, "value must be set in beforeAll()");

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw3CosmWasmClient(launchpad.endpoint, alice.address0, wallet, contractAddress);
      const result = await client.getProposal(proposalId);

      expect(result).toEqual({
        id: proposalId,
        title: "My proposal",
        description: "A proposal to propose proposing proposals",
        msgs: [msg],
        expires: { at_height: expirationHeight },
        status: "passed",
      });
    });

    it("listProposals", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw3();
      assert(proposalId, "value must be set in beforeAll()");
      assert(expirationHeight, "value must be set in beforeAll()");

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw3CosmWasmClient(launchpad.endpoint, alice.address0, wallet, contractAddress);
      const result = await client.listProposals({ startAfter: proposalId - 1, limit: 1 });

      expect(result).toEqual({
        proposals: [
          {
            id: proposalId,
            title: "My proposal",
            description: "A proposal to propose proposing proposals",
            msgs: [msg],
            expires: { at_height: expirationHeight },
            status: "passed",
          },
        ],
      });
    });

    it("reverseProposals", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw3();
      assert(proposalId, "value must be set in beforeAll()");
      assert(expirationHeight, "value must be set in beforeAll()");

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw3CosmWasmClient(launchpad.endpoint, alice.address0, wallet, contractAddress);
      const result = await client.reverseProposals({ limit: 1 });

      expect(result).toEqual({
        proposals: [
          {
            id: proposalId,
            title: "My proposal",
            description: "A proposal to propose proposing proposals",
            msgs: [msg],
            expires: { at_height: expirationHeight },
            status: "passed",
          },
        ],
      });
    });

    it("getVote", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw3();
      assert(proposalId, "value must be set in beforeAll()");

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw3CosmWasmClient(launchpad.endpoint, alice.address0, wallet, contractAddress);
      const result = await client.getVote(proposalId, alice.address0);

      expect(result).toEqual({ vote: Vote.Yes });
    });

    it("listVotes", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw3();
      assert(proposalId, "value must be set in beforeAll()");

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw3CosmWasmClient(launchpad.endpoint, alice.address0, wallet, contractAddress);
      const result = await client.listVotes(proposalId);

      expect(result).toEqual({ votes: [{ voter: alice.address0, vote: Vote.Yes, weight: 1 }] });
    });

    it("getVoter", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw3();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw3CosmWasmClient(launchpad.endpoint, alice.address0, wallet, contractAddress);
      const result = await client.getVoter(alice.address0);

      expect(result).toEqual({ addr: alice.address0, weight: 1 });
    });

    it("listVoters", async () => {
      pendingWithoutLaunchpad();
      pendingWithoutCw3();

      const wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic);
      const client = new Cw3CosmWasmClient(launchpad.endpoint, alice.address0, wallet, contractAddress);
      const result = await client.listVoters();

      expect(result.voters.length).toEqual(3);
      expect(result.voters).toEqual(
        jasmine.arrayContaining([
          { addr: alice.address0, weight: 1 },
          { addr: alice.address1, weight: 1 },
          { addr: alice.address2, weight: 1 },
        ]),
      );
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
      await client.createMultisigProposal("My proposal", "A proposal to propose proposing proposals", [msg]);
      const { proposals } = await client.reverseProposals({ limit: 1 });
      const proposalId = proposals[0].id;
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
      const voterWallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic, {
        hdPaths: [makeCosmoshubPath(1)],
      });
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
      await proposer.createMultisigProposal("My proposal", "A proposal to propose proposing proposals", [
        msg,
      ]);
      const { proposals } = await voter.reverseProposals({ limit: 1 });
      const proposalId = proposals[0].id;

      await expectAsync(proposer.executeMultisigProposal(proposalId)).toBeRejectedWithError(
        /proposal must have passed and not yet been executed/i,
      );

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
      const voter1Wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic, {
        hdPaths: [makeCosmoshubPath(1)],
      });
      const voter1 = new Cw3CosmWasmClient(launchpad.endpoint, alice.address1, voter1Wallet, contractAddress);
      const voter2Wallet = await Secp256k1HdWallet.fromMnemonic(alice.mnemonic, {
        hdPaths: [makeCosmoshubPath(2)],
      });
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
      await proposer.createMultisigProposal(
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
      const { proposals } = await voter1.reverseProposals({ limit: 1 });
      const proposalId = proposals[0].id;

      const vote1Result = await voter1.voteMultisigProposal(proposalId, Vote.Abstain);
      expect(vote1Result).toBeTruthy();
      const vote2Result = await voter2.voteMultisigProposal(proposalId, Vote.No);
      expect(vote2Result).toBeTruthy();

      await expectAsync(proposer.executeMultisigProposal(proposalId)).toBeRejectedWithError(
        /proposal must have passed and not yet been executed/i,
      );

      const closeResult = await proposer.closeMultisigProposal(proposalId);
      expect(closeResult).toBeTruthy();
    });
  });
});
