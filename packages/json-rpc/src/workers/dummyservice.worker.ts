/// <reference lib="webworker" />

// for testing only

import { isJsonCompatibleDictionary } from "../compatibility";
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

  let paramsString: string;
  if (isJsonCompatibleDictionary(request.params)) {
    paramsString = JSON.stringify(request.params);
  } else {
    paramsString = request.params
      .map((p) => {
        if (typeof p === "number") {
          return p;
        } else if (p === null) {
          return `null`;
        } else if (typeof p === "string") {
          return `"${p}"`;
        } else {
          return p.toString();
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
  setTimeout(() => postMessage(response), 50);
};
