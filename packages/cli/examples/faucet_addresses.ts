const mnemonic = "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone";

for (let i of [0, 1, 2, 3, 4]) {
  const pen = await Secp256k1Pen.fromMnemonic(mnemonic, makeCosmoshubPath(i));
  const pubkey = toBase64(pen.pubkey);
  const address = pubkeyToAddress(encodeSecp256k1Pubkey(pen.pubkey), "cosmos");
  console.info(`Address ${i}: ${address}`);
  console.info(`Pubkey ${i}: ${pubkey}`);
}
