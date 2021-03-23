import { encodeSecp256k1Pubkey } from "@cosmjs/amino";
import { fromBase64 } from "@cosmjs/encoding";
import {
  buildFeeTable,
  Coin,
  CosmosFeeTable,
  GasLimits,
  GasPrice,
  makeSignDoc as makeSignDocAmino,
  StdFee,
} from "@cosmjs/launchpad";
import { Int53 } from "@cosmjs/math";
import {
  EncodeObject,
  encodePubkey,
  GeneratedType,
  isOfflineDirectSigner,
  makeAuthInfoBytes,
  makeSignDoc,
  OfflineSigner,
  Registry,
} from "@cosmjs/proto-signing";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";

import { AminoTypes } from "./aminotypes";
import { MsgMultiSend } from "./codec/cosmos/bank/v1beta1/tx";
import {
  MsgFundCommunityPool,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from "./codec/cosmos/distribution/v1beta1/tx";
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
} from "./codec/cosmos/staking/v1beta1/tx";
import { SignMode } from "./codec/cosmos/tx/signing/v1beta1/signing";
import { TxRaw } from "./codec/cosmos/tx/v1beta1/tx";
import {
  MsgAcknowledgement,
  MsgChannelCloseConfirm,
  MsgChannelCloseInit,
  MsgChannelOpenAck,
  MsgChannelOpenConfirm,
  MsgChannelOpenInit,
  MsgChannelOpenTry,
  MsgRecvPacket,
  MsgTimeout,
  MsgTimeoutOnClose,
} from "./codec/ibc/core/channel/v1/tx";
import {
  MsgCreateClient,
  MsgSubmitMisbehaviour,
  MsgUpdateClient,
  MsgUpgradeClient,
} from "./codec/ibc/core/client/v1/tx";
import {
  MsgConnectionOpenAck,
  MsgConnectionOpenConfirm,
  MsgConnectionOpenInit,
  MsgConnectionOpenTry,
} from "./codec/ibc/core/connection/v1/tx";
import { BroadcastTxResponse, StargateClient } from "./stargateclient";

const defaultGasPrice = GasPrice.fromString("0.025ucosm");
const defaultGasLimits: GasLimits<CosmosFeeTable> = { send: 80000 };

export const defaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/cosmos.bank.v1beta1.MsgMultiSend", MsgMultiSend],
  ["/cosmos.distribution.v1beta1.MsgFundCommunityPool", MsgFundCommunityPool],
  ["/cosmos.distribution.v1beta1.MsgSetWithdrawAddress", MsgSetWithdrawAddress],
  ["/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", MsgWithdrawDelegatorReward],
  ["/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission", MsgWithdrawValidatorCommission],
  ["/cosmos.staking.v1beta1.MsgBeginRedelegate", MsgBeginRedelegate],
  ["/cosmos.staking.v1beta1.MsgCreateValidator", MsgCreateValidator],
  ["/cosmos.staking.v1beta1.MsgDelegate", MsgDelegate],
  ["/cosmos.staking.v1beta1.MsgEditValidator", MsgEditValidator],
  ["/cosmos.staking.v1beta1.MsgUndelegate", MsgUndelegate],
  ["/ibc.core.channel.v1.MsgChannelOpenInit", MsgChannelOpenInit],
  ["/ibc.core.channel.v1.MsgChannelOpenTry", MsgChannelOpenTry],
  ["/ibc.core.channel.v1.MsgChannelOpenAck", MsgChannelOpenAck],
  ["/ibc.core.channel.v1.MsgChannelOpenConfirm", MsgChannelOpenConfirm],
  ["/ibc.core.channel.v1.MsgChannelCloseInit", MsgChannelCloseInit],
  ["/ibc.core.channel.v1.MsgChannelCloseConfirm", MsgChannelCloseConfirm],
  ["/ibc.core.channel.v1.MsgRecvPacket", MsgRecvPacket],
  ["/ibc.core.channel.v1.MsgTimeout ", MsgTimeout],
  ["/ibc.core.channel.v1.MsgTimeoutOnClose", MsgTimeoutOnClose],
  ["/ibc.core.channel.v1.MsgAcknowledgement", MsgAcknowledgement],
  ["/ibc.core.client.v1.MsgCreateClient", MsgCreateClient],
  ["/ibc.core.client.v1.MsgUpdateClient", MsgUpdateClient],
  ["/ibc.core.client.v1.MsgUpgradeClient", MsgUpgradeClient],
  ["/ibc.core.client.v1.MsgSubmitMisbehaviour", MsgSubmitMisbehaviour],
  ["/ibc.core.connection.v1.MsgConnectionOpenInit", MsgConnectionOpenInit],
  ["/ibc.core.connection.v1.MsgConnectionOpenTry", MsgConnectionOpenTry],
  ["/ibc.core.connection.v1.MsgConnectionOpenAck", MsgConnectionOpenAck],
  ["/ibc.core.connection.v1.MsgConnectionOpenConfirm", MsgConnectionOpenConfirm],
];

function createDefaultRegistry(): Registry {
  return new Registry(defaultRegistryTypes);
}

/** Use for testing only */
export interface PrivateSigningStargateClient {
  readonly fees: CosmosFeeTable;
  readonly registry: Registry;
}

export interface SigningStargateClientOptions {
  readonly registry?: Registry;
  readonly aminoTypes?: AminoTypes;
  readonly prefix?: string;
  readonly gasPrice?: GasPrice;
  readonly gasLimits?: GasLimits<CosmosFeeTable>;
}

export class SigningStargateClient extends StargateClient {
  public readonly fees: CosmosFeeTable;
  public readonly registry: Registry;

  private readonly signer: OfflineSigner;
  private readonly aminoTypes: AminoTypes;

  public static async connectWithSigner(
    endpoint: string,
    signer: OfflineSigner,
    options: SigningStargateClientOptions = {},
  ): Promise<SigningStargateClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new SigningStargateClient(tmClient, signer, options);
  }

  private constructor(
    tmClient: Tendermint34Client,
    signer: OfflineSigner,
    options: SigningStargateClientOptions,
  ) {
    super(tmClient);
    const {
      registry = createDefaultRegistry(),
      aminoTypes = new AminoTypes({ prefix: options.prefix }),
      gasPrice = defaultGasPrice,
      gasLimits = defaultGasLimits,
    } = options;
    this.fees = buildFeeTable<CosmosFeeTable>(gasPrice, defaultGasLimits, gasLimits);
    this.registry = registry;
    this.aminoTypes = aminoTypes;
    this.signer = signer;
  }

  public async sendTokens(
    senderAddress: string,
    recipientAddress: string,
    transferAmount: readonly Coin[],
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const sendMsg = {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: senderAddress,
        toAddress: recipientAddress,
        amount: transferAmount,
      },
    };
    return this.signAndBroadcast(senderAddress, [sendMsg], this.fees.send, memo);
  }

  public async signAndBroadcast(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodePubkey(encodeSecp256k1Pubkey(accountFromSigner.pubkey));
    const accountFromChain = await this.getAccountUnverified(signerAddress);
    if (!accountFromChain) {
      throw new Error("Account not found");
    }
    const { accountNumber, sequence } = accountFromChain;
    const chainId = await this.getChainId();
    const txBody = {
      messages: messages,
      memo: memo,
    };
    const txBodyBytes = this.registry.encode({
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: txBody,
    });
    const gasLimit = Int53.fromString(fee.gas).toNumber();

    if (isOfflineDirectSigner(this.signer)) {
      const authInfoBytes = makeAuthInfoBytes([pubkey], fee.amount, gasLimit, sequence);
      const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
      const { signature, signed } = await this.signer.signDirect(signerAddress, signDoc);
      const txRaw = TxRaw.fromPartial({
        bodyBytes: signed.bodyBytes,
        authInfoBytes: signed.authInfoBytes,
        signatures: [fromBase64(signature.signature)],
      });
      const signedTx = Uint8Array.from(TxRaw.encode(txRaw).finish());
      return this.broadcastTx(signedTx);
    }

    // Amino signer
    const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
    const msgs = messages.map((msg) => this.aminoTypes.toAmino(msg));
    const signDoc = makeSignDocAmino(msgs, fee, chainId, memo, accountNumber, sequence);
    const { signature, signed } = await this.signer.signAmino(signerAddress, signDoc);
    const signedTxBody = {
      messages: signed.msgs.map((msg) => this.aminoTypes.fromAmino(msg)),
      memo: signed.memo,
    };
    const signedTxBodyBytes = this.registry.encode({
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: signedTxBody,
    });
    const signedGasLimit = Int53.fromString(signed.fee.gas).toNumber();
    const signedSequence = Int53.fromString(signed.sequence).toNumber();
    const signedAuthInfoBytes = makeAuthInfoBytes(
      [pubkey],
      signed.fee.amount,
      signedGasLimit,
      signedSequence,
      signMode,
    );
    const txRaw = TxRaw.fromPartial({
      bodyBytes: signedTxBodyBytes,
      authInfoBytes: signedAuthInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
    const signedTx = Uint8Array.from(TxRaw.encode(txRaw).finish());
    return this.broadcastTx(signedTx);
  }
}
