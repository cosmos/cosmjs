import * as fs from "fs";
import { join } from "path";
import yargs from "yargs";

import { TsRepl } from "./tsrepl";

import colors = require("colors/safe");

export function main(originalArgs: readonly string[]): void {
  const args = yargs
    .options({
      // User options (we get --help and --version for free)
      init: {
        describe: "Read initial TypeScript code from files",
        type: "array",
      },
      // Maintainer options
      debug: {
        describe: "Enable debugging",
        type: "boolean",
      },
      selftest: {
        describe: "Run a selftext and exit",
        type: "boolean",
      },
    })
    .group(["init", "help", "version"], "User options")
    .group(["debug", "selftest"], "Maintainer options")
    .parse(originalArgs);

  const imports = new Map<string, readonly string[]>([
    [
      "@cosmwasm/sdk",
      [
        "encodeSecp256k1Pubkey",
        "encodeSecp256k1Signature",
        "logs",
        "makeCosmoshubPath",
        "makeSignBytes",
        "marshalTx",
        "Pen",
        "pubkeyToAddress",
        "RestClient",
        "Secp256k1Pen",
        "types",
        // cosmwasmclient
        "Account",
        "Block",
        "BlockHeader",
        "Code",
        "CodeDetails",
        "Contract",
        "ContractDetails",
        "CosmWasmClient",
        "GetNonceResult",
        "IndexedTx",
        "PostTxResult",
        "SearchByHeightQuery",
        "SearchByIdQuery",
        "SearchBySentFromOrToQuery",
        "SearchByTagsQuery",
        "SearchTxQuery",
        "SearchTxFilter",
        // signingcosmwasmclient
        "ExecuteResult",
        "FeeTable",
        "InstantiateResult",
        "SigningCallback",
        "SigningCosmWasmClient",
        "UploadMeta",
        "UploadResult",
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
        "Decimal",
        // integers
        "Int53",
        "Uint32",
        "Uint53",
        "Uint64",
      ],
    ],
    ["@iov/utils", ["assert", "sleep"]],
  ]);

  console.info(colors.green("Initializing session for you. Have fun!"));
  console.info(colors.yellow("Available imports:"));
  console.info(colors.yellow("  * axios"));
  console.info(colors.yellow("  * fs"));
  for (const [moduleName, symbols] of imports.entries()) {
    console.info(colors.yellow(`  * from ${moduleName}: ${symbols.join(", ")}`));
  }
  const encodingHelpers = [
    "fromAscii",
    "fromBase64",
    "fromHex",
    "fromUtf8",
    "toAscii",
    "toBase64",
    "toHex",
    "toUtf8",
  ];
  console.info(colors.yellow(`  * helper functions: ${encodingHelpers.join(", ")}`));

  let init = `
    import axios from "axios";
    import * as fs from "fs";
  `;
  for (const [moduleName, symbols] of imports.entries()) {
    init += `import { ${symbols.join(", ")} } from "${moduleName}";\n`;
  }
  // helper functions
  init += `const { ${encodingHelpers.join(", ")} } = Encoding;\n`;

  if (args.selftest) {
    // execute some trival stuff and exit
    init += `
      await sleep(123);

      const readmeContent = fs.readFileSync(process.cwd() + "/README.md");
      fs.writeFileSync(process.cwd() + "/README.md", readmeContent);

      const hash = new Sha512(new Uint8Array([])).digest();
      const hexHash = toHex(hash);
      export class NewDummyClass {};

      const original = "hello world";
      const encoded = toHex(toUtf8(toBase64(toAscii(original))));
      const decoded = fromAscii(fromBase64(fromUtf8(fromHex(encoded))));
      assert(decoded === original);

      assert(Decimal.fromAtomics("12870000", 6).toString() === "12.87");

      const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
      const pen = await Secp256k1Pen.fromMnemonic(mnemonic, makeCosmoshubPath(0));
      const pubkey = encodeSecp256k1Pubkey(pen.pubkey);
      const address = pubkeyToAddress(pubkey, "cosmos");
      const data = Encoding.toAscii("foo bar");
      const signature = await pen.sign(data);

      console.info("Done testing, will exit now.");
      process.exit(0);
    `;
  }

  if (args.init) {
    for (const path of args.init.map((arg) => arg.toString())) {
      if (args.debug) console.info(`Adding file: '${path}' ...`);
      init += fs.readFileSync(path, "utf8") + "\n";
    }
  }

  const tsconfigPath = join(__dirname, "..", "tsconfig_repl.json");
  const installationDir = join(__dirname, "..");
  new TsRepl(tsconfigPath, init, !!args.debug, installationDir).start().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
