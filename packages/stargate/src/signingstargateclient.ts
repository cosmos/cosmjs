/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64 } from "@cosmjs/encoding";
import {
  buildFeeTable,
  Coin,
  CosmosFeeTable,
  encodeSecp256k1Pubkey,
  GasLimits,
  GasPrice,
  StdFee,
} from "@cosmjs/launchpad";
import { Int53 } from "@cosmjs/math";
import {
  EncodeObject,
  encodePubkey,
  isOfflineDirectSigner,
  makeAuthInfoBytes,
  makeSignDoc,
  OfflineSigner,
  Registry,
} from "@cosmjs/proto-signing";
import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";

import { cosmos } from "./codec";
import { BroadcastTxResponse, StargateClient } from "./stargateclient";

const { TxRaw } = cosmos.tx.v1beta1;

const defaultGasPrice = GasPrice.fromString("0.025ucosm");
const defaultGasLimits: GasLimits<CosmosFeeTable> = { send: 80000 };

/** Use for testing only */
export interface PrivateSigningStargateClient {
  readonly fees: CosmosFeeTable;
  readonly registry: Registry;
}

export interface SigningStargateClientOptions {
  readonly registry?: Registry;
  readonly gasPrice?: GasPrice;
  readonly gasLimits?: GasLimits<CosmosFeeTable>;
}

export class SigningStargateClient extends StargateClient {
  private readonly fees: CosmosFeeTable;
  private readonly registry: Registry;
  private readonly signer: OfflineSigner;

  public static async connectWithWallet(
    endpoint: string,
    signer: OfflineSigner,
    options: SigningStargateClientOptions = {},
  ): Promise<SigningStargateClient> {
    const tmClient = await TendermintClient.connect(endpoint);
    return new SigningStargateClient(tmClient, signer, options);
  }

  private constructor(
    tmClient: TendermintClient,
    signer: OfflineSigner,
    options: SigningStargateClientOptions,
  ) {
    super(tmClient);
    const { registry = new Registry(), gasPrice = defaultGasPrice, gasLimits = defaultGasLimits } = options;
    this.fees = buildFeeTable<CosmosFeeTable>(gasPrice, defaultGasLimits, gasLimits);
    this.registry = registry;
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
    address: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo = "",
  ): Promise<BroadcastTxResponse> {
    if (!isOfflineDirectSigner(this.signer)) {
      throw new Error("Amino signer not yet supported");
    }

    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === address,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodeSecp256k1Pubkey(accountFromSigner.pubkey);
    const accountFromChain = await this.getAccount(address);
    if (!accountFromChain) {
      throw new Error("Account not found");
    }
    const { accountNumber, sequence } = accountFromChain;
    if (!pubkey) {
      throw new Error("Pubkey not known");
    }
    const chainId = await this.getChainId();
    const pubkeyAny = encodePubkey(pubkey);
    const txBody = {
      messages: messages,
      memo: memo,
    };
    const txBodyBytes = this.registry.encode({
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: txBody,
    });
    const gasLimit = Int53.fromString(fee.gas).toNumber();
    const authInfoBytes = makeAuthInfoBytes([pubkeyAny], fee.amount, gasLimit, sequence);

    const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
    const signResponse = await this.signer.signDirect(address, signDoc);
    const txRaw = TxRaw.create({
      bodyBytes: txBodyBytes,
      authInfoBytes: authInfoBytes,
      signatures: [fromBase64(signResponse.signature.signature)],
    });
    const signedTx = Uint8Array.from(TxRaw.encode(txRaw).finish());
    return this.broadcastTx(signedTx);
  }
}
