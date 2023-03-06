/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, toBase64 } from "@cosmjs/encoding";
import {
  coins,
  DirectSecp256k1HdWallet,
  encodePubkey,
  makeAuthInfoBytes,
  makeSignDoc,
  Registry,
  TxBodyEncodeObject,
} from "@cosmjs/proto-signing";
import { assert, sleep } from "@cosmjs/utils";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { ReadonlyDate } from "readonly-date";

import {
  assertIsDeliverTxSuccess,
  BroadcastTxError,
  DeliverTxResponse,
  isDeliverTxFailure,
  isDeliverTxSuccess,
  PrivateStargateClient,
  StargateClient,
  TimeoutError,
} from "./stargateclient";
import {
  faucet,
  makeRandomAddress,
  nonExistentAddress,
  pendingWithoutSimapp,
  pendingWithoutSlowSimapp,
  simapp,
  simapp44Enabled,
  slowSimapp,
  tendermintIdMatcher,
  unused,
  validator,
} from "./testutils.spec";

const resultFailure: DeliverTxResponse = {
  code: 5,
  height: 219901,
  txIndex: 0,
  rawLog:
    "failed to execute message; message index: 0: 1855527000ufct is smaller than 20000000000000000000000ufct: insufficient funds",
  transactionHash: "FDC4FB701AABD465935F7D04AE490D1EF5F2BD4B227601C4E98B57EB077D9B7D",
  events: [],
  gasUsed: 54396,
  gasWanted: 200000,
};
const resultSuccess: DeliverTxResponse = {
  code: 0,
  height: 219894,
  txIndex: 0,
  rawLog:
    '[{"events":[{"type":"message","attributes":[{"key":"action","value":"send"},{"key":"sender","value":"firma1trqyle9m2nvyafc2n25frkpwed2504y6avgfzr"},{"key":"module","value":"bank"}]},{"type":"transfer","attributes":[{"key":"recipient","value":"firma12er8ls2sf5zess3jgjxz59xat9xtf8hz0hk6n4"},{"key":"sender","value":"firma1trqyle9m2nvyafc2n25frkpwed2504y6avgfzr"},{"key":"amount","value":"2000000ufct"}]}]}]',
  transactionHash: "C0B416CA868C55C2B8C1BBB8F3CFA233854F13A5CB15D3E9599F50CAF7B3D161",
  events: [],
  gasUsed: 61556,
  gasWanted: 200000,
};

describe("isDeliverTxFailure", () => {
  it("works", () => {
    expect(isDeliverTxFailure(resultFailure)).toEqual(true);
    expect(isDeliverTxFailure(resultSuccess)).toEqual(false);
  });
});

describe("isDeliverTxSuccess", () => {
  it("works", () => {
    expect(isDeliverTxSuccess(resultFailure)).toEqual(false);
    expect(isDeliverTxSuccess(resultSuccess)).toEqual(true);
  });
});

describe("StargateClient", () => {
  describe("connect", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      expect(client).toBeTruthy();
      client.disconnect();
    });
  });

  describe("getChainId", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      expect(await client.getChainId()).toEqual(simapp.chainId);
      client.disconnect();
    });

    it("caches chain ID", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      const openedClient = client as unknown as PrivateStargateClient;
      const getCodeSpy = spyOn(openedClient.tmClient!, "status").and.callThrough();

      expect(await client.getChainId()).toEqual(simapp.chainId); // from network
      expect(await client.getChainId()).toEqual(simapp.chainId); // from cache

      expect(getCodeSpy).toHaveBeenCalledTimes(1);

      client.disconnect();
    });
  });

  describe("getHeight", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const height1 = await client.getHeight();
      expect(height1).toBeGreaterThan(0);
      await sleep(simapp.blockTime * 1.4); // tolerate chain being 40% slower than expected
      const height2 = await client.getHeight();
      expect(height2).toBeGreaterThanOrEqual(height1 + 1);
      expect(height2).toBeLessThanOrEqual(height1 + 2);

      client.disconnect();
    });
  });

  describe("getAccount", () => {
    it("works for unused account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getAccount(unused.address);
      assert(account);
      expect(account).toEqual({
        address: unused.address,
        pubkey: null,
        accountNumber: unused.accountNumber,
        sequence: unused.sequence,
      });

      client.disconnect();
    });

    it("works for account with pubkey and non-zero sequence", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getAccount(validator.delegatorAddress);
      assert(account);
      expect(account).toEqual({
        address: validator.delegatorAddress,
        pubkey: validator.pubkey,
        accountNumber: validator.accountNumber,
        sequence: validator.sequence,
      });

      client.disconnect();
    });

    it("returns null for non-existent address", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getAccount(nonExistentAddress);
      expect(account).toBeNull();

      client.disconnect();
    });
  });

  describe("getSequence", () => {
    it("works for unused account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const account = await client.getSequence(unused.address);
      assert(account);
      expect(account).toEqual({
        accountNumber: unused.accountNumber,
        sequence: unused.sequence,
      });

      client.disconnect();
    });

    it("rejects for non-existent address", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      await expectAsync(client.getSequence(nonExistentAddress)).toBeRejectedWithError(
        /account '([a-z0-9]{10,90})' does not exist on chain/i,
      );

      client.disconnect();
    });
  });

  describe("getBlock", () => {
    it("works for latest block", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      const response = await client.getBlock();

      expect(response).toEqual(
        jasmine.objectContaining({
          id: jasmine.stringMatching(tendermintIdMatcher),
          header: jasmine.objectContaining({
            chainId: await client.getChainId(),
          }),
          txs: jasmine.arrayContaining([]),
        }),
      );

      expect(response.header.height).toBeGreaterThanOrEqual(1);
      expect(new ReadonlyDate(response.header.time).getTime()).toBeLessThan(ReadonlyDate.now());
      expect(new ReadonlyDate(response.header.time).getTime()).toBeGreaterThanOrEqual(
        ReadonlyDate.now() - 5_000,
      );

      client.disconnect();
    });

    it("works for block by height", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      const height = (await client.getBlock()).header.height;
      const response = await client.getBlock(height - 1);

      expect(response).toEqual(
        jasmine.objectContaining({
          id: jasmine.stringMatching(tendermintIdMatcher),
          header: jasmine.objectContaining({
            height: height - 1,
            chainId: await client.getChainId(),
          }),
          txs: jasmine.arrayContaining([]),
        }),
      );

      expect(new ReadonlyDate(response.header.time).getTime()).toBeLessThan(ReadonlyDate.now());
      expect(new ReadonlyDate(response.header.time).getTime()).toBeGreaterThanOrEqual(
        ReadonlyDate.now() - 5_000,
      );

      client.disconnect();
    });
  });

  describe("getBalance", () => {
    it("works for different existing balances", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const response1 = await client.getBalance(unused.address, simapp.denomFee);
      expect(response1).toEqual({
        amount: unused.balanceFee,
        denom: simapp.denomFee,
      });
      const response2 = await client.getBalance(unused.address, simapp.denomStaking);
      expect(response2).toEqual({
        amount: unused.balanceStaking,
        denom: simapp.denomStaking,
      });

      client.disconnect();
    });

    it("returns 0 for non-existent balance", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const response = await client.getBalance(unused.address, "gintonic");
      expect(response).toEqual({
        denom: "gintonic",
        amount: "0",
      });

      client.disconnect();
    });

    it("returns 0 for non-existent address", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const response = await client.getBalance(nonExistentAddress, simapp.denomFee);
      expect(response).toEqual({
        denom: simapp.denomFee,
        amount: "0",
      });

      client.disconnect();
    });
  });

  describe("getAllBalances", () => {
    it("returns all balances for unused account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const balances = await client.getAllBalances(unused.address);
      expect(balances).toEqual([
        {
          amount: unused.balanceFee,
          denom: simapp.denomFee,
        },
        {
          amount: unused.balanceStaking,
          denom: simapp.denomStaking,
        },
      ]);

      client.disconnect();
    });

    it("returns an empty list for non-existent account", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);

      const balances = await client.getAllBalances(nonExistentAddress);
      expect(balances).toEqual([]);

      client.disconnect();
    });
  });

  describe("getBalanceStaked", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      const response = await client.getBalanceStaked(faucet.address0);

      expect(response).toEqual({ denom: "ustake", amount: "63474" });

      client.disconnect();
    });
  });

  describe("broadcastTx", () => {
    it("broadcasts a transaction", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
      const pubkey = encodePubkey({
        type: "tendermint/PubKeySecp256k1",
        value: toBase64(pubkeyBytes),
      });
      const registry = new Registry();
      const txBodyFields: TxBodyEncodeObject = {
        typeUrl: "/cosmos.tx.v1beta1.TxBody",
        value: {
          messages: [
            {
              typeUrl: "/cosmos.bank.v1beta1.MsgSend",
              value: {
                fromAddress: address,
                toAddress: makeRandomAddress(),
                amount: [
                  {
                    denom: "ucosm",
                    amount: "1234567",
                  },
                ],
              },
            },
          ],
        },
      };
      const txBodyBytes = registry.encode(txBodyFields);
      const { accountNumber, sequence } = (await client.getSequence(address))!;
      const feeAmount = coins(2000, "ucosm");
      const gasLimit = 200000;
      const feeGranter = undefined;
      const feePayer = undefined;
      const authInfoBytes = makeAuthInfoBytes(
        [{ pubkey, sequence }],
        feeAmount,
        gasLimit,
        feeGranter,
        feePayer,
      );

      const chainId = await client.getChainId();
      const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
      const { signature } = await wallet.signDirect(address, signDoc);
      const txRaw = TxRaw.fromPartial({
        bodyBytes: txBodyBytes,
        authInfoBytes: authInfoBytes,
        signatures: [fromBase64(signature.signature)],
      });
      const txRawBytes = Uint8Array.from(TxRaw.encode(txRaw).finish());
      const txResult = await client.broadcastTx(txRawBytes);
      assertIsDeliverTxSuccess(txResult);

      const { gasUsed, rawLog, transactionHash } = txResult;
      expect(gasUsed).toBeGreaterThan(0);
      expect(rawLog).toMatch(/{"key":"amount","value":"1234567ucosm"}/);
      expect(transactionHash).toMatch(/^[0-9A-F]{64}$/);

      client.disconnect();
    });

    it("errors immediately for a CheckTx failure", async () => {
      pendingWithoutSimapp();
      const client = await StargateClient.connect(simapp.tendermintUrl);
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
      const pubkey = encodePubkey({
        type: "tendermint/PubKeySecp256k1",
        value: toBase64(pubkeyBytes),
      });
      const registry = new Registry();
      const invalidRecipientAddress = "tgrade1z363ulwcrxged4z5jswyt5dn5v3lzsemwz9ewj"; // wrong bech32 prefix
      const txBodyFields: TxBodyEncodeObject = {
        typeUrl: "/cosmos.tx.v1beta1.TxBody",
        value: {
          messages: [
            {
              typeUrl: "/cosmos.bank.v1beta1.MsgSend",
              value: {
                fromAddress: address,
                toAddress: invalidRecipientAddress,
                amount: [
                  {
                    denom: "ucosm",
                    amount: "1234567",
                  },
                ],
              },
            },
          ],
        },
      };
      const txBodyBytes = registry.encode(txBodyFields);
      const { accountNumber, sequence } = (await client.getSequence(address))!;
      const feeAmount = coins(2000, "ucosm");
      const gasLimit = 200000;
      const feeGranter = undefined;
      const feePayer = undefined;
      const authInfoBytes = makeAuthInfoBytes(
        [{ pubkey, sequence }],
        feeAmount,
        gasLimit,
        feeGranter,
        feePayer,
        sequence,
      );

      const chainId = await client.getChainId();
      const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
      const { signature } = await wallet.signDirect(address, signDoc);
      const txRaw = TxRaw.fromPartial({
        bodyBytes: txBodyBytes,
        authInfoBytes: authInfoBytes,
        signatures: [fromBase64(signature.signature)],
      });
      const txRawBytes = Uint8Array.from(TxRaw.encode(txRaw).finish());

      try {
        await client.broadcastTx(txRawBytes);
        assert(false, "Expected broadcastTx to throw");
      } catch (error: any) {
        expect(error).toMatch(
          simapp44Enabled() ? /invalid recipient address/i : /Broadcasting transaction failed with code 7/i,
        );
        assert(error instanceof BroadcastTxError);
        expect(error.code).toEqual(7);
        expect(error.codespace).toEqual("sdk");
      }

      client.disconnect();
    });

    it("respects user timeouts rather than RPC timeouts", async () => {
      pendingWithoutSlowSimapp();
      const client = await StargateClient.connect(slowSimapp.tendermintUrl);
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
      const pubkey = encodePubkey({
        type: "tendermint/PubKeySecp256k1",
        value: toBase64(pubkeyBytes),
      });
      const registry = new Registry();
      const txBodyFields: TxBodyEncodeObject = {
        typeUrl: "/cosmos.tx.v1beta1.TxBody",
        value: {
          messages: [
            {
              typeUrl: "/cosmos.bank.v1beta1.MsgSend",
              value: {
                fromAddress: address,
                toAddress: makeRandomAddress(),
                amount: [
                  {
                    denom: "ucosm",
                    amount: "1234567",
                  },
                ],
              },
            },
          ],
        },
      };
      const txBodyBytes = registry.encode(txBodyFields);
      const chainId = await client.getChainId();
      const feeAmount = coins(2000, "ucosm");
      const gasLimit = 200000;
      const feeGranter = undefined;
      const feePayer = undefined;

      const { accountNumber: accountNumber1, sequence: sequence1 } = (await client.getSequence(address))!;
      const authInfoBytes1 = makeAuthInfoBytes(
        [{ pubkey, sequence: sequence1 }],
        feeAmount,
        gasLimit,
        feeGranter,
        feePayer,
      );
      const signDoc1 = makeSignDoc(txBodyBytes, authInfoBytes1, chainId, accountNumber1);
      const { signature: signature1 } = await wallet.signDirect(address, signDoc1);
      const txRaw1 = TxRaw.fromPartial({
        bodyBytes: txBodyBytes,
        authInfoBytes: authInfoBytes1,
        signatures: [fromBase64(signature1.signature)],
      });
      const txRawBytes1 = Uint8Array.from(TxRaw.encode(txRaw1).finish());
      const largeTimeoutMs = 30_000;
      const txResult = await client.broadcastTx(txRawBytes1, largeTimeoutMs);
      assertIsDeliverTxSuccess(txResult);

      const { accountNumber: accountNumber2, sequence: sequence2 } = (await client.getSequence(address))!;
      const authInfoBytes2 = makeAuthInfoBytes(
        [{ pubkey, sequence: sequence2 }],
        feeAmount,
        gasLimit,
        feeGranter,
        feePayer,
      );
      const signDoc2 = makeSignDoc(txBodyBytes, authInfoBytes2, chainId, accountNumber2);
      const { signature: signature2 } = await wallet.signDirect(address, signDoc2);
      const txRaw2 = TxRaw.fromPartial({
        bodyBytes: txBodyBytes,
        authInfoBytes: authInfoBytes2,
        signatures: [fromBase64(signature2.signature)],
      });
      const txRawBytes2 = Uint8Array.from(TxRaw.encode(txRaw2).finish());
      const smallTimeoutMs = 1_000;
      await expectAsync(client.broadcastTx(txRawBytes2, smallTimeoutMs)).toBeRejectedWithError(
        TimeoutError,
        /transaction with id .+ was submitted but was not yet found on the chain/i,
      );

      client.disconnect();
    }, 30_000);
  });
});
