/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg, Coin, decodeBech32Pubkey, encodeBech32Pubkey } from "@cosmjs/amino";
import { fromBase64, toBase64 } from "@cosmjs/encoding";
import { assertDefinedAndNotNull } from "@cosmjs/utils";
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
} from "cosmjs-types/cosmos/staking/v1beta1/tx";

import { AminoConverter } from "../..";

/** The initial commission rates to be used for creating a validator */
interface CommissionRates {
  readonly rate: string;
  readonly max_rate: string;
  readonly max_change_rate: string;
}

/** A validator description. */
interface Description {
  readonly moniker: string;
  readonly identity: string;
  readonly website: string;
  readonly security_contact: string;
  readonly details: string;
}

/** Creates a new validator. */
export interface AminoMsgCreateValidator extends AminoMsg {
  readonly type: "cosmos-sdk/MsgCreateValidator";
  readonly value: {
    readonly description: Description;
    readonly commission: CommissionRates;
    readonly min_self_delegation: string;
    /** Bech32 encoded delegator address */
    readonly delegator_address: string;
    /** Bech32 encoded validator address */
    readonly validator_address: string;
    /** Bech32 encoded public key */
    readonly pubkey: string;
    readonly value: Coin;
  };
}

export function isAminoMsgCreateValidator(msg: AminoMsg): msg is AminoMsgCreateValidator {
  return msg.type === "cosmos-sdk/MsgCreateValidator";
}

/** Edits an existing validator. */
export interface AminoMsgEditValidator extends AminoMsg {
  readonly type: "cosmos-sdk/MsgEditValidator";
  readonly value: {
    readonly description: Description;
    /** Bech32 encoded validator address */
    readonly validator_address: string;
    readonly commission_rate: string;
    readonly min_self_delegation: string;
  };
}

export function isAminoMsgEditValidator(msg: AminoMsg): msg is AminoMsgEditValidator {
  return msg.type === "cosmos-sdk/MsgEditValidator";
}

/**
 * Performs a delegation from a delegate to a validator.
 *
 * @see https://docs.cosmos.network/master/modules/staking/03_messages.html#msgdelegate
 */
export interface AminoMsgDelegate extends AminoMsg {
  readonly type: "cosmos-sdk/MsgDelegate";
  readonly value: {
    /** Bech32 encoded delegator address */
    readonly delegator_address: string;
    /** Bech32 encoded validator address */
    readonly validator_address: string;
    readonly amount: Coin;
  };
}

export function isAminoMsgDelegate(msg: AminoMsg): msg is AminoMsgDelegate {
  return msg.type === "cosmos-sdk/MsgDelegate";
}

/** Performs a redelegation from a delegate and source validator to a destination validator */
export interface AminoMsgBeginRedelegate extends AminoMsg {
  readonly type: "cosmos-sdk/MsgBeginRedelegate";
  readonly value: {
    /** Bech32 encoded delegator address */
    readonly delegator_address: string;
    /** Bech32 encoded source validator address */
    readonly validator_src_address: string;
    /** Bech32 encoded destination validator address */
    readonly validator_dst_address: string;
    readonly amount: Coin;
  };
}

export function isAminoMsgBeginRedelegate(msg: AminoMsg): msg is AminoMsgBeginRedelegate {
  return msg.type === "cosmos-sdk/MsgBeginRedelegate";
}

/** Performs an undelegation from a delegate and a validator */
export interface AminoMsgUndelegate extends AminoMsg {
  readonly type: "cosmos-sdk/MsgUndelegate";
  readonly value: {
    /** Bech32 encoded delegator address */
    readonly delegator_address: string;
    /** Bech32 encoded validator address */
    readonly validator_address: string;
    readonly amount: Coin;
  };
}

export function isAminoMsgUndelegate(msg: AminoMsg): msg is AminoMsgUndelegate {
  return msg.type === "cosmos-sdk/MsgUndelegate";
}

export function createStakingAminoConverters(
  prefix: string,
): Record<string, AminoConverter | "not_supported_by_chain"> {
  return {
    "/cosmos.staking.v1beta1.MsgBeginRedelegate": {
      aminoType: "cosmos-sdk/MsgBeginRedelegate",
      toAmino: ({
        delegatorAddress,
        validatorSrcAddress,
        validatorDstAddress,
        amount,
      }: MsgBeginRedelegate): AminoMsgBeginRedelegate["value"] => {
        assertDefinedAndNotNull(amount, "missing amount");
        return {
          delegator_address: delegatorAddress,
          validator_src_address: validatorSrcAddress,
          validator_dst_address: validatorDstAddress,
          amount: amount,
        };
      },
      fromAmino: ({
        delegator_address,
        validator_src_address,
        validator_dst_address,
        amount,
      }: AminoMsgBeginRedelegate["value"]): MsgBeginRedelegate => ({
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
      }: MsgCreateValidator): AminoMsgCreateValidator["value"] => {
        assertDefinedAndNotNull(description, "missing description");
        assertDefinedAndNotNull(commission, "missing commission");
        assertDefinedAndNotNull(pubkey, "missing pubkey");
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
          value: value,
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
      }: AminoMsgCreateValidator["value"]): MsgCreateValidator => {
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
            typeUrl: "/cosmos.crypto.secp256k1.PubKey",
            value: fromBase64(decodedPubkey.value),
          },
          value: value,
        };
      },
    },
    "/cosmos.staking.v1beta1.MsgDelegate": {
      aminoType: "cosmos-sdk/MsgDelegate",
      toAmino: ({ delegatorAddress, validatorAddress, amount }: MsgDelegate): AminoMsgDelegate["value"] => {
        assertDefinedAndNotNull(amount, "missing amount");
        return {
          delegator_address: delegatorAddress,
          validator_address: validatorAddress,
          amount: amount,
        };
      },
      fromAmino: ({
        delegator_address,
        validator_address,
        amount,
      }: AminoMsgDelegate["value"]): MsgDelegate => ({
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
      }: MsgEditValidator): AminoMsgEditValidator["value"] => {
        assertDefinedAndNotNull(description, "missing description");
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
      }: AminoMsgEditValidator["value"]): MsgEditValidator => ({
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
      toAmino: ({
        delegatorAddress,
        validatorAddress,
        amount,
      }: MsgUndelegate): AminoMsgUndelegate["value"] => {
        assertDefinedAndNotNull(amount, "missing amount");
        return {
          delegator_address: delegatorAddress,
          validator_address: validatorAddress,
          amount: amount,
        };
      },
      fromAmino: ({
        delegator_address,
        validator_address,
        amount,
      }: AminoMsgUndelegate["value"]): MsgUndelegate => ({
        delegatorAddress: delegator_address,
        validatorAddress: validator_address,
        amount: amount,
      }),
    },
  };
}
