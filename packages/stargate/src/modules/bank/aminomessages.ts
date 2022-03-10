/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg, Coin } from "@cosmjs/amino";
import { MsgMultiSend, MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";

// eslint-disable-next-line import/no-cycle
import { AminoConverters } from "../../aminotypes";

/** A high level transaction of the coin module */
export interface AminoMsgSend extends AminoMsg {
  readonly type: "cosmos-sdk/MsgSend";
  readonly value: {
    /** Bech32 account address */
    readonly from_address: string;
    /** Bech32 account address */
    readonly to_address: string;
    readonly amount: readonly Coin[];
  };
}

export function isAminoMsgSend(msg: AminoMsg): msg is AminoMsgSend {
  return msg.type === "cosmos-sdk/MsgSend";
}

interface Input {
  /** Bech32 account address */
  readonly address: string;
  readonly coins: readonly Coin[];
}

interface Output {
  /** Bech32 account address */
  readonly address: string;
  readonly coins: readonly Coin[];
}

/** A high level transaction of the coin module */
export interface AminoMsgMultiSend extends AminoMsg {
  readonly type: "cosmos-sdk/MsgMultiSend";
  readonly value: {
    readonly inputs: readonly Input[];
    readonly outputs: readonly Output[];
  };
}

export function isAminoMsgMultiSend(msg: AminoMsg): msg is AminoMsgMultiSend {
  return msg.type === "cosmos-sdk/MsgMultiSend";
}

export function createBankAminoConverters(): AminoConverters {
  return {
    "/cosmos.bank.v1beta1.MsgSend": {
      aminoType: "cosmos-sdk/MsgSend",
      toAmino: ({ fromAddress, toAddress, amount }: MsgSend): AminoMsgSend["value"] => ({
        from_address: fromAddress,
        to_address: toAddress,
        amount: [...amount],
      }),
      fromAmino: ({ from_address, to_address, amount }: AminoMsgSend["value"]): MsgSend => ({
        fromAddress: from_address,
        toAddress: to_address,
        amount: [...amount],
      }),
    },
    "/cosmos.bank.v1beta1.MsgMultiSend": {
      aminoType: "cosmos-sdk/MsgMultiSend",
      toAmino: ({ inputs, outputs }: MsgMultiSend): AminoMsgMultiSend["value"] => ({
        inputs: inputs.map((input) => ({
          address: input.address,
          coins: [...input.coins],
        })),
        outputs: outputs.map((output) => ({
          address: output.address,
          coins: [...output.coins],
        })),
      }),
      fromAmino: ({ inputs, outputs }: AminoMsgMultiSend["value"]): MsgMultiSend => ({
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
  };
}
