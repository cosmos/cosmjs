import { makeCosmoshubPath, Pen, Secp256k1Pen } from "@cosmwasm/sdk38";

import { debugPath } from "./hdpaths";

export async function createPens(
  mnemonic: string,
  addressPrefix: string,
  numberOfDistributors: number,
  logging = false,
): Promise<readonly [string, Pen][]> {
  const pens = new Array<[string, Pen]>();

  // first account is the token holder
  const numberOfIdentities = 1 + numberOfDistributors;
  for (let i = 0; i < numberOfIdentities; i++) {
    const path = makeCosmoshubPath(i);
    const pen = await Secp256k1Pen.fromMnemonic(mnemonic, path);
    const address = pen.address(addressPrefix);
    if (logging) {
      const role = i === 0 ? "token holder " : `distributor ${i}`;
      console.info(`Created ${role} (${debugPath(path)}): ${address}`);
    }
    pens.push([address, pen]);
  }

  return pens;
}
