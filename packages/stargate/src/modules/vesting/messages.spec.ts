import { coins } from "@cosmjs/amino";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { MsgCreateVestingAccount } from "cosmjs-types/cosmos/vesting/v1beta1/tx";
import Long from "long";

import { SigningStargateClient } from "../../signingstargateclient";
import { isDeliverTxSuccess } from "../../stargateclient";
import {
  defaultSigningClientOptions,
  faucet,
  makeRandomAddress,
  pendingWithoutSimapp,
  simapp,
} from "../../testutils.spec";

describe("VestingExtension direct", () => {
  it("works with direct signing", async () => {
    pendingWithoutSimapp();
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucet.mnemonic);
    const client = await SigningStargateClient.connectWithSigner(
      simapp.tendermintUrl,
      wallet,
      defaultSigningClientOptions,
    );
    const memo = "Vesting is cool!";
    const fee = {
      amount: coins(2000, "ucosm"),
      gas: "180000", // 180k
    };

    const vestingMsg = {
      typeUrl: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
      value: MsgCreateVestingAccount.fromPartial({
        fromAddress: faucet.address0,
        toAddress: makeRandomAddress(),
        amount: coins(1234, "ucosm"),
        endTime: Long.fromString("1838718434"),
        delayed: true,
      }),
    };

    const result = await client.signAndBroadcast(faucet.address0, [vestingMsg], fee, memo);
    expect(isDeliverTxSuccess(result)).toEqual(true);
  });
});
