/* eslint-disable @typescript-eslint/naming-convention */
import { AminoMsg, Coin, omitDefault } from "@cosmjs/amino";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";

import { AminoConverters } from "../../aminotypes";

// https://github.com/cosmos/ibc-go/blob/07b6a97b67d17fd214a83764cbdb2c2c3daef445/modules/core/02-client/types/client.pb.go#L297-L312
interface AminoHeight {
  /** 0 values must be omitted (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/x/ibc/core/02-client/types/client.pb.go#L252). */
  readonly revision_number?: string;
  /** 0 values must be omitted (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/x/ibc/core/02-client/types/client.pb.go#L254). */
  readonly revision_height?: string;
}

// https://github.com/cosmos/ibc-go/blob/a4ca39c59f770a0b6948947d5178d5f0914c3a17/modules/apps/transfer/types/tx.pb.go#L37-L56
/** Transfers fungible tokens (i.e Coins) between ICS20 enabled chains */
export interface AminoMsgTransfer extends AminoMsg {
  readonly type: "cosmos-sdk/MsgTransfer";
  readonly value: {
    readonly source_port: string;
    readonly source_channel: string;
    readonly token?: Coin;
    /** Bech32 account address */
    readonly sender: string;
    /** Bech32 account address */
    readonly receiver: string;
    /**
     * The timeout as a (revision_number, revision_height) pair.
     *
     * This fied is is non-optional (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/x/ibc/applications/transfer/types/tx.pb.go#L49).
     * In order to not set the timeout height, set it to {}.
     */
    readonly timeout_height: AminoHeight;
    /**
     * Timeout timestamp in nanoseconds since Unix epoch. The timeout is disabled when set to 0.
     *
     * 0 values must be omitted (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/x/ibc/applications/transfer/types/tx.pb.go#L52).
     */
    readonly timeout_timestamp?: string;
    readonly memo?: string;
  };
}

export function isAminoMsgTransfer(msg: AminoMsg): msg is AminoMsgTransfer {
  return msg.type === "cosmos-sdk/MsgTransfer";
}

export function createIbcAminoConverters(): AminoConverters {
  return {
    "/ibc.applications.transfer.v1.MsgTransfer": {
      aminoType: "cosmos-sdk/MsgTransfer",
      toAmino: ({
        sourcePort,
        sourceChannel,
        token,
        sender,
        receiver,
        timeoutHeight,
        timeoutTimestamp,
        memo,
      }: MsgTransfer): AminoMsgTransfer["value"] => ({
        source_port: sourcePort,
        source_channel: sourceChannel,
        token: token,
        sender: sender,
        receiver: receiver,
        timeout_height: timeoutHeight
          ? {
              revision_height: omitDefault(timeoutHeight.revisionHeight)?.toString(),
              revision_number: omitDefault(timeoutHeight.revisionNumber)?.toString(),
            }
          : {},
        timeout_timestamp: omitDefault(timeoutTimestamp)?.toString(),
        memo: omitDefault(memo),
      }),
      fromAmino: ({
        source_port,
        source_channel,
        token,
        sender,
        receiver,
        timeout_height,
        timeout_timestamp,
        memo,
      }: AminoMsgTransfer["value"]): MsgTransfer =>
        MsgTransfer.fromPartial({
          sourcePort: source_port,
          sourceChannel: source_channel,
          token: token,
          sender: sender,
          receiver: receiver,
          timeoutHeight: timeout_height
            ? {
                revisionHeight: BigInt(timeout_height.revision_height || "0"),
                revisionNumber: BigInt(timeout_height.revision_number || "0"),
              }
            : undefined,
          timeoutTimestamp: BigInt(timeout_timestamp || "0"),
          memo: memo ?? "",
        }),
    },
  };
}
