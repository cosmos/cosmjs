import { LcdClient, Secp256k1HdWallet, StdFee } from "@cosmjs/launchpad";

const defaultHttpUrl = "http://localhost:1317";
const defaultNetworkId = "testing";
const defaultFee: StdFee = {
  amount: [
    {
      amount: "5000",
      denom: "ucosm",
    },
  ],
  gas: "890000",
};

const faucetMnemonic =
  "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";
const faucetAddress = "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6";

const wallet = await Secp256k1HdWallet.fromMnemonic(faucetMnemonic);
const client = new LcdClient(defaultHttpUrl);
