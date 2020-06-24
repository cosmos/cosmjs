import { JsonRpcRequest, JsonRpcSuccessResponse } from "@iov/jsonrpc";
import { RpcClient } from "./rpcclient";
export declare class HttpClient implements RpcClient {
  protected readonly url: string;
  constructor(url?: string);
  disconnect(): void;
  execute(request: JsonRpcRequest): Promise<JsonRpcSuccessResponse>;
}
