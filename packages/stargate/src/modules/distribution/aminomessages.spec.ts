/* eslint-disable @typescript-eslint/naming-convention */
import { coins } from "@cosmjs/proto-signing";
import {
  MsgFundCommunityPool,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from "cosmjs-types/cosmos/distribution/v1beta1/tx";

import { AminoTypes } from "../../aminotypes";
import {
  AminoMsgFundCommunityPool,
  AminoMsgSetWithdrawAddress,
  AminoMsgWithdrawDelegatorReward,
  AminoMsgWithdrawValidatorCommission,
  createDistributionAminoConverters,
} from "./aminomessages";

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for MsgFundCommunityPool", async () => {
      const msg: MsgFundCommunityPool = {
        amount: coins(1234, "ucosm"),
        depositor: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
      };
      const aminoTypes = new AminoTypes(createDistributionAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.distribution.v1beta1.MsgFundCommunityPool",
        value: msg,
      });
      const expected: AminoMsgFundCommunityPool = {
        type: "cosmos-sdk/MsgFundCommunityPool",
        value: {
          amount: coins(1234, "ucosm"),
          depositor: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgSetWithdrawAddress", async () => {
      const msg: MsgSetWithdrawAddress = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        withdrawAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      const aminoTypes = new AminoTypes(createDistributionAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
        value: msg,
      });
      const expected: AminoMsgSetWithdrawAddress = {
        type: "cosmos-sdk/MsgModifyWithdrawAddress",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          withdraw_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgWithdrawDelegatorReward", async () => {
      const msg: MsgWithdrawDelegatorReward = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      const aminoTypes = new AminoTypes(createDistributionAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: msg,
      });
      const expected: AminoMsgWithdrawDelegatorReward = {
        type: "cosmos-sdk/MsgWithdrawDelegationReward",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgWithdrawValidatorCommission", async () => {
      const msg: MsgWithdrawValidatorCommission = {
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      const aminoTypes = new AminoTypes(createDistributionAminoConverters());
      const aminoMsg = aminoTypes.toAmino({
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
        value: msg,
      });
      const expected: AminoMsgWithdrawValidatorCommission = {
        type: "cosmos-sdk/MsgWithdrawValidatorCommission",
        value: {
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });
  });

  // describe("fromAmino", () => {
  // TODO: MsgFundCommunityPool
  // TODO: MsgSetWithdrawAddress
  // TODO: MsgWithdrawDelegatorReward
  // TODO: MsgWithdrawValidatorCommission
  // });
});
