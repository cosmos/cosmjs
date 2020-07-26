/* eslint-disable @typescript-eslint/naming-convention */
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm";
import { Coin, coins, makeCosmoshubPath, Secp256k1Wallet } from "@cosmjs/sdk38";

import {
  BalanceResponse,
  HandleMsg,
  InitMsg,
  InvestmentResponse,
  QueryMsg,
  TokenInfoResponse,
} from "./schema";

function pendingWithoutWasmd(): void {
  if (!process.env.WASMD_ENABLED) {
    return pending("Set WASMD_ENABLED to enable Cosmos node-based tests");
  }
}

const httpUrl = "http://localhost:1317";
const alice = {
  mnemonic: "enlist hip relief stomach skate base shallow young switch frequent cry park",
  address0: "cosmos14qemq0vw6y3gc3u3e0aty2e764u4gs5le3hada",
};

/** Code info staking.wasm */
const codeId = 3;

/** Instance parameters */
const params = {
  name: "Bounty",
  symbol: "BOUNTY",
  decimals: 3,
  validator: "cosmosvaloper1fa7hj49pf8uzc4m0lw5swjhhl5th2484gvnlpv",
  exitTax: "0.005", // 0.5 %
  minWithdrawal: "700",
};

describe("Staking demo", () => {
  it("works", async () => {
    pendingWithoutWasmd();
    // The owner of the contract that will collect the tax
    const ownerWallet = await Secp256k1Wallet.fromMnemonic(alice.mnemonic);
    const [{ address: ownerAddress }] = await ownerWallet.getAccounts();
    const ownerClient = new SigningCosmWasmClient(httpUrl, ownerAddress, ownerWallet);

    // a user of the contract
    const userWallet = await Secp256k1Wallet.fromMnemonic(alice.mnemonic, makeCosmoshubPath(1));
    const [{ address: userAddress }] = await userWallet.getAccounts();
    const userClient = new SigningCosmWasmClient(httpUrl, userAddress, userWallet, {
      exec: {
        amount: coins(5000, "ucosm"),
        gas: "300000", // 300k, needed for unbonding
      },
    });

    const initMsg: InitMsg = {
      name: params.name,
      symbol: params.symbol,
      decimals: params.decimals,
      validator: params.validator,
      exit_tax: params.exitTax,
      min_withdrawal: params.minWithdrawal,
    };
    const { contractAddress } = await ownerClient.instantiate(
      codeId,
      initMsg,
      `Staking derivative BOUNTY ${new Date()}`,
    );

    // Query token info (immutable)
    {
      const query: QueryMsg = { token_info: {} };
      const response: TokenInfoResponse = await ownerClient.queryContractSmart(contractAddress, query);
      expect(response).toEqual({
        decimals: params.decimals,
        name: params.name,
        symbol: params.symbol,
      });
    }

    // Query investment info (changes with bonding/unbonding)
    {
      const query: QueryMsg = { investment: {} };
      const response: InvestmentResponse = await ownerClient.queryContractSmart(contractAddress, query);
      expect(response).toEqual({
        token_supply: "0",
        staked_tokens: { denom: "ustake", amount: "0" },
        nominal_value: "1",
        owner: ownerAddress,
        exit_tax: params.exitTax,
        validator: params.validator,
        min_withdrawal: params.minWithdrawal,
      });
    }

    const bondMsg: HandleMsg = { bond: {} };
    const amount: Coin = {
      amount: "112233",
      denom: "ustake",
    };
    await userClient.execute(contractAddress, bondMsg, undefined, [amount]);

    // Investment info changed
    {
      const quer: QueryMsg = { investment: {} };
      const response: InvestmentResponse = await ownerClient.queryContractSmart(contractAddress, quer);
      expect(response).toEqual({
        token_supply: "112233",
        staked_tokens: { denom: "ustake", amount: "112233" },
        nominal_value: "1",
        owner: ownerAddress,
        exit_tax: params.exitTax,
        validator: params.validator,
        min_withdrawal: params.minWithdrawal,
      });
    }

    // Get balance
    {
      const query: QueryMsg = { balance: { address: userAddress } };
      const response: BalanceResponse = await ownerClient.queryContractSmart(contractAddress, query);
      expect(response).toEqual({
        balance: "112233",
      });
    }

    const unbondMsg: HandleMsg = { unbond: { amount: "110000" } };
    // await ownerClient.execute(contractAddress, unbondMsg);
    await userClient.execute(contractAddress, unbondMsg);

    // Get balance
    {
      const query: QueryMsg = { balance: { address: userAddress } };
      const response: BalanceResponse = await ownerClient.queryContractSmart(contractAddress, query);
      expect(response).toEqual({ balance: "2233" });
    }

    // Check collected tax (0.5 % of 110000)
    {
      const query: QueryMsg = { balance: { address: ownerAddress } };
      const response: BalanceResponse = await ownerClient.queryContractSmart(contractAddress, query);
      expect(response).toEqual({ balance: "550" });
    }
  });
});
