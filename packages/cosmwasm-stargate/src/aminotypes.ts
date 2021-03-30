/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, fromUtf8, toBase64, toUtf8 } from "@cosmjs/encoding";
import { AminoConverter, Coin } from "@cosmjs/stargate";
import { assertDefinedAndNotNull } from "@cosmjs/utils";
import Long from "long";

import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "./codec/x/wasm/internal/types/tx";

// TODO: implement
/**
 * @see https://github.com/CosmWasm/wasmd/blob/v0.16.0-alpha1/x/wasm/internal/types/types.proto#L30-L35
 */
type AccessConfig = never;

/**
 * The Amino JSON representation of
 * https://github.com/CosmWasm/wasmd/blob/v0.16.0-alpha1/x/wasm/internal/types/tx.proto#L28-L40
 */
export interface AminoMsgStoreCode {
  type: "wasm/MsgStoreCode";
  value: {
    /** Bech32 account address */
    readonly sender: string;
    /** Base64 encoded Wasm */
    readonly wasm_byte_code: string;
    /** A valid URI reference to the contract's source code. Can be empty. */
    readonly source: string;
    /** A docker tag. Can be empty. */
    readonly builder: string;
    readonly instantiate_permission?: AccessConfig;
  };
}

/**
 * The Amino JSON representation of
 * https://github.com/CosmWasm/wasmd/blob/v0.16.0-alpha1/x/wasm/internal/types/tx.proto#L70-L80
 */
export interface AminoMsgExecuteContract {
  type: "wasm/MsgExecuteContract";
  value: {
    /** Bech32 account address */
    readonly sender: string;
    /** Bech32 account address */
    readonly contract: string;
    /** Handle message as JavaScript object */
    readonly msg: any;
    readonly funds: readonly Coin[];
  };
}

/**
 * The Amino JSON representation of
 * https://github.com/CosmWasm/wasmd/blob/v0.16.0-alpha1/x/wasm/internal/types/tx.proto#L47-L61
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
    /** Init message as JavaScript object */
    readonly init_msg: any;
    readonly funds: readonly Coin[];
    /** Bech32-encoded admin address */
    readonly admin?: string;
  };
}

/**
 * The Amino JSON representation of
 * https://github.com/CosmWasm/wasmd/blob/v0.16.0-alpha1/x/wasm/internal/types/tx.proto#L88-L98
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
 * The Amino JSON representation of
 * https://github.com/CosmWasm/wasmd/blob/v0.16.0-alpha1/x/wasm/internal/types/tx.proto#L107-L115
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
 * The Amino JSON representation of
 * https://github.com/CosmWasm/wasmd/blob/v0.16.0-alpha1/x/wasm/internal/types/tx.proto#L120-L126
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

export const cosmWasmTypes: Record<string, AminoConverter> = {
  "/cosmwasm.wasm.v1beta1.MsgStoreCode": {
    aminoType: "wasm/MsgStoreCode",
    toAmino: ({ sender, wasmByteCode, source, builder }: MsgStoreCode): AminoMsgStoreCode["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(wasmByteCode, "missing wasmByteCode");
      assertDefinedAndNotNull(source, "missing source");
      assertDefinedAndNotNull(builder, "missing builder");
      return {
        sender: sender,
        wasm_byte_code: toBase64(wasmByteCode),
        source: source,
        builder: builder,
      };
    },
    fromAmino: ({ sender, wasm_byte_code, source, builder }: AminoMsgStoreCode["value"]): MsgStoreCode => ({
      sender: sender,
      wasmByteCode: fromBase64(wasm_byte_code),
      source: source,
      builder: builder,
      instantiatePermission: undefined,
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgInstantiateContract": {
    aminoType: "wasm/MsgInstantiateContract",
    toAmino: ({
      sender,
      codeId,
      label,
      initMsg,
      funds,
      admin,
    }: MsgInstantiateContract): AminoMsgInstantiateContract["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(codeId, "missing codeId");
      assertDefinedAndNotNull(label, "missing label");
      assertDefinedAndNotNull(initMsg, "missing initMsg");
      assertDefinedAndNotNull(funds, "missing funds");
      return {
        sender: sender,
        code_id: codeId.toString(),
        label: label,
        init_msg: JSON.parse(fromUtf8(initMsg)),
        funds: funds,
        admin: admin ?? undefined,
      };
    },
    fromAmino: ({
      sender,
      code_id,
      label,
      init_msg,
      funds,
      admin,
    }: AminoMsgInstantiateContract["value"]): MsgInstantiateContract => ({
      sender: sender,
      codeId: Long.fromString(code_id),
      label: label,
      initMsg: toUtf8(JSON.stringify(init_msg)),
      funds: [...funds],
      admin: admin ?? "",
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgUpdateAdmin": {
    aminoType: "wasm/MsgUpdateAdmin",
    toAmino: ({ sender, newAdmin, contract }: MsgUpdateAdmin): AminoMsgUpdateAdmin["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(newAdmin, "missing newAdmin");
      assertDefinedAndNotNull(contract, "missing contract");
      return {
        sender: sender,
        new_admin: newAdmin,
        contract: contract,
      };
    },
    fromAmino: ({ sender, new_admin, contract }: AminoMsgUpdateAdmin["value"]): MsgUpdateAdmin => ({
      sender: sender,
      newAdmin: new_admin,
      contract: contract,
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgClearAdmin": {
    aminoType: "wasm/MsgClearAdmin",
    toAmino: ({ sender, contract }: MsgClearAdmin): AminoMsgClearAdmin["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(contract, "missing contract");
      return {
        sender: sender,
        contract: contract,
      };
    },
    fromAmino: ({ sender, contract }: AminoMsgClearAdmin["value"]): MsgClearAdmin => ({
      sender: sender,
      contract: contract,
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgExecuteContract": {
    aminoType: "wasm/MsgExecuteContract",
    toAmino: ({ sender, contract, msg, funds }: MsgExecuteContract): AminoMsgExecuteContract["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(contract, "missing contract");
      assertDefinedAndNotNull(msg, "missing msg");
      assertDefinedAndNotNull(funds, "missing funds");
      return {
        sender: sender,
        contract: contract,
        msg: JSON.parse(fromUtf8(msg)),
        funds: funds,
      };
    },
    fromAmino: ({ sender, contract, msg, funds }: AminoMsgExecuteContract["value"]): MsgExecuteContract => ({
      sender: sender,
      contract: contract,
      msg: toUtf8(JSON.stringify(msg)),
      funds: [...funds],
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgMigrateContract": {
    aminoType: "wasm/MsgMigrateContract",
    toAmino: ({
      sender,
      contract,
      codeId,
      migrateMsg,
    }: MsgMigrateContract): AminoMsgMigrateContract["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(contract, "missing contract");
      assertDefinedAndNotNull(codeId, "missing codeId");
      assertDefinedAndNotNull(migrateMsg, "missing migrateMsg");
      return {
        sender: sender,
        contract: contract,
        code_id: codeId.toString(),
        msg: JSON.parse(fromUtf8(migrateMsg)),
      };
    },
    fromAmino: ({
      sender,
      contract,
      code_id,
      msg,
    }: AminoMsgMigrateContract["value"]): MsgMigrateContract => ({
      sender: sender,
      contract: contract,
      codeId: Long.fromString(code_id),
      migrateMsg: toUtf8(JSON.stringify(msg)),
    }),
  },
};
