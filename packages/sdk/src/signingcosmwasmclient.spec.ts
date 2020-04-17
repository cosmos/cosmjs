import { Sha256 } from "@iov/crypto";
import { Encoding } from "@iov/encoding";
import { assert } from "@iov/utils";

import { PrivateCosmWasmClient } from "./cosmwasmclient";
import { Secp256k1Pen } from "./pen";
import { RestClient } from "./restclient";
import { SigningCosmWasmClient, UploadMeta } from "./signingcosmwasmclient";
import { getHackatom, makeRandomAddress, pendingWithoutWasmd } from "./testutils.spec";
import { Coin } from "./types";

const { toHex } = Encoding;

const httpUrl = "http://localhost:1317";

const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  pubkey: {
    type: "tendermint/PubKeySecp256k1",
    value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
  },
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};

describe("SigningCosmWasmClient", () => {
  describe("makeReadOnly", () => {
    it("can be constructed", async () => {
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmWasmClient(httpUrl, faucet.address, (signBytes) => pen.sign(signBytes));
      expect(client).toBeTruthy();
    });
  });

  describe("getHeight", () => {
    it("always uses authAccount implementation", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmWasmClient(httpUrl, faucet.address, (signBytes) => pen.sign(signBytes));

      const openedClient = (client as unknown) as PrivateCosmWasmClient;
      const blockLatestSpy = spyOn(openedClient.restClient, "blocksLatest").and.callThrough();
      const authAccountsSpy = spyOn(openedClient.restClient, "authAccounts").and.callThrough();

      const height = await client.getHeight();
      expect(height).toBeGreaterThan(0);

      expect(blockLatestSpy).toHaveBeenCalledTimes(0);
      expect(authAccountsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("upload", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmWasmClient(httpUrl, faucet.address, (signBytes) => pen.sign(signBytes));
      const wasm = getHackatom();
      const {
        codeId,
        originalChecksum,
        originalSize,
        compressedChecksum,
        compressedSize,
      } = await client.upload(wasm);
      expect(originalChecksum).toEqual(toHex(new Sha256(wasm).digest()));
      expect(originalSize).toEqual(wasm.length);
      expect(compressedChecksum).toMatch(/^[0-9a-f]{64}$/);
      expect(compressedSize).toBeLessThan(wasm.length * 0.5);
      expect(codeId).toBeGreaterThanOrEqual(1);
    });

    it("can set builder and source", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmWasmClient(httpUrl, faucet.address, (signBytes) => pen.sign(signBytes));
      const wasm = getHackatom();

      const meta: UploadMeta = {
        source: "https://crates.io/api/v1/crates/cw-nameservice/0.1.0/download",
        builder: "confio/cosmwasm-opt:0.6.2",
      };
      const { codeId } = await client.upload(wasm, meta);

      const codeDetails = await client.getCodeDetails(codeId);
      expect(codeDetails.source).toEqual(meta.source);
      expect(codeDetails.builder).toEqual(meta.builder);
    });
  });

  describe("instantiate", () => {
    it("works with transfer amount", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmWasmClient(httpUrl, faucet.address, (signBytes) => pen.sign(signBytes));
      const { codeId } = await client.upload(getHackatom());

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
      const { contractAddress } = await client.instantiate(
        codeId,
        {
          verifier: faucet.address,
          beneficiary: beneficiaryAddress,
        },
        "My cool label",
        "Let's see if the memo is used",
        transferAmount,
      );

      const rest = new RestClient(httpUrl);
      const balance = (await rest.authAccounts(contractAddress)).result.value.coins;
      expect(balance).toEqual(transferAmount);
    });

    it("can instantiate one code multiple times", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmWasmClient(httpUrl, faucet.address, (signBytes) => pen.sign(signBytes));
      const { codeId } = await client.upload(getHackatom());

      const contractAddress1 = await client.instantiate(
        codeId,
        {
          verifier: faucet.address,
          beneficiary: makeRandomAddress(),
        },
        "contract 1",
      );
      const contractAddress2 = await client.instantiate(
        codeId,
        {
          verifier: faucet.address,
          beneficiary: makeRandomAddress(),
        },
        "contract 2",
      );
      expect(contractAddress1).not.toEqual(contractAddress2);
    });
  });

  describe("execute", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmWasmClient(httpUrl, faucet.address, (signBytes) => pen.sign(signBytes));
      const { codeId } = await client.upload(getHackatom());

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
      const { contractAddress } = await client.instantiate(
        codeId,
        {
          verifier: faucet.address,
          beneficiary: beneficiaryAddress,
        },
        "amazing random contract",
        undefined,
        transferAmount,
      );

      // execute
      const result = await client.execute(contractAddress, { release: {} }, undefined);
      const wasmEvent = result.logs.find(() => true)?.events.find((e) => e.type === "wasm");
      assert(wasmEvent, "Event of type wasm expected");
      expect(wasmEvent.attributes).toContain({ key: "action", value: "release" });
      expect(wasmEvent.attributes).toContain({
        key: "destination",
        value: beneficiaryAddress,
      });

      // Verify token transfer from contract to beneficiary
      const rest = new RestClient(httpUrl);
      const beneficiaryBalance = (await rest.authAccounts(beneficiaryAddress)).result.value.coins;
      expect(beneficiaryBalance).toEqual(transferAmount);
      const contractBalance = (await rest.authAccounts(contractAddress)).result.value.coins;
      expect(contractBalance).toEqual([]);
    });
  });

  describe("sendTokens", () => {
    it("works", async () => {
      pendingWithoutWasmd();
      const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
      const client = new SigningCosmWasmClient(httpUrl, faucet.address, (signBytes) => pen.sign(signBytes));

      // instantiate
      const transferAmount: readonly Coin[] = [
        {
          amount: "7890",
          denom: "ucosm",
        },
      ];
      const beneficiaryAddress = makeRandomAddress();

      // no tokens here
      const before = await client.getAccount(beneficiaryAddress);
      expect(before).toBeUndefined();

      // send
      const result = await client.sendTokens(beneficiaryAddress, transferAmount, "for dinner");
      const [firstLog] = result.logs;
      expect(firstLog).toBeTruthy();

      // got tokens
      const after = await client.getAccount(beneficiaryAddress);
      assert(after);
      expect(after.balance).toEqual(transferAmount);
    });
  });
});
