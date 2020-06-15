import { Adaptor } from "../adaptor";
import { hashBlock, hashTx } from "./hasher";
import { Params } from "./requests";
import { Responses } from "./responses";

// tslint:disable-next-line:variable-name
export const v0_32: Adaptor = {
  params: Params,
  responses: Responses,
  hashTx: hashTx,
  hashBlock: hashBlock,
};
