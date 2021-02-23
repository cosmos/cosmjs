/* eslint-disable @typescript-eslint/naming-convention */
import { Adaptor } from "../../adaptor";
import { hashBlock, hashTx } from "../../hasher";
import { Params } from "./requests";
import { Responses } from "./responses";

export const v0_34: Adaptor = {
  params: Params,
  responses: Responses,
  hashTx: hashTx,
  hashBlock: hashBlock,
};
