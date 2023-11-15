/* eslint-disable @typescript-eslint/naming-convention */
import { omitDefault } from "@cosmjs/amino";
import { fromBase64, fromUtf8, toBase64, toUtf8 } from "@cosmjs/encoding";
import { AminoConverters, Coin } from "@cosmjs/stargate";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgInstantiateContract2,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { AccessConfig, AccessType } from "cosmjs-types/cosmwasm/wasm/v1/types";

export function accessTypeFromString(str: string): AccessType {
  switch (str) {
    case "Unspecified":
      return AccessType.ACCESS_TYPE_UNSPECIFIED;
    case "Nobody":
      return AccessType.ACCESS_TYPE_NOBODY;
    case "OnlyAddress":
      return AccessType.ACCESS_TYPE_ONLY_ADDRESS;
    case "Everybody":
      return AccessType.ACCESS_TYPE_EVERYBODY;
    case "AnyOfAddresses":
      return AccessType.ACCESS_TYPE_ANY_OF_ADDRESSES;
    default:
      return AccessType.UNRECOGNIZED;
  }
}

export function accessTypeToString(object: any): string {
  switch (object) {
    case AccessType.ACCESS_TYPE_UNSPECIFIED:
      return "Unspecified";
    case AccessType.ACCESS_TYPE_NOBODY:
      return "Nobody";
    case AccessType.ACCESS_TYPE_ONLY_ADDRESS:
      return "OnlyAddress";
    case AccessType.ACCESS_TYPE_EVERYBODY:
      return "Everybody";
    case AccessType.ACCESS_TYPE_ANY_OF_ADDRESSES:
      return "AnyOfAddresses";
    case AccessType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * @see https://github.com/CosmWasm/wasmd/blob/v0.18.0-rc1/proto/cosmwasm/wasm/v1/types.proto#L36-L41
 */
export interface AminoAccessConfig {
  /**
   * Permission should be one kind of string 'Nobody', 'OnlyAddress', 'Everybody', 'AnyOfAddresses', 'Unspecified'
   * @see https://github.com/CosmWasm/wasmd/blob/v0.31.0/x/wasm/types/params.go#L54
   */
  readonly permission: string;
  /**
   * Address
   * Deprecated: replaced by addresses
   */
  readonly address?: string;
  readonly addresses?: string[];
}

/**
 * The Amino JSON representation of [MsgStoreCode].
 *
 * [MsgStoreCode]: https://github.com/CosmWasm/wasmd/blob/v0.18.0-rc1/proto/cosmwasm/wasm/v1/tx.proto#L28-L39
 */
export interface AminoMsgStoreCode {
  type: "wasm/MsgStoreCode";
  value: {
    /** Bech32 account address */
    readonly sender: string;
    /** Base64 encoded Wasm */
    readonly wasm_byte_code: string;
    readonly instantiate_permission?: AminoAccessConfig;
  };
}

/**
 * The Amino JSON representation of [MsgExecuteContract].
 *
 * [MsgExecuteContract]: https://github.com/CosmWasm/wasmd/blob/v0.18.0-rc1/proto/cosmwasm/wasm/v1/tx.proto#L73-L86
 */
export interface AminoMsgExecuteContract {
  type: "wasm/MsgExecuteContract";
  value: {
    /** Bech32 account address */
    readonly sender: string;
    /** Bech32 account address */
    readonly contract: string;
    /** Execute message as JavaScript object */
    readonly msg: any;
    readonly funds: readonly Coin[];
  };
}

/**
 * The Amino JSON representation of [MsgInstantiateContract].
 *
 * [MsgInstantiateContract]: https://github.com/CosmWasm/wasmd/blob/v0.18.0-rc1/proto/cosmwasm/wasm/v1/tx.proto#L46-L64
 */
export interface AminoMsgInstantiateContract {
  type: "wasm/MsgInstantiateContract";
  value: {
    /** Bech32 account address */
    readonly sender: string;
    /** ID of the Wasm code that was uploaded before */
    readonly code_id: string;
    /** Human-readable label for this contract */
    readonly label: string;
    /** Instantiate message as JavaScript object */
    readonly msg: any;
    readonly funds: readonly Coin[];
    /** Bech32-encoded admin address */
    readonly admin?: string;
  };
}

/**
 * The Amino JSON representation of [MsgInstantiateContract2].
 *
 * [MsgInstantiateContract2]: https://github.com/CosmWasm/wasmd/blob/v0.31.0/proto/cosmwasm/wasm/v1/tx.proto#L76-L99
 */
export interface AminoMsgInstantiateContract2 {
  type: "wasm/MsgInstantiateContract2";
  value: {
    /** Bech32 account address */
    readonly sender: string;
    /** ID of the Wasm code that was uploaded before */
    readonly code_id: string;
    /** Human-readable label for this contract */
    readonly label: string;
    /** Instantiate message as JavaScript object */
    readonly msg: any;
    readonly funds: readonly Coin[];
    /** Bech32-encoded admin address */
    readonly admin?: string;
    /** Arbitrary Base64-encoded value provided by the sender */
    readonly salt: string;
    /**
     * Whether or not to include the msg value into the hash for the address.
     * Unset means false. This should always be unset/false (https://medium.com/cosmwasm/dev-note-3-limitations-of-instantiate2-and-how-to-deal-with-them-a3f946874230).
     */
    readonly fix_msg?: boolean;
  };
}

/**
 * The Amino JSON representation of [MsgMigrateContract].
 *
 * [MsgMigrateContract]: https://github.com/CosmWasm/wasmd/blob/v0.18.0-rc1/proto/cosmwasm/wasm/v1/tx.proto#L94-L104
 */
export interface AminoMsgMigrateContract {
  type: "wasm/MsgMigrateContract";
  value: {
    /** Bech32 account address */
    readonly sender: string;
    /** Bech32 account address */
    readonly contract: string;
    /** The new code */
    readonly code_id: string;
    /** Migrate message as JavaScript object */
    readonly msg: any;
  };
}

/**
 * The Amino JSON representation of [MsgUpdateAdmin].
 *
 * [MsgUpdateAdmin]: https://github.com/CosmWasm/wasmd/blob/v0.18.0-rc1/proto/cosmwasm/wasm/v1/tx.proto#L113-L121
 */
export interface AminoMsgUpdateAdmin {
  type: "wasm/MsgUpdateAdmin";
  value: {
    /** Bech32-encoded sender address. This must be the old admin. */
    readonly sender: string;
    /** Bech32-encoded contract address to be updated */
    readonly contract: string;
    /** Bech32-encoded address of the new admin */
    readonly new_admin: string;
  };
}

/**
 * The Amino JSON representation of [MsgClearAdmin].
 *
 * [MsgClearAdmin]: https://github.com/CosmWasm/wasmd/blob/v0.18.0-rc1/proto/cosmwasm/wasm/v1/tx.proto#L126-L132
 */
export interface AminoMsgClearAdmin {
  type: "wasm/MsgClearAdmin";
  value: {
    /** Bech32-encoded sender address. This must be the old admin. */
    readonly sender: string;
    /** Bech32-encoded contract address to be updated */
    readonly contract: string;
  };
}

export function createWasmAminoConverters(): AminoConverters {
  return {
    "/cosmwasm.wasm.v1.MsgStoreCode": {
      aminoType: "wasm/MsgStoreCode",
      toAmino: ({
        sender,
        wasmByteCode,
        instantiatePermission,
      }: MsgStoreCode): AminoMsgStoreCode["value"] => ({
        sender: sender,
        wasm_byte_code: toBase64(wasmByteCode),
        instantiate_permission: instantiatePermission
          ? {
              permission: accessTypeToString(instantiatePermission.permission),
              address: instantiatePermission.address || undefined,
              addresses:
                instantiatePermission.addresses.length !== 0 ? instantiatePermission.addresses : undefined,
            }
          : undefined,
      }),
      fromAmino: ({
        sender,
        wasm_byte_code,
        instantiate_permission,
      }: AminoMsgStoreCode["value"]): MsgStoreCode => ({
        sender: sender,
        wasmByteCode: fromBase64(wasm_byte_code),
        instantiatePermission: instantiate_permission
          ? AccessConfig.fromPartial({
              permission: accessTypeFromString(instantiate_permission.permission),
              address: instantiate_permission.address ?? "",
              addresses: instantiate_permission.addresses ?? [],
            })
          : undefined,
      }),
    },
    "/cosmwasm.wasm.v1.MsgInstantiateContract": {
      aminoType: "wasm/MsgInstantiateContract",
      toAmino: ({
        sender,
        codeId,
        label,
        msg,
        funds,
        admin,
      }: MsgInstantiateContract): AminoMsgInstantiateContract["value"] => ({
        sender: sender,
        code_id: codeId.toString(),
        label: label,
        msg: JSON.parse(fromUtf8(msg)),
        funds: funds,
        admin: omitDefault(admin),
      }),
      fromAmino: ({
        sender,
        code_id,
        label,
        msg,
        funds,
        admin,
      }: AminoMsgInstantiateContract["value"]): MsgInstantiateContract => ({
        sender: sender,
        codeId: BigInt(code_id),
        label: label,
        msg: toUtf8(JSON.stringify(msg)),
        funds: [...funds],
        admin: admin ?? "",
      }),
    },
    "/cosmwasm.wasm.v1.MsgInstantiateContract2": {
      aminoType: "wasm/MsgInstantiateContract2",
      toAmino: ({
        sender,
        codeId,
        label,
        msg,
        funds,
        admin,
        salt,
        fixMsg,
      }: MsgInstantiateContract2): AminoMsgInstantiateContract2["value"] => ({
        sender: sender,
        code_id: codeId.toString(),
        label: label,
        msg: JSON.parse(fromUtf8(msg)),
        funds: funds,
        admin: omitDefault(admin),
        salt: toBase64(salt),
        fix_msg: omitDefault(fixMsg),
      }),
      fromAmino: ({
        sender,
        code_id,
        label,
        msg,
        funds,
        admin,
        salt,
        fix_msg,
      }: AminoMsgInstantiateContract2["value"]): MsgInstantiateContract2 => ({
        sender: sender,
        codeId: BigInt(code_id),
        label: label,
        msg: toUtf8(JSON.stringify(msg)),
        funds: [...funds],
        admin: admin ?? "",
        salt: fromBase64(salt),
        fixMsg: fix_msg ?? false,
      }),
    },
    "/cosmwasm.wasm.v1.MsgUpdateAdmin": {
      aminoType: "wasm/MsgUpdateAdmin",
      toAmino: ({ sender, newAdmin, contract }: MsgUpdateAdmin): AminoMsgUpdateAdmin["value"] => ({
        sender: sender,
        new_admin: newAdmin,
        contract: contract,
      }),
      fromAmino: ({ sender, new_admin, contract }: AminoMsgUpdateAdmin["value"]): MsgUpdateAdmin => ({
        sender: sender,
        newAdmin: new_admin,
        contract: contract,
      }),
    },
    "/cosmwasm.wasm.v1.MsgClearAdmin": {
      aminoType: "wasm/MsgClearAdmin",
      toAmino: ({ sender, contract }: MsgClearAdmin): AminoMsgClearAdmin["value"] => ({
        sender: sender,
        contract: contract,
      }),
      fromAmino: ({ sender, contract }: AminoMsgClearAdmin["value"]): MsgClearAdmin => ({
        sender: sender,
        contract: contract,
      }),
    },
    "/cosmwasm.wasm.v1.MsgExecuteContract": {
      aminoType: "wasm/MsgExecuteContract",
      toAmino: ({ sender, contract, msg, funds }: MsgExecuteContract): AminoMsgExecuteContract["value"] => ({
        sender: sender,
        contract: contract,
        msg: JSON.parse(fromUtf8(msg)),
        funds: funds,
      }),
      fromAmino: ({
        sender,
        contract,
        msg,
        funds,
      }: AminoMsgExecuteContract["value"]): MsgExecuteContract => ({
        sender: sender,
        contract: contract,
        msg: toUtf8(JSON.stringify(msg)),
        funds: [...funds],
      }),
    },
    "/cosmwasm.wasm.v1.MsgMigrateContract": {
      aminoType: "wasm/MsgMigrateContract",
      toAmino: ({ sender, contract, codeId, msg }: MsgMigrateContract): AminoMsgMigrateContract["value"] => ({
        sender: sender,
        contract: contract,
        code_id: codeId.toString(),
        msg: JSON.parse(fromUtf8(msg)),
      }),
      fromAmino: ({
        sender,
        contract,
        code_id,
        msg,
      }: AminoMsgMigrateContract["value"]): MsgMigrateContract => ({
        sender: sender,
        contract: contract,
        codeId: BigInt(code_id),
        msg: toUtf8(JSON.stringify(msg)),
      }),
    },
  };
}
