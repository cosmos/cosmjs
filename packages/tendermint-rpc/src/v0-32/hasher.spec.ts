import { fromBase64, fromHex } from "@cosmjs/encoding";
import { ReadonlyDate } from "readonly-date";

import { ReadonlyDateWithNanoseconds } from "../responses";
import { TxBytes } from "../types";
import { hashBlock, hashTx } from "./hasher";

describe("Hasher", () => {
  it("creates transaction hash equal to local test", () => {
    // This was taken from a result from /tx_search of some random test transaction
    // curl "http://localhost:11127/tx_search?query=\"tx.hash='5CB2CF94A1097A4BC19258BC2353C3E76102B6D528458BE45C855DC5563C1DB2'\""
    const txId = fromHex("5CB2CF94A1097A4BC19258BC2353C3E76102B6D528458BE45C855DC5563C1DB2");
    const txData = fromBase64("YUpxZDY2NURaUDMxPWd2TzBPdnNrVWFWYg==") as TxBytes;
    expect(hashTx(txData)).toEqual(txId);
  });

  it("creates block hash equal to local test for empty block", () => {
    // This was taken from a result from /block of some random empty block
    // curl "http://localhost:11131/block"
    const blockId = fromHex("5B5D3F7E77A4BD6CB6067947E478BC3BD493DD24A981535F0ADEBDAAA0498480");
    const time = new ReadonlyDate("2019-09-19T10:41:24.898178746Z");
    // tslint:disable-next-line:no-object-mutation
    (time as any).nanoseconds = 178746;
    const blockData = {
      version: {
        block: 10,
        app: 1,
      },
      chainId: "test-chain-RRlV24",
      height: 2195,
      time: time as ReadonlyDateWithNanoseconds,
      numTxs: 0,
      totalTxs: 20,

      lastBlockId: {
        hash: fromHex("1D38C4FE5C1D8C3CC1F47602BF107C9B269BA7DA3514DEDF958F5A33AB75C06B"),
        parts: {
          total: 1,
          hash: fromHex("C441341B7D846DDA6AF72F83DF68C9AF93665FE5280B136CA29C7411D280DAEC"),
        },
      },

      lastCommitHash: fromHex("0C5EEF7AE1275337BFAA173F57799AA90830E74AFF3FB03D1F579DA37BCAEAB1"),
      dataHash: fromHex(""),

      validatorsHash: fromHex("44D7D0BE3C70B58DA87696102E3A52E5C9FA98A717E56D02987DA8CAE86F03F4"),
      nextValidatorsHash: fromHex("44D7D0BE3C70B58DA87696102E3A52E5C9FA98A717E56D02987DA8CAE86F03F4"),
      consensusHash: fromHex("048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F"),
      appHash: fromHex("2800000000000000"),
      lastResultsHash: fromHex(""),

      evidenceHash: fromHex(""),
      proposerAddress: fromHex("057B8C349E591579EDFCC0E5D5402E3076E99675"),
    };
    expect(hashBlock(blockData)).toEqual(blockId);
  });

  it("creates block hash equal to local test for block with a transaction", () => {
    // This was taken from a result from /block of some random block with a transaction
    // curl "http://localhost:11131/block?height=5940"
    const blockId = fromHex("1C4777AFBBA49E15D031A830E62E7BE986823938732B872C02B8A3D16BD3163B");
    const time = new ReadonlyDate("2019-09-24T10:51:28.240847497Z");
    // tslint:disable-next-line:no-object-mutation
    (time as any).nanoseconds = 847497;
    const blockData = {
      version: {
        block: 10,
        app: 1,
      },
      chainId: "test-chain-lY9FO6",
      height: 5940,
      time: time as ReadonlyDateWithNanoseconds,
      numTxs: 1,
      totalTxs: 61,

      lastBlockId: {
        hash: fromHex("D2983E6AEEFC55E0A46565CD2274CCD21CB013F5602B0C35A423A99D1120DB13"),
        parts: {
          total: 1,
          hash: fromHex("AA55D7F92AD3A9CFDA8C5E45F95B03AEF9FB38AB984FD762E5CE20791324369D"),
        },
      },

      lastCommitHash: fromHex("5DBFFDBE41878AEB947176D3E0B0DC70850B0A61F8B709ED132FEA59664DFCE5"),
      dataHash: fromHex("90FE1A62418F68B411915EEF6792B134693D9D0148432BA661D91213B0CCD15A"),

      validatorsHash: fromHex("0A4647900ED90CC605E851BBB4946D7B9D1830F293BC87F3CE16AEFF4E4C77E2"),
      nextValidatorsHash: fromHex("0A4647900ED90CC605E851BBB4946D7B9D1830F293BC87F3CE16AEFF4E4C77E2"),
      consensusHash: fromHex("048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F"),
      appHash: fromHex("7800000000000000"),
      lastResultsHash: fromHex("6E340B9CFFB37A989CA544E6BB780A2C78901D3FB33738768511A30617AFA01D"),

      evidenceHash: fromHex(""),
      proposerAddress: fromHex("6BCBB90987613FE15D3DEFA4920E9F98425698FF"),
    };
    expect(hashBlock(blockData)).toEqual(blockId);
  });
});
