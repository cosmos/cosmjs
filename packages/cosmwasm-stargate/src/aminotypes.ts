/* eslint-disable @typescript-eslint/naming-convention */
import {
  MsgClearAdmin as LaunchpadMsgClearAdmin,
  MsgMigrateContract as LaunchpadMsgMigrateContract,
  MsgStoreCode as LaunchpadMsgStoreCode,
  MsgUpdateAdmin as LaunchpadMsgUpdateAdmin,
} from "@cosmjs/cosmwasm-launchpad";
import { fromBase64, fromUtf8, toBase64, toUtf8 } from "@cosmjs/encoding";
import { Coin } from "@cosmjs/launchpad";
import { AminoConverter, coinFromProto } from "@cosmjs/stargate";
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

interface MsgExecuteContractValueAmino {
  /** Bech32 account address */
  readonly sender: string;
  /** Bech32 account address */
  readonly contract: string;
  /** Handle message as JavaScript object */
  readonly msg: any;
  readonly funds: readonly Coin[];
}

interface MsgInstantiateContractValueAmino {
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
}

export const cosmWasmTypes: Record<string, AminoConverter> = {
  "/cosmwasm.wasm.v1beta1.MsgStoreCode": {
    aminoType: "wasm/MsgStoreCode",
    toAmino: ({ sender, wasmByteCode, source, builder }: MsgStoreCode): LaunchpadMsgStoreCode["value"] => {
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
    fromAmino: ({
      sender,
      wasm_byte_code,
      source,
      builder,
    }: LaunchpadMsgStoreCode["value"]): MsgStoreCode => ({
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
    }: MsgInstantiateContract): MsgInstantiateContractValueAmino => {
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
        funds: funds.map(coinFromProto),
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
    }: MsgInstantiateContractValueAmino): MsgInstantiateContract => ({
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
    toAmino: ({ sender, newAdmin, contract }: MsgUpdateAdmin): LaunchpadMsgUpdateAdmin["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(newAdmin, "missing newAdmin");
      assertDefinedAndNotNull(contract, "missing contract");
      return {
        sender: sender,
        new_admin: newAdmin,
        contract: contract,
      };
    },
    fromAmino: ({ sender, new_admin, contract }: LaunchpadMsgUpdateAdmin["value"]): MsgUpdateAdmin => ({
      sender: sender,
      newAdmin: new_admin,
      contract: contract,
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgClearAdmin": {
    aminoType: "wasm/MsgClearAdmin",
    toAmino: ({ sender, contract }: MsgClearAdmin): LaunchpadMsgClearAdmin["value"] => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(contract, "missing contract");
      return {
        sender: sender,
        contract: contract,
      };
    },
    fromAmino: ({ sender, contract }: LaunchpadMsgClearAdmin["value"]): MsgClearAdmin => ({
      sender: sender,
      contract: contract,
    }),
  },
  "/cosmwasm.wasm.v1beta1.MsgExecuteContract": {
    aminoType: "wasm/MsgExecuteContract",
    toAmino: ({ sender, contract, msg, funds }: MsgExecuteContract): MsgExecuteContractValueAmino => {
      assertDefinedAndNotNull(sender, "missing sender");
      assertDefinedAndNotNull(contract, "missing contract");
      assertDefinedAndNotNull(msg, "missing msg");
      assertDefinedAndNotNull(funds, "missing funds");
      return {
        sender: sender,
        contract: contract,
        msg: JSON.parse(fromUtf8(msg)),
        funds: funds.map(coinFromProto),
      };
    },
    fromAmino: ({ sender, contract, msg, funds }: MsgExecuteContractValueAmino): MsgExecuteContract => ({
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
    }: MsgMigrateContract): LaunchpadMsgMigrateContract["value"] => {
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
    }: LaunchpadMsgMigrateContract["value"]): MsgMigrateContract => ({
      sender: sender,
      contract: contract,
      codeId: Long.fromString(code_id),
      migrateMsg: toUtf8(JSON.stringify(msg)),
    }),
  },
};
