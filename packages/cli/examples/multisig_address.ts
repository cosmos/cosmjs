import { MultisigThresholdPubkey, pubkeyToAddress } from "@cosmjs/amino";

// https://github.com/cosmos/cosmjs/issues/673#issuecomment-779847238
const multisigPubkey: MultisigThresholdPubkey = {
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

const address = pubkeyToAddress(multisigPubkey, "cosmos");
console.log(address);
