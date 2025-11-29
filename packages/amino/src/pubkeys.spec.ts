import { isEd25519Pubkey, isMultisigThresholdPubkey, isSecp256k1Pubkey, isSinglePubkey } from "./pubkeys";

describe("pubkeys", () => {
  const pubkeyEd25519 = {
    type: "tendermint/PubKeyEd25519",
    value: "YZHlYxP5R6olj3Tj3f7VgkQE5VaOvv9G0jKATqdQsqI=",
  };
  const pubkeySecp256k1 = {
    type: "tendermint/PubKeySecp256k1",
    value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
  };
  const pubkeyMultisigThreshold = {
    type: "tendermint/PubKeyMultisigThreshold",
    value: {
      threshold: "3",
      pubkeys: [
        {
          type: "tendermint/PubKeySecp256k1",
          value: "A4KZH7VSRwW/6RTExROivRYKsQP63LnGcBlXFo+eKGpQ",
        },
        {
          type: "tendermint/PubKeySecp256k1",
          value: "A8/Cq4VigOnDgl6RSdcx97fjrdCo/qwAX6C34n7ZDZLs",
        },
        {
          type: "tendermint/PubKeySecp256k1",
          value: "ApKgZuwy03xgdRnXqG6yEHATomsWDOPacy7nbpsuUCSS",
        },
        {
          type: "tendermint/PubKeySecp256k1",
          value: "Aptm8E3WSSFS0RTAIUW+bLi/slYnTEE+h4qPTG28CHfq",
        },
      ],
    },
  };

  describe("isSinglePubkey", () => {
    it("works", () => {
      expect(isSinglePubkey(pubkeyEd25519)).toEqual(true);
      expect(isSinglePubkey(pubkeySecp256k1)).toEqual(true);
      expect(isSinglePubkey(pubkeyMultisigThreshold)).toEqual(false);
    });
  });

  describe("isMultisigThresholdPubkey", () => {
    it("works", () => {
      expect(isMultisigThresholdPubkey(pubkeyEd25519)).toEqual(false);
      expect(isMultisigThresholdPubkey(pubkeySecp256k1)).toEqual(false);
      expect(isMultisigThresholdPubkey(pubkeyMultisigThreshold)).toEqual(true);
    });
  });

  describe("isEd25519Pubkey", () => {
    it("works", () => {
      expect(isEd25519Pubkey(pubkeyEd25519)).toEqual(true);
      expect(isEd25519Pubkey(pubkeySecp256k1)).toEqual(false);
      expect(isEd25519Pubkey(pubkeyMultisigThreshold)).toEqual(false);
    });
  });

  describe("isSecp256k1Pubkey", () => {
    it("works", () => {
      expect(isSecp256k1Pubkey(pubkeyEd25519)).toEqual(false);
      expect(isSecp256k1Pubkey(pubkeySecp256k1)).toEqual(true);
      expect(isSecp256k1Pubkey(pubkeyMultisigThreshold)).toEqual(false);
    });
  });
});
