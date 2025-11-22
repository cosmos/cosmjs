import { Decimal } from "@cosmjs/math";
import { BinaryReader, BinaryWriter } from "cosmjs-types/binary";

import { GasPrice } from "./fee";
import { decodeCosmosSdkDecFromProto } from "./queryclient/utils";

/**
 * Configuration for dynamic gas price queries from feemarket modules.
 */
export interface DynamicGasPriceConfig {
  /** Denomination to query gas price for (e.g., "uatom") */
  readonly denom: string;
  /** Multiplier to apply to the queried gas price (e.g., 1.1 for 10% above base). Defaults to 1.3 */
  readonly multiplier?: number;
  /** Minimum gas price to use as fallback if query fails and as a floor for the dynamic price */
  readonly minGasPrice: GasPrice;
  /** Maximum gas price to cap at. If not provided, no maximum is enforced */
  readonly maxGasPrice?: GasPrice;
}

/**
 * Multiplies a Decimal by a number multiplier.
 * This is needed because Decimal.multiply() only accepts integers.
 */
export function multiplyDecimalByNumber(
  value: Decimal,
  multiplier: number,
  fractionalDigits: number,
): Decimal {
  const normalizedValue =
    value.fractionalDigits === fractionalDigits
      ? value
      : Decimal.fromUserInput(value.toString(), fractionalDigits);

  const multiplierDecimal = Decimal.fromUserInput(multiplier.toString(), fractionalDigits);
  const factor = BigInt(10) ** BigInt(fractionalDigits);
  const product = (BigInt(normalizedValue.atomics) * BigInt(multiplierDecimal.atomics)) / factor;

  return Decimal.fromAtomics(product.toString(), fractionalDigits);
}

/**
 * Determines if a chain ID corresponds to an Osmosis chain.
 *
 * Matches: osmosis-{n}, osmo-test-{n}, osmosis{suffix} (e.g. osmosislocal).
 */
function isOsmosisChain(chainId: string): boolean {
  const lowerChainId = chainId.toLowerCase();
  return (
    /^osmosis-\d+$/.test(lowerChainId) ||
    /^osmo-test-\d+$/.test(lowerChainId) ||
    /^osmosis[a-z]+$/.test(lowerChainId)
  );
}

/**
 * Checks if a chain supports dynamic gas pricing by querying feemarket endpoints.
 *
 * This is intended for optional verification during initialization or debugging, not for
 * automatic checks before every transaction. The implementation trusts user configuration
 * and handles failures gracefully by falling back to minGasPrice.
 */
export async function checkDynamicGasPriceSupport(
  queryClient: { queryAbci(path: string, data: Uint8Array, height?: number): Promise<{ value: Uint8Array }> },
  gasPriceDenom: string,
  chainId: string,
): Promise<boolean> {
  // Try Osmosis endpoint first if chain ID suggests Osmosis
  if (isOsmosisChain(chainId)) {
    try {
      await queryClient.queryAbci("/osmosis.txfees.v1beta1.Query/GetEipBaseFee", new Uint8Array(0));
      return true;
    } catch {
      // If Osmosis endpoint fails, try Skip feemarket as fallback
    }
  }

  // Try Skip feemarket endpoint
  try {
    await queryClient.queryAbci(
      "/feemarket.feemarket.v1.Query/GasPrices",
      GasPricesRequest.encode({ denom: gasPriceDenom }),
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Queries the dynamic gas price from either Osmosis EIP-1559 or Skip's feemarket module.
 */
export async function queryDynamicGasPrice(
  queryClient: { queryAbci(path: string, data: Uint8Array, height?: number): Promise<{ value: Uint8Array }> },
  gasPriceDenom: string,
  chainId: string,
): Promise<Decimal> {
  if (isOsmosisChain(chainId)) {
    // Osmosis EIP-1559: GetEipBaseFee returns DecProto { dec: string }
    const response = await queryClient.queryAbci(
      "/osmosis.txfees.v1beta1.Query/GetEipBaseFee",
      new Uint8Array(0),
    );
    return DecProto.decode(response.value);
  } else {
    // Skip feemarket: GasPrices returns GasPricesResponse { prices: [DecCoin] }
    const response = await queryClient.queryAbci(
      "/feemarket.feemarket.v1.Query/GasPrices",
      GasPricesRequest.encode({ denom: gasPriceDenom }),
    );
    return GasPricesResponse.decode(response.value);
  }
}

// Minimal protobuf type definitions matching cosmjs-types pattern
// These are not available in cosmjs-types, so we define them here

/** Osmosis DecProto message */
const DecProto = {
  decode(input: Uint8Array): Decimal {
    const reader = new BinaryReader(input);
    let dec = "";

    while (reader.pos < reader.len) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          dec = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    if (!dec) {
      throw new Error("DecProto: dec field not found");
    }

    return decodeCosmosSdkDecFromProto(dec);
  },
};

/** Skip feemarket GasPricesRequest message */
const GasPricesRequest = {
  encode(message: { denom: string }): Uint8Array {
    const writer = new BinaryWriter();
    if (message.denom) {
      writer.uint32(10).string(message.denom);
    }
    return writer.finish();
  },
};

/** Skip feemarket DecCoin message */
interface DecCoin {
  denom: string;
  amount: string;
}

const DecCoin = {
  decode(input: Uint8Array): DecCoin {
    const reader = new BinaryReader(input);
    const message: DecCoin = { denom: "", amount: "" };

    while (reader.pos < reader.len) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },
};

/** Skip feemarket GasPricesResponse message */
const GasPricesResponse = {
  decode(input: Uint8Array): Decimal {
    const reader = new BinaryReader(input);
    let decCoin: DecCoin | undefined;

    while (reader.pos < reader.len) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          // prices field (repeated DecCoin) - we only need the first one
          decCoin = DecCoin.decode(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    if (!decCoin?.amount) {
      throw new Error("GasPricesResponse: amount not found");
    }

    return decodeCosmosSdkDecFromProto(decCoin.amount);
  },
};
