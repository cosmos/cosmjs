import { Decimal } from "@cosmjs/math";
import { fromUtf8 } from "@cosmjs/encoding";

import { GasPrice } from "./fee";
import { checkDynamicGasPriceSupport, multiplyDecimalByNumber, queryDynamicGasPrice } from "./feemarket";

describe("Osmosis chain ID detection", () => {
  // Helper to create a mock queryClient
  function createMockQueryClient(osmosisResponse: Uint8Array, feemarketResponse?: Uint8Array) {
    return {
      queryAbci: async (path: string, _data: Uint8Array) => {
        if (path === "/osmosis.txfees.v1beta1.Query/GetEipBaseFee") {
          return { value: osmosisResponse };
        }
        if (path === "/feemarket.feemarket.v1.Query/GasPrices" && feemarketResponse) {
          return { value: feemarketResponse };
        }
        throw new Error("Endpoint not found");
      },
    };
  }

  describe("Osmosis production chains", () => {
    it('detects "osmosis-1" as Osmosis chain', async () => {
      // Real Osmosis response: DecProto { dec: "30000000000000000" } = 0.03
      const response = new Uint8Array([10, 17, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);

      const result = await queryDynamicGasPrice(queryClient, "uosmo", "osmosis-1");
      expect(result.toString()).toBe("0.03");
    });

    it('detects "osmosis-42" as Osmosis chain', async () => {
      const response = new Uint8Array([10, 17, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);

      const result = await queryDynamicGasPrice(queryClient, "uosmo", "osmosis-42");
      expect(result.toString()).toBe("0.03");
    });

    it('detects "OSMOSIS-1" (uppercase) as Osmosis chain', async () => {
      const response = new Uint8Array([10, 17, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);

      const result = await queryDynamicGasPrice(queryClient, "uosmo", "OSMOSIS-1");
      expect(result.toString()).toBe("0.03");
    });
  });

  describe("Osmosis test chains", () => {
    it('detects "osmo-test-4" as Osmosis chain', async () => {
      const response = new Uint8Array([10, 17, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);

      const result = await queryDynamicGasPrice(queryClient, "uosmo", "osmo-test-4");
      expect(result.toString()).toBe("0.03");
    });

    it('detects "osmo-test-5" as Osmosis chain', async () => {
      const response = new Uint8Array([10, 17, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);

      const result = await queryDynamicGasPrice(queryClient, "uosmo", "osmo-test-5");
      expect(result.toString()).toBe("0.03");
    });
  });

  describe("Osmosis local/dev chains", () => {
    it('detects "osmosislocal" as Osmosis chain', async () => {
      const response = new Uint8Array([10, 17, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);

      const result = await queryDynamicGasPrice(queryClient, "uosmo", "osmosislocal");
      expect(result.toString()).toBe("0.03");
    });

    it('detects "osmosisdev" as Osmosis chain', async () => {
      const response = new Uint8Array([10, 17, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);

      const result = await queryDynamicGasPrice(queryClient, "uosmo", "osmosisdev");
      expect(result.toString()).toBe("0.03");
    });

    it('detects "osmosistestnet" as Osmosis chain', async () => {
      const response = new Uint8Array([10, 17, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);

      const result = await queryDynamicGasPrice(queryClient, "uosmo", "osmosistestnet");
      expect(result.toString()).toBe("0.03");
    });
  });

  describe("Non-Osmosis chains use feemarket", () => {
    it('treats "cosmoshub-4" as non-Osmosis chain', async () => {
      // Real feemarket response: GasPricesResponse { prices: [DecCoin { denom: "uatom", amount: "5300000000000000" }] } = 0.0053
      const feemarketResponse = new Uint8Array([10, 25, 10, 5, 117, 97, 116, 111, 109, 18, 16, 53, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = {
        queryAbci: async (path: string, _data: Uint8Array) => {
          if (path === "/feemarket.feemarket.v1.Query/GasPrices") {
            return { value: feemarketResponse };
          }
          throw new Error("Endpoint not found");
        },
      };

      const result = await queryDynamicGasPrice(queryClient, "uatom", "cosmoshub-4");
      expect(result.toString()).toBe("0.0053");
    });

    it('treats "juno-1" as non-Osmosis chain', async () => {
      const feemarketResponse = new Uint8Array([10, 25, 10, 5, 117, 97, 116, 111, 109, 18, 16, 53, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = {
        queryAbci: async (path: string, _data: Uint8Array) => {
          if (path === "/feemarket.feemarket.v1.Query/GasPrices") {
            return { value: feemarketResponse };
          }
          throw new Error("Endpoint not found");
        },
      };

      const result = await queryDynamicGasPrice(queryClient, "ujuno", "juno-1");
      expect(result.toString()).toBe("0.0053");
    });

    it('does not match "osmosis" alone (no suffix)', async () => {
      const feemarketResponse = new Uint8Array([10, 25, 10, 5, 117, 97, 116, 111, 109, 18, 16, 53, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = {
        queryAbci: async (path: string, _data: Uint8Array) => {
          if (path === "/feemarket.feemarket.v1.Query/GasPrices") {
            return { value: feemarketResponse };
          }
          throw new Error("Endpoint not found");
        },
      };

      // "osmosis" without suffix or number should use feemarket
      const result = await queryDynamicGasPrice(queryClient, "uatom", "osmosis");
      expect(result.toString()).toBe("0.0053");
    });

    it('does not match chains that merely contain "osmosis" as substring', async () => {
      const feemarketResponse = new Uint8Array([10, 25, 10, 5, 117, 97, 116, 111, 109, 18, 16, 53, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = {
        queryAbci: async (path: string, _data: Uint8Array) => {
          if (path === "/feemarket.feemarket.v1.Query/GasPrices") {
            return { value: feemarketResponse };
          }
          throw new Error("Endpoint not found");
        },
      };

      const result = await queryDynamicGasPrice(queryClient, "uatom", "myosmosischain-1");
      expect(result.toString()).toBe("0.0053");
    });
  });
});

describe("queryDynamicGasPrice", () => {
  // Helper to create a mock queryClient
  function createMockQueryClient(responseValue: Uint8Array) {
    return {
      queryAbci: async (_path: string, _data: Uint8Array) => {
        return { value: responseValue };
      },
    };
  }

  describe("Osmosis chain detection", () => {
    it("detects osmosis chain IDs", async () => {
      const response = new Uint8Array([10, 17, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);

      // Only test valid Osmosis chain IDs that match the regex patterns
      const chainIds = ["osmosis-1", "osmo-test-4", "osmosislocal"];
      for (const chainId of chainIds) {
        const result = await queryDynamicGasPrice(queryClient, "uosmo", chainId);
        expect(result.toString()).toBe("0.03");
      }
    });

    it("uses Osmosis endpoint for osmosis chains", async () => {
      const response = new Uint8Array([10, 17, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);
      let calledPath = "";
      const mockClient = {
        queryAbci: async (path: string, data: Uint8Array) => {
          calledPath = path;
          expect(data.length).toBe(0); // Osmosis uses empty request
          return { value: response };
        },
      };

      await queryDynamicGasPrice(mockClient, "uosmo", "osmosis-1");
      expect(calledPath).toBe("/osmosis.txfees.v1beta1.Query/GetEipBaseFee");
    });
  });

  describe("Skip feemarket chain detection", () => {
    it("uses feemarket endpoint for non-Osmosis chains", async () => {
      const response = new Uint8Array([10, 25, 10, 5, 117, 97, 116, 111, 109, 18, 16, 53, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);
      let calledPath = "";
      let calledData: Uint8Array | null = null;
      const mockClient = {
        queryAbci: async (path: string, data: Uint8Array) => {
          calledPath = path;
          calledData = data;
          return { value: response };
        },
      };

      await queryDynamicGasPrice(mockClient, "uatom", "cosmoshub-4");
      expect(calledPath).toBe("/feemarket.feemarket.v1.Query/GasPrices");
      expect(calledData).not.toBeNull();
      expect(calledData!.length).toBeGreaterThan(0); // Should have encoded denom
    });

    it("encodes denom in request for feemarket chains", async () => {
      const response = new Uint8Array([10, 25, 10, 5, 117, 97, 116, 111, 109, 18, 16, 53, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      let capturedData: Uint8Array | null = null;
      const mockClient = {
        queryAbci: async (_path: string, data: Uint8Array) => {
          capturedData = data;
          return { value: response };
        },
      };

      await queryDynamicGasPrice(mockClient, "uatom", "cosmoshub-4");

      // Verify the request is properly encoded
      // Should start with field tag 0x0a (field 1, wire type 2)
      expect(capturedData).not.toBeNull();
      expect(capturedData![0]).toBe(0x0a);
      // Should contain "uatom" encoded as UTF-8
      const dataString = fromUtf8(capturedData!.slice(1));
      expect(dataString).toContain("uatom");
    });
  });

  describe("Osmosis response parsing", () => {
    it("parses valid Osmosis EIP-1559 response", async () => {
      const response = new Uint8Array([10, 17, 50, 53, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);

      const result = await queryDynamicGasPrice(queryClient, "uosmo", "osmosis-1");
      expect(result.toString()).toBe("0.025");
    });

    it("parses Osmosis response with different decimal values", async () => {
      const testCases = [
        { value: "0.025", bytes: [10, 17, 50, 53, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48] },
        { value: "1.5", bytes: [10, 19, 49, 53, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48] },
        { value: "100", bytes: [10, 21, 49, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48] },
      ];

      for (const testCase of testCases) {
        const response = new Uint8Array(testCase.bytes);
        const queryClient = createMockQueryClient(response);
        const result = await queryDynamicGasPrice(queryClient, "uosmo", "osmosis-1");
        expect(result.toString()).toBe(testCase.value);
      }
    });

    it("throws error for invalid Osmosis response", async () => {
      // Empty response
      const emptyResponse = new Uint8Array([]);
      const queryClient = createMockQueryClient(emptyResponse);

      await expectAsync(queryDynamicGasPrice(queryClient, "uosmo", "osmosis-1")).toBeRejectedWithError(
        /DecProto: dec field not found/i,
      );
    });
  });

  describe("Skip feemarket response parsing", () => {
    it("parses valid feemarket response", async () => {
      const response = new Uint8Array([10, 19, 18, 17, 50, 53, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);

      const result = await queryDynamicGasPrice(queryClient, "uatom", "cosmoshub-4");
      expect(result.toString()).toBe("0.025");
    });

    it("parses feemarket response with denom field", async () => {
      // GasPricesResponse { prices: [DecCoin { denom: "uatom", amount: "5300000000000000" }] }
      const response = new Uint8Array([10, 25, 10, 5, 117, 97, 116, 111, 109, 18, 16, 53, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
      const queryClient = createMockQueryClient(response);

      const result = await queryDynamicGasPrice(queryClient, "uatom", "cosmoshub-4");
      expect(result.toString()).toBe("0.0053");
    });

    it("parses feemarket response with different decimal values", async () => {
      const testCases = [
        { value: "0.025", bytes: [10, 19, 18, 17, 50, 53, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48] },
        { value: "1.5", bytes: [10, 21, 18, 19, 49, 53, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48] },
        { value: "100", bytes: [10, 23, 18, 21, 49, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48] },
      ];

      for (const testCase of testCases) {
        const response = new Uint8Array(testCase.bytes);
        const queryClient = createMockQueryClient(response);
        const result = await queryDynamicGasPrice(queryClient, "uatom", "cosmoshub-4");
        expect(result.toString()).toBe(testCase.value);
      }
    });

    it("throws error for invalid feemarket response without DecCoin", async () => {
      // Empty response
      const emptyResponse = new Uint8Array([]);
      const queryClient = createMockQueryClient(emptyResponse);

      await expectAsync(queryDynamicGasPrice(queryClient, "uatom", "cosmoshub-4")).toBeRejectedWithError(
        /GasPricesResponse: amount not found/i,
      );
    });

    it("throws error for feemarket response without amount field", async () => {
      // GasPricesResponse { price: DecCoin { denom: "uatom" } } - missing amount
      // Outer: Field tag 1 (0x0a), length 6
      // Inner: Field tag 1 (0x0a), length 5, "uatom"
      const response = new Uint8Array([0x0a, 0x06, 0x0a, 0x05, 0x75, 0x61, 0x74, 0x6f, 0x6d]);
      const queryClient = createMockQueryClient(response);

      await expectAsync(queryDynamicGasPrice(queryClient, "uatom", "cosmoshub-4")).toBeRejectedWithError(
        /premature EOF|amount not found/i,
      );
    });
  });

  describe("request encoding", () => {
    it("encodes different denoms correctly", async () => {
      const denoms = ["uatom", "uosmo", "ustake", "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"];
      const response = new Uint8Array([10, 19, 18, 17, 50, 53, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);

      for (const denom of denoms) {
        let capturedData: Uint8Array | null = null;
        const mockClient = {
          queryAbci: async (_path: string, data: Uint8Array) => {
            capturedData = data;
            return { value: response };
          },
        };

        await queryDynamicGasPrice(mockClient, denom, "cosmoshub-4");

        // Verify denom is encoded in the request
        expect(capturedData).not.toBeNull();
        const dataString = fromUtf8(capturedData!);
        expect(dataString).toContain(denom);
      }
    });
  });

  describe("error handling", () => {
    it("propagates query errors", async () => {
      const queryClient = {
        queryAbci: async (_path: string, _data: Uint8Array) => {
          throw new Error("Network error");
        },
      };

      await expectAsync(queryDynamicGasPrice(queryClient, "uatom", "cosmoshub-4")).toBeRejectedWithError(
        /Network error/i,
      );
    });
  });
});

describe("checkDynamicGasPriceSupport", () => {
  it("returns true for Osmosis chain with EIP-1559 support", async () => {
    const response = new Uint8Array([10, 17, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
    const queryClient = {
      queryAbci: async (path: string, _data: Uint8Array) => {
        if (path === "/osmosis.txfees.v1beta1.Query/GetEipBaseFee") {
          return { value: response };
        }
        throw new Error("Endpoint not found");
      },
    };

    const result = await checkDynamicGasPriceSupport(queryClient, "uosmo", "osmosis-1");
    expect(result).toBe(true);
  });

  it("returns true for chain with Skip feemarket support", async () => {
    const response = new Uint8Array([10, 25, 10, 5, 117, 97, 116, 111, 109, 18, 16, 53, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
    const queryClient = {
      queryAbci: async (path: string, _data: Uint8Array) => {
        if (path === "/feemarket.feemarket.v1.Query/GasPrices") {
          return { value: response };
        }
        throw new Error("Endpoint not found");
      },
    };

    const result = await checkDynamicGasPriceSupport(queryClient, "uatom", "cosmoshub-4");
    expect(result).toBe(true);
  });

  it("falls back to Skip feemarket if Osmosis endpoint fails", async () => {
    const response = new Uint8Array([10, 25, 10, 5, 117, 97, 116, 111, 109, 18, 16, 53, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
    const queryClient = {
      queryAbci: async (path: string, _data: Uint8Array) => {
        if (path === "/osmosis.txfees.v1beta1.Query/GetEipBaseFee") {
          throw new Error("Osmosis endpoint not available");
        }
        if (path === "/feemarket.feemarket.v1.Query/GasPrices") {
          return { value: response };
        }
        throw new Error("Endpoint not found");
      },
    };

    const result = await checkDynamicGasPriceSupport(queryClient, "uosmo", "osmosis-1");
    expect(result).toBe(true);
  });

  it("returns false when no dynamic fee endpoints are available", async () => {
    const queryClient = {
      queryAbci: async (_path: string, _data: Uint8Array) => {
        throw new Error("Endpoint not found");
      },
    };

    const result = await checkDynamicGasPriceSupport(queryClient, "uatom", "cosmoshub-4");
    expect(result).toBe(false);
  });
});

describe("multiplyDecimalByNumber", () => {
  it("multiplies decimals correctly", () => {
    const value = Decimal.fromUserInput("0.025", 18);
    const result = multiplyDecimalByNumber(value, 1.1, 18);
    expect(result.toString()).toBe("0.0275");
  });

  it("handles different fractional digits", () => {
    const value = Decimal.fromUserInput("0.025", 6);
    const result = multiplyDecimalByNumber(value, 1.5, 6);
    expect(result.toString()).toBe("0.0375");
  });

  it("normalizes value to target fractional digits", () => {
    const value = Decimal.fromUserInput("0.025", 6);
    const result = multiplyDecimalByNumber(value, 2.0, 18);
    expect(result.toString()).toBe("0.05");
  });

  it("handles integer multipliers", () => {
    const value = Decimal.fromUserInput("1.5", 18);
    const result = multiplyDecimalByNumber(value, 2, 18);
    expect(result.toString()).toBe("3");
  });

  it("handles fractional multipliers", () => {
    const value = Decimal.fromUserInput("100", 18);
    const result = multiplyDecimalByNumber(value, 0.1, 18);
    expect(result.toString()).toBe("10");
  });

  it("preserves precision with small numbers", () => {
    const value = Decimal.fromUserInput("0.0001", 18);
    const result = multiplyDecimalByNumber(value, 1.5, 18);
    expect(result.toString()).toBe("0.00015");
  });

  it("handles multiplier of 1", () => {
    const value = Decimal.fromUserInput("123.456", 18);
    const result = multiplyDecimalByNumber(value, 1.0, 18);
    expect(result.toString()).toBe("123.456");
  });

  it("works with large numbers that exceed safe integer range", () => {
    // Similar to fee.spec.ts test for large gas prices
    // "The default gas price is 5000000000000 (5e^12), as the native coin has 18 decimals
    // it is exceeding the max safe integer"
    // https://github.com/cosmos/cosmjs/issues/1134
    const value = Decimal.fromUserInput("5000000000000", 18);
    const result = multiplyDecimalByNumber(value, 1.5, 18);
    expect(result.toString()).toBe("7500000000000");
  });

  it("handles very small multipliers with large numbers", () => {
    // Test precision isn't lost when multiplying large numbers by small multipliers
    const value = Decimal.fromUserInput("1000000000000", 18);
    const result = multiplyDecimalByNumber(value, 0.001, 18);
    expect(result.toString()).toBe("1000000000");
  });
});

