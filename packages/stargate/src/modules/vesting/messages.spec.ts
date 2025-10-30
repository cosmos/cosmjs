import { coin, coins, Secp256k1HdWallet } from "@cosmjs/amino";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { MsgCreateVestingAccount } from "cosmjs-types/cosmos/vesting/v1beta1/tx";

import { SigningStargateClient } from "../../signingstargateclient.js";
import { assertIsDeliverTxSuccess } from "../../stargateclient.js";
import {
  defaultSigningClientOptions,
  faucet,
  makeRandomAddress,
  simapp,
  simappEnabled,
} from "../../testutils.js";

(simappEnabled ? describe : xdescribe)("vesting messages", () => {
  describe("MsgCreateVestingAccount", () => {
    it("works with sign mode direct", async () => {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = await SigningStargateClient.connectWithSigner(
        simapp.tendermintUrlHttp,
        wallet,
        defaultSigningClientOptions,
      );

      const memo = "Vesting is cool!";
      const recipient = makeRandomAddress();
      const vestingMsg = {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
        value: MsgCreateVestingAccount.fromPartial({
          fromAddress: faucet.address0,
          toAddress: recipient,
          amount: coins(1234, "ucosm"),
          endTime: BigInt("1838718434"),
          delayed: true,
        }),
      };

      const result = await client.signAndBroadcast(faucet.address0, [vestingMsg], "auto", memo);
      assertIsDeliverTxSuccess(result);
      const balance = await client.getBalance(recipient, "ucosm");
      expect(balance).toEqual(coin(1234, "ucosm"));

      client.disconnect();
    });

    it("works with Amino JSON signer", async () => {
      const wallet = await Secp256k1HdWallet.fromMnemonic(faucet.mnemonic);
      const client = await SigningStargateClient.connectWithSigner(
        simapp.tendermintUrlHttp,
        wallet,
        defaultSigningClientOptions,
      );

      const memo = "Vesting is cool!";
      const recipient = makeRandomAddress();
      const vestingMsg = {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
        value: MsgCreateVestingAccount.fromPartial({
          fromAddress: faucet.address0,
          toAddress: recipient,
          amount: coins(1234, "ucosm"),
          endTime: BigInt("1838718434"),
          delayed: true,
        }),
      };

      const result = await client.signAndBroadcast(faucet.address0, [vestingMsg], "auto", memo);
      assertIsDeliverTxSuccess(result);
      const balance = await client.getBalance(recipient, "ucosm");
      expect(balance).toEqual(coin(1234, "ucosm"));

      client.disconnect();
    });
  });
});
