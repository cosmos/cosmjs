/* eslint-disable @typescript-eslint/camelcase */
import { Coin, coins, makeCosmoshubPath, Secp256k1Pen, SigningCosmWasmClient } from "@cosmwasm/sdk";

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
const faucet = {
  mnemonic:
    "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
  address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};

/** Code info staking.wasm */
const codeId = 3;

/** Instance parameters */
const validator = "cosmosvaloper1ea5cpmcj2vf5d0xwurncx7zdnmkuc6eq696h9a";
const exitTax = "0.005"; // 0.5 %

describe("Staking demo", () => {
  it("works", async () => {
    pendingWithoutWasmd();
    // The owner of the contract that will collect the tax
    const ownerPen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
    const ownerAddress = ownerPen.address("cosmos");
    const ownerClient = new SigningCosmWasmClient(httpUrl, ownerAddress, (signBytes) =>
      ownerPen.sign(signBytes),
    );

    // a user of the contract
    const userPen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic, makeCosmoshubPath(1));
    const userAddress = userPen.address("cosmos");
    const userClient = new SigningCosmWasmClient(
      httpUrl,
      userAddress,
      (signBytes) => userPen.sign(signBytes),
      {
        exec: {
          amount: coins(5000, "ucosm"),
          gas: "300000", // 300k, needed for unbonding
        },
      },
    );

    const initMsg: InitMsg = {
      name: "Bounty",
      symbol: "BOUNTY",
      decimals: 3,
      validator: validator,
      exit_tax: exitTax,
      min_withdrawal: "7",
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
      expect(response).toEqual({ decimals: 3, name: "Bounty", symbol: "BOUNTY" });
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
        exit_tax: exitTax,
        validator: validator,
        min_withdrawal: "7",
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
        exit_tax: exitTax,
        validator: validator,
        min_withdrawal: "7",
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
