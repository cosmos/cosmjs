/* eslint-disable @typescript-eslint/naming-convention */
import { decodeValidatorGenesis, decodeValidatorInfo, decodeValidatorUpdate } from "./responses";

describe("Adaptor Responses", () => {
  describe("decodeValidatorGenesis", () => {
    it("works for genesis format", () => {
      // from https://raw.githubusercontent.com/cosmos/mainnet/master/genesis.json
      decodeValidatorGenesis({
        address: "A03DC128D38DB0BC5F18AE1872F1CB2E1FD41157",
        name: "真本聪&IOSG",
        power: "169980",
        pub_key: {
          type: "tendermint/PubKeyEd25519",
          value: "2BX6Zuj8RmdJAkD1BAg6KB0v04liyM7jBdwOGIb9F9Q=",
        },
      });
    });
  });

  describe("decodeValidatorUpdate", () => {
    it("works for block results format", () => {
      // from https://rpc.cosmos.network/block_results?height=10539773
      decodeValidatorUpdate({
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
    });
  });

  describe("decodeValidatorInfo", () => {
    it("works for validators format", () => {
      // from https://rpc.cosmos.network/validators?height=10601034
      decodeValidatorInfo({
        address: "AC2D56057CD84765E6FBE318979093E8E44AA18F",
        pub_key: {
          type: "tendermint/PubKeyEd25519",
          value: "0kNlxBMpm+5WtfHIG1xsWatOXTKPLtmSqn3EiEIDZeI=",
        },
        voting_power: "11228980",
        proposer_priority: "62870960",
      });
    });
  });
});
