import { Encoding } from "@iov/encoding";
import axios, { AxiosInstance } from "axios";

import { AminoTx, BaseAccount, isAminoStdTx, StdTx } from "./types";

const { fromUtf8 } = Encoding;

interface NodeInfo {
  readonly network: string;
}

interface NodeInfoResponse {
  readonly node_info: NodeInfo;
}

interface BlockMeta {
  readonly header: {
    readonly height: number;
    readonly time: string;
    readonly num_txs: number;
  };
  readonly block_id: {
    readonly hash: string;
  };
}

interface Block {
  readonly header: {
    readonly height: number;
  };
}

interface BlocksResponse {
  readonly block_meta: BlockMeta;
  readonly block: Block;
}

interface AuthAccountsResponse {
  readonly result: {
    readonly value: BaseAccount;
  };
}

export interface TxsResponse {
  readonly height: string;
  readonly txhash: string;
  readonly raw_log: string;
  readonly tx: AminoTx;
}

interface SearchTxsResponse {
  readonly total_count: string;
  readonly count: string;
  readonly page_number: string;
  readonly page_total: string;
  readonly limit: string;
  readonly txs: readonly TxsResponse[];
}

interface PostTxsParams {}

interface PostTxsResponse {
  readonly height: string;
  readonly txhash: string;
  readonly code?: number;
  readonly raw_log?: string;
}

interface EncodeTxResponse {
  // base64-encoded amino-binary encoded representation
  readonly tx: string;
}

type RestClientResponse =
  | NodeInfoResponse
  | BlocksResponse
  | AuthAccountsResponse
  | TxsResponse
  | SearchTxsResponse
  | PostTxsResponse
  | EncodeTxResponse;

type BroadcastMode = "block" | "sync" | "async";

export class RestClient {
  private readonly client: AxiosInstance;
  // From https://cosmos.network/rpc/#/ICS0/post_txs
  // The supported broadcast modes include "block"(return after tx commit), "sync"(return afer CheckTx) and "async"(return right away).
  private readonly mode: BroadcastMode;

  public constructor(url: string, mode: BroadcastMode = "block") {
    const headers = {
      post: { "Content-Type": "application/json" },
    };
    this.client = axios.create({
      baseURL: url,
      headers: headers,
    });
    this.mode = mode;
  }

  public async get(path: string): Promise<RestClientResponse> {
    const { data } = await this.client.get(path);
    if (data === null) {
      throw new Error("Received null response from server");
    }
    return data;
  }

  public async post(path: string, params: PostTxsParams): Promise<RestClientResponse> {
    const { data } = await this.client.post(path, params);
    if (data === null) {
      throw new Error("Received null response from server");
    }
    return data;
  }

  public async nodeInfo(): Promise<NodeInfoResponse> {
    const responseData = await this.get("/node_info");
    if (!(responseData as any).node_info) {
      throw new Error("Unexpected response data format");
    }
    return responseData as NodeInfoResponse;
  }

  public async blocksLatest(): Promise<BlocksResponse> {
    const responseData = await this.get("/blocks/latest");
    if (!(responseData as any).block) {
      throw new Error("Unexpected response data format");
    }
    return responseData as BlocksResponse;
  }

  public async blocks(height: number): Promise<BlocksResponse> {
    const responseData = await this.get(`/blocks/${height}`);
    if (!(responseData as any).block) {
      throw new Error("Unexpected response data format");
    }
    return responseData as BlocksResponse;
  }

  // encodeTx returns the amino-encoding of the transaction
  public async encodeTx(stdTx: StdTx): Promise<Uint8Array> {
    const tx = { type: "cosmos-sdk/StdTx", value: stdTx };
    const responseData = await this.post("/txs/encode", tx);
    if (!(responseData as any).tx) {
      throw new Error("Unexpected response data format");
    }
    return Encoding.fromBase64((responseData as EncodeTxResponse).tx);
  }

  public async authAccounts(address: string, height?: string): Promise<AuthAccountsResponse> {
    const path =
      height === undefined ? `/auth/accounts/${address}` : `/auth/accounts/${address}?tx.height=${height}`;
    const responseData = await this.get(path);
    if ((responseData as any).result.type !== "cosmos-sdk/Account") {
      throw new Error("Unexpected response data format");
    }
    return responseData as AuthAccountsResponse;
  }

  public async txs(query: string): Promise<SearchTxsResponse> {
    const responseData = await this.get(`/txs?${query}`);
    if (!(responseData as any).txs) {
      throw new Error("Unexpected response data format");
    }
    return responseData as SearchTxsResponse;
  }

  public async txsById(id: string): Promise<TxsResponse> {
    const responseData = await this.get(`/txs/${id}`);
    if (!(responseData as any).tx) {
      throw new Error("Unexpected response data format");
    }
    return responseData as TxsResponse;
  }

  // tx must be JSON encoded StdTx (no wrapper)
  public async postTx(tx: Uint8Array): Promise<PostTxsResponse> {
    // TODO: check this is StdTx
    const decoded = JSON.parse(fromUtf8(tx));
    if (!isAminoStdTx(decoded)) {
      throw new Error("Must be json encoded StdTx");
    }
    const params = {
      tx: decoded,
      mode: this.mode,
    };
    const responseData = await this.post("/txs", params);
    if (!(responseData as any).txhash) {
      throw new Error("Unexpected response data format");
    }
    return responseData as PostTxsResponse;
  }
}
