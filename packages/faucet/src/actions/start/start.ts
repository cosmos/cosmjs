import { createCosmWasmConnector } from "@cosmwasm/bcp";

import { Webserver } from "../../api/webserver";
import * as constants from "../../constants";
import { logAccountsState } from "../../debugging";
import { Faucet } from "../../faucet";
import { availableTokensFromHolder } from "../../multichainhelpers";
import { createUserProfile } from "../../profile";

export async function start(args: ReadonlyArray<string>): Promise<void> {
  if (args.length < 1) {
    throw Error(
      `Not enough arguments for action 'start'. See '${constants.binaryName} help' or README for arguments.`,
    );
  }

  // Connection
  const blockchainBaseUrl = args[0];
  const connector = createCosmWasmConnector(
    blockchainBaseUrl,
    constants.addressPrefix,
    constants.developmentTokenConfig,
  );
  console.info(`Connecting to blockchain ${blockchainBaseUrl} ...`);
  const connection = await connector.establishConnection();
  console.info(`Connected to network: ${connection.chainId}`);

  // Profile
  if (!constants.mnemonic) throw new Error("The FAUCET_MNEMONIC environment variable is not set");
  const [profile] = await createUserProfile(
    constants.mnemonic,
    connection.chainId,
    constants.concurrency,
    true,
  );

  // Faucet
  const faucet = new Faucet(constants.developmentTokenConfig, connection, connector.codec, profile, true);
  const chainTokens = await faucet.loadTokenTickers();
  console.info("Chain tokens:", chainTokens);
  const accounts = await faucet.loadAccounts();
  logAccountsState(accounts);
  let availableTokens = availableTokensFromHolder(accounts[0]);
  console.info("Available tokens:", availableTokens);
  setInterval(async () => {
    const updatedAccounts = await faucet.loadAccounts();
    availableTokens = availableTokensFromHolder(updatedAccounts[0]);
    console.info("Available tokens:", availableTokens);
  }, 60_000);

  await faucet.refill();
  setInterval(async () => faucet.refill(), 60_000); // ever 60 seconds

  console.info("Creating webserver ...");
  const server = new Webserver(faucet, { nodeUrl: blockchainBaseUrl, chainId: connection.chainId });
  server.start(constants.port);
}
