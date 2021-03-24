/* eslint-disable @typescript-eslint/naming-convention */
import { Random } from "@cosmjs/crypto";
import { Bech32 } from "@cosmjs/encoding";

import { AminoMsg, makeSignDoc, sortedJsonStringify } from "./signdoc";

function makeRandomAddress(): string {
  return Bech32.encode("cosmos", Random.getBytes(20));
}
const testAddress = "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6";
const testValidatorAddress = "cosmosvaloper1yfkkk04ve8a0sugj4fe6q6zxuvmvza8r3arurr";

describe("encoding", () => {
  describe("sortedJsonStringify", () => {
    it("leaves non-objects unchanged", () => {
      expect(sortedJsonStringify(true)).toEqual(`true`);
      expect(sortedJsonStringify(false)).toEqual(`false`);
      expect(sortedJsonStringify("aabbccdd")).toEqual(`"aabbccdd"`);
      expect(sortedJsonStringify(75)).toEqual(`75`);
      expect(sortedJsonStringify(null)).toEqual(`null`);
      expect(sortedJsonStringify([5, 6, 7, 1])).toEqual(`[5,6,7,1]`);
      expect(sortedJsonStringify([5, ["a", "b"], true, null, 1])).toEqual(`[5,["a","b"],true,null,1]`);
    });

    it("sorts objects by key", () => {
      // already sorted
      expect(sortedJsonStringify({})).toEqual(`{}`);
      expect(sortedJsonStringify({ a: 3 })).toEqual(`{"a":3}`);
      expect(sortedJsonStringify({ a: 3, b: 2, c: 1 })).toEqual(`{"a":3,"b":2,"c":1}`);

      // not yet sorted
      expect(sortedJsonStringify({ b: 2, a: 3, c: 1 })).toEqual(`{"a":3,"b":2,"c":1}`);
      expect(sortedJsonStringify({ aaa: true, aa: true, a: true })).toEqual(
        `{"a":true,"aa":true,"aaa":true}`,
      );
    });

    it("sorts nested objects", () => {
      // already sorted
      expect(sortedJsonStringify({ x: { y: { z: null } } })).toEqual(`{"x":{"y":{"z":null}}}`);

      // not yet sorted
      expect(sortedJsonStringify({ b: { z: true, x: true, y: true }, a: true, c: true })).toEqual(
        `{"a":true,"b":{"x":true,"y":true,"z":true},"c":true}`,
      );
    });

    it("sorts objects in arrays", () => {
      // already sorted
      expect(sortedJsonStringify([1, 2, { x: { y: { z: null } } }, 4])).toEqual(
        `[1,2,{"x":{"y":{"z":null}}},4]`,
      );

      // not yet sorted
      expect(sortedJsonStringify([1, 2, { b: { z: true, x: true, y: true }, a: true, c: true }, 4])).toEqual(
        `[1,2,{"a":true,"b":{"x":true,"y":true,"z":true},"c":true},4]`,
      );
    });
  });

  describe("makeSignDoc", () => {
    it("works", () => {
      const chainId = "testspace-12";
      const msg1: AminoMsg = {
        type: "cosmos-sdk/MsgDelegate",
        value: {
          delegator_address: testAddress,
          validator_address: testValidatorAddress,
          amount: { amount: "1234", denom: "ustake" },
        },
      };
      const msg2: AminoMsg = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: testAddress,
          to_address: makeRandomAddress(),
          amount: [{ amount: "1234567", denom: "ucosm" }],
        },
      };
      const fee = {
        amount: [{ amount: "2000", denom: "ucosm" }],
        gas: "180000", // 180k
      };
      const memo = "Use your power wisely";
      const accountNumber = 15;
      const sequence = 16;

      const signDoc = makeSignDoc([msg1, msg2], fee, chainId, memo, accountNumber, sequence);
      expect(signDoc).toEqual({
        msgs: [msg1, msg2],
        fee: fee,
        chain_id: chainId,
        account_number: accountNumber.toString(),
        sequence: sequence.toString(),
        memo: memo,
      });
    });

    it("works with undefined memo", () => {
      const chainId = "testspace-12";
      const msg1: AminoMsg = {
        type: "cosmos-sdk/MsgDelegate",
        value: {
          delegator_address: testAddress,
          validator_address: testValidatorAddress,
          amount: { amount: "1234", denom: "ustake" },
        },
      };
      const msg2: AminoMsg = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: testAddress,
          to_address: makeRandomAddress(),
          amount: [{ amount: "1234567", denom: "ucosm" }],
        },
      };
      const fee = {
        amount: [{ amount: "2000", denom: "ucosm" }],
        gas: "180000", // 180k
      };
      const accountNumber = 15;
      const sequence = 16;

      const signDoc = makeSignDoc([msg1, msg2], fee, chainId, undefined, accountNumber, sequence);
      expect(signDoc).toEqual({
        msgs: [msg1, msg2],
        fee: fee,
        chain_id: chainId,
        account_number: accountNumber.toString(),
        sequence: sequence.toString(),
        memo: "",
      });
    });
  });
});
