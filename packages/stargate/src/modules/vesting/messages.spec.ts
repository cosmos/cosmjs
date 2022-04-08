import { coin, coins } from "@cosmjs/amino";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { MsgCreateVestingAccount } from "cosmjs-types/cosmos/vesting/v1beta1/tx";
import Long from "long";

import { SigningStargateClient } from "../../signingstargateclient";
import { assertIsDeliverTxSuccess } from "../../stargateclient";
import {
  defaultSigningClientOptions,
  faucet,
  makeRandomAddress,
  pendingWithoutSimapp,
  simapp,
} from "../../testutils.spec";

describe("vestingTypes", () => {
  it("can sign MsgCreateVestingAccount with sign mode direct", async () => {
    pendingWithoutSimapp();
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
    const client = await SigningStargateClient.connectWithSigner(
      simapp.tendermintUrl,
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
        endTime: Long.fromString("1838718434"),
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
