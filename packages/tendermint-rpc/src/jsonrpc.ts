import { JsonRpcRequest } from "@cosmjs/json-rpc";

const numbers = "0123456789";

/** generates a random numeric character  */
function randomNumericChar(): string {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function randomId(): number {
  return parseInt(
    Array.from({ length: 12 })
      .map(() => randomNumericChar())
      .join(""),
    10,
  );
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
