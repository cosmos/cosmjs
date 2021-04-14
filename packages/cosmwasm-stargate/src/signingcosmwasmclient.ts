/* eslint-disable @typescript-eslint/naming-convention */
import { encodeSecp256k1Pubkey, makeSignDoc as makeSignDocAmino } from "@cosmjs/amino";
import {
  ChangeAdminResult,
  ExecuteResult,
  InstantiateOptions,
  InstantiateResult,
  isValidBuilder,
  MigrateResult,
  UploadMeta,
  UploadResult,
} from "@cosmjs/cosmwasm-launchpad";
import { sha256 } from "@cosmjs/crypto";
import { fromBase64, toHex, toUtf8 } from "@cosmjs/encoding";
import { Int53, Uint53 } from "@cosmjs/math";
import {
  EncodeObject,
  encodePubkey,
  isOfflineDirectSigner,
  makeAuthInfoBytes,
  makeSignDoc,
  OfflineSigner,
  Registry,
} from "@cosmjs/proto-signing";
import {
  AminoTypes,
  BroadcastTxFailure,
  BroadcastTxResponse,
  buildFeeTable,
  Coin,
  CosmosFeeTable,
  defaultGasLimits as defaultStargateGasLimits,
  defaultGasPrice,
  defaultRegistryTypes,
  GasLimits,
  GasPrice,
  isBroadcastTxFailure,
  logs,
  SignerData,
  StdFee,
} from "@cosmjs/stargate";
import { MsgWithdrawDelegatorReward } from "@cosmjs/stargate/build/codec/cosmos/distribution/v1beta1/tx";
import { MsgDelegate, MsgUndelegate } from "@cosmjs/stargate/build/codec/cosmos/staking/v1beta1/tx";
import { SignMode } from "@cosmjs/stargate/build/codec/cosmos/tx/signing/v1beta1/signing";
import { TxRaw } from "@cosmjs/stargate/build/codec/cosmos/tx/v1beta1/tx";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { assert } from "@cosmjs/utils";
import Long from "long";
import pako from "pako";

import { cosmWasmTypes } from "./aminotypes";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "./codec/x/wasm/internal/types/tx";
import { CosmWasmClient } from "./cosmwasmclient";

/**
 * These fees are used by the higher level methods of SigningCosmWasmClient
 */
export interface CosmWasmFeeTable extends CosmosFeeTable {
  readonly upload: StdFee;
  readonly init: StdFee;
  readonly exec: StdFee;
  readonly migrate: StdFee;
  /** Paid when setting the contract admin to a new address or unsetting it */
  readonly changeAdmin: StdFee;
}

function prepareBuilder(builder: string | undefined): string {
  if (builder === undefined) {
    return ""; // normalization needed by backend
  } else {
    if (!isValidBuilder(builder)) throw new Error("The builder (Docker Hub image with tag) is not valid");
    return builder;
  }
}

export const defaultGasLimits: GasLimits<CosmWasmFeeTable> = {
  ...defaultStargateGasLimits,
  upload: 1_500_000,
  init: 500_000,
  migrate: 200_000,
  exec: 200_000,
  changeAdmin: 80_000,
};

function createBroadcastTxErrorMessage(result: BroadcastTxFailure): string {
  return `Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`;
}

function createDefaultRegistry(): Registry {
  return new Registry([
    ...defaultRegistryTypes,
    ["/cosmwasm.wasm.v1beta1.MsgClearAdmin", MsgClearAdmin],
    ["/cosmwasm.wasm.v1beta1.MsgExecuteContract", MsgExecuteContract],
    ["/cosmwasm.wasm.v1beta1.MsgMigrateContract", MsgMigrateContract],
    ["/cosmwasm.wasm.v1beta1.MsgStoreCode", MsgStoreCode],
    ["/cosmwasm.wasm.v1beta1.MsgInstantiateContract", MsgInstantiateContract],
    ["/cosmwasm.wasm.v1beta1.MsgUpdateAdmin", MsgUpdateAdmin],
  ]);
}

export interface SigningCosmWasmClientOptions {
  readonly registry?: Registry;
  readonly aminoTypes?: AminoTypes;
  readonly prefix?: string;
  readonly gasPrice?: GasPrice;
  readonly gasLimits?: Partial<GasLimits<CosmosFeeTable>>;
}

/** Use for testing only */
export interface PrivateSigningCosmWasmClient {
  readonly fees: CosmWasmFeeTable;
  readonly registry: Registry;
}

export class SigningCosmWasmClient extends CosmWasmClient {
  public readonly fees: CosmosFeeTable;
  public readonly registry: Registry;

  private readonly signer: OfflineSigner;
  private readonly aminoTypes: AminoTypes;

  public static async connectWithSigner(
    endpoint: string,
    signer: OfflineSigner,
    options: SigningCosmWasmClientOptions = {},
  ): Promise<SigningCosmWasmClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new SigningCosmWasmClient(tmClient, signer, options);
  }

  /**
   * Creates a client in offline mode.
   *
   * This should only be used in niche cases where you know exactly what you're doing,
   * e.g. when building an offline signing application.
   *
   * When you try to use online functionality with such a signer, an
   * exception will be raised.
   */
  public static async offline(
    signer: OfflineSigner,
    options: SigningCosmWasmClientOptions = {},
  ): Promise<SigningCosmWasmClient> {
    return new SigningCosmWasmClient(undefined, signer, options);
  }

  protected constructor(
    tmClient: Tendermint34Client | undefined,
    signer: OfflineSigner,
    options: SigningCosmWasmClientOptions,
  ) {
    super(tmClient);
    const {
      registry = createDefaultRegistry(),
      aminoTypes = new AminoTypes({ additions: cosmWasmTypes, prefix: options.prefix }),
      gasPrice = defaultGasPrice,
      gasLimits = {},
    } = options;
    this.fees = buildFeeTable<CosmosFeeTable>(gasPrice, defaultGasLimits, gasLimits);
    this.registry = registry;
    this.aminoTypes = aminoTypes;
    this.signer = signer;
  }

  /** Uploads code and returns a receipt, including the code ID */
  public async upload(
    senderAddress: string,
    wasmCode: Uint8Array,
    meta: UploadMeta = {},
    memo = "",
  ): Promise<UploadResult> {
    const source = meta.source || "";
    const builder = prepareBuilder(meta.builder);
    const compressed = pako.gzip(wasmCode, { level: 9 });
    const storeCodeMsg = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgStoreCode",
      value: MsgStoreCode.fromPartial({
        sender: senderAddress,
        wasmByteCode: compressed,
        source: source,
        builder: builder,
      }),
    };

    const result = await this.signAndBroadcast(senderAddress, [storeCodeMsg], this.fees.upload, memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    const parsedLogs = logs.parseRawLog(result.rawLog);
    const codeIdAttr = logs.findAttribute(parsedLogs, "message", "code_id");
    return {
      originalSize: wasmCode.length,
      originalChecksum: toHex(sha256(wasmCode)),
      compressedSize: compressed.length,
      compressedChecksum: toHex(sha256(compressed)),
      codeId: Number.parseInt(codeIdAttr.value, 10),
      logs: parsedLogs,
      transactionHash: result.transactionHash,
    };
  }

  public async instantiate(
    senderAddress: string,
    codeId: number,
    initMsg: Record<string, unknown>,
    label: string,
    options: InstantiateOptions = {},
  ): Promise<InstantiateResult> {
    const instantiateMsg = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgInstantiateContract",
      value: MsgInstantiateContract.fromPartial({
        sender: senderAddress,
        codeId: Long.fromString(new Uint53(codeId).toString()),
        label: label,
        initMsg: toUtf8(JSON.stringify(initMsg)),
        funds: [...(options.transferAmount || [])],
        admin: options.admin,
      }),
    };
    const result = await this.signAndBroadcast(senderAddress, [instantiateMsg], this.fees.init, options.memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    const parsedLogs = logs.parseRawLog(result.rawLog);
    const contractAddressAttr = logs.findAttribute(parsedLogs, "message", "contract_address");
    return {
      contractAddress: contractAddressAttr.value,
      logs: parsedLogs,
      transactionHash: result.transactionHash,
    };
  }

  public async updateAdmin(
    senderAddress: string,
    contractAddress: string,
    newAdmin: string,
    memo = "",
  ): Promise<ChangeAdminResult> {
    const updateAdminMsg = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgUpdateAdmin",
      value: MsgUpdateAdmin.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
        newAdmin: newAdmin,
      }),
    };
    const result = await this.signAndBroadcast(senderAddress, [updateAdminMsg], this.fees.changeAdmin, memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      logs: logs.parseRawLog(result.rawLog),
      transactionHash: result.transactionHash,
    };
  }

  public async clearAdmin(
    senderAddress: string,
    contractAddress: string,
    memo = "",
  ): Promise<ChangeAdminResult> {
    const clearAdminMsg = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgClearAdmin",
      value: MsgClearAdmin.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
      }),
    };
    const result = await this.signAndBroadcast(senderAddress, [clearAdminMsg], this.fees.changeAdmin, memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      logs: logs.parseRawLog(result.rawLog),
      transactionHash: result.transactionHash,
    };
  }

  public async migrate(
    senderAddress: string,
    contractAddress: string,
    codeId: number,
    migrateMsg: Record<string, unknown>,
    memo = "",
  ): Promise<MigrateResult> {
    const msg = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgMigrateContract",
      value: MsgMigrateContract.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
        codeId: Long.fromString(new Uint53(codeId).toString()),
        migrateMsg: toUtf8(JSON.stringify(migrateMsg)),
      }),
    };
    const result = await this.signAndBroadcast(senderAddress, [msg], this.fees.migrate, memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      logs: logs.parseRawLog(result.rawLog),
      transactionHash: result.transactionHash,
    };
  }

  public async execute(
    senderAddress: string,
    contractAddress: string,
    handleMsg: Record<string, unknown>,
    memo = "",
    transferAmount?: readonly Coin[],
  ): Promise<ExecuteResult> {
    const executeMsg = {
      typeUrl: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
        msg: toUtf8(JSON.stringify(handleMsg)),
        funds: [...(transferAmount || [])],
      }),
    };
    const result = await this.signAndBroadcast(senderAddress, [executeMsg], this.fees.exec, memo);
    if (isBroadcastTxFailure(result)) {
      throw new Error(createBroadcastTxErrorMessage(result));
    }
    return {
      logs: logs.parseRawLog(result.rawLog),
      transactionHash: result.transactionHash,
    };
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

  public async delegateTokens(
    delegatorAddress: string,
    validatorAddress: string,
    amount: Coin,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const delegateMsg = {
      typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
      value: MsgDelegate.fromPartial({ delegatorAddress: delegatorAddress, validatorAddress, amount }),
    };
    return this.signAndBroadcast(delegatorAddress, [delegateMsg], this.fees.delegate, memo);
  }

  public async undelegateTokens(
    delegatorAddress: string,
    validatorAddress: string,
    amount: Coin,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const undelegateMsg = {
      typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
      value: MsgUndelegate.fromPartial({ delegatorAddress: delegatorAddress, validatorAddress, amount }),
    };
    return this.signAndBroadcast(delegatorAddress, [undelegateMsg], this.fees.undelegate, memo);
  }

  public async withdrawRewards(
    delegatorAddress: string,
    validatorAddress: string,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const withdrawMsg = {
      typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
      value: MsgWithdrawDelegatorReward.fromPartial({ delegatorAddress: delegatorAddress, validatorAddress }),
    };
    return this.signAndBroadcast(delegatorAddress, [withdrawMsg], this.fees.withdraw, memo);
  }

  /**
   * Creates a transaction with the given messages, fee and memo. Then signs and broadcasts the transaction.
   *
   * @param signerAddress The address that will sign transactions using this instance. The signer must be able to sign with this address.
   * @param messages
   * @param fee
   * @param memo
   */
  public async signAndBroadcast(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    const txRaw = await this.sign(signerAddress, messages, fee, memo);
    const txBytes = Uint8Array.from(TxRaw.encode(txRaw).finish());
    return this.broadcastTx(txBytes);
  }

  public async sign(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    explicitSignerData?: SignerData,
  ): Promise<TxRaw> {
    let signerData: SignerData;
    if (explicitSignerData) {
      signerData = explicitSignerData;
    } else {
      const { accountNumber, sequence } = await this.getSequence(signerAddress);
      const chainId = await this.getChainId();
      signerData = {
        accountNumber: accountNumber,
        sequence: sequence,
        chainId: chainId,
      };
    }

    return isOfflineDirectSigner(this.signer)
      ? this.signDirect(signerAddress, messages, fee, memo, signerData)
      : this.signAmino(signerAddress, messages, fee, memo, signerData);
  }

  private async signAmino(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData,
  ): Promise<TxRaw> {
    assert(!isOfflineDirectSigner(this.signer));
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodePubkey(encodeSecp256k1Pubkey(accountFromSigner.pubkey));
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
    return TxRaw.fromPartial({
      bodyBytes: signedTxBodyBytes,
      authInfoBytes: signedAuthInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }

  private async signDirect(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData,
  ): Promise<TxRaw> {
    assert(isOfflineDirectSigner(this.signer));
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodePubkey(encodeSecp256k1Pubkey(accountFromSigner.pubkey));
    const txBody = {
      messages: messages,
      memo: memo,
    };
    const txBodyBytes = this.registry.encode({
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: txBody,
    });
    const gasLimit = Int53.fromString(fee.gas).toNumber();
    const authInfoBytes = makeAuthInfoBytes([pubkey], fee.amount, gasLimit, sequence);
    const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
    const { signature, signed } = await this.signer.signDirect(signerAddress, signDoc);
    return TxRaw.fromPartial({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }
}
