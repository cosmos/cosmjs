import { Encoding } from "@iov/encoding";
import * as scryptJs from "scrypt-js";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore: 7016
import * as scryptWasm from "./scrypt_wasm";

const { toHex, fromHex } = Encoding;

export interface ScryptParams {
  readonly dkLen: number;
  readonly n: number;
  readonly r: number;
  readonly p: number;
}

// Global symbols in some environments
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/WebAssembly
declare const WebAssembly: any | undefined;

type ScryptImplementation = "js" | "wasm";

export class Scrypt {
  public static async make(implementation?: ScryptImplementation): Promise<Scrypt> {
    const impl = implementation || "wasm";

    switch (impl) {
      case "js": {
        return new Scrypt(impl);
      }
      case "wasm": {
        const path = require("path").join(__dirname, "scrypt.wasm");
        const bytes = require("fs").readFileSync(path);
        // console.log(bytes);
        const wasmModule = new WebAssembly.Module(bytes);

        await scryptWasm.default(wasmModule);
        return new Scrypt(impl);
      }
      default:
        throw new Error("Unexpected implementation value");
    }
  }

  private readonly impl: ScryptImplementation;

  private constructor(impl: ScryptImplementation) {
    this.impl = impl;
  }

  public async run(password: Uint8Array, salt: Uint8Array, params: ScryptParams): Promise<Uint8Array> {
    switch (this.impl) {
      case "js": {
        return scryptJs.scrypt(password, salt, params.n, params.r, params.p, params.dkLen);
      }
      case "wasm": {
        return fromHex(
          scryptWasm.scrypt(toHex(password), toHex(salt), params.n, params.r, params.p, params.dkLen),
        );
      }
      default:
        throw new Error("Unexpected implementation value");
    }
  }
}
