import { fromHex } from "@cosmjs/encoding";

import { gzip } from "./compression";

async function uncompress(compressed: Uint8Array): Promise<Uint8Array> {
  const ds = new DecompressionStream("gzip");
  const stream = new Blob([compressed]).stream().pipeThrough(ds);
  const buffer = await new Response(stream).arrayBuffer();
  return new Uint8Array(buffer);
}

describe("compression", () => {
  describe("gzip", () => {
    it("works", async () => {
      const data = [
        Uint8Array.from([]),
        Uint8Array.from([0xaa]),
        Uint8Array.from([0xaa, 0xbb]),
        Uint8Array.from([0xaa, 0xbb, 0xcc]),
        new Uint8Array(10),
        new Uint8Array(100),
        new Uint8Array(1000),
        new Uint8Array(13).fill(42),
        new Uint8Array(1424).fill(43),
        new Uint8Array(69458).fill(44),
        new Uint8Array(135454).fill(45),
        new Uint8Array(1484384).fill(46),
      ];
      for (const [index, d] of data.entries()) {
        const compressed = await gzip(d);
        // "A gzip file contains: a 10-byte header. This header contains its magic number (“1F8B08”),
        // a version number and a time stamp, [...]" https://bits.ashleyblewer.com/blog/2024/01/12/researching-file-formats-20-gzip/
        expect(compressed.length).withContext(`Data with index ${index}`).toBeGreaterThanOrEqual(10);
        expect(compressed.slice(0, 3)).toEqual(fromHex("1F8B08"));
        expect(await uncompress(compressed)).toEqual(d);
      }
    });
  });
});
