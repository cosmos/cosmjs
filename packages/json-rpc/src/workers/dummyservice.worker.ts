/// <reference lib="webworker" />

// for testing only

import { isJsonObject } from "@cosmjs/utils";

import { parseJsonRpcId, parseJsonRpcRequest } from "../parse";
import {
  jsonRpcCode,
  JsonRpcErrorResponse,
  JsonRpcRequest,
  JsonRpcResponse,
  JsonRpcSuccessResponse,
} from "../types";

function handleRequest(event: MessageEvent): JsonRpcResponse {
  let request: JsonRpcRequest;
  try {
    request = parseJsonRpcRequest(event.data);
  } catch (error: any) {
    const requestId = parseJsonRpcId(event.data);
    const errorResponse: JsonRpcErrorResponse = {
      jsonrpc: "2.0",
      id: requestId,
      error: {
        code: jsonRpcCode.invalidRequest,
        message: error.toString(),
      },
    };
    return errorResponse;
  }

  // This is just a text representation of the request. It can be lossy as it is not needed for further processing.
  let paramsString: string;
  if (isJsonObject(request.params)) {
    paramsString = JSON.stringify(request.params);
  } else {
    paramsString = request.params
      .map((p): string => {
        if (typeof p === "number" || typeof p === "boolean") {
          return `${p}`;
        } else if (p === null) {
          return `null`;
        } else if (typeof p === "string") {
          return `"${p}"`;
        } else {
          // Nested arrays or dictionaries. No need to traverse.
          return isJsonObject(p) ? "{ … }" : "[ … ]";
        }
      })
      .join(", ");
  }

  const response: JsonRpcSuccessResponse = {
    jsonrpc: "2.0",
    id: request.id,
    result: `Called ${request.method}(${paramsString})`,
  };
  return response;
}

onmessage = (event) => {
  // filter out empty {"isTrusted":true} events
  if (!event.data) {
    return;
  }

  const response = handleRequest(event);
  setTimeout(() => {
    postMessage(response);
  }, 50);
};
