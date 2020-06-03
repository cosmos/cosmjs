import { Bip39, Random } from "@iov/crypto";

import * as constants from "../constants";
import { createPens } from "../profile";

export async function generate(args: ReadonlyArray<string>): Promise<void> {
  if (args.length < 1) {
    throw Error(
      `Not enough arguments for action 'generate'. See '${constants.binaryName} help' or README for arguments.`,
    );
  }

  const chainId = args[0];

  const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
  console.info(`FAUCET_MNEMONIC="${mnemonic}"`);

  // Log the addresses
  await createPens(mnemonic, chainId, constants.concurrency, true);
}
