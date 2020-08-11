import { CosmosClient } from "@cosmjs/launchpad";

import { Webserver } from "../api/webserver";
import * as constants from "../constants";
import { logAccountsState } from "../debugging";
import { Faucet } from "../faucet";

export async function start(args: readonly string[]): Promise<void> {
  if (args.length < 1) {
    throw Error(
      `Not enough arguments for action 'start'. See '${constants.binaryName} help' or README for arguments.`,
    );
  }

  // Connection
  const blockchainBaseUrl = args[0];
  console.info(`Connecting to blockchain ${blockchainBaseUrl} ...`);
  const chainId = await new CosmosClient(blockchainBaseUrl).getChainId();
  console.info(`Connected to network: ${chainId}`);

  // Faucet
  if (!constants.mnemonic) throw new Error("The FAUCET_MNEMONIC environment variable is not set");
  const faucet = await Faucet.make(
    blockchainBaseUrl,
    constants.addressPrefix,
    constants.developmentTokenConfig,
    constants.mnemonic,
    constants.concurrency,
    true,
  );
  const chainTokens = faucet.loadTokenTickers();
  console.info("Chain tokens:", chainTokens);
  const accounts = await faucet.loadAccounts();
  logAccountsState(accounts, constants.developmentTokenConfig);
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
}
