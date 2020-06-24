import { JsonCompatibleArray, JsonCompatibleDictionary, JsonCompatibleValue } from "./compatibility";

export type JsonRpcId = number | string;

export interface JsonRpcRequest {
  readonly jsonrpc: "2.0";
  readonly id: JsonRpcId;
  readonly method: string;
  readonly params: JsonCompatibleArray | JsonCompatibleDictionary;
}

export interface JsonRpcSuccessResponse {
  readonly jsonrpc: "2.0";
  readonly id: JsonRpcId;
  readonly result: any;
}

export interface JsonRpcError {
  readonly code: number;
  readonly message: string;
  readonly data?: JsonCompatibleValue;
}

/**
 * And error object as described in https://www.jsonrpc.org/specification#error_object
 */
export interface JsonRpcErrorResponse {
  readonly jsonrpc: "2.0";
  readonly id: JsonRpcId | null;
  readonly error: JsonRpcError;
}

export type JsonRpcResponse = JsonRpcSuccessResponse | JsonRpcErrorResponse;

export function isJsonRpcErrorResponse(response: JsonRpcResponse): response is JsonRpcErrorResponse {
  return typeof (response as JsonRpcErrorResponse).error === "object";
}

export function isJsonRpcSuccessResponse(response: JsonRpcResponse): response is JsonRpcSuccessResponse {
  return !isJsonRpcErrorResponse(response);
}

/**
 * Error codes as specified in JSON-RPC 2.0
 *
 * @see https://www.jsonrpc.org/specification#error_object
 */
export const jsonRpcCode = {
  parseError: -32700,
  invalidRequest: -32600,
  methodNotFound: -32601,
  invalidParams: -32602,
  internalError: -32603,
  // server error (Reserved for implementation-defined server-errors.):
  // -32000 to -32099
  serverError: {
    default: -32000,
  },
};
