import { EncodeObject, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { AminoTypes, BroadcastTxResponse, Coin, logs, SignerData, StdFee } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { CosmWasmClient } from "./cosmwasmclient";
export interface UploadResult {
    /** Size of the original wasm code in bytes */
    readonly originalSize: number;
    /** A hex encoded sha256 checksum of the original wasm code (that is stored on chain) */
    readonly originalChecksum: string;
    /** Size of the compressed wasm code in bytes */
    readonly compressedSize: number;
    /** A hex encoded sha256 checksum of the compressed wasm code (that stored in the transaction) */
    readonly compressedChecksum: string;
    /** The ID of the code asigned by the chain */
    readonly codeId: number;
    readonly logs: readonly logs.Log[];
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly transactionHash: string;
}
/**
 * The options of an .instantiate() call.
 * All properties are optional.
 */
export interface InstantiateOptions {
    readonly memo?: string;
    /**
     * The funds that are transferred from the sender to the newly created contract.
     * The funds are transferred as part of the message execution after the contract address is
     * created and before the instantiation message is executed by the contract.
     *
     * Only native tokens are supported.
     */
    readonly funds?: readonly Coin[];
    /**
     * A bech32 encoded address of an admin account.
     * Caution: an admin has the privilege to upgrade a contract. If this is not desired, do not set this value.
     */
    readonly admin?: string;
}
export interface InstantiateResult {
    /** The address of the newly instantiated contract */
    readonly contractAddress: string;
    readonly logs: readonly logs.Log[];
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly transactionHash: string;
}
/**
 * Result type of updateAdmin and clearAdmin
 */
export interface ChangeAdminResult {
    readonly logs: readonly logs.Log[];
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly transactionHash: string;
}
export interface MigrateResult {
    readonly logs: readonly logs.Log[];
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly transactionHash: string;
}
export interface ExecuteResult {
    readonly logs: readonly logs.Log[];
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly transactionHash: string;
}
export interface SigningCosmWasmClientOptions {
    readonly registry?: Registry;
    readonly aminoTypes?: AminoTypes;
    readonly prefix?: string;
    readonly broadcastTimeoutMs?: number;
    readonly broadcastPollIntervalMs?: number;
}
export declare class SigningCosmWasmClient extends CosmWasmClient {
    readonly registry: Registry;
    readonly broadcastTimeoutMs: number | undefined;
    readonly broadcastPollIntervalMs: number | undefined;
    private readonly signer;
    private readonly aminoTypes;
    static connectWithSigner(endpoint: string, signer: OfflineSigner, options?: SigningCosmWasmClientOptions): Promise<SigningCosmWasmClient>;
    /**
     * Creates a client in offline mode.
     *
     * This should only be used in niche cases where you know exactly what you're doing,
     * e.g. when building an offline signing application.
     *
     * When you try to use online functionality with such a signer, an
     * exception will be raised.
     */
    static offline(signer: OfflineSigner, options?: SigningCosmWasmClientOptions): Promise<SigningCosmWasmClient>;
    protected constructor(tmClient: Tendermint34Client | undefined, signer: OfflineSigner, options: SigningCosmWasmClientOptions);
    /** Uploads code and returns a receipt, including the code ID */
    upload(senderAddress: string, wasmCode: Uint8Array, fee: StdFee, memo?: string): Promise<UploadResult>;
    instantiate(senderAddress: string, codeId: number, msg: Record<string, unknown>, label: string, fee: StdFee, options?: InstantiateOptions): Promise<InstantiateResult>;
    updateAdmin(senderAddress: string, contractAddress: string, newAdmin: string, fee: StdFee, memo?: string): Promise<ChangeAdminResult>;
    clearAdmin(senderAddress: string, contractAddress: string, fee: StdFee, memo?: string): Promise<ChangeAdminResult>;
    migrate(senderAddress: string, contractAddress: string, codeId: number, migrateMsg: Record<string, unknown>, fee: StdFee, memo?: string): Promise<MigrateResult>;
    execute(senderAddress: string, contractAddress: string, msg: Record<string, unknown>, fee: StdFee, memo?: string, funds?: readonly Coin[]): Promise<ExecuteResult>;
    sendTokens(senderAddress: string, recipientAddress: string, amount: readonly Coin[], fee: StdFee, memo?: string): Promise<BroadcastTxResponse>;
    delegateTokens(delegatorAddress: string, validatorAddress: string, amount: Coin, fee: StdFee, memo?: string): Promise<BroadcastTxResponse>;
    undelegateTokens(delegatorAddress: string, validatorAddress: string, amount: Coin, fee: StdFee, memo?: string): Promise<BroadcastTxResponse>;
    withdrawRewards(delegatorAddress: string, validatorAddress: string, fee: StdFee, memo?: string): Promise<BroadcastTxResponse>;
    /**
     * Creates a transaction with the given messages, fee and memo. Then signs and broadcasts the transaction.
     *
     * @param signerAddress The address that will sign transactions using this instance. The signer must be able to sign with this address.
     * @param messages
     * @param fee
     * @param memo
     */
    signAndBroadcast(signerAddress: string, messages: readonly EncodeObject[], fee: StdFee, memo?: string): Promise<BroadcastTxResponse>;
    sign(signerAddress: string, messages: readonly EncodeObject[], fee: StdFee, memo: string, explicitSignerData?: SignerData): Promise<TxRaw>;
    private signAmino;
    private signDirect;
}
