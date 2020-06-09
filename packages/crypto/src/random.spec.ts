import { isUint8Array } from "@cosmjs/utils";

import { Random } from "./random";

describe("Random", () => {
  it("returns an Uint8Array", () => {
    const data = Random.getBytes(5);
    expect(isUint8Array(data)).toEqual(true);
  });

  it("creates random bytes", () => {
    {
      const bytes = Random.getBytes(0);
      expect(bytes.length).toEqual(0);
    }

    {
      const bytes = Random.getBytes(1);
      expect(bytes.length).toEqual(1);
    }

    {
      const bytes = Random.getBytes(32);
      expect(bytes.length).toEqual(32);
    }

    {
      const bytes = Random.getBytes(4096);
      expect(bytes.length).toEqual(4096);
    }

    {
      const bytes1 = Random.getBytes(32);
      const bytes2 = Random.getBytes(32);
      expect(bytes1).not.toEqual(bytes2);
    }
  });
});
