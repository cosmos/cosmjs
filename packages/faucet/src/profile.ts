import { ChainId, Identity } from "@iov/bcp";
import { HdPaths, Secp256k1HdWallet, UserProfile } from "@iov/keycontrol";

import { identityToAddress } from "./addresses";
import { debugPath } from "./hdpaths";

export async function createUserProfile(
  mnemonic: string,
  chainId: ChainId,
  numberOfDistributors: number,
  logging = false,
): Promise<[UserProfile, readonly Identity[]]> {
  const profile = new UserProfile();
  const wallet = profile.addWallet(Secp256k1HdWallet.fromMnemonic(mnemonic));
  const identities = new Array<Identity>();

  // first account is the token holder
  const numberOfIdentities = 1 + numberOfDistributors;
  for (let i = 0; i < numberOfIdentities; i++) {
    const path = HdPaths.cosmos(i);
    const identity = await profile.createIdentity(wallet.id, chainId, path);
    if (logging) {
      const role = i === 0 ? "token holder " : `distributor ${i}`;
      const address = identityToAddress(identity);
      console.info(`Created ${role} (${debugPath(path)}): ${address}`);
    }
    identities.push(identity);
  }
  return [profile, identities];
}
