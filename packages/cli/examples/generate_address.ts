const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
const pen = await Secp256k1Pen.fromMnemonic(mnemonic);
const pubkey = encodeSecp256k1Pubkey(pen.pubkey);
const address = pubkeyToAddress(pubkey, "cosmos");

console.info("mnemonic:", mnemonic);
console.info("pubkey:", pubkey);
console.info("address:", address);
