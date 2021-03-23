import { createMultisigThresholdPubkey, encodeSecp256k1Pubkey, pubkeyToAddress } from "@cosmjs/amino";
import { coins, makeCosmoshubPath, Secp256k1HdWallet } from "@cosmjs/launchpad";
import { encodePubkey } from "@cosmjs/proto-signing";
import { MultiSignature } from "@cosmjs/proto-signing/build/codec/cosmos/crypto/multisig/v1beta1/multisig";
import { assert } from "@cosmjs/utils";
import Long from "long";

import { MsgSend } from "./codec/cosmos/bank/v1beta1/tx";
import { CompactBitArray } from "./codec/cosmos/crypto/multisig/v1beta1/multisig";
import { SignMode } from "./codec/cosmos/tx/signing/v1beta1/signing";
import { AuthInfo, SignerInfo, TxRaw } from "./codec/cosmos/tx/v1beta1/tx";
import { SigningStargateClient } from "./signingstargateclient";
import { assertIsBroadcastTxSuccess } from "./stargateclient";
import { faucet, makeRandomAddress, simapp } from "./testutils.spec";

describe("SigningStargateClient multisig", () => {
  it("works", async () => {
    const wallet0 = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(0));
    const wallet1 = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(1));
    const wallet2 = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(2));
    const wallet3 = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(3));
    const wallet4 = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(4));
    const pubkey0 = encodeSecp256k1Pubkey((await wallet0.getAccounts())[0].pubkey);
    const pubkey1 = encodeSecp256k1Pubkey((await wallet1.getAccounts())[0].pubkey);
    const pubkey2 = encodeSecp256k1Pubkey((await wallet2.getAccounts())[0].pubkey);
    const pubkey3 = encodeSecp256k1Pubkey((await wallet3.getAccounts())[0].pubkey);
    const pubkey4 = encodeSecp256k1Pubkey((await wallet4.getAccounts())[0].pubkey);
    const multisigPubkey = createMultisigThresholdPubkey([pubkey0, pubkey1, pubkey2, pubkey3, pubkey4], 2);
    const multisigAddress = pubkeyToAddress(multisigPubkey, "cosmos");
    expect(multisigAddress).toEqual("cosmos1h90ml36rcu7yegwduzgzderj2jmq49hcpfclw9");

    const client0 = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet0);
    const client1 = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet1);
    const client2 = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet2);
    const client3 = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet3);
    const client4 = await SigningStargateClient.connectWithSigner(simapp.tendermintUrl, wallet4);

    const msgSend: MsgSend = {
      fromAddress: multisigAddress,
      toAddress: makeRandomAddress(),
      amount: coins(1234, "ucosm"),
    };
    const msg = {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: msgSend,
    };
    const gasLimit = 200000;
    const fee = {
      amount: coins(2000, "ucosm"),
      gas: gasLimit.toString(),
    };
    const memo = "Use your tokens wisely";

    const multisigAccount = await client0.getAccount(multisigAddress);
    assert(multisigAccount, "Account does not exist on chain");
    const signData = {
      accountNumber: multisigAccount.accountNumber,
      sequence: multisigAccount.sequence,
      chainId: await client0.getChainId(),
    };

    const {
      bodyBytes,
      signatures: [signature0],
    } = await client0.signAmino(faucet.address0, [msg], fee, memo, signData);
    const {
      signatures: [_signature1],
    } = await client1.signAmino(faucet.address1, [msg], fee, memo, signData);
    const {
      signatures: [_signature2],
    } = await client2.signAmino(faucet.address2, [msg], fee, memo, signData);
    const {
      signatures: [_signature3],
    } = await client3.signAmino(faucet.address3, [msg], fee, memo, signData);
    const {
      signatures: [signature4],
    } = await client4.signAmino(faucet.address4, [msg], fee, memo, signData);

    const multisignature = MultiSignature.fromPartial({ signatures: [signature0, signature4] });

    const signerInfo: SignerInfo = {
      publicKey: encodePubkey(multisigPubkey),
      modeInfo: {
        multi: {
          bitarray: CompactBitArray.fromPartial({
            elems: new Uint8Array([0b10001000]),
            extraBitsStored: 5,
          }),
          modeInfos: [
            { single: { mode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON } },
            { single: { mode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON } },
          ],
        },
      },
      sequence: Long.fromNumber(multisigAccount.sequence),
    };

    const authInfo = {
      signerInfos: [signerInfo],
      fee: {
        amount: [...fee.amount],
        gasLimit: Long.fromNumber(gasLimit),
      },
    };

    const authInfoBytes = AuthInfo.encode(AuthInfo.fromPartial(authInfo)).finish();
    const signedTx = TxRaw.fromPartial({
      bodyBytes: bodyBytes,
      authInfoBytes: authInfoBytes,
      signatures: [MultiSignature.encode(multisignature).finish()],
    });

    // ensure signature is valid
    const result = await client0.broadcastTx(Uint8Array.from(TxRaw.encode(signedTx).finish()));
    assertIsBroadcastTxSuccess(result);
  });
});
