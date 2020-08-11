import { Bip39, Random } from "@cosmjs/crypto";

import * as constants from "../constants";
import { createWallets } from "../profile";

export async function generate(args: readonly string[]): Promise<void> {
  if (args.length > 0) {
    console.warn(
      `Warning: ${constants.binaryName} generate does not require positional arguments anymore. Use env variables FAUCET_ADDRESS_PREFIX or FAUCET_CONCURRENCY to configure how accounts are created.`,
    );
  }

  const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
  console.info(`FAUCET_MNEMONIC="${mnemonic}"`);

  // Log the addresses
  await createWallets(mnemonic, constants.addressPrefix, constants.concurrency, true);
}
