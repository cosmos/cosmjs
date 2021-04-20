import { HdPath } from "@cosmjs/crypto";
import { CosmWasmFeeTable, SigningCosmWasmClient } from "@cosmjs/cosmwasm-launchpad";
import { GasPrice, GasLimits, makeCosmoshubPath, Secp256k1HdWallet } from "@cosmjs/launchpad";

interface Options {
  readonly httpUrl: string;
  readonly bech32prefix: string;
  readonly hdPaths: readonly HdPath[];
  readonly gasPrice: GasPrice;
  readonly gasLimits: Partial<GasLimits<CosmWasmFeeTable>>; // only set the ones you want to override
}

const coralnetOptions: Options = {
  httpUrl: "https://lcd.coralnet.cosmwasm.com",
  gasPrice: GasPrice.fromString("0.025ushell"),
  bech32prefix: "coral",
  hdPaths: [makeCosmoshubPath(0)],
  gasLimits: {
    upload: 1500000,
  },
};

const wallet = await Secp256k1HdWallet.generate(12, coralnetOptions);
const [{ address }] = await wallet.getAccounts();

const client = new SigningCosmWasmClient(
  coralnetOptions.httpUrl,
  address,
  wallet,
  coralnetOptions.gasPrice,
  coralnetOptions.gasLimits,
);
