import { Secp256k1, Sha256 } from "@cosmjs/crypto";

import { rawSecp256k1PubkeyToAddress } from "./address";
import { serializeSignDoc, StdSignDoc } from "./encoding";
import { encodeSecp256k1Signature } from "./signature";
import { AccountData, OfflineSigner, SignResponse } from "./signer";

export class Secp256k1Key implements OfflineSigner {
  /**
   * Creates a Secp256k1 key signer from the given private key
   *
   * @param privkey The private key.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  public static async fromPrivkey(privkey: Uint8Array, prefix = "cosmos"): Promise<Secp256k1Key> {
    const uncompressed = (await Secp256k1.makeKeypair(privkey)).pubkey;
    return new Secp256k1Key(privkey, Secp256k1.compressPubkey(uncompressed), prefix);
  }

  private readonly pubkey: Uint8Array;
  private readonly privkey: Uint8Array;
  private readonly prefix: string;

  private constructor(privkey: Uint8Array, pubkey: Uint8Array, prefix: string) {
    this.privkey = privkey;
    this.pubkey = pubkey;
    this.prefix = prefix;
  }

  private get address(): string {
    return rawSecp256k1PubkeyToAddress(this.pubkey, this.prefix);
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    return [
      {
        algo: "secp256k1",
        address: this.address,
        pubkey: this.pubkey,
      },
    ];
  }

  public async sign(signerAddress: string, signDoc: StdSignDoc): Promise<SignResponse> {
    if (signerAddress !== this.address) {
      throw new Error(`Address ${signerAddress} not found in wallet`);
    }
    const message = new Sha256(serializeSignDoc(signDoc)).digest();
    const signature = await Secp256k1.createSignature(message, this.privkey);
    const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);
    return {
      signed: signDoc,
      signature: encodeSecp256k1Signature(this.pubkey, signatureBytes),
    };
  }
}
