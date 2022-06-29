/* eslint-disable @typescript-eslint/naming-convention */
import { toBase64, toHex } from "@cosmjs/encoding";
import { JsonRpcRequest } from "@cosmjs/json-rpc";

import { smallIntToApi } from "../../inthelpers";
import { createJsonRpcRequest } from "../../jsonrpc";
import { assertNotEmpty, may } from "../encodings";
import * as requests from "../requests";

interface HeightParam {
  readonly height?: number;
}
interface RpcHeightParam {
  readonly height?: string;
}
function encodeHeightParam(param: HeightParam): RpcHeightParam {
  return {
    height: may(smallIntToApi, param.height),
  };
}

interface RpcBlockchainRequestParams {
  readonly minHeight?: string;
  readonly maxHeight?: string;
}

function encodeBlockchainRequestParams(param: requests.BlockchainRequestParams): RpcBlockchainRequestParams {
  return {
    minHeight: may(smallIntToApi, param.minHeight),
    maxHeight: may(smallIntToApi, param.maxHeight),
  };
}

interface RpcBlockSearchParams {
  readonly query: string;
  readonly page?: string;
  readonly per_page?: string;
  readonly order_by?: string;
}
function encodeBlockSearchParams(params: requests.BlockSearchParams): RpcBlockSearchParams {
  return {
    query: params.query,
    page: may(smallIntToApi, params.page),
    per_page: may(smallIntToApi, params.per_page),
    order_by: params.order_by,
  };
}

interface RpcAbciQueryParams {
  readonly path: string;
  /** hex encoded */
  readonly data: string;
  readonly height?: string;
  readonly prove?: boolean;
}

function encodeAbciQueryParams(params: requests.AbciQueryParams): RpcAbciQueryParams {
  return {
    path: assertNotEmpty(params.path),
    data: toHex(params.data),
    height: may(smallIntToApi, params.height),
    prove: params.prove,
  };
}

interface RpcBroadcastTxParams {
  /** base64 encoded */
  readonly tx: string;
}
function encodeBroadcastTxParams(params: requests.BroadcastTxParams): RpcBroadcastTxParams {
  return {
    tx: toBase64(assertNotEmpty(params.tx)),
  };
}

interface RpcTxParams {
  /** hex encoded */
  readonly hash: string;
  readonly prove?: boolean;
}
function encodeTxParams(params: requests.TxParams): RpcTxParams {
  return {
    hash: toHex(assertNotEmpty(params.hash)),
    prove: params.prove,
  };
}

interface RpcTxSearchParams {
  readonly query: string;
  readonly prove?: boolean;
  readonly page?: string;
  readonly per_page?: string;
  readonly order_by?: string;
}
function encodeTxSearchParams(params: requests.TxSearchParams): RpcTxSearchParams {
  return {
    query: params.query,
    prove: params.prove,
    page: may(smallIntToApi, params.page),
    per_page: may(smallIntToApi, params.per_page),
    order_by: params.order_by,
  };
}

interface RpcValidatorsParams {
  readonly height?: string;
  readonly page?: string;
  readonly per_page?: string;
}
function encodeValidatorsParams(params: requests.ValidatorsParams): RpcValidatorsParams {
  return {
    height: may(smallIntToApi, params.height),
    page: may(smallIntToApi, params.page),
    per_page: may(smallIntToApi, params.per_page),
  };
}

export class Params {
  public static encodeAbciInfo(req: requests.AbciInfoRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method);
  }

  public static encodeAbciQuery(req: requests.AbciQueryRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method, encodeAbciQueryParams(req.params));
  }

  public static encodeBlock(req: requests.BlockRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method, encodeHeightParam(req.params));
  }

  public static encodeBlockchain(req: requests.BlockchainRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method, encodeBlockchainRequestParams(req.params));
  }

  public static encodeBlockResults(req: requests.BlockResultsRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method, encodeHeightParam(req.params));
  }

  public static encodeBlockSearch(req: requests.BlockSearchRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method, encodeBlockSearchParams(req.params));
  }

  public static encodeBroadcastTx(req: requests.BroadcastTxRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method, encodeBroadcastTxParams(req.params));
  }

  public static encodeCommit(req: requests.CommitRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method, encodeHeightParam(req.params));
  }

  public static encodeGenesis(req: requests.GenesisRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method);
  }

  public static encodeHealth(req: requests.HealthRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method);
  }

  public static encodeNumUnconfirmedTxs(req: requests.NumUnconfirmedTxsRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method);
  }

  public static encodeStatus(req: requests.StatusRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method);
  }

  public static encodeSubscribe(req: requests.SubscribeRequest): JsonRpcRequest {
    const eventTag = { key: "tm.event", value: req.query.type };
    const query = requests.buildQuery({ tags: [eventTag], raw: req.query.raw });
    return createJsonRpcRequest("subscribe", { query: query });
  }

  public static encodeTx(req: requests.TxRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method, encodeTxParams(req.params));
  }

  // TODO: encode params for query string???
  public static encodeTxSearch(req: requests.TxSearchRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method, encodeTxSearchParams(req.params));
  }

  public static encodeValidators(req: requests.ValidatorsRequest): JsonRpcRequest {
    return createJsonRpcRequest(req.method, encodeValidatorsParams(req.params));
  }
}
