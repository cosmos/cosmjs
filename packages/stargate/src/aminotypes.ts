/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, toBase64 } from "@cosmjs/encoding";
import {
  decodeBech32Pubkey,
  encodeBech32Pubkey,
  Msg,
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgFundCommunityPool,
  MsgMultiSend,
  MsgSend,
  MsgSetWithdrawAddress,
  MsgUndelegate,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from "@cosmjs/launchpad";
import { EncodeObject } from "@cosmjs/proto-signing";
import { assertDefinedAndNotNull } from "@cosmjs/utils";

import { cosmos } from "./codec";
import { coinFromProto } from "./stargateclient";

type IMsgSend = cosmos.bank.v1beta1.IMsgSend;
type IMsgMultiSend = cosmos.bank.v1beta1.IMsgMultiSend;
type IMsgFundCommunityPool = cosmos.distribution.v1beta1.IMsgFundCommunityPool;
type IMsgSetWithdrawAddress = cosmos.distribution.v1beta1.IMsgSetWithdrawAddress;
type IMsgWithdrawDelegatorReward = cosmos.distribution.v1beta1.IMsgWithdrawDelegatorReward;
type IMsgWithdrawValidatorCommission = cosmos.distribution.v1beta1.IMsgWithdrawValidatorCommission;
type IMsgBeginRedelegate = cosmos.staking.v1beta1.IMsgBeginRedelegate;
type IMsgCreateValidator = cosmos.staking.v1beta1.IMsgCreateValidator;
type IMsgDelegate = cosmos.staking.v1beta1.IMsgDelegate;
type IMsgEditValidator = cosmos.staking.v1beta1.IMsgEditValidator;
type IMsgUndelegate = cosmos.staking.v1beta1.IMsgUndelegate;

export interface AminoConverter {
  readonly aminoType: string;
  readonly toAmino: (value: any) => any;
  readonly fromAmino: (value: any) => any;
}

function createDefaultTypes(prefix: string): Record<string, AminoConverter> {
  return {
    "/cosmos.bank.v1beta1.MsgSend": {
      aminoType: "cosmos-sdk/MsgSend",
      toAmino: ({ fromAddress, toAddress, amount }: IMsgSend): MsgSend["value"] => {
        assertDefinedAndNotNull(fromAddress, "missing fromAddress");
        assertDefinedAndNotNull(toAddress, "missing toAddress");
        assertDefinedAndNotNull(amount, "missing amount");
        return {
          from_address: fromAddress,
          to_address: toAddress,
          amount: amount.map(coinFromProto),
        };
      },
      fromAmino: ({ from_address, to_address, amount }: MsgSend["value"]): IMsgSend => ({
        fromAddress: from_address,
        toAddress: to_address,
        amount: [...amount],
      }),
    },
    "/cosmos.bank.v1beta1.MsgMultiSend": {
      aminoType: "cosmos-sdk/MsgMultiSend",
      toAmino: ({ inputs, outputs }: IMsgMultiSend): MsgMultiSend["value"] => {
        assertDefinedAndNotNull(inputs, "missing inputs");
        assertDefinedAndNotNull(outputs, "missing outputs");
        return {
          inputs: inputs.map((input) => {
            assertDefinedAndNotNull(input.address, "missing input.address");
            assertDefinedAndNotNull(input.coins, "missing input.amount");
            return {
              address: input.address,
              coins: input.coins.map(coinFromProto),
            };
          }),
          outputs: outputs.map((output) => {
            assertDefinedAndNotNull(output.address, "missing output.address");
            assertDefinedAndNotNull(output.coins, "missing output.coins");
            return {
              address: output.address,
              coins: output.coins.map(coinFromProto),
            };
          }),
        };
      },
      fromAmino: ({ inputs, outputs }: MsgMultiSend["value"]): IMsgMultiSend => ({
        inputs: inputs.map((input) => ({
          address: input.address,
          coins: [...input.coins],
        })),
        outputs: outputs.map((output) => ({
          address: output.address,
          coins: [...output.coins],
        })),
      }),
    },
    "/cosmos.distribution.v1beta1.MsgFundCommunityPool": {
      aminoType: "cosmos-sdk/MsgFundCommunityPool",
      toAmino: ({ amount, depositor }: IMsgFundCommunityPool): MsgFundCommunityPool["value"] => {
        assertDefinedAndNotNull(amount);
        assertDefinedAndNotNull(depositor);
        return {
          amount: amount.map(coinFromProto),
          depositor: depositor,
        };
      },
      fromAmino: ({ amount, depositor }: MsgFundCommunityPool["value"]): IMsgFundCommunityPool => ({
        amount: [...amount],
        depositor: depositor,
      }),
    },
    "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress": {
      aminoType: "cosmos-sdk/MsgModifyWithdrawAddress",
      toAmino: ({
        delegatorAddress,
        withdrawAddress,
      }: IMsgSetWithdrawAddress): MsgSetWithdrawAddress["value"] => {
        assertDefinedAndNotNull(delegatorAddress);
        assertDefinedAndNotNull(withdrawAddress);
        return {
          delegator_address: delegatorAddress,
          withdraw_address: withdrawAddress,
        };
      },
      fromAmino: ({
        delegator_address,
        withdraw_address,
      }: MsgSetWithdrawAddress["value"]): IMsgSetWithdrawAddress => ({
        delegatorAddress: delegator_address,
        withdrawAddress: withdraw_address,
      }),
    },
    "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": {
      aminoType: "cosmos-sdk/MsgWithdrawDelegationReward",
      toAmino: ({
        delegatorAddress,
        validatorAddress,
      }: IMsgWithdrawDelegatorReward): MsgWithdrawDelegatorReward["value"] => {
        assertDefinedAndNotNull(delegatorAddress);
        assertDefinedAndNotNull(validatorAddress);
        return {
          delegator_address: delegatorAddress,
          validator_address: validatorAddress,
        };
      },
      fromAmino: ({
        delegator_address,
        validator_address,
      }: MsgWithdrawDelegatorReward["value"]): IMsgWithdrawDelegatorReward => ({
        delegatorAddress: delegator_address,
        validatorAddress: validator_address,
      }),
    },
    "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission": {
      aminoType: "cosmos-sdk/MsgWithdrawValidatorCommission",
      toAmino: ({
        validatorAddress,
      }: IMsgWithdrawValidatorCommission): MsgWithdrawValidatorCommission["value"] => {
        assertDefinedAndNotNull(validatorAddress);
        return {
          validator_address: validatorAddress,
        };
      },
      fromAmino: ({
        validator_address,
      }: MsgWithdrawValidatorCommission["value"]): IMsgWithdrawValidatorCommission => ({
        validatorAddress: validator_address,
      }),
    },
    "/cosmos.staking.v1beta1.MsgBeginRedelegate": {
      aminoType: "cosmos-sdk/MsgBeginRedelegate",
      toAmino: ({
        delegatorAddress,
        validatorSrcAddress,
        validatorDstAddress,
        amount,
      }: IMsgBeginRedelegate): MsgBeginRedelegate["value"] => {
        assertDefinedAndNotNull(delegatorAddress, "missing delegatorAddress");
        assertDefinedAndNotNull(validatorSrcAddress, "missing validatorSrcAddress");
        assertDefinedAndNotNull(validatorDstAddress, "missing validatorDstAddress");
        assertDefinedAndNotNull(amount, "missing amount");
        return {
          delegator_address: delegatorAddress,
          validator_src_address: validatorSrcAddress,
          validator_dst_address: validatorDstAddress,
          amount: coinFromProto(amount),
        };
      },
      fromAmino: ({
        delegator_address,
        validator_src_address,
        validator_dst_address,
        amount,
      }: MsgBeginRedelegate["value"]): IMsgBeginRedelegate => ({
        delegatorAddress: delegator_address,
        validatorSrcAddress: validator_src_address,
        validatorDstAddress: validator_dst_address,
        amount: amount,
      }),
    },
    "/cosmos.staking.v1beta1.MsgCreateValidator": {
      aminoType: "cosmos-sdk/MsgCreateValidator",
      toAmino: ({
        description,
        commission,
        minSelfDelegation,
        delegatorAddress,
        validatorAddress,
        pubkey,
        value,
      }: IMsgCreateValidator): MsgCreateValidator["value"] => {
        assertDefinedAndNotNull(description, "missing description");
        assertDefinedAndNotNull(description.moniker, "missing description.moniker");
        assertDefinedAndNotNull(description.identity, "missing description.identity");
        assertDefinedAndNotNull(description.website, "missing description.website");
        assertDefinedAndNotNull(description.securityContact, "missing description.securityContact");
        assertDefinedAndNotNull(description.details, "missing description.details");
        assertDefinedAndNotNull(commission, "missing commission");
        assertDefinedAndNotNull(commission.rate, "missing commission.rate");
        assertDefinedAndNotNull(commission.maxRate, "missing commission.maxRate");
        assertDefinedAndNotNull(commission.maxChangeRate, "missing commission.maxChangeRate");
        assertDefinedAndNotNull(minSelfDelegation, "missing minSelfDelegation");
        assertDefinedAndNotNull(delegatorAddress, "missing delegatorAddress");
        assertDefinedAndNotNull(validatorAddress, "missing validatorAddress");
        assertDefinedAndNotNull(pubkey, "missing pubkey");
        assertDefinedAndNotNull(pubkey.value, "missing pubkey.value");
        assertDefinedAndNotNull(value, "missing value");
        return {
          description: {
            moniker: description.moniker,
            identity: description.identity,
            website: description.website,
            security_contact: description.securityContact,
            details: description.details,
          },
          commission: {
            rate: commission.rate,
            max_rate: commission.maxRate,
            max_change_rate: commission.maxChangeRate,
          },
          min_self_delegation: minSelfDelegation,
          delegator_address: delegatorAddress,
          validator_address: validatorAddress,
          pubkey: encodeBech32Pubkey(
            {
              type: "tendermint/PubKeySecp256k1",
              value: toBase64(pubkey.value),
            },
            prefix,
          ),
          value: coinFromProto(value),
        };
      },
      fromAmino: ({
        description,
        commission,
        min_self_delegation,
        delegator_address,
        validator_address,
        pubkey,
        value,
      }: MsgCreateValidator["value"]): IMsgCreateValidator => {
        const decodedPubkey = decodeBech32Pubkey(pubkey);
        if (decodedPubkey.type !== "tendermint/PubKeySecp256k1") {
          throw new Error("Only Secp256k1 public keys are supported");
        }
        return {
          description: {
            moniker: description.moniker,
            identity: description.identity,
            website: description.website,
            securityContact: description.security_contact,
            details: description.details,
          },
          commission: {
            rate: commission.rate,
            maxRate: commission.max_rate,
            maxChangeRate: commission.max_change_rate,
          },
          minSelfDelegation: min_self_delegation,
          delegatorAddress: delegator_address,
          validatorAddress: validator_address,
          pubkey: {
            type_url: "/cosmos.crypto.secp256k1.PubKey",
            value: fromBase64(decodedPubkey.value),
          },
          value: value,
        };
      },
    },
    "/cosmos.staking.v1beta1.MsgDelegate": {
      aminoType: "cosmos-sdk/MsgDelegate",
      toAmino: ({ delegatorAddress, validatorAddress, amount }: IMsgDelegate): MsgDelegate["value"] => {
        assertDefinedAndNotNull(delegatorAddress, "missing delegatorAddress");
        assertDefinedAndNotNull(validatorAddress, "missing validatorAddress");
        assertDefinedAndNotNull(amount, "missing amount");
        return {
          delegator_address: delegatorAddress,
          validator_address: validatorAddress,
          amount: coinFromProto(amount),
        };
      },
      fromAmino: ({ delegator_address, validator_address, amount }: MsgDelegate["value"]): IMsgDelegate => ({
        delegatorAddress: delegator_address,
        validatorAddress: validator_address,
        amount: amount,
      }),
    },
    "/cosmos.staking.v1beta1.MsgEditValidator": {
      aminoType: "cosmos-sdk/MsgEditValidator",
      toAmino: ({
        description,
        commissionRate,
        minSelfDelegation,
        validatorAddress,
      }: IMsgEditValidator): MsgEditValidator["value"] => {
        assertDefinedAndNotNull(description, "missing description");
        assertDefinedAndNotNull(description.moniker, "missing description.moniker");
        assertDefinedAndNotNull(description.identity, "missing description.identity");
        assertDefinedAndNotNull(description.website, "missing description.website");
        assertDefinedAndNotNull(description.securityContact, "missing description.securityContact");
        assertDefinedAndNotNull(description.details, "missing description.details");
        assertDefinedAndNotNull(commissionRate, "missing commissionRate");
        assertDefinedAndNotNull(minSelfDelegation, "missing minSelfDelegation");
        assertDefinedAndNotNull(validatorAddress, "missing validatorAddress");
        return {
          description: {
            moniker: description.moniker,
            identity: description.identity,
            website: description.website,
            security_contact: description.securityContact,
            details: description.details,
          },
          commission_rate: commissionRate,
          min_self_delegation: minSelfDelegation,
          validator_address: validatorAddress,
        };
      },
      fromAmino: ({
        description,
        commission_rate,
        min_self_delegation,
        validator_address,
      }: MsgEditValidator["value"]): IMsgEditValidator => ({
        description: {
          moniker: description.moniker,
          identity: description.identity,
          website: description.website,
          securityContact: description.security_contact,
          details: description.details,
        },
        commissionRate: commission_rate,
        minSelfDelegation: min_self_delegation,
        validatorAddress: validator_address,
      }),
    },
    "/cosmos.staking.v1beta1.MsgUndelegate": {
      aminoType: "cosmos-sdk/MsgUndelegate",
      toAmino: ({ delegatorAddress, validatorAddress, amount }: IMsgUndelegate): MsgUndelegate["value"] => {
        assertDefinedAndNotNull(delegatorAddress, "missing delegatorAddress");
        assertDefinedAndNotNull(validatorAddress, "missing validatorAddress");
        assertDefinedAndNotNull(amount, "missing amount");
        return {
          delegator_address: delegatorAddress,
          validator_address: validatorAddress,
          amount: coinFromProto(amount),
        };
      },
      fromAmino: ({
        delegator_address,
        validator_address,
        amount,
      }: MsgUndelegate["value"]): IMsgUndelegate => ({
        delegatorAddress: delegator_address,
        validatorAddress: validator_address,
        amount: amount,
      }),
    },
  };
}

interface AminoTypesOptions {
  readonly additions?: Record<string, AminoConverter>;
  readonly prefix?: string;
}

/**
 * A map from Stargate message types as used in the messages's `Any` type
 * to Amino types.
 */
export class AminoTypes {
  private readonly register: Record<string, AminoConverter>;

  public constructor({ additions = {}, prefix = "cosmos" }: AminoTypesOptions = {}) {
    const additionalAminoTypes = Object.values(additions);
    const filteredDefaultTypes = Object.entries(createDefaultTypes(prefix)).reduce(
      (acc, [key, value]) =>
        additionalAminoTypes.find(({ aminoType }) => value.aminoType === aminoType)
          ? acc
          : { ...acc, [key]: value },
      {},
    );
    this.register = { ...filteredDefaultTypes, ...additions };
  }

  public toAmino({ typeUrl, value }: EncodeObject): Msg {
    const converter = this.register[typeUrl];
    if (!converter) {
      throw new Error(
        "Type URL does not exist in the Amino message type register. " +
          "If you need support for this message type, you can pass in additional entries to the AminoTypes constructor. " +
          "If you think this message type should be included by default, please open an issue at https://github.com/cosmos/cosmjs/issues.",
      );
    }
    return {
      type: converter.aminoType,
      value: converter.toAmino(value),
    };
  }

  public fromAmino({ type, value }: Msg): EncodeObject {
    const result = Object.entries(this.register).find(([_typeUrl, { aminoType }]) => aminoType === type);
    if (!result) {
      throw new Error(
        "Type does not exist in the Amino message type register. " +
          "If you need support for this message type, you can pass in additional entries to the AminoTypes constructor. " +
          "If you think this message type should be included by default, please open an issue at https://github.com/cosmos/cosmjs/issues.",
      );
    }
    const [typeUrl, converter] = result;
    return {
      typeUrl: typeUrl,
      value: converter.fromAmino(value),
    };
  }
}
