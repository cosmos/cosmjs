/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64 } from "@cosmjs/encoding";
import { coin } from "@cosmjs/proto-signing";
import { PubKey as CosmosCryptoSecp256k1Pubkey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
} from "cosmjs-types/cosmos/staking/v1beta1/tx";

import { AminoTypes } from "../../aminotypes";
import {
  AminoMsgBeginRedelegate,
  AminoMsgCreateValidator,
  AminoMsgDelegate,
  AminoMsgEditValidator,
  AminoMsgUndelegate,
  createStakingAminoConverters,
  protoDecimalToJson,
} from "./aminomessages";

describe("AminoTypes", () => {
  describe("protoDecimalToJson", () => {
    it("works", () => {
      expect(protoDecimalToJson("0")).toEqual("0.000000000000000000");
      expect(protoDecimalToJson("1")).toEqual("0.000000000000000001");
      expect(protoDecimalToJson("2497")).toEqual("0.000000000000002497");
      expect(protoDecimalToJson("987000000000000000")).toEqual("0.987000000000000000");
      expect(protoDecimalToJson("123987000000000000000")).toEqual("123.987000000000000000");
      expect(protoDecimalToJson("4872000000000000000000")).toEqual("4872.000000000000000000");
    });
  });

  describe("toAmino", () => {
    it("works for MsgBeginRedelegate", () => {
      const msg: MsgBeginRedelegate = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorSrcAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        validatorDstAddress: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        amount: coin(1234, "ucosm"),
      };
      const aminoTypes = new AminoTypes(createStakingAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
        value: msg,
      });
      const expected: AminoMsgBeginRedelegate = {
        type: "cosmos-sdk/MsgBeginRedelegate",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_src_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          validator_dst_address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          amount: coin(1234, "ucosm"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgCreateValidator", () => {
      const msg: MsgCreateValidator = {
        description: {
          moniker: "validator",
          identity: "me",
          website: "valid.com",
          securityContact: "Hamburglar",
          details: "...",
        },
        commission: {
          rate: "200000000000000000", // 0.2
          maxRate: "300000000000000000", // 0.3
          maxChangeRate: "100000000000000000", // 0.1
        },
        minSelfDelegation: "123",
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        pubkey: {
          typeUrl: "/cosmos.crypto.secp256k1.PubKey",
          value: Uint8Array.from(
            CosmosCryptoSecp256k1Pubkey.encode(
              CosmosCryptoSecp256k1Pubkey.fromPartial({
                key: fromBase64("A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ"),
              }),
            ).finish(),
          ),
        },
        value: coin(1234, "ucosm"),
      };
      const aminoTypes = new AminoTypes(createStakingAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
        value: msg,
      });
      const expected: AminoMsgCreateValidator = {
        type: "cosmos-sdk/MsgCreateValidator",
        value: {
          description: {
            moniker: "validator",
            identity: "me",
            website: "valid.com",
            security_contact: "Hamburglar",
            details: "...",
          },
          commission: {
            rate: "0.200000000000000000",
            max_rate: "0.300000000000000000",
            max_change_rate: "0.100000000000000000",
          },
          min_self_delegation: "123",
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          pubkey: {
            type: "tendermint/PubKeySecp256k1",
            value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
          },
          value: coin(1234, "ucosm"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgDelegate", () => {
      const msg: MsgDelegate = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coin(1234, "ucosm"),
      };
      const aminoTypes = new AminoTypes(createStakingAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: msg,
      });
      const expected: AminoMsgDelegate = {
        type: "cosmos-sdk/MsgDelegate",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coin(1234, "ucosm"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgEditValidator", () => {
      const msg: MsgEditValidator = {
        description: {
          moniker: "validator",
          identity: "me",
          website: "valid.com",
          securityContact: "Hamburglar",
          details: "...",
        },
        commissionRate: "21000000000000000", // 0.021
        minSelfDelegation: "123",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      const aminoTypes = new AminoTypes(createStakingAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator",
        value: msg,
      });
      const expected: AminoMsgEditValidator = {
        type: "cosmos-sdk/MsgEditValidator",
        value: {
          description: {
            moniker: "validator",
            identity: "me",
            website: "valid.com",
            security_contact: "Hamburglar",
            details: "...",
          },
          commission_rate: "0.021000000000000000",
          min_self_delegation: "123",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgUndelegate", () => {
      const msg: MsgUndelegate = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coin(1234, "ucosm"),
      };
      const aminoTypes = new AminoTypes(createStakingAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
        value: msg,
      });
      const expected: AminoMsgUndelegate = {
        type: "cosmos-sdk/MsgUndelegate",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coin(1234, "ucosm"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });
  });

  describe("fromAmino", () => {
    it("works for MsgBeginRedelegate", () => {
      const aminoMsg: AminoMsgBeginRedelegate = {
        type: "cosmos-sdk/MsgBeginRedelegate",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_src_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          validator_dst_address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          amount: coin(1234, "ucosm"),
        },
      };
      const msg = new AminoTypes(createStakingAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgBeginRedelegate = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorSrcAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        validatorDstAddress: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        amount: coin(1234, "ucosm"),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
        value: expectedValue,
      });
    });

    it("works for MsgCreateValidator", () => {
      const aminoMsg: AminoMsgCreateValidator = {
        type: "cosmos-sdk/MsgCreateValidator",
        value: {
          description: {
            moniker: "validator",
            identity: "me",
            website: "valid.com",
            security_contact: "Hamburglar",
            details: "...",
          },
          commission: {
            rate: "0.200000000000000000",
            max_rate: "0.300000000000000000",
            max_change_rate: "0.100000000000000000",
          },
          min_self_delegation: "123",
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          pubkey: {
            type: "tendermint/PubKeySecp256k1",
            value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
          },
          value: coin(1234, "ucosm"),
        },
      };
      const msg = new AminoTypes(createStakingAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgCreateValidator = {
        description: {
          moniker: "validator",
          identity: "me",
          website: "valid.com",
          securityContact: "Hamburglar",
          details: "...",
        },
        commission: {
          rate: "200000000000000000", // 0.2
          maxRate: "300000000000000000", // 0.3
          maxChangeRate: "100000000000000000", // 0.1
        },
        minSelfDelegation: "123",
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        pubkey: {
          typeUrl: "/cosmos.crypto.secp256k1.PubKey",
          value: Uint8Array.from(
            CosmosCryptoSecp256k1Pubkey.encode(
              CosmosCryptoSecp256k1Pubkey.fromPartial({
                key: fromBase64("A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ"),
              }),
            ).finish(),
          ),
        },
        value: coin(1234, "ucosm"),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
        value: expectedValue,
      });
    });

    it("works for MsgDelegate", () => {
      const aminoMsg: AminoMsgDelegate = {
        type: "cosmos-sdk/MsgDelegate",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coin(1234, "ucosm"),
        },
      };
      const msg = new AminoTypes(createStakingAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgDelegate = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coin(1234, "ucosm"),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: expectedValue,
      });
    });

    it("works for MsgEditValidator", () => {
      const aminoMsg: AminoMsgEditValidator = {
        type: "cosmos-sdk/MsgEditValidator",
        value: {
          description: {
            moniker: "validator",
            identity: "me",
            website: "valid.com",
            security_contact: "Hamburglar",
            details: "...",
          },
          commission_rate: "0.050000000000000000", // 0.05
          min_self_delegation: "123",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      const msg = new AminoTypes(createStakingAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgEditValidator = {
        description: {
          moniker: "validator",
          identity: "me",
          website: "valid.com",
          securityContact: "Hamburglar",
          details: "...",
        },
        commissionRate: "50000000000000000", // 0.05
        minSelfDelegation: "123",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator",
        value: expectedValue,
      });
    });

    it("works for MsgUndelegate", () => {
      const aminoMsg: AminoMsgUndelegate = {
        type: "cosmos-sdk/MsgUndelegate",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coin(1234, "ucosm"),
        },
      };
      const msg = new AminoTypes(createStakingAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgUndelegate = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coin(1234, "ucosm"),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
        value: expectedValue,
      });
    });
  });
});
