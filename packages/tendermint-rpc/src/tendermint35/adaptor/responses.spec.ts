/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, fromHex } from "@cosmjs/encoding";

import { decodeEvent, decodeValidatorGenesis, decodeValidatorInfo, decodeValidatorUpdate } from "./responses";

describe("Adaptor Responses", () => {
  describe("decodeEvent", () => {
    it("works with attributes", () => {
      // from https://rpc.mainnet-1.tgrade.confio.run/tx?hash=0x2C44715748022DB2FB5F40105383719BFCFCEE51DBC02FF4088BE3F5924CD7BF
      const event = decodeEvent({
        type: "coin_spent",
        attributes: [
          { key: "foo", value: "123" },
          { key: "bar", value: "456" },
        ],
      });
      expect(event.type).toEqual("coin_spent");
      expect(event.attributes).toEqual([
        { key: "foo", value: "123" },
        { key: "bar", value: "456" },
      ]);
    });

    it("works with no attribute", () => {
      const event = decodeEvent({
        type: "cosmos.module.EmittedEvent",
      });
      expect(event.type).toEqual("cosmos.module.EmittedEvent");
      expect(event.attributes).toEqual([]);
    });
  });

  describe("decodeValidatorGenesis", () => {
    it("works for genesis format", () => {
      // from https://raw.githubusercontent.com/cosmos/mainnet/master/genesis.json
      const validator = decodeValidatorGenesis({
        address: "A03DC128D38DB0BC5F18AE1872F1CB2E1FD41157",
        name: "真本聪&IOSG",
        power: "169980",
        pub_key: {
          type: "tendermint/PubKeyEd25519",
          value: "2BX6Zuj8RmdJAkD1BAg6KB0v04liyM7jBdwOGIb9F9Q=",
        },
      });
      expect(validator).toEqual({
        address: fromHex("A03DC128D38DB0BC5F18AE1872F1CB2E1FD41157"),
        votingPower: BigInt(169980),
        pubkey: {
          algorithm: "ed25519",
          data: fromBase64("2BX6Zuj8RmdJAkD1BAg6KB0v04liyM7jBdwOGIb9F9Q="),
        },
      });
    });
  });

  describe("decodeValidatorUpdate", () => {
    it("works for block results format", () => {
      // from https://rpc.cosmos.network/block_results?height=10539773
      const update = decodeValidatorUpdate({
        pub_key: {
          Sum: {
            type: "tendermint.crypto.PublicKey_Ed25519",
            value: {
              ed25519: "0kNlxBMpm+5WtfHIG1xsWatOXTKPLtmSqn3EiEIDZeI=",
            },
          },
        },
        power: "11418237",
      });
      expect(update).toEqual({
        pubkey: {
          algorithm: "ed25519",
          data: fromBase64("0kNlxBMpm+5WtfHIG1xsWatOXTKPLtmSqn3EiEIDZeI="),
        },
        votingPower: BigInt(11418237),
      });
    });

    it("works for block results format without voting power", () => {
      // from https://rpc.cosmos.network/block_results?height=10883046
      const update = decodeValidatorUpdate({
        pub_key: {
          Sum: {
            type: "tendermint.crypto.PublicKey_Ed25519",
            value: {
              ed25519: "HjSC7VkhKih6xMhudlqfaFE8ZZnP8RKJPv4iqR7RhcE=",
            },
          },
        },
      });
      expect(update).toEqual({
        pubkey: {
          algorithm: "ed25519",
          data: fromBase64("HjSC7VkhKih6xMhudlqfaFE8ZZnP8RKJPv4iqR7RhcE="),
        },
        votingPower: BigInt(0),
      });
    });
  });

  describe("decodeValidatorInfo", () => {
    it("works for validators format", () => {
      // from https://rpc.cosmos.network/validators?height=10601034
      const info = decodeValidatorInfo({
        address: "AC2D56057CD84765E6FBE318979093E8E44AA18F",
        pub_key: {
          type: "tendermint/PubKeyEd25519",
          value: "0kNlxBMpm+5WtfHIG1xsWatOXTKPLtmSqn3EiEIDZeI=",
        },
        voting_power: "11228980",
        proposer_priority: "62870960",
      });
      expect(info).toEqual({
        address: fromHex("AC2D56057CD84765E6FBE318979093E8E44AA18F"),
        pubkey: {
          algorithm: "ed25519",
          data: fromBase64("0kNlxBMpm+5WtfHIG1xsWatOXTKPLtmSqn3EiEIDZeI="),
        },
        votingPower: BigInt(11228980),
        proposerPriority: 62870960,
      });
    });
  });
});
