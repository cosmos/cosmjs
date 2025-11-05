/**
 * gzip compression used by CosmWasm for reducing the transaction size when uploading Wasm blobs to chain.
 * This function is use case specific and not meant for large input sizes or other requirements you might have
 * outside of CosmWasm.
 */
export async function gzip(uncompressed: Uint8Array): Promise<Uint8Array> {
  const inputStream = new Blob([uncompressed]).stream();
  const stream = inputStream.pipeThrough(new CompressionStream("gzip"));
  const buffer = await new Response(stream).arrayBuffer();
  return new Uint8Array(buffer);
}
