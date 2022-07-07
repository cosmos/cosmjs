/* eslint-disable @typescript-eslint/naming-convention,no-bitwise */
import { Secp256k1HdWallet } from "@cosmjs/amino";
import { coin, coins, decodeTxRaw, DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import { assert, sleep } from "@cosmjs/utils";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { DeepPartial, MsgDelegate } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { AuthInfo, TxBody, TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import Long from "long";
import protobuf from "protobufjs/minimal";

import { AminoTypes } from "./aminotypes";
import { AminoMsgDelegate, MsgDelegateEncodeObject, MsgSendEncodeObject } from "./modules";
import { PrivateSigningStargateClient, SigningStargateClient } from "./signingstargateclient";
import { assertIsDeliverTxFailure, assertIsDeliverTxSuccess, isDeliverTxFailure } from "./stargateclient";
import {
  defaultGasPrice,
  defaultSendFee,
  defaultSigningClientOptions,
  faucet,
  makeRandomAddress,
  ModifyingDirectSecp256k1HdWallet,
  ModifyingSecp256k1HdWallet,
  pendingWithoutSimapp,
  pendingWithoutSimapp42,
  simapp,
  validator,
} from "./testutils.spec";

describe("SigningStargateClient", () => {
  describe("constructor", () => {
    it("can be constructed with custom registry", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const registry = new Registry();
      registry.register("/custom.MsgCustom", MsgSend);
      const options = { ...defaultSigningClientOptions, registry: registry };
      const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet, options);
      const openedClient = client as unknown as PrivateSigningStargateClient;
      expect(openedClient.registry.lookupType("/custom.MsgCustom")).toEqual(MsgSend);
    });
  });

  describe("simulate", () => {
    it("works", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = await SigningStargateClient.connectWithSigner(
        simapp.tendermintUrl,
        wallet,
        defaultSigningClientOptions,
      );

      const msg = MsgDelegate.fromPartial({
        delegatorAddress: faucet.address0,
        validatorAddress: validator.validatorAddress,
        amount: coin(1234, "ustake"),
      });
      const msgAny: MsgDelegateEncodeObject = {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: msg,
      };
      const memo = "Use your power wisely";
      const gasUsed = await client.simulate(faucet.address0, [msgAny], memo);
      expect(gasUsed).toBeGreaterThanOrEqual(101_000);
      expect(gasUsed).toBeLessThanOrEqual(150_000);

      client.disconnect();
    });
  });

  describe("sendTokens", () => {
    it("works with direct signer", async () => {
      pendingWithoutSimapp();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = await SigningStargateClient.connectWithSigner(
        simapp.tendermintUrl,
        wallet,
        defaultSigningClientOptions,
      );

      const amount = coins(7890, "ucosm");
      const beneficiaryAddress = makeRandomAddress();
      const memo = "for dinner";

      // no tokens here
      const before = await client.getBalance(beneficiaryAddress, "ucosm");
      expect(before).toEqual({
        denom: "ucosm",
        amount: "0",
      });

      // send
      const result = await client.sendTokens(
        faucet.address0,
        beneficiaryAddress,
        amount,
        defaultSendFee,
        memo,
      );
      assertIsDeliverTxSuccess(result);
      expect(result.rawLog).toBeTruthy();

      // got tokens
      const after = await client.getBalance(beneficiaryAddress, "ucosm");
      expect(after).toEqual(amount[0]);
    });

    it("works with legacy Amino signer", async () => {
      pendingWithoutSimapp();
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = await SigningStargateClient.connectWithSigner(
        simapp.tendermintUrl,
        wallet,
        defaultSigningClientOptions,
      );

      const amount = coins(7890, "ucosm");
      const beneficiaryAddress = makeRandomAddress();
      const memo = "for dinner";

      // no tokens here
      const before = await client.getBalance(beneficiaryAddress, "ucosm");
      expect(before).toEqual({
        denom: "ucosm",
        amount: "0",
      });

      // send
      const result = await client.sendTokens(
        faucet.address0,
        beneficiaryAddress,
        amount,
        defaultSendFee,
        memo,
      );
      assertIsDeliverTxSuccess(result);
      expect(result.rawLog).toBeTruthy();

      // got tokens
      const after = await client.getBalance(beneficiaryAddress, "ucosm");
      expect(after).toEqual(amount[0]);
    });
  });

  describe("sendIbcTokens", () => {
    it("works with direct signing", async () => {
      pendingWithoutSimapp42();
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = await SigningStargateClient.connectWithSigner(
        simapp.tendermintUrl,
        wallet,
        defaultSigningClientOptions,
      );
      const memo = "Cross-chain fun";
      const fee = {
        amount: coins(2000, "ucosm"),
        gas: "222000", // 222k
      };

      // both timeouts set
      {
        const result = await client.sendIbcTokens(
          faucet.address0,
          faucet.address1,
          coin(1234, "ucosm"),
          "fooPort",
          "fooChannel",
          { revisionHeight: Long.fromNumber(123), revisionNumber: Long.fromNumber(456) },
          Math.floor(Date.now() / 1000) + 60,
          fee,
          memo,
        );
        // CheckTx must pass but the execution must fail in DeliverTx due to invalid channel/port
        expect(isDeliverTxFailure(result)).toEqual(true);
      }

      // no height timeout
      {
        const result = await client.sendIbcTokens(
          faucet.address0,
          faucet.address1,
          coin(1234, "ucosm"),
          "fooPort",
          "fooChannel",
          undefined,
          Math.floor(Date.now() / 1000) + 60,
          fee,
          memo,
        );
        // CheckTx must pass but the execution must fail in DeliverTx due to invalid channel/port
        expect(isDeliverTxFailure(result)).toEqual(true);
      }
    });

    it("works with Amino signing", async () => {
      pendingWithoutSimapp42();
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = await SigningStargateClient.connectWithSigner(
        simapp.tendermintUrl,
        wallet,
        defaultSigningClientOptions,
      );
      const memo = "Cross-chain fun";
      const fee = {
        amount: coins(2000, "ucosm"),
        gas: "222000", // 222k
      };

      // both timeouts set
      {
        const result = await client.sendIbcTokens(
          faucet.address0,
          faucet.address1,
          coin(1234, "ucosm"),
          "fooPort",
          "fooChannel",
          { revisionHeight: Long.fromNumber(123), revisionNumber: Long.fromNumber(456) },
          Math.floor(Date.now() / 1000) + 60,
          fee,
          memo,
        );
        // CheckTx must pass but the execution must fail in DeliverTx due to invalid channel/port
        expect(isDeliverTxFailure(result)).toEqual(true);
      }

      // no height timeout
      {
        const result = await client.sendIbcTokens(
          faucet.address0,
          faucet.address1,
          coin(1234, "ucosm"),
          "fooPort",
          "fooChannel",
          undefined,
          Math.floor(Date.now() / 1000) + 60,
          fee,
          memo,
        );
        // CheckTx must pass but the execution must fail in DeliverTx due to invalid channel/port
        expect(isDeliverTxFailure(result)).toEqual(true);
      }
    });
  });

  describe("signAndBroadcast", () => {
    describe("direct mode", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(
          simapp.tendermintUrl,
          wallet,
          defaultSigningClientOptions,
        );

        const msg = MsgDelegate.fromPartial({
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(1234, "ustake"),
        });
        const msgAny: MsgDelegateEncodeObject = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: msg,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "222000", // 222k
        };
        const memo = "Use your power wisely";
        const result = await client.signAndBroadcast(faucet.address0, [msgAny], fee, memo);
        assertIsDeliverTxSuccess(result);
        expect(result.code).toEqual(0);
        expect(result.gasWanted).toEqual(222_000);
        expect(result.gasUsed).toBeLessThanOrEqual(222_000);
        expect(result.gasUsed).toBeGreaterThan(100_000);
      });

      it("returns DeliverTxFailure on DeliverTx failure", async () => {
        pendingWithoutSimapp();
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(
          simapp.tendermintUrl,
          wallet,
          defaultSigningClientOptions,
        );

        const msg = MsgSend.fromPartial({
          fromAddress: faucet.address0,
          toAddress: makeRandomAddress(),
          amount: coins(Number.MAX_SAFE_INTEGER, "ustake"),
        });
        const msgAny: MsgSendEncodeObject = {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: msg,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "99000",
        };
        const result = await client.signAndBroadcast(faucet.address0, [msgAny], fee);
        assertIsDeliverTxFailure(result);
        expect(result.code).toBeGreaterThan(0);
        expect(result.gasWanted).toEqual(99_000);
        expect(result.gasUsed).toBeLessThanOrEqual(99_000);
        expect(result.gasUsed).toBeGreaterThan(40_000);
      });

      it("works with auto gas", async () => {
        pendingWithoutSimapp();
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet, {
          ...defaultSigningClientOptions,
          gasPrice: defaultGasPrice,
        });

        const msg = MsgDelegate.fromPartial({
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(1234, "ustake"),
        });
        const msgAny: MsgDelegateEncodeObject = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: msg,
        };
        const result = await client.signAndBroadcast(faucet.address0, [msgAny], "auto");
        assertIsDeliverTxSuccess(result);
      });

      it("works with a modifying signer", async () => {
        pendingWithoutSimapp();
        const wallet = await ModifyingDirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(
          simapp.tendermintUrl,
          wallet,
          defaultSigningClientOptions,
        );

        const msg = MsgDelegate.fromPartial({
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(1234, "ustake"),
        });
        const msgAny: MsgDelegateEncodeObject = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: msg,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "222000", // 222k
        };
        const memo = "Use your power wisely";
        const result = await client.signAndBroadcast(faucet.address0, [msgAny], fee, memo);
        assertIsDeliverTxSuccess(result);

        await sleep(1000);

        const searchResult = await client.getTx(result.transactionHash);
        assert(searchResult, "Must find transaction");
        const tx = decodeTxRaw(searchResult.tx);
        // From ModifyingDirectSecp256k1HdWallet
        expect(tx.body.memo).toEqual("This was modified");
        expect({ ...tx.authInfo.fee!.amount[0] }).toEqual(coin(3000, "ucosm"));
        expect(tx.authInfo.fee!.gasLimit.toNumber()).toEqual(333333);
      });
    });

    describe("legacy Amino mode", () => {
      it("works with bank MsgSend", async () => {
        pendingWithoutSimapp();
        const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(
          simapp.tendermintUrl,
          wallet,
          defaultSigningClientOptions,
        );

        const msgSend: MsgSend = {
          fromAddress: faucet.address0,
          toAddress: makeRandomAddress(),
          amount: coins(1234, "ucosm"),
        };
        const msgAny: MsgSendEncodeObject = {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: msgSend,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "200000",
        };
        const memo = "Use your tokens wisely";
        const result = await client.signAndBroadcast(faucet.address0, [msgAny], fee, memo);
        assertIsDeliverTxSuccess(result);
      });

      it("works with staking MsgDelegate", async () => {
        pendingWithoutSimapp();
        const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(
          simapp.tendermintUrl,
          wallet,
          defaultSigningClientOptions,
        );

        const msgDelegate: MsgDelegate = {
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(1234, "ustake"),
        };
        const msgAny: MsgDelegateEncodeObject = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: msgDelegate,
        };
        const fee = {
          amount: coins(2000, "ustake"),
          gas: "200000",
        };
        const memo = "Use your tokens wisely";
        const result = await client.signAndBroadcast(faucet.address0, [msgAny], fee, memo);
        assertIsDeliverTxSuccess(result);
      });

      it("works with a custom registry and custom message", async () => {
        pendingWithoutSimapp();
        const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);

        const customRegistry = new Registry();
        const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
        interface CustomMsgDelegate {
          customDelegatorAddress?: string;
          customValidatorAddress?: string;
          customAmount?: Coin;
        }
        const baseCustomMsgDelegate: CustomMsgDelegate = {
          customDelegatorAddress: "",
          customValidatorAddress: "",
        };
        const CustomMsgDelegate = {
          // Adapted from autogenerated MsgDelegate implementation
          encode(
            message: CustomMsgDelegate,
            writer: protobuf.Writer = protobuf.Writer.create(),
          ): protobuf.Writer {
            writer.uint32(10).string(message.customDelegatorAddress ?? "");
            writer.uint32(18).string(message.customValidatorAddress ?? "");
            if (message.customAmount !== undefined && message.customAmount !== undefined) {
              Coin.encode(message.customAmount, writer.uint32(26).fork()).ldelim();
            }
            return writer;
          },

          decode(): CustomMsgDelegate {
            throw new Error("decode method should not be required");
          },

          fromJSON(): CustomMsgDelegate {
            throw new Error("fromJSON method should not be required");
          },

          fromPartial(object: DeepPartial<CustomMsgDelegate>): CustomMsgDelegate {
            const message = { ...baseCustomMsgDelegate } as CustomMsgDelegate;
            if (object.customDelegatorAddress !== undefined && object.customDelegatorAddress !== null) {
              message.customDelegatorAddress = object.customDelegatorAddress;
            } else {
              message.customDelegatorAddress = "";
            }
            if (object.customValidatorAddress !== undefined && object.customValidatorAddress !== null) {
              message.customValidatorAddress = object.customValidatorAddress;
            } else {
              message.customValidatorAddress = "";
            }
            if (object.customAmount !== undefined && object.customAmount !== null) {
              message.customAmount = Coin.fromPartial(object.customAmount);
            } else {
              message.customAmount = undefined;
            }
            return message;
          },

          toJSON(): unknown {
            throw new Error("toJSON method should not be required");
          },
        };
        customRegistry.register(msgDelegateTypeUrl, CustomMsgDelegate);
        const customAminoTypes = new AminoTypes({
          "/cosmos.staking.v1beta1.MsgDelegate": {
            aminoType: "cosmos-sdk/MsgDelegate",
            toAmino: ({
              customDelegatorAddress,
              customValidatorAddress,
              customAmount,
            }: CustomMsgDelegate): AminoMsgDelegate["value"] => {
              assert(customDelegatorAddress, "missing customDelegatorAddress");
              assert(customValidatorAddress, "missing validatorAddress");
              assert(customAmount, "missing amount");
              return {
                delegator_address: customDelegatorAddress,
                validator_address: customValidatorAddress,
                amount: {
                  amount: customAmount.amount,
                  denom: customAmount.denom,
                },
              };
            },
            fromAmino: ({
              delegator_address,
              validator_address,
              amount,
            }: AminoMsgDelegate["value"]): CustomMsgDelegate => ({
              customDelegatorAddress: delegator_address,
              customValidatorAddress: validator_address,
              customAmount: Coin.fromPartial(amount),
            }),
          },
        });
        const options = {
          ...defaultSigningClientOptions,
          registry: customRegistry,
          aminoTypes: customAminoTypes,
        };
        const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet, options);

        const msg: CustomMsgDelegate = {
          customDelegatorAddress: faucet.address0,
          customValidatorAddress: validator.validatorAddress,
          customAmount: coin(1234, "ustake"),
        };
        const msgAny = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: msg,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "200000",
        };
        const memo = "Use your power wisely";
        const result = await client.signAndBroadcast(faucet.address0, [msgAny], fee, memo);
        assertIsDeliverTxSuccess(result);
      });

      it("works with a modifying signer", async () => {
        pendingWithoutSimapp();
        const wallet = await ModifyingSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(
          simapp.tendermintUrl,
          wallet,
          defaultSigningClientOptions,
        );

        const msg: MsgDelegate = {
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(1234, "ustake"),
        };
        const msgAny: MsgDelegateEncodeObject = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: msg,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "200000",
        };
        const memo = "Use your power wisely";
        const result = await client.signAndBroadcast(faucet.address0, [msgAny], fee, memo);
        assertIsDeliverTxSuccess(result);

        await sleep(1000);

        const searchResult = await client.getTx(result.transactionHash);
        assert(searchResult, "Must find transaction");
        const tx = decodeTxRaw(searchResult.tx);
        // From ModifyingSecp256k1HdWallet
        expect(tx.body.memo).toEqual("This was modified");
        expect({ ...tx.authInfo.fee!.amount[0] }).toEqual(coin(3000, "ucosm"));
        expect(tx.authInfo.fee!.gasLimit.toNumber()).toEqual(333333);
      });
    });
  });

  describe("sign", () => {
    describe("direct mode", () => {
      it("works", async () => {
        pendingWithoutSimapp();
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(
          simapp.tendermintUrl,
          wallet,
          defaultSigningClientOptions,
        );

        const msg = MsgDelegate.fromPartial({
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(1234, "ustake"),
        });
        const msgAny: MsgDelegateEncodeObject = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: msg,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "222000", // 222k
        };
        const memo = "Use your power wisely";
        const signed = await client.sign(faucet.address0, [msgAny], fee, memo);

        // ensure signature is valid
        const result = await client.broadcastTx(Uint8Array.from(TxRaw.encode(signed).finish()));
        assertIsDeliverTxSuccess(result);
      });

      it("works with a modifying signer", async () => {
        pendingWithoutSimapp();
        const wallet = await ModifyingDirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(
          simapp.tendermintUrl,
          wallet,
          defaultSigningClientOptions,
        );

        const msg = MsgDelegate.fromPartial({
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(1234, "ustake"),
        });
        const msgAny: MsgDelegateEncodeObject = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: msg,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "222000", // 222k
        };
        const memo = "Use your power wisely";
        const signed = await client.sign(faucet.address0, [msgAny], fee, memo);

        const body = TxBody.decode(signed.bodyBytes);
        const authInfo = AuthInfo.decode(signed.authInfoBytes);
        // From ModifyingDirectSecp256k1HdWallet
        expect(body.memo).toEqual("This was modified");
        expect({ ...authInfo.fee!.amount[0] }).toEqual(coin(3000, "ucosm"));
        expect(authInfo.fee!.gasLimit.toNumber()).toEqual(333333);

        // ensure signature is valid
        const result = await client.broadcastTx(Uint8Array.from(TxRaw.encode(signed).finish()));
        assertIsDeliverTxSuccess(result);
      });
    });

    describe("legacy Amino mode", () => {
      it("works with bank MsgSend", async () => {
        pendingWithoutSimapp();
        const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(
          simapp.tendermintUrl,
          wallet,
          defaultSigningClientOptions,
        );

        const msgSend: MsgSend = {
          fromAddress: faucet.address0,
          toAddress: makeRandomAddress(),
          amount: coins(1234, "ucosm"),
        };
        const msgAny: MsgSendEncodeObject = {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: msgSend,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "200000",
        };
        const memo = "Use your tokens wisely";
        const signed = await client.sign(faucet.address0, [msgAny], fee, memo);

        // ensure signature is valid
        const result = await client.broadcastTx(Uint8Array.from(TxRaw.encode(signed).finish()));
        assertIsDeliverTxSuccess(result);
      });

      it("works with staking MsgDelegate", async () => {
        pendingWithoutSimapp();
        const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(
          simapp.tendermintUrl,
          wallet,
          defaultSigningClientOptions,
        );

        const msgDelegate: MsgDelegate = {
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(1234, "ustake"),
        };
        const msgAny: MsgDelegateEncodeObject = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: msgDelegate,
        };
        const fee = {
          amount: coins(2000, "ustake"),
          gas: "200000",
        };
        const memo = "Use your tokens wisely";
        const signed = await client.sign(faucet.address0, [msgAny], fee, memo);

        // ensure signature is valid
        const result = await client.broadcastTx(Uint8Array.from(TxRaw.encode(signed).finish()));
        assertIsDeliverTxSuccess(result);
      });

      it("works with a custom registry and custom message", async () => {
        pendingWithoutSimapp();
        const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);

        const customRegistry = new Registry();
        const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
        interface CustomMsgDelegate {
          customDelegatorAddress?: string;
          customValidatorAddress?: string;
          customAmount?: Coin;
        }
        const baseCustomMsgDelegate: CustomMsgDelegate = {
          customDelegatorAddress: "",
          customValidatorAddress: "",
        };
        const CustomMsgDelegate = {
          // Adapted from autogenerated MsgDelegate implementation
          encode(
            message: CustomMsgDelegate,
            writer: protobuf.Writer = protobuf.Writer.create(),
          ): protobuf.Writer {
            writer.uint32(10).string(message.customDelegatorAddress ?? "");
            writer.uint32(18).string(message.customValidatorAddress ?? "");
            if (message.customAmount !== undefined && message.customAmount !== undefined) {
              Coin.encode(message.customAmount, writer.uint32(26).fork()).ldelim();
            }
            return writer;
          },

          decode(): CustomMsgDelegate {
            throw new Error("decode method should not be required");
          },

          fromJSON(): CustomMsgDelegate {
            throw new Error("fromJSON method should not be required");
          },

          fromPartial(object: DeepPartial<CustomMsgDelegate>): CustomMsgDelegate {
            const message = { ...baseCustomMsgDelegate } as CustomMsgDelegate;
            if (object.customDelegatorAddress !== undefined && object.customDelegatorAddress !== null) {
              message.customDelegatorAddress = object.customDelegatorAddress;
            } else {
              message.customDelegatorAddress = "";
            }
            if (object.customValidatorAddress !== undefined && object.customValidatorAddress !== null) {
              message.customValidatorAddress = object.customValidatorAddress;
            } else {
              message.customValidatorAddress = "";
            }
            if (object.customAmount !== undefined && object.customAmount !== null) {
              message.customAmount = Coin.fromPartial(object.customAmount);
            } else {
              message.customAmount = undefined;
            }
            return message;
          },

          toJSON(): unknown {
            throw new Error("toJSON method should not be required");
          },
        };
        customRegistry.register(msgDelegateTypeUrl, CustomMsgDelegate);
        const customAminoTypes = new AminoTypes({
          "/cosmos.staking.v1beta1.MsgDelegate": {
            aminoType: "cosmos-sdk/MsgDelegate",
            toAmino: ({
              customDelegatorAddress,
              customValidatorAddress,
              customAmount,
            }: CustomMsgDelegate): AminoMsgDelegate["value"] => {
              assert(customDelegatorAddress, "missing customDelegatorAddress");
              assert(customValidatorAddress, "missing validatorAddress");
              assert(customAmount, "missing amount");
              return {
                delegator_address: customDelegatorAddress,
                validator_address: customValidatorAddress,
                amount: {
                  amount: customAmount.amount,
                  denom: customAmount.denom,
                },
              };
            },
            fromAmino: ({
              delegator_address,
              validator_address,
              amount,
            }: AminoMsgDelegate["value"]): CustomMsgDelegate => ({
              customDelegatorAddress: delegator_address,
              customValidatorAddress: validator_address,
              customAmount: Coin.fromPartial(amount),
            }),
          },
        });
        const options = {
          ...defaultSigningClientOptions,
          registry: customRegistry,
          aminoTypes: customAminoTypes,
        };
        const client = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet, options);

        const msg: CustomMsgDelegate = {
          customDelegatorAddress: faucet.address0,
          customValidatorAddress: validator.validatorAddress,
          customAmount: coin(1234, "ustake"),
        };
        const msgAny = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: msg,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "200000",
        };
        const memo = "Use your power wisely";
        const signed = await client.sign(faucet.address0, [msgAny], fee, memo);

        // ensure signature is valid
        const result = await client.broadcastTx(Uint8Array.from(TxRaw.encode(signed).finish()));
        assertIsDeliverTxSuccess(result);
      });

      it("works with a modifying signer", async () => {
        pendingWithoutSimapp();
        const wallet = await ModifyingSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
        const client = await SigningStargateClient.connectWithSigner(
          simapp.tendermintUrl,
          wallet,
          defaultSigningClientOptions,
        );

        const msg: MsgDelegate = {
          delegatorAddress: faucet.address0,
          validatorAddress: validator.validatorAddress,
          amount: coin(1234, "ustake"),
        };
        const msgAny: MsgDelegateEncodeObject = {
          typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
          value: msg,
        };
        const fee = {
          amount: coins(2000, "ucosm"),
          gas: "200000",
        };
        const memo = "Use your power wisely";
        const signed = await client.sign(faucet.address0, [msgAny], fee, memo);

        const body = TxBody.decode(signed.bodyBytes);
        const authInfo = AuthInfo.decode(signed.authInfoBytes);
        // From ModifyingSecp256k1HdWallet
        expect(body.memo).toEqual("This was modified");
        expect({ ...authInfo.fee!.amount[0] }).toEqual(coin(3000, "ucosm"));
        expect(authInfo.fee!.gasLimit.toNumber()).toEqual(333333);

        // ensure signature is valid
        const result = await client.broadcastTx(Uint8Array.from(TxRaw.encode(signed).finish()));
        assertIsDeliverTxSuccess(result);
      });
    });
  });
});
