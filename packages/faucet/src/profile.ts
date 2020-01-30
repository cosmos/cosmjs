import { ChainId } from "@iov/bcp";
import { HdPaths, Secp256k1HdWallet, UserProfile } from "@iov/keycontrol";

import { codecImplementation } from "./codec";
import * as constants from "./constants";
import { debugPath } from "./hdpaths";

export async function setSecretAndCreateIdentities(
  profile: UserProfile,
  mnemonic: string,
  chainId: ChainId,
): Promise<void> {
  if (profile.wallets.value.length !== 0) {
    throw new Error("Profile already contains wallets");
  }
  const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(mnemonic));

  // first account is the token holder
  const numberOfIdentities = 1 + constants.concurrency;
  for (let i = 0; i < numberOfIdentities; i++) {
    // create
    const path = HdPaths.cosmos(i);
    const identity = await profile.createIdentity(wallet.id, chainId, path);

    // log
    const role = i === 0 ? "token holder " : `distributor ${i}`;
    const address = codecImplementation().identityToAddress(identity);
    console.info(`Created ${role} (${debugPath(path)}): ${address}`);
  }
}
