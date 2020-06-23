import { Adaptor } from "../adaptor";
import { hashBlock, hashTx } from "./hasher";
import { Params } from "./requests";
import { Responses } from "./responses";

// eslint-disable-next-line @typescript-eslint/camelcase
export const v0_33: Adaptor = {
  params: Params,
  responses: Responses,
  hashTx: hashTx,
  hashBlock: hashBlock,
};
