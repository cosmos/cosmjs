import { ChainId } from "@iov/bcp";
import { Bip39, Random } from "@iov/crypto";
import { UserProfile } from "@iov/keycontrol";

import { codecFromString } from "../codec";
import { setSecretAndCreateIdentities } from "../profile";

export async function generate(args: ReadonlyArray<string>): Promise<void> {
  if (args.length < 2) {
    throw Error(`Not enough arguments for action 'generate'. See 'iov-faucet help' or README for arguments.`);
  }
  const codecName = codecFromString(args[0]);
  const chainId = args[1] as ChainId;

  const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
  console.info(`FAUCET_MNEMONIC="${mnemonic}"`);

  const profile = new UserProfile();
  await setSecretAndCreateIdentities(profile, mnemonic, chainId, codecName);
}
