import { ArgumentParser } from "argparse";
import * as fs from "fs";
import { join } from "path";

import { TsRepl } from "./tsrepl";

import colors = require("colors/safe");

export function main(originalArgs: readonly string[]): void {
  const parser = new ArgumentParser({ description: "The CosmWasm REPL" });
  parser.addArgument("--version", {
    action: "storeTrue",
    help: "Print version and exit",
  });
  parser.addArgument("--init", {
    metavar: "FILEPATH",
    help: "Read initial TypeScript code from file",
  });

  const maintainerGroup = parser.addArgumentGroup({
    title: "Maintainer options",
    description: "Don't use those unless a maintainer tells you to.",
  });
  maintainerGroup.addArgument("--selftest", {
    action: "storeTrue",
    help: "Run a selftext and exit",
  });
  maintainerGroup.addArgument("--debug", {
    action: "storeTrue",
    help: "Enable debugging",
  });
  const args = parser.parseArgs([...originalArgs]);

  if (args.version) {
    const version = require(join(__dirname, "..", "package.json")).version;
    console.info(version);
    return;
  }

  const imports = new Map<string, readonly string[]>([
    [
      "@cosmwasm/sdk",
      [
        "encodeAddress",
        "encodeSecp256k1Pubkey",
        "encodeSecp256k1Signature",
        "makeSignBytes",
        "marshalTx",
        "Pen",
        "RestClient",
        "Secp256k1Pen",
        "types",
      ],
    ],
    [
      "@iov/crypto",
      [
        "Bip39",
        "Ed25519",
        "Ed25519Keypair",
        "EnglishMnemonic",
        "Random",
        "Secp256k1",
        "Sha256",
        "Sha512",
        "Slip10",
        "Slip10Curve",
        "Slip10RawIndex",
      ],
    ],
    [
      "@iov/encoding",
      [
        "Bech32",
        "Encoding",
        // integers
        "Int53",
        "Uint32",
        "Uint53",
        "Uint64",
      ],
    ],
    ["@iov/utils", ["sleep"]],
  ]);

  console.info(colors.green("Initializing session for you. Have fun!"));
  console.info(colors.yellow("Available imports:"));
  console.info(colors.yellow("  * http"));
  console.info(colors.yellow("  * https"));
  console.info(colors.yellow("  * from long"));
  console.info(colors.yellow("    - Long"));
  for (const moduleName of imports.keys()) {
    console.info(colors.yellow(`  * from ${moduleName}`));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const symbol of imports.get(moduleName)!) {
      console.info(colors.yellow(`    - ${symbol}`));
    }
  }
  console.info(colors.yellow("  * helper functions"));
  console.info(colors.yellow("    - fromAscii"));
  console.info(colors.yellow("    - fromBase64"));
  console.info(colors.yellow("    - fromHex"));
  console.info(colors.yellow("    - fromUtf8"));
  console.info(colors.yellow("    - toAscii"));
  console.info(colors.yellow("    - toBase64"));
  console.info(colors.yellow("    - toHex"));
  console.info(colors.yellow("    - toUtf8"));

  let init = `
    import * as http from 'http';
    import * as https from 'https';
    import Long from "long";
  `;
  for (const moduleName of imports.keys()) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    init += `import { ${imports.get(moduleName)!.join(", ")} } from "${moduleName}";\n`;
  }
  // helper functions
  init += `
    const { fromAscii, fromBase64, fromHex, fromUtf8, toAscii, toBase64, toHex, toUtf8 } = Encoding;
  `;

  if (args.selftest) {
    // execute some trival stuff and exit
    init += `
      await sleep(123);
      const hash = new Sha512(new Uint8Array([])).digest();
      const hexHash = toHex(hash);
      export class NewDummyClass {};

      const encoded = toHex(toUtf8(toBase64(toAscii("hello world"))));
      const decoded = fromAscii(fromBase64(fromUtf8(fromHex(encoded))));

      const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
      const pen = await Secp256k1Pen.fromMnemonic(mnemonic);
      const pubkey = encodeSecp256k1Pubkey(pen.pubkey);
      const address = encodeAddress(pubkey, "cosmos");
      const data = Encoding.toAscii("foo bar");
      const signature = await pen.sign(data);

      console.info("Done testing, will exit now.");
      process.exit(0);
    `;
  }

  if (args.init) {
    init += fs.readFileSync(args.init, "utf8") + "\n";
  }

  const tsconfigPath = join(__dirname, "..", "tsconfig_repl.json");
  const installationDir = join(__dirname, "..");
  new TsRepl(tsconfigPath, init, !!args.debug, installationDir).start().catch(error => {
    console.error(error);
    process.exit(1);
  });
}
