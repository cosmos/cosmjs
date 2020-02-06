const defaultHttpUrl = "http://localhost:1317";
const defaultNetworkId = "testing";
const defaultFee: types.StdFee = {
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
const faucetPath = HdPaths.cosmos(0);
const faucetAddress = "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6";

const wallet = Secp256k1HdWallet.fromMnemonic(faucetMnemonic);
const signer = await wallet.createIdentity("unused_value" as ChainId, faucetPath);

const client = new RestClient(defaultHttpUrl);
