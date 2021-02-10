import axios from "axios";
import * as fs from "fs";
import { join } from "path";
import yargs from "yargs";

import { TsRepl } from "./tsrepl";

import colors = require("colors/safe");

export async function main(originalArgs: readonly string[]): Promise<void> {
  const args = yargs
    .options({
      // User options (we get --help and --version for free)
      init: {
        describe:
          "Read initial TypeScript code from the given sources. This can be URLs (supported schemes: https) or local file paths.",
        type: "array",
      },
      code: {
        describe:
          "Add initial TypeScript code from the argument. All code arguments are processed after all init arguments.",
        type: "array",
      },
      // Maintainer options
      debug: {
        describe: "Enable debugging",
        type: "boolean",
      },
      selftest: {
        describe: "Run a selftest and exit",
        type: "boolean",
      },
    })
    .group(["init", "code", "help", "version"], "User options")
    .group(["debug", "selftest"], "Maintainer options")
    .parse(originalArgs);

  const imports = new Map<string, readonly string[]>([
    [
      "@cosmjs/cosmwasm-launchpad",
      [
        // cosmwasmclient
        "Account",
        "Block",
        "BlockHeader",
        "Code",
        "CodeDetails",
        "Contract",
        "ContractCodeHistoryEntry",
        "CosmWasmClient",
        "GetSequenceResult",
        "SearchByHeightQuery",
        "SearchBySentFromOrToQuery",
        "SearchByTagsQuery",
        "SearchTxQuery",
        "SearchTxFilter",
        // signingcosmwasmclient
        "ExecuteResult",
        "CosmWasmFeeTable",
        "InstantiateResult",
        "SigningCosmWasmClient",
        "UploadMeta",
        "UploadResult",
      ],
    ],
    [
      "@cosmjs/crypto",
      [
        "Bip39",
        "Ed25519",
        "Ed25519Keypair",
        "EnglishMnemonic",
        "HdPath",
        "Random",
        "Secp256k1",
        "Sha256",
        "sha256",
        "Sha512",
        "sha512",
        "Slip10",
        "Slip10Curve",
        "Slip10RawIndex",
      ],
    ],
    [
      "@cosmjs/encoding",
      ["fromAscii", "fromBase64", "fromHex", "fromUtf8", "toAscii", "toBase64", "toHex", "toUtf8", "Bech32"],
    ],
    ["@cosmjs/faucet-client", ["FaucetClient"]],
    [
      "@cosmjs/launchpad",
      [
        "coin",
        "coins",
        "decodeAminoPubkey",
        "decodeBech32Pubkey",
        "encodeAminoPubkey",
        "encodeBech32Pubkey",
        "encodeSecp256k1Pubkey",
        "encodeSecp256k1Signature",
        "logs",
        "makeCosmoshubPath",
        "makeSignDoc",
        "makeStdTx",
        "IndexedTx",
        "BroadcastTxResult",
        "Coin",
        "CosmosClient",
        "GasLimits",
        "GasPrice",
        "Msg",
        "MsgDelegate",
        "MsgSend",
        "LcdClient",
        "OfflineSigner",
        "PubKey",
        "pubkeyToAddress",
        "Secp256k1HdWallet",
        "Secp256k1Wallet",
        "SigningCosmosClient",
        "StdFee",
        "StdSignDoc",
        "StdTx",
      ],
    ],
    ["@cosmjs/math", ["Decimal", "Int53", "Uint32", "Uint53", "Uint64"]],
    ["@cosmjs/utils", ["assert", "arrayContentEquals", "sleep"]],
  ]);

  console.info(colors.green("Initializing session for you. Have fun!"));
  console.info(colors.yellow("Available imports:"));
  for (const [moduleName, symbols] of imports.entries()) {
    console.info(colors.yellow(`  * from ${moduleName}: ${symbols.join(", ")}`));
  }

  let init = "";
  for (const [moduleName, symbols] of imports.entries()) {
    init += `import { ${symbols.join(", ")} } from "${moduleName}";\n`;
  }

  if (args.selftest) {
    // execute some trival stuff and exit
    init += `
      import axios from "axios";
      import * as fs from "fs";

      await sleep(123);

      const readmeContent = fs.readFileSync(process.cwd() + "/README.md");
      fs.writeFileSync(process.cwd() + "/README.md", readmeContent);

      const hash = sha512(new Uint8Array([]));
      const hexHash = toHex(hash);
      export class NewDummyClass {};

      const original = "hello world";
      const encoded = toHex(toUtf8(toBase64(toAscii(original))));
      const decoded = fromAscii(fromBase64(fromUtf8(fromHex(encoded))));
      assert(decoded === original);

      assert(Decimal.fromAtomics("12870000", 6).toString() === "12.87");

      const oneKeyWallet = await Secp256k1Wallet.fromKey(fromHex("b8c462d2bb0c1a92edf44f735021f16c270f28ee2c3d1cb49943a5e70a3c763e"));
      const accounts = await oneKeyWallet.getAccounts();
      assert(accounts[0].address == "cosmos1kxt5x5q2l57ma2d434pqpafxdm0mgeg9c8cvtx");

      const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
      const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, makeCosmoshubPath(0));
      const [{ address }] = await wallet.getAccounts();
      const data = toAscii("foo bar");
      const fee: StdFee = {
        amount: coins(5000000, "ucosm"),
        gas: "89000000",
      };
      const signDoc = makeSignDoc([], fee, "chain-xyz", "hello, world", 1, 2);
      const { signed, signature } = await wallet.signAmino(address, signDoc);
      assert(signed.memo === "hello, world");

      const bechPubkey = "coralvalconspub1zcjduepqvxg72ccnl9r65fv0wn3amlk4sfzqfe2k36l073kjx2qyaf6sk23qw7j8wq";
      assert(encodeBech32Pubkey(decodeBech32Pubkey(bechPubkey), "coralvalconspub") == bechPubkey);

      const aminoPubkey = fromHex("eb5ae98721034f04181eeba35391b858633a765c4a0c189697b40d216354d50890d350c70290");
      assert(arrayContentEquals(encodeAminoPubkey(decodeAminoPubkey(aminoPubkey)), aminoPubkey));

      console.info("Done testing, will exit now.");
      process.exit(0);
    `;
  }

  if (args.init) {
    for (const source of args.init.map((arg) => arg.toString())) {
      if (args.debug) console.info(`Adding code from: '${source}' ...`);
      if (source.startsWith("https://")) {
        const response = await axios.get(source);
        init += response.data + "\n";
      } else {
        init += fs.readFileSync(source, "utf8") + "\n";
      }
    }
  }

  if (args.code) {
    for (const code of args.code.map((arg) => arg.toString())) {
      if (args.debug) console.info(`Adding code: '${code}' ...`);
      init += `${code}\n`;
    }
  }

  const tsconfigPath = join(__dirname, "..", "tsconfig_repl.json");
  const installationDir = join(__dirname, "..");
  new TsRepl(tsconfigPath, init, !!args.debug, installationDir).start().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
