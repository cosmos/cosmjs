/* eslint-disable @typescript-eslint/naming-convention */
import { toHex } from "@cosmjs/encoding";
import { JsonRpcRequest } from "@cosmjs/json-rpc";

import {
  assertNotEmpty,
  Base64,
  Base64String,
  HexString,
  Integer,
  IntegerString,
  may,
} from "../../encodings";
import { createJsonRpcRequest } from "../../jsonrpc";
import * as requests from "../../requests";

interface HeightParam {
  readonly height?: number;
}
interface RpcHeightParam {
  readonly height?: IntegerString;
}
function encodeHeightParam(param: HeightParam): RpcHeightParam {
  return {
    height: may(Integer.encode, param.height),
  };
}

interface RpcBlockchainRequestParams {
  readonly minHeight?: IntegerString;
  readonly maxHeight?: IntegerString;
}

function encodeBlockchainRequestParams(param: requests.BlockchainRequestParams): RpcBlockchainRequestParams {
  return {
    minHeight: may(Integer.encode, param.minHeight),
    maxHeight: may(Integer.encode, param.maxHeight),
  };
}

interface RpcAbciQueryParams {
  readonly path: string;
  readonly data: HexString;
  readonly height?: string;
  readonly prove?: boolean;
}

function encodeAbciQueryParams(params: requests.AbciQueryParams): RpcAbciQueryParams {
  return {
    path: assertNotEmpty(params.path),
    data: toHex(params.data) as HexString,
    height: may(Integer.encode, params.height),
    prove: params.prove,
  };
}

interface RpcBroadcastTxParams {
  readonly tx: Base64String;
}
function encodeBroadcastTxParams(params: requests.BroadcastTxParams): RpcBroadcastTxParams {
  return {
    tx: Base64.encode(assertNotEmpty(params.tx)),
  };
}

interface RpcTxParams {
  readonly hash: Base64String;
  readonly prove?: boolean;
}
function encodeTxParams(params: requests.TxParams): RpcTxParams {
  return {
    hash: Base64.encode(assertNotEmpty(params.hash)),
    prove: params.prove,
  };
}

interface RpcTxSearchParams {
  readonly query: requests.QueryString;
  readonly prove?: boolean;
  readonly page?: IntegerString;
  readonly per_page?: IntegerString;
}
function encodeTxSearchParams(params: requests.TxSearchParams): RpcTxSearchParams {
  return {
    query: params.query,
    prove: params.prove,
    page: may(Integer.encode, params.page),
    per_page: may(Integer.encode, params.per_page),
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
    return createJsonRpcRequest(req.method, encodeHeightParam(req.params));
  }
}
