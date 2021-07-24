import { CosmosClient } from "@cosmjs/launchpad";
import { StargateClient } from "@cosmjs/stargate";

import { Webserver } from "../api/webserver";
import * as constants from "../constants";
import { logAccountsState } from "../debugging";
import { Faucet } from "../faucet";
import { makePathBuilder } from "../pathbuilder";

export async function start(args: readonly string[]): Promise<void> {
  if (args.length < 1) {
    throw Error(
      `Not enough arguments for action 'start'. See '${constants.binaryName} help' or README for arguments.`,
    );
  }

  // Connection
  const blockchainBaseUrl = args[0];
  console.info(`Connecting to blockchain ${blockchainBaseUrl} ...`);
  let chainId;
  let stargate = true;
  try {
    chainId = await (await StargateClient.connect(blockchainBaseUrl)).getChainId();
  } catch (_error) {
    chainId = await new CosmosClient(blockchainBaseUrl).getChainId();
    stargate = false;
  }
  console.info(`Connected to network: ${chainId}`);

  // Faucet
  if (!constants.mnemonic) throw new Error("The FAUCET_MNEMONIC environment variable is not set");
  const logging = true;
  const pathBuilder = makePathBuilder(constants.pathPattern);
  const faucet = await Faucet.make(
    blockchainBaseUrl,
    constants.addressPrefix,
    constants.tokenConfig,
    constants.mnemonic,
    pathBuilder,
    constants.concurrency,
    stargate,
    logging,
  );
  const chainTokens = faucet.configuredTokens();
  console.info("Chain tokens:", chainTokens);
  const accounts = await faucet.loadAccounts();
  logAccountsState(accounts);
  let availableTokens = await faucet.availableTokens();
  console.info("Available tokens:", availableTokens);
  setInterval(async () => {
    availableTokens = await faucet.availableTokens();
    console.info("Available tokens:", availableTokens);
  }, 60_000);

  await faucet.refill();
  setInterval(async () => faucet.refill(), 60_000); // ever 60 seconds

  console.info("Creating webserver ...");
  const server = new Webserver(faucet, { nodeUrl: blockchainBaseUrl, chainId: chainId });
  server.start(constants.port);
  console.info(`Try "curl -sS http://localhost:${constants.port}/status | jq" to check the status.`);
}
