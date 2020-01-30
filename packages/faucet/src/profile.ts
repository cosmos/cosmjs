import { ChainId } from "@iov/bcp";
import { UserProfile } from "@iov/keycontrol";

import { Codec, codecImplementation, createPathBuilderForCodec } from "./codec";
import * as constants from "./constants";
import { createWalletForCodec } from "./crypto";
import { debugPath } from "./hdpaths";

export async function setSecretAndCreateIdentities(
  profile: UserProfile,
  mnemonic: string,
  chainId: ChainId,
  codecName: Codec,
): Promise<void> {
  if (profile.wallets.value.length !== 0) {
    throw new Error("Profile already contains wallets");
  }
  const wallet = profile.addWallet(createWalletForCodec(codecName, mnemonic));

  const pathBuilder = createPathBuilderForCodec(codecName);

  // first account is the token holder
  const numberOfIdentities = 1 + constants.concurrency;
  for (let i = 0; i < numberOfIdentities; i++) {
    // create
    const path = pathBuilder(i);
    const identity = await profile.createIdentity(wallet.id, chainId, path);

    // log
    const role = i === 0 ? "token holder " : `distributor ${i}`;
    const address = codecImplementation(codecName).identityToAddress(identity);
    console.info(`Created ${role} (${debugPath(path)}): ${address}`);
  }
}
