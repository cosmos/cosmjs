import { CosmWasmClient } from "./cosmwasmclient";
import { encodeSecp256k1Signature } from "./encoding";
import { Secp256k1Pen } from "./pen";
import { RestClient } from "./restclient";
import { getRandomizedHackatom, makeRandomAddress } from "./testutils.spec";
import { Coin } from "./types";

const httpUrl = "http://localhost:1317";

function cosmosEnabled(): boolean {
  return !!process.env.COSMOS_ENABLED;
}

function pendingWithoutCosmos(): void {
  if (!cosmosEnabled()) {
    return pending("Set COSMOS_ENABLED to enable Cosmos node-based tests");
  }
}

const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};

const unusedAccount = {
  address: "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u",
};

describe("CosmWasmClient", () => {
  describe("makeReadOnly", () => {
    it("can be constructed", () => {
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      expect(client).toBeTruthy();
    });
  });

  describe("chainId", () => {
    it("works", async () => {
      pendingWithoutCosmos();
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      expect(await client.chainId()).toEqual("testing");
    });
  });

  describe("getNonce", () => {
    it("works", async () => {
      pendingWithoutCosmos();
      const client = CosmWasmClient.makeReadOnly(httpUrl);
      expect(await client.getNonce(unusedAccount.address)).toEqual({
        accountNumber: 5,
        sequence: 0,
      });
    });
  });

  describe("upload", () => {
    it("works", async () => {
      pendingWithoutCosmos();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = CosmWasmClient.makeWritable(httpUrl, faucet.address, async signBytes => {
        return encodeSecp256k1Signature(pen.pubkey, await pen.createSignature(signBytes));
      });
      const codeId = await client.upload(getRandomizedHackatom());
      expect(codeId).toBeGreaterThanOrEqual(1);
    });
  });

  describe("instantiate", () => {
    it("works with transfer amount", async () => {
      pendingWithoutCosmos();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = CosmWasmClient.makeWritable(httpUrl, faucet.address, async signBytes => {
        return encodeSecp256k1Signature(pen.pubkey, await pen.createSignature(signBytes));
      });
      const codeId = await client.upload(getRandomizedHackatom());

      const transferAmount: readonly Coin[] = [
        {
          amount: "1234",
          denom: "ucosm",
        },
        {
          amount: "321",
          denom: "ustake",
        },
      ];
      const beneficiaryAddress = makeRandomAddress();
      const contractAddress = await client.instantiate(
        codeId,
        {
          verifier: faucet.address,
          beneficiary: beneficiaryAddress,
        },
        "Let's see",
        transferAmount,
      );

      const rest = new RestClient(httpUrl);
      const balance = (await rest.authAccounts(contractAddress)).result.value.coins;
      expect(balance).toEqual(transferAmount);
    });

    it("can instantiate one code multiple times", async () => {
      pendingWithoutCosmos();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = CosmWasmClient.makeWritable(httpUrl, faucet.address, async signBytes => {
        return encodeSecp256k1Signature(pen.pubkey, await pen.createSignature(signBytes));
      });
      const codeId = await client.upload(getRandomizedHackatom());

      const contractAddress1 = await client.instantiate(codeId, {
        verifier: faucet.address,
        beneficiary: makeRandomAddress(),
      });
      const contractAddress2 = await client.instantiate(codeId, {
        verifier: faucet.address,
        beneficiary: makeRandomAddress(),
      });
      expect(contractAddress1).not.toEqual(contractAddress2);
    });
  });

  describe("execute", () => {
    it("works", async () => {
      pendingWithoutCosmos();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = CosmWasmClient.makeWritable(httpUrl, faucet.address, async signBytes => {
        return encodeSecp256k1Signature(pen.pubkey, await pen.createSignature(signBytes));
      });
      const codeId = await client.upload(getRandomizedHackatom());

      // instantiate
      const transferAmount: readonly Coin[] = [
        {
          amount: "233444",
          denom: "ucosm",
        },
        {
          amount: "5454",
          denom: "ustake",
        },
      ];
      const beneficiaryAddress = makeRandomAddress();
      const contractAddress = await client.instantiate(
        codeId,
        {
          verifier: faucet.address,
          beneficiary: beneficiaryAddress,
        },
        undefined,
        transferAmount,
      );

      // execute
      const result = await client.execute(contractAddress, {}, undefined);
      const [firstLog] = result.logs;
      expect(firstLog.log).toEqual(`released funds to ${beneficiaryAddress}`);

      // Verify token transfer from contract to beneficiary
      const rest = new RestClient(httpUrl);
      const beneficiaryBalance = (await rest.authAccounts(beneficiaryAddress)).result.value.coins;
      expect(beneficiaryBalance).toEqual(transferAmount);
      const contractBalance = (await rest.authAccounts(contractAddress)).result.value.coins;
      expect(contractBalance).toEqual([]);
    });
  });
});
