#!/usr/bin/env node
/**
 * Multi-chain test script for dynamic feemarket integration with CosmJS
 *
 * This script tests dynamic gas pricing on multiple chains:
 * - Osmosis testnet (EIP-1559 implementation)
 * - Neutron testnet (Skip feemarket module)
 *
 * Usage:
 *   1. Build the workspace: yarn build
 *   1a. cd /packages/stargate
 *   2. Set your MNEMONIC environment variable (or hardcode below) - add ntrn and osmo tokens to the addresses
 *   3. Add ntrn and osmo tokens to the addresses
 *   4. Run: yarn node src/test-feemarket-multichain.mjs
 */

import { DirectSecp256k1HdWallet } from "../../proto-signing/build/index.js";
import {
  checkDynamicGasPriceSupport,
  GasPrice,
  queryDynamicGasPrice,
  SigningStargateClient,
} from "../build/index.js";

// ============================================================================
// Chain Configurations
// ============================================================================

const CHAINS = {
  osmosis: {
    name: "Osmosis Testnet",
    rpc: "https://rpc.osmotest5.osmosis.zone",
    chainId: "osmo-test-5",
    prefix: "osmo",
    denom: "uosmo",
    faucet: "https://faucet.osmotest5.osmosis.zone/",
    explorer: "https://www.mintscan.io/osmosis-testnet/tx/",
    feemarketType: "Osmosis EIP-1559",
    dynamicGasPriceConfig: {
      denom: "uosmo",
      multiplier: 1.3,
      minGasPrice: GasPrice.fromString("0.0025uosmo"),
      maxGasPrice: GasPrice.fromString("0.1uosmo"),
    },
  },
  neutron: {
    name: "Neutron Testnet",
    rpc: "https://rpc-lb-pion.ntrn.tech",
    chainId: "pion-1",
    prefix: "neutron",
    denom: "untrn",
    faucet: "https://docs.neutron.org/resources/faucet",
    explorer: "https://mintscan.io/neutron-testnet/tx/",
    feemarketType: "Skip Feemarket",
    dynamicGasPriceConfig: {
      denom: "untrn",
      multiplier: 1.5,
      minGasPrice: GasPrice.fromString("0.0053untrn"),
      maxGasPrice: GasPrice.fromString("0.5untrn"),
    },
  },
};

// Replace with your mnemonic or set MNEMONIC env var
// WARNING: Never commit real mnemonics to git!
const MNEMONIC =
  process.env.MNEMONIC || "furnace hammer kite tent baby settle bonus decade draw never juice myth";

// Amount to send (in smallest unit)
const AMOUNT = "1000";

// ============================================================================
// Test Function for a Single Chain
// ============================================================================

async function testChain(chainConfig) {
  console.log("\n" + "=".repeat(80));
  console.log(`Testing ${chainConfig.name} (${chainConfig.feemarketType})`);
  console.log("=".repeat(80));
  console.log();

  try {
    // Create wallet from mnemonic
    console.log("📝 Creating wallet from mnemonic...");
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC, {
      prefix: chainConfig.prefix,
    });
    const [firstAccount] = await wallet.getAccounts();
    console.log(`✅ Wallet address: ${firstAccount.address}`);
    console.log();

    // Connect to chain with dynamic gas price config
    console.log(`🔗 Connecting to ${chainConfig.chainId} at ${chainConfig.rpc}...`);
    const client = await SigningStargateClient.connectWithSigner(chainConfig.rpc, wallet, {
      gasPrice: chainConfig.dynamicGasPriceConfig,
    });
    console.log("✅ Connected to chain");
    console.log();

    // Check balance
    console.log("💰 Checking balance...");
    const balance = await client.getBalance(firstAccount.address, chainConfig.denom);
    console.log(`   Balance: ${balance.amount} ${balance.denom}`);

    if (BigInt(balance.amount) < BigInt(AMOUNT)) {
      console.error(`❌ Insufficient balance. Need at least ${AMOUNT} ${chainConfig.denom}`);
      console.log();
      console.log("💡 Get testnet tokens from:");
      console.log(`   ${chainConfig.faucet}`);
      return { success: false, chain: chainConfig.name, error: "Insufficient balance" };
    }
    console.log();

    // Query current dynamic gas price (optional - for display purposes)
    console.log("⛽ Querying current dynamic gas price...");
    try {
      const queryClient = client.forceGetQueryClient();

      // Check if chain supports dynamic pricing
      const isSupported = await checkDynamicGasPriceSupport(
        queryClient,
        chainConfig.dynamicGasPriceConfig.denom,
        chainConfig.chainId,
      );
      console.log(`   Dynamic gas pricing supported: ${isSupported}`);
      console.log(`   Feemarket type: ${chainConfig.feemarketType}`);

      if (isSupported) {
        const baseGasPrice = await queryDynamicGasPrice(
          queryClient,
          chainConfig.dynamicGasPriceConfig.denom,
          chainConfig.chainId,
        );
        console.log(
          `   Base gas price from chain: ${baseGasPrice.toString()} ${chainConfig.dynamicGasPriceConfig.denom}`,
        );

        // Calculate what the multiplied price will be
        const multipliedPrice =
          parseFloat(baseGasPrice.toString()) * (chainConfig.dynamicGasPriceConfig.multiplier || 1.3);
        console.log(
          `   After ${chainConfig.dynamicGasPriceConfig.multiplier}x multiplier: ${multipliedPrice.toFixed(18)} ${chainConfig.dynamicGasPriceConfig.denom}`,
        );

        // Show min/max constraints
        console.log(
          `   Min gas price constraint: ${chainConfig.dynamicGasPriceConfig.minGasPrice.toString()}`,
        );
        if (chainConfig.dynamicGasPriceConfig.maxGasPrice) {
          console.log(
            `   Max gas price constraint: ${chainConfig.dynamicGasPriceConfig.maxGasPrice.toString()}`,
          );
        }
      }
    } catch (error) {
      console.log(`   ⚠️  Could not query gas price: ${error.message}`);
      console.log(`   Will use fallback: ${chainConfig.dynamicGasPriceConfig.minGasPrice.toString()}`);
    }
    console.log();

    // Send tokens with "auto" fee calculation
    console.log("📤 Sending transaction with auto fee calculation...");
    console.log(`   From: ${firstAccount.address}`);
    console.log(`   To: ${firstAccount.address} (sending to self)`);
    console.log(`   Amount: ${AMOUNT} ${chainConfig.denom}`);
    console.log(`   Fee mode: "auto" (will query dynamic gas price)`);
    console.log();

    const result = await client.sendTokens(
      firstAccount.address,
      firstAccount.address, // Send to self
      [{ denom: chainConfig.denom, amount: AMOUNT }],
      "auto", // This triggers dynamic gas price query!
      `Testing CosmJS dynamic feemarket on ${chainConfig.name}`,
    );

    console.log("✅ Transaction successful!");
    console.log(`   Transaction hash: ${result.transactionHash}`);
    console.log(`   Block height: ${result.height}`);
    console.log(`   Gas used: ${result.gasUsed} / ${result.gasWanted}`);

    // Show the actual fee that was charged
    if (result.events) {
      const feeEvent = result.events.find((e) => e.type === "tx");
      if (feeEvent) {
        const feeAttr = feeEvent.attributes.find((a) => a.key === "fee");
        if (feeAttr) {
          console.log(`   Fee charged: ${feeAttr.value}`);
        }
      }
    }

    console.log();
    console.log("🔍 View transaction on explorer:");
    console.log(`   ${chainConfig.explorer}${result.transactionHash}`);

    client.disconnect();

    return {
      success: true,
      chain: chainConfig.name,
      txHash: result.transactionHash,
      gasUsed: result.gasUsed,
      gasWanted: result.gasWanted,
    };
  } catch (error) {
    console.error("❌ Transaction failed!");
    if (error instanceof Error) {
      console.error(`   Error: ${error.message}`);
      if ("log" in error) {
        console.error(`   Log: ${error.log}`);
      }
    } else {
      console.error(`   Error: ${error}`);
    }

    return { success: false, chain: chainConfig.name, error: error.message || String(error) };
  }
}

// ============================================================================
// Main Function - Test All Chains
// ============================================================================

async function main() {
  console.log("=".repeat(80));
  console.log("CosmJS Dynamic Feemarket Multi-Chain Test");
  console.log("=".repeat(80));
  console.log();
  console.log("This will test dynamic gas pricing on multiple chains:");
  console.log("  • Osmosis Testnet (EIP-1559)");
  console.log("  • Neutron Testnet (Skip Feemarket)");
  console.log();

  const results = [];

  // Test Osmosis
  const osmosisResult = await testChain(CHAINS.osmosis);
  results.push(osmosisResult);

  // Test Neutron
  const neutronResult = await testChain(CHAINS.neutron);
  results.push(neutronResult);

  // Summary
  console.log("\n" + "=".repeat(80));
  console.log("Test Summary");
  console.log("=".repeat(80));
  console.log();

  results.forEach((result) => {
    if (result.success) {
      console.log(`✅ ${result.chain}: SUCCESS`);
      console.log(`   TX Hash: ${result.txHash}`);
      console.log(`   Gas: ${result.gasUsed} / ${result.gasWanted}`);
    } else {
      console.log(`❌ ${result.chain}: FAILED`);
      console.log(`   Error: ${result.error}`);
    }
    console.log();
  });

  const allPassed = results.every((r) => r.success);
  if (allPassed) {
    console.log("🎉 All tests passed! Dynamic feemarket is working on all chains!");
  } else {
    console.log("⚠️  Some tests failed. Check the output above for details.");
    process.exit(1);
  }
}

// Run the tests
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
