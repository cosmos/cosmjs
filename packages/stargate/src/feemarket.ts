import { fromUtf8, toUtf8 } from "@cosmjs/encoding";
import { Decimal } from "@cosmjs/math";

import { GasPrice } from "./fee";

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
 * Multiplies a Decimal by a number multiplier, ensuring matching fractional digits.
 * This is needed because Decimal.multiply() only accepts integers.
 */
export function multiplyDecimalByNumber(
  value: Decimal,
  multiplier: number,
  targetFractionalDigits: number,
): Decimal {
  // Normalize value to target fractional digits if needed
  const normalizedValue =
    value.fractionalDigits === targetFractionalDigits
      ? value
      : Decimal.fromUserInput(value.toString(), targetFractionalDigits);

  // Convert multiplier to Decimal with matching fractional digits
  const multiplierDecimal = Decimal.fromUserInput(multiplier.toString(), targetFractionalDigits);

  // Manual multiplication: (a.atomics * b.atomics) / 10^fractionalDigits
  const factor = BigInt(10) ** BigInt(targetFractionalDigits);
  const productAtomics = (BigInt(normalizedValue.atomics) * BigInt(multiplierDecimal.atomics)) / factor;

  return Decimal.fromAtomics(productAtomics.toString(), targetFractionalDigits);
}

/**
 * Determines if a chain ID corresponds to an Osmosis chain.
 *
 * Matches: osmosis-{n}, osmo-test-{n}, osmosis{suffix} (e.g. osmosislocal).
 */
function isOsmosisChain(chainId: string): boolean {
  const lowerChainId = chainId.toLowerCase();

  // Match "osmosis-{number}" pattern (e.g., osmosis-1)
  if (/^osmosis-\d+$/.test(lowerChainId)) {
    return true;
  }

  // Match "osmo-test-{number}" pattern (e.g., osmo-test-4)
  if (/^osmo-test-\d+$/.test(lowerChainId)) {
    return true;
  }

  // Match "osmosis{suffix}" pattern (e.g., osmosislocal, osmosisdev)
  // This covers cases like osmosislocal, osmosisdev, etc.
  if (/^osmosis[a-z]+$/.test(lowerChainId)) {
    return true;
  }

  return false;
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
      const path = "/osmosis.txfees.v1beta1.Query/GetEipBaseFee";
      const requestData = new Uint8Array(0);
      await queryClient.queryAbci(path, requestData);
      return true;
    } catch {
      // If Osmosis endpoint fails, try Skip feemarket as fallback
    }
  }

  // Try Skip feemarket endpoint
  try {
    const path = "/feemarket.feemarket.v1.Query/GasPrices";
    const requestData = encodeGasPricesRequest(gasPriceDenom);
    await queryClient.queryAbci(path, requestData);
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
  let path: string;
  let requestData: Uint8Array;

  if (isOsmosisChain(chainId)) {
    // Osmosis EIP-1559 endpoint - empty request
    path = "/osmosis.txfees.v1beta1.Query/GetEipBaseFee";
    requestData = new Uint8Array(0);
  } else {
    // Skip feemarket endpoint - need to encode the denom in the request
    // For feemarket, we encode a simple request with the denom
    // The request structure is: GasPricesRequest { denom: string }
    // Field tag 1, wire type 2 (length-delimited string)
    path = "/feemarket.feemarket.v1.Query/GasPrices";
    requestData = encodeGasPricesRequest(gasPriceDenom);
  }

  const response = await queryClient.queryAbci(path, requestData);
  const decoded = response.value;

  if (isOsmosisChain(chainId)) {
    return extractDynamicGasPriceOsmosis(decoded);
  } else {
    return extractDynamicGasPriceFeemarket(decoded);
  }
}

/** Encodes a varint for protobuf wire format. */
function encodeVarint(n: number): Uint8Array {
  if (n < 0x80) {
    return Uint8Array.from([n]);
  }
  return Uint8Array.from([(n & 0x7f) | 0x80, ...encodeVarint(n >> 7)]);
}

/** Encodes a GasPricesRequest protobuf message. */
function encodeGasPricesRequest(denom: string): Uint8Array {
  const denomBytes = toUtf8(denom);
  const lengthVarint = encodeVarint(denomBytes.length);

  // Field tag 1, wire type 2 (length-delimited) = 0x0A
  const tag = 0x0a;

  // Combine: tag + length varint + denom bytes
  const result = new Uint8Array(1 + lengthVarint.length + denomBytes.length);
  result[0] = tag;
  result.set(lengthVarint, 1);
  result.set(denomBytes, 1 + lengthVarint.length);

  return result;
}

/** Reads a varint from a Uint8Array. Returns [value, bytesRead]. */
function readVarint(data: Uint8Array, offset: number): [number, number] {
  let result = 0;
  let shift = 0;
  let bytesRead = 0;

  for (let i = offset; i < data.length; i++) {
    const byte = data[i];
    result |= (byte & 0x7f) << shift;
    bytesRead++;

    if ((byte & 0x80) === 0) {
      break;
    }
    shift += 7;
  }

  return [result, bytesRead];
}

/** Reads a length-delimited string from protobuf wire format. */
function readLengthDelimitedString(data: Uint8Array, offset: number): [string, number] | null {
  if (offset >= data.length) return null;

  const [length, lengthBytes] = readVarint(data, offset);
  const startOffset = offset + lengthBytes;

  if (startOffset + length > data.length) {
    return null;
  }

  const stringBytes = data.slice(startOffset, startOffset + length);
  const str = fromUtf8(stringBytes);

  return [str, lengthBytes + length];
}

/** Extracts the gas price from Osmosis EIP-1559 response (DecProto). */
function extractDynamicGasPriceOsmosis(decoded: Uint8Array): Decimal {
  let offset = 0;

  while (offset < decoded.length) {
    if (offset >= decoded.length) break;

    // Read field tag and wire type
    const [tagAndWire, tagBytes] = readVarint(decoded, offset);
    offset += tagBytes;

    const fieldNumber = tagAndWire >> 3;
    const wireType = tagAndWire & 0x7;

    // Field 1 is the dec string (wire type 2 = length-delimited)
    if (fieldNumber === 1 && wireType === 2) {
      const result = readLengthDelimitedString(decoded, offset);
      if (result) {
        const [decString] = result;
        // Cosmos SDK encodes Dec as string(int(decimal * 10^18)), so we use 18 fractional digits
        return Decimal.fromUserInput(decString, 18);
      }
    } else if (wireType === 2) {
      // Skip other length-delimited fields
      const result = readLengthDelimitedString(decoded, offset);
      if (result) {
        const [, bytesRead] = result;
        offset += bytesRead;
        continue;
      }
    } else {
      // Skip other wire types (we don't need them)
      break;
    }
  }

  throw new Error("Failed to parse Osmosis EIP-1559 gas price response: dec field not found");
}

/** Extracts the gas price from Skip feemarket response (GasPricesResponse). */
function extractDynamicGasPriceFeemarket(decoded: Uint8Array): Decimal {
  let offset = 0;
  let foundDecCoin = false;

  // First, find the DecCoin message (field 1 of GasPricesResponse)
  while (offset < decoded.length) {
    if (offset >= decoded.length) break;

    const [tagAndWire, tagBytes] = readVarint(decoded, offset);
    offset += tagBytes;

    const fieldNumber = tagAndWire >> 3;
    const wireType = tagAndWire & 0x7;

    // Field 1 is the price DecCoin (wire type 2 = length-delimited message)
    if (fieldNumber === 1 && wireType === 2) {
      const [decCoinLength, lengthBytes] = readVarint(decoded, offset);
      const decCoinStart = offset + lengthBytes;
      const decCoinEnd = decCoinStart + decCoinLength;

      if (decCoinEnd > decoded.length) {
        throw new Error("Invalid DecCoin message length");
      }

      foundDecCoin = true;
      // Now parse the DecCoin message to find the amount field (field 2)
      let decCoinOffset = decCoinStart;

      while (decCoinOffset < decCoinEnd) {
        const [decTagAndWire, decTagBytes] = readVarint(decoded, decCoinOffset);
        decCoinOffset += decTagBytes;

        const decFieldNumber = decTagAndWire >> 3;
        const decWireType = decTagAndWire & 0x7;

        // Field 2 is the amount string
        if (decFieldNumber === 2 && decWireType === 2) {
          const result = readLengthDelimitedString(decoded, decCoinOffset);
          if (result) {
            const [amountString] = result;
            // Cosmos SDK encodes Dec as string(int(decimal * 10^18)), so we use 18 fractional digits
            return Decimal.fromUserInput(amountString, 18);
          }
        } else if (decWireType === 2) {
          // Skip other length-delimited fields
          const result = readLengthDelimitedString(decoded, decCoinOffset);
          if (result) {
            const [, bytesRead] = result;
            decCoinOffset += bytesRead;
            continue;
          }
        } else {
          break;
        }
      }

      if (decCoinOffset >= decCoinEnd) {
        throw new Error("Failed to find amount field in DecCoin");
      }
    } else if (wireType === 2) {
      // Skip other length-delimited fields
      const result = readLengthDelimitedString(decoded, offset);
      if (result) {
        const [, bytesRead] = result;
        offset += bytesRead;
        continue;
      }
    } else {
      break;
    }
  }

  if (!foundDecCoin) {
    throw new Error("Failed to parse feemarket gas price response: price DecCoin not found");
  }

  throw new Error("Failed to parse feemarket gas price response: amount field not found");
}

