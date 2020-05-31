import * as scryptJs from "scrypt-js";

export interface ScryptParams {
  readonly dkLen: number;
  readonly n: number;
  readonly r: number;
  readonly p: number;
}

export async function scrypt(
  password: Uint8Array,
  salt: Uint8Array,
  params: ScryptParams,
): Promise<Uint8Array> {
  return scryptJs.scrypt(password, salt, params.n, params.r, params.p, params.dkLen);
}
