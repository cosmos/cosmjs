import { JsonRpcRequest } from "@iov/jsonrpc";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/** generates a random alphanumeric character  */
function randomChar(): string {
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function randomId(): string {
  return Array.from({ length: 12 })
    .map(() => randomChar())
    .join("");
}

/** Creates a JSON-RPC request with random ID */
export function createJsonRpcRequest(method: string, params?: {}): JsonRpcRequest {
  const paramsCopy = params ? { ...params } : {};
  return {
    jsonrpc: "2.0",
    id: randomId(),
    method: method,
    params: paramsCopy,
  };
}
