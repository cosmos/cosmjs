/* eslint-disable @typescript-eslint/camelcase */
import { Coin, Secp256k1Pen, SigningCosmWasmClient } from "@cosmwasm/sdk";

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
const exit_tax = "0.005"; // 0.5 %

describe("Staking demo", () => {
  it("works", async () => {
    pendingWithoutWasmd();
    const pen = await Secp256k1Pen.fromMnemonic(faucet.mnemonic);
    const client = new SigningCosmWasmClient(httpUrl, faucet.address, (signBytes) => pen.sign(signBytes));

    const initMsg: InitMsg = {
      name: "Bounty",
      symbol: "BOUNTY",
      decimals: 3,
      validator: validator,
      exit_tax: exit_tax,
      min_withdrawal: "7",
    };
    const { contractAddress } = await client.instantiate(
      codeId,
      initMsg,
      `Staking derivative BOUNTY ${new Date()}`,
    );

    const tokenInfoQuery: QueryMsg = { token_info: {} };
    const tokenInfoResponse: TokenInfoResponse = await client.queryContractSmart(
      contractAddress,
      tokenInfoQuery,
    );
    expect(tokenInfoResponse).toEqual({ decimals: 3, name: "Bounty", symbol: "BOUNTY" });

    {
      const investmentQuery: QueryMsg = { investment: {} };
      const investmentResponse: InvestmentResponse = await client.queryContractSmart(
        contractAddress,
        investmentQuery,
      );
      expect(investmentResponse).toEqual({
        token_supply: "0",
        staked_tokens: { denom: "ustake", amount: "0" },
        nominal_value: "1",
        owner: faucet.address,
        exit_tax: exit_tax,
        validator: validator,
        min_withdrawal: "7",
      });
    }

    const bondMsg: HandleMsg = { bond: {} };
    const amount: Coin = {
      amount: "112233",
      denom: "ustake",
    };
    await client.execute(contractAddress, bondMsg, undefined, [amount]);

    // Status changed
    {
      const investmentQuery: QueryMsg = { investment: {} };
      const investmentResponse: InvestmentResponse = await client.queryContractSmart(
        contractAddress,
        investmentQuery,
      );
      expect(investmentResponse).toEqual({
        token_supply: "112233",
        staked_tokens: { denom: "ustake", amount: "112233" },
        nominal_value: "1",
        owner: faucet.address,
        exit_tax: exit_tax,
        validator: validator,
        min_withdrawal: "7",
      });
    }

    // Get balance
    {
      const balanceQuery: QueryMsg = { balance: { address: faucet.address } };
      const balanceResponse: BalanceResponse = await client.queryContractSmart(contractAddress, balanceQuery);
      expect(balanceResponse).toEqual({
        balance: "112233",
      });
    }
  });
});
