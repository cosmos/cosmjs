/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, toBase64 } from "@cosmjs/encoding";
import {
  Coin,
  decodeBech32Pubkey,
  encodeBech32Pubkey,
  Msg,
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgMultiSend,
  MsgSend,
  MsgUndelegate,
} from "@cosmjs/launchpad";
import { EncodeObject } from "@cosmjs/proto-signing";
import { assert } from "@cosmjs/utils";

import { cosmos } from "./codec";

type ICoin = cosmos.base.v1beta1.ICoin;
type IMsgSend = cosmos.bank.v1beta1.IMsgSend;
type IMsgMultiSend = cosmos.bank.v1beta1.IMsgMultiSend;
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

function checkAmount(amount: readonly ICoin[] | undefined | null): readonly Coin[] {
  assert(amount, "missing amount");
  return amount.map((a) => {
    assert(a.amount, "missing amount");
    assert(a.denom, "missing denom");
    return {
      amount: a.amount,
      denom: a.denom,
    };
  });
}

function createDefaultTypes(prefix: string): Record<string, AminoConverter> {
  return {
    "/cosmos.bank.v1beta1.MsgSend": {
      aminoType: "cosmos-sdk/MsgSend",
      toAmino: ({ fromAddress, toAddress, amount }: IMsgSend): MsgSend["value"] => {
        assert(fromAddress, "missing fromAddress");
        assert(toAddress, "missing toAddress");
        return {
          from_address: fromAddress,
          to_address: toAddress,
          amount: checkAmount(amount),
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
        assert(inputs, "missing inputs");
        assert(outputs, "missing outputs");
        return {
          inputs: inputs.map((input) => {
            assert(input.address, "missing input.address");
            return {
              address: input.address,
              coins: checkAmount(input.coins),
            };
          }),
          outputs: outputs.map((output) => {
            assert(output.address, "missing output.address");
            return {
              address: output.address,
              coins: checkAmount(output.coins),
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
    "/cosmos.staking.v1beta1.MsgBeginRedelegate": {
      aminoType: "cosmos-sdk/MsgBeginRedelegate",
      toAmino: ({
        delegatorAddress,
        validatorSrcAddress,
        validatorDstAddress,
        amount,
      }: IMsgBeginRedelegate): MsgBeginRedelegate["value"] => {
        assert(delegatorAddress, "missing delegatorAddress");
        assert(validatorSrcAddress, "missing validatorSrcAddress");
        assert(validatorDstAddress, "missing validatorDstAddress");
        assert(amount, "missing amount");
        assert(amount.amount, "missing amount.amount");
        assert(amount.denom, "missing amount.denom");
        return {
          delegator_address: delegatorAddress,
          validator_src_address: validatorSrcAddress,
          validator_dst_address: validatorDstAddress,
          amount: {
            amount: amount.amount,
            denom: amount.denom,
          },
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
        assert(description, "missing description");
        assert(description.moniker, "missing description.moniker");
        assert(description.identity, "missing description.identity");
        assert(description.website, "missing description.website");
        assert(description.securityContact, "missing description.securityContact");
        assert(description.details, "missing description.details");
        assert(commission, "missing commission");
        assert(commission.rate, "missing commission.rate");
        assert(commission.maxRate, "missing commission.maxRate");
        assert(commission.maxChangeRate, "missing commission.maxChangeRate");
        assert(minSelfDelegation, "missing minSelfDelegation");
        assert(delegatorAddress, "missing delegatorAddress");
        assert(validatorAddress, "missing validatorAddress");
        assert(pubkey, "missing pubkey");
        assert(pubkey.value, "missing pubkey.value");
        assert(value, "missing value");
        assert(value.amount, "missing value.amount");
        assert(value.denom, "missing value.denom");
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
          value: {
            amount: value.amount,
            denom: value.denom,
          },
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
        assert(delegatorAddress, "missing delegatorAddress");
        assert(validatorAddress, "missing validatorAddress");
        assert(amount, "missing amount");
        assert(amount.amount, "missing amount.amount");
        assert(amount.denom, "missing amount.denom");
        return {
          delegator_address: delegatorAddress,
          validator_address: validatorAddress,
          amount: {
            amount: amount.amount,
            denom: amount.denom,
          },
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
        assert(description, "missing description");
        assert(description.moniker, "missing description.moniker");
        assert(description.identity, "missing description.identity");
        assert(description.website, "missing description.website");
        assert(description.securityContact, "missing description.securityContact");
        assert(description.details, "missing description.details");
        assert(commissionRate, "missing commissionRate");
        assert(minSelfDelegation, "missing minSelfDelegation");
        assert(validatorAddress, "missing validatorAddress");
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
        assert(delegatorAddress, "missing delegatorAddress");
        assert(validatorAddress, "missing validatorAddress");
        assert(amount, "missing amount");
        assert(amount.amount, "missing amount.amount");
        assert(amount.denom, "missing amount.denom");
        return {
          delegator_address: delegatorAddress,
          validator_address: validatorAddress,
          amount: {
            amount: amount.amount,
            denom: amount.denom,
          },
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
