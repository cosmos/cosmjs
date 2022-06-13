import { hashBlock, hashTx } from "../hasher";
import { Params } from "./requests";
import { Responses } from "./responses";
import { Adaptor } from "./types";

export { Decoder, Encoder, Params, Responses } from "./types";

export const adaptor35: Adaptor = {
  params: Params,
  responses: Responses,
  hashTx: hashTx,
  hashBlock: hashBlock,
};
