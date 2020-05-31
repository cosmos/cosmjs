export interface ScryptParams {
  readonly dkLen: number;
  readonly n: number;
  readonly r: number;
  readonly p: number;
}
export declare function scrypt(
  password: Uint8Array,
  salt: Uint8Array,
  params: ScryptParams,
): Promise<Uint8Array>;
