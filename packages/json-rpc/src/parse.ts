import {
  isJsonCompatibleArray,
  isJsonCompatibleDictionary,
  isJsonCompatibleValue,
  JsonCompatibleDictionary,
  JsonCompatibleValue,
} from "./compatibility";
import {
  JsonRpcError,
  JsonRpcErrorResponse,
  JsonRpcId,
  JsonRpcRequest,
  JsonRpcResponse,
  JsonRpcSuccessResponse,
} from "./types";

/**
 * Extracts ID field from request or response object.
 *
 * Returns `null` when no valid ID was found.
 */
export function parseJsonRpcId(data: unknown): JsonRpcId | null {
  if (!isJsonCompatibleDictionary(data)) {
    throw new Error("Data must be JSON compatible dictionary");
  }

  const id = data.id;
  if (typeof id !== "number" && typeof id !== "string") {
    return null;
  }
  return id;
}

export function parseJsonRpcRequest(data: unknown): JsonRpcRequest {
  if (!isJsonCompatibleDictionary(data)) {
    throw new Error("Data must be JSON compatible dictionary");
  }

  if (data.jsonrpc !== "2.0") {
    throw new Error(`Got unexpected jsonrpc version: ${data.jsonrpc}`);
  }

  const id = parseJsonRpcId(data);
  if (id === null) {
    throw new Error("Invalid id field");
  }

  const method = data.method;
  if (typeof method !== "string") {
    throw new Error("Invalid method field");
  }

  if (!isJsonCompatibleArray(data.params) && !isJsonCompatibleDictionary(data.params)) {
    throw new Error("Invalid params field");
  }

  return {
    jsonrpc: "2.0",
    id: id,
    method: method,
    params: data.params,
  };
}

function parseError(error: JsonCompatibleDictionary): JsonRpcError {
  if (typeof error.code !== "number") {
    throw new Error("Error property 'code' is not a number");
  }

  if (typeof error.message !== "string") {
    throw new Error("Error property 'message' is not a string");
  }

  let maybeUndefinedData: JsonCompatibleValue | undefined;

  if (error.data === undefined) {
    maybeUndefinedData = undefined;
  } else if (isJsonCompatibleValue(error.data)) {
    maybeUndefinedData = error.data;
  } else {
    throw new Error("Error property 'data' is defined but not a JSON compatible value.");
  }

  return {
    code: error.code,
    message: error.message,
    ...(maybeUndefinedData !== undefined ? { data: maybeUndefinedData } : {}),
  };
}

/** Throws if data is not a JsonRpcErrorResponse */
export function parseJsonRpcErrorResponse(data: unknown): JsonRpcErrorResponse {
  if (!isJsonCompatibleDictionary(data)) {
    throw new Error("Data must be JSON compatible dictionary");
  }

  if (data.jsonrpc !== "2.0") {
    throw new Error(`Got unexpected jsonrpc version: ${JSON.stringify(data)}`);
  }

  const id = data.id;
  if (typeof id !== "number" && typeof id !== "string" && id !== null) {
    throw new Error("Invalid id field");
  }

  if (typeof data.error === "undefined" || !isJsonCompatibleDictionary(data.error)) {
    throw new Error("Invalid error field");
  }

  return {
    jsonrpc: "2.0",
    id: id,
    error: parseError(data.error),
  };
}

/** Throws if data is not a JsonRpcSuccessResponse */
export function parseJsonRpcSuccessResponse(data: unknown): JsonRpcSuccessResponse {
  if (!isJsonCompatibleDictionary(data)) {
    throw new Error("Data must be JSON compatible dictionary");
  }

  if (data.jsonrpc !== "2.0") {
    throw new Error(`Got unexpected jsonrpc version: ${JSON.stringify(data)}`);
  }

  const id = data.id;
  if (typeof id !== "number" && typeof id !== "string") {
    throw new Error("Invalid id field");
  }

  if (typeof data.result === "undefined") {
    throw new Error("Invalid result field");
  }

  const result = data.result;

  return {
    jsonrpc: "2.0",
    id: id,
    result: result,
  };
}

/**
 * Returns a JsonRpcErrorResponse if input can be parsed as a JSON-RPC error. Otherwise parses
 * input as JsonRpcSuccessResponse. Throws if input is neither a valid error nor success response.
 */
export function parseJsonRpcResponse(data: unknown): JsonRpcResponse {
  let response: JsonRpcResponse;
  try {
    response = parseJsonRpcErrorResponse(data);
  } catch (_) {
    response = parseJsonRpcSuccessResponse(data);
  }
  return response;
}
