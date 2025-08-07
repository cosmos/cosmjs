import { fromBase64 } from "@cosmjs/encoding";
import { Any } from "cosmjs-types/google/protobuf/any.js";

import { accountFromAny } from "./accounts";

describe("accounts", () => {
  describe("accountFromAny", () => {
    it("works for PeriodicVestingAccount", () => {
      // Queried from chain via https://github.com/cosmos/cosmjs/blob/v0.34.0/packages/cli/examples/get_akash_vesting_account.ts
      const any = Any.fromPartial({
        typeUrl: "/cosmos.vesting.v1beta1.PeriodicVestingAccount",
        value: fromBase64(
          "CsMBCnoKLGFrYXNoMXF5MHZ1cjNmbDJ1Y3p0cHpjcmZlYTdtYzhqd3o4eGptdnE3cXZ5EkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohA/XsdhwSIKU73TltD9STcaS07FNw0szR4a+oDLr6vikaGDggGxIUCgR1YWt0EgwxNjY2NjY2NzAwMDAaEwoEdWFrdBILMzcxOTAzMzAwMDAiFAoEdWFrdBIMMTY2NjY2NjcwMDAwKOC9wZkGEODvt/sFGhoIgOeEDxITCgR1YWt0Egs4MzMzMzMzNTAwMBoaCIC/ugcSEwoEdWFrdBILNDE2NjY2Njc1MDAaGgiAqMoHEhMKBHVha3QSCzQxNjY2NjY3NTAw",
        ),
      });

      const account = accountFromAny(any);
      expect(account).toEqual({
        address: "akash1qy0vur3fl2ucztpzcrfea7mc8jwz8xjmvq7qvy",
        pubkey: {
          type: "tendermint/PubKeySecp256k1",
          value: "A/XsdhwSIKU73TltD9STcaS07FNw0szR4a+oDLr6vika",
        },
        accountNumber: 56,
        sequence: 27,
      });
    });
  });
});
