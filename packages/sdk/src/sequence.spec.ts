import { findSequenceForSignedTx } from "./sequence";
import response1 from "./testdata/txresponse1.json";
import response2 from "./testdata/txresponse2.json";
import response3 from "./testdata/txresponse3.json";

// Those values must match ./testdata/txresponse*.json
const chainId = "testing";
const accountNumber = 4;

describe("sequence", () => {
  describe("findSequenceForSignedTx", () => {
    it("works", async () => {
      const current = 100; // what we get from GET /auth/accounts/{address}
      expect(await findSequenceForSignedTx(response1.tx, chainId, accountNumber, current)).toEqual(10);
      // We know response3.height > response1.height, so the sequence must be at least 10+1
      expect(await findSequenceForSignedTx(response3.tx, chainId, accountNumber, current, 11)).toEqual(19);
      // We know response3.height > response2.height > response1.height, so the sequence must be at least 10+1 and smaller than 19
      expect(await findSequenceForSignedTx(response2.tx, chainId, accountNumber, 19, 11)).toEqual(13);
    });

    it("returns undefined when sequence is not in range", async () => {
      expect(await findSequenceForSignedTx(response1.tx, chainId, accountNumber, 5)).toBeUndefined();
      expect(await findSequenceForSignedTx(response1.tx, chainId, accountNumber, 20, 11)).toBeUndefined();
      expect(await findSequenceForSignedTx(response1.tx, chainId, accountNumber, 20, 50)).toBeUndefined();

      // upper bound is not included in the possible results
      expect(await findSequenceForSignedTx(response1.tx, chainId, accountNumber, 10)).toBeUndefined();
    });
  });
});
