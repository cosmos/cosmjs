import { JsonRpcRequest } from "@cosmjs/json-rpc";

const numbersWithoutZero = "123456789";

/** generates a random numeric character  */
function randomNumericChar(): string {
  return numbersWithoutZero[Math.floor(Math.random() * numbersWithoutZero.length)];
}

/**
 * An (absolutely not cryptographically secure) random integer > 0.
 */
function randomId(): number {
  return parseInt(
    Array.from({ length: 12 })
      .map(() => randomNumericChar())
      .join(""),
    10,
  );
}

/** Creates a JSON-RPC request with random ID */
// eslint-disable-next-line @typescript-eslint/ban-types
export function createJsonRpcRequest(method: string, params?: {}): JsonRpcRequest {
  const paramsCopy = params ? { ...params } : {};
  return {
    jsonrpc: "2.0",
    id: randomId(),
    method: method,
    params: paramsCopy,
  };
}
