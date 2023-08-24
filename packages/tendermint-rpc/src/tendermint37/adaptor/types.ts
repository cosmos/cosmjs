import { JsonRpcRequest, JsonRpcSuccessResponse } from "@cosmjs/json-rpc";

import * as requests from "../requests";
import * as responses from "../responses";

// Encoder is a generic that matches all methods of Params
export type Encoder<T extends requests.Request> = (req: T) => JsonRpcRequest;

// Decoder is a generic that matches all methods of Responses
export type Decoder<T extends responses.Response> = (res: JsonRpcSuccessResponse) => T;
