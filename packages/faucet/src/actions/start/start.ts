import cors = require("@koa/cors");
import { createCosmWasmConnector } from "@cosmwasm/bcp";
import Koa from "koa";
import bodyParser from "koa-bodyparser";

import { isValidAddress } from "../../addresses";
import * as constants from "../../constants";
import { logAccountsState } from "../../debugging";
import { Faucet } from "../../faucet";
import { availableTokensFromHolder } from "../../multichainhelpers";
import { setSecretAndCreateIdentities } from "../../profile";
import { HttpError } from "./httperror";
import { RequestParser } from "./requestparser";

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
    constants.tokenConfig,
  );
  console.info(`Connecting to blockchain ${blockchainBaseUrl} ...`);
  const connection = await connector.establishConnection();
  console.info(`Connected to network: ${connection.chainId()}`);

  // Profile
  if (!constants.mnemonic) throw new Error("The FAUCET_MNEMONIC environment variable is not set");
  const profile = await setSecretAndCreateIdentities(constants.mnemonic, connection.chainId());

  // Faucet
  const faucet = new Faucet(constants.tokenConfig, connection, connector.codec, profile, true);
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
  const api = new Koa();
  api.use(cors());
  api.use(bodyParser());

  api.use(async context => {
    switch (context.path) {
      case "/":
      case "/healthz":
        context.response.body =
          "Welcome to the faucet!\n" +
          "\n" +
          "Check the full status via the /status endpoint.\n" +
          "You can get tokens from here by POSTing to /credit.\n" +
          "See https://github.com/iov-one/iov-faucet for all further information.\n";
        break;
      case "/status": {
        const updatedAccounts = await faucet.loadAccounts();
        context.response.body = {
          status: "ok",
          nodeUrl: blockchainBaseUrl,
          chainId: connection.chainId(),
          chainTokens: chainTokens,
          availableTokens: availableTokens,
          holder: updatedAccounts[0],
          distributors: updatedAccounts.slice(1),
        };
        break;
      }
      case "/credit": {
        if (context.request.method !== "POST") {
          throw new HttpError(405, "This endpoint requires a POST request");
        }

        if (context.request.type !== "application/json") {
          throw new HttpError(415, "Content-type application/json expected");
        }

        // context.request.body is set by the bodyParser() plugin
        const requestBody = context.request.body;
        const { address, ticker } = RequestParser.parseCreditBody(requestBody);

        if (!isValidAddress(address)) {
          throw new HttpError(400, "Address is not in the expected format for this chain.");
        }

        if (availableTokens.indexOf(ticker) === -1) {
          const tokens = JSON.stringify(availableTokens);
          throw new HttpError(422, `Token is not available. Available tokens are: ${tokens}`);
        }

        try {
          await faucet.credit(address, ticker);
        } catch (e) {
          console.error(e);
          throw new HttpError(500, "Sending tokens failed");
        }

        context.response.body = "ok";
        break;
      }
      default:
      // koa sends 404 by default
    }
  });
  const port = constants.port;
  console.info(`Starting webserver on port ${port} ...`);
  api.listen(port);
}
