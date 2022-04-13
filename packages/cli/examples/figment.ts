import { StargateClient } from "@cosmjs/stargate";

// Network config
const rpcEndpoint = {
  // Note: we removed the /status patch from the examples because we use the HTTP POST API
  url: "https://cosmoshub-4--rpc--full.datahub.figment.io/",
  headers: {
    "Authorization": "5195ebb0bfb7f0fe5c43409240c8b2c4",
  }
};

// Setup client
const client = await StargateClient.connect(rpcEndpoint);

// Get some data
const chainId = await client.getChainId();
console.log("Chain ID:", chainId);
const balance = await client.getAllBalances("cosmos1ey69r37gfxvxg62sh4r0ktpuc46pzjrmz29g45");
console.log("Balances:", balance);

client.disconnect();
