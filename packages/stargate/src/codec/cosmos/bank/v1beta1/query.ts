/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params } from "../../../cosmos/bank/v1beta1/bank";
import { Reader, Writer } from "protobufjs/minimal";

/**
 *  QueryBalanceRequest is the request type for the Query/Balance RPC method.
 */
export interface QueryBalanceRequest {
  /**
   *  address is the address to query balances for.
   */
  address: string;
  /**
   *  denom is the coin denom to query balances for.
   */
  denom: string;
}

/**
 *  QueryBalanceResponse is the response type for the Query/Balance RPC method.
 */
export interface QueryBalanceResponse {
  /**
   *  balance is the balance of the coin.
   */
  balance?: Coin;
}

/**
 *  QueryBalanceRequest is the request type for the Query/AllBalances RPC method.
 */
export interface QueryAllBalancesRequest {
  /**
   *  address is the address to query balances for.
   */
  address: string;
  /**
   *  pagination defines an optional pagination for the request.
   */
  pagination?: PageRequest;
}

/**
 *  QueryAllBalancesResponse is the response type for the Query/AllBalances RPC
 *  method.
 */
export interface QueryAllBalancesResponse {
  /**
   *  balances is the balances of all the coins.
   */
  balances: Coin[];
  /**
   *  pagination defines the pagination in the response.
   */
  pagination?: PageResponse;
}

/**
 *  QueryTotalSupplyRequest is the request type for the Query/TotalSupply RPC
 *  method.
 */
export interface QueryTotalSupplyRequest {}

/**
 *  QueryTotalSupplyResponse is the response type for the Query/TotalSupply RPC
 *  method
 */
export interface QueryTotalSupplyResponse {
  /**
   *  supply is the supply of the coins
   */
  supply: Coin[];
}

/**
 *  QuerySupplyOfRequest is the request type for the Query/SupplyOf RPC method.
 */
export interface QuerySupplyOfRequest {
  /**
   *  denom is the coin denom to query balances for.
   */
  denom: string;
}

/**
 *  QuerySupplyOfResponse is the response type for the Query/SupplyOf RPC method.
 */
export interface QuerySupplyOfResponse {
  /**
   *  amount is the supply of the coin.
   */
  amount?: Coin;
}

/**
 *  QueryParamsRequest defines the request type for querying x/bank parameters.
 */
export interface QueryParamsRequest {}

/**
 *  QueryParamsResponse defines the response type for querying x/bank parameters.
 */
export interface QueryParamsResponse {
  params?: Params;
}

const baseQueryBalanceRequest: object = {
  address: "",
  denom: "",
};

const baseQueryBalanceResponse: object = {};

const baseQueryAllBalancesRequest: object = {
  address: "",
};

const baseQueryAllBalancesResponse: object = {};

const baseQueryTotalSupplyRequest: object = {};

const baseQueryTotalSupplyResponse: object = {};

const baseQuerySupplyOfRequest: object = {
  denom: "",
};

const baseQuerySupplyOfResponse: object = {};

const baseQueryParamsRequest: object = {};

const baseQueryParamsResponse: object = {};

/**
 *  Query defines the gRPC querier service.
 */
export interface Query {
  /**
   *  Balance queries the balance of a single coin for a single account.
   */
  Balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse>;

  /**
   *  AllBalances queries the balance of all coins for a single account.
   */
  AllBalances(request: QueryAllBalancesRequest): Promise<QueryAllBalancesResponse>;

  /**
   *  TotalSupply queries the total supply of all coins.
   */
  TotalSupply(request: QueryTotalSupplyRequest): Promise<QueryTotalSupplyResponse>;

  /**
   *  SupplyOf queries the supply of a single coin.
   */
  SupplyOf(request: QuerySupplyOfRequest): Promise<QuerySupplyOfResponse>;

  /**
   *  Params queries the parameters of x/bank module.
   */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  Balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse> {
    const data = QueryBalanceRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "Balance", data);
    return promise.then((data) => QueryBalanceResponse.decode(new Reader(data)));
  }

  AllBalances(request: QueryAllBalancesRequest): Promise<QueryAllBalancesResponse> {
    const data = QueryAllBalancesRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "AllBalances", data);
    return promise.then((data) => QueryAllBalancesResponse.decode(new Reader(data)));
  }

  TotalSupply(request: QueryTotalSupplyRequest): Promise<QueryTotalSupplyResponse> {
    const data = QueryTotalSupplyRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "TotalSupply", data);
    return promise.then((data) => QueryTotalSupplyResponse.decode(new Reader(data)));
  }

  SupplyOf(request: QuerySupplyOfRequest): Promise<QuerySupplyOfResponse> {
    const data = QuerySupplyOfRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "SupplyOf", data);
    return promise.then((data) => QuerySupplyOfResponse.decode(new Reader(data)));
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

export const protobufPackage = "cosmos.bank.v1beta1";

export const QueryBalanceRequest = {
  encode(message: QueryBalanceRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.address);
    writer.uint32(18).string(message.denom);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryBalanceRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryBalanceRequest } as QueryBalanceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBalanceRequest {
    const message = { ...baseQueryBalanceRequest } as QueryBalanceRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom);
    } else {
      message.denom = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryBalanceRequest>): QueryBalanceRequest {
    const message = { ...baseQueryBalanceRequest } as QueryBalanceRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    } else {
      message.denom = "";
    }
    return message;
  },
  toJSON(message: QueryBalanceRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },
};

export const QueryBalanceResponse = {
  encode(message: QueryBalanceResponse, writer: Writer = Writer.create()): Writer {
    if (message.balance !== undefined && message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryBalanceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryBalanceResponse } as QueryBalanceResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryBalanceResponse {
    const message = { ...baseQueryBalanceResponse } as QueryBalanceResponse;
    if (object.balance !== undefined && object.balance !== null) {
      message.balance = Coin.fromJSON(object.balance);
    } else {
      message.balance = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryBalanceResponse>): QueryBalanceResponse {
    const message = { ...baseQueryBalanceResponse } as QueryBalanceResponse;
    if (object.balance !== undefined && object.balance !== null) {
      message.balance = Coin.fromPartial(object.balance);
    } else {
      message.balance = undefined;
    }
    return message;
  },
  toJSON(message: QueryBalanceResponse): unknown {
    const obj: any = {};
    message.balance !== undefined &&
      (obj.balance = message.balance ? Coin.toJSON(message.balance) : undefined);
    return obj;
  },
};

export const QueryAllBalancesRequest = {
  encode(message: QueryAllBalancesRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.address);
    if (message.pagination !== undefined && message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryAllBalancesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllBalancesRequest } as QueryAllBalancesRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAllBalancesRequest {
    const message = { ...baseQueryAllBalancesRequest } as QueryAllBalancesRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryAllBalancesRequest>): QueryAllBalancesRequest {
    const message = { ...baseQueryAllBalancesRequest } as QueryAllBalancesRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message: QueryAllBalancesRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },
};

export const QueryAllBalancesResponse = {
  encode(message: QueryAllBalancesResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.balances) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined && message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryAllBalancesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllBalancesResponse } as QueryAllBalancesResponse;
    message.balances = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balances.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryAllBalancesResponse {
    const message = { ...baseQueryAllBalancesResponse } as QueryAllBalancesResponse;
    message.balances = [];
    if (object.balances !== undefined && object.balances !== null) {
      for (const e of object.balances) {
        message.balances.push(Coin.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryAllBalancesResponse>): QueryAllBalancesResponse {
    const message = { ...baseQueryAllBalancesResponse } as QueryAllBalancesResponse;
    message.balances = [];
    if (object.balances !== undefined && object.balances !== null) {
      for (const e of object.balances) {
        message.balances.push(Coin.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message: QueryAllBalancesResponse): unknown {
    const obj: any = {};
    if (message.balances) {
      obj.balances = message.balances.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.balances = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },
};

export const QueryTotalSupplyRequest = {
  encode(_: QueryTotalSupplyRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryTotalSupplyRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryTotalSupplyRequest } as QueryTotalSupplyRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): QueryTotalSupplyRequest {
    const message = { ...baseQueryTotalSupplyRequest } as QueryTotalSupplyRequest;
    return message;
  },
  fromPartial(_: DeepPartial<QueryTotalSupplyRequest>): QueryTotalSupplyRequest {
    const message = { ...baseQueryTotalSupplyRequest } as QueryTotalSupplyRequest;
    return message;
  },
  toJSON(_: QueryTotalSupplyRequest): unknown {
    const obj: any = {};
    return obj;
  },
};

export const QueryTotalSupplyResponse = {
  encode(message: QueryTotalSupplyResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.supply) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryTotalSupplyResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryTotalSupplyResponse } as QueryTotalSupplyResponse;
    message.supply = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supply.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryTotalSupplyResponse {
    const message = { ...baseQueryTotalSupplyResponse } as QueryTotalSupplyResponse;
    message.supply = [];
    if (object.supply !== undefined && object.supply !== null) {
      for (const e of object.supply) {
        message.supply.push(Coin.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryTotalSupplyResponse>): QueryTotalSupplyResponse {
    const message = { ...baseQueryTotalSupplyResponse } as QueryTotalSupplyResponse;
    message.supply = [];
    if (object.supply !== undefined && object.supply !== null) {
      for (const e of object.supply) {
        message.supply.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: QueryTotalSupplyResponse): unknown {
    const obj: any = {};
    if (message.supply) {
      obj.supply = message.supply.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.supply = [];
    }
    return obj;
  },
};

export const QuerySupplyOfRequest = {
  encode(message: QuerySupplyOfRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.denom);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QuerySupplyOfRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuerySupplyOfRequest } as QuerySupplyOfRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySupplyOfRequest {
    const message = { ...baseQuerySupplyOfRequest } as QuerySupplyOfRequest;
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom);
    } else {
      message.denom = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<QuerySupplyOfRequest>): QuerySupplyOfRequest {
    const message = { ...baseQuerySupplyOfRequest } as QuerySupplyOfRequest;
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    } else {
      message.denom = "";
    }
    return message;
  },
  toJSON(message: QuerySupplyOfRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },
};

export const QuerySupplyOfResponse = {
  encode(message: QuerySupplyOfResponse, writer: Writer = Writer.create()): Writer {
    if (message.amount !== undefined && message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QuerySupplyOfResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuerySupplyOfResponse } as QuerySupplyOfResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QuerySupplyOfResponse {
    const message = { ...baseQuerySupplyOfResponse } as QuerySupplyOfResponse;
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromJSON(object.amount);
    } else {
      message.amount = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QuerySupplyOfResponse>): QuerySupplyOfResponse {
    const message = { ...baseQuerySupplyOfResponse } as QuerySupplyOfResponse;
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromPartial(object.amount);
    } else {
      message.amount = undefined;
    }
    return message;
  },
  toJSON(message: QuerySupplyOfResponse): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },
};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },
};

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined && message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
