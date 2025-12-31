/* eslint-disable no-bitwise */
import { fromHex } from "@cosmjs/encoding";

import { Ed25519, Ed25519Keypair } from "./ed25519";

describe("Ed25519Keypair", () => {
  it("loads from Libsodium private key", () => {
    const keypair = Ed25519Keypair.fromLibsodiumPrivkey(
      fromHex(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      ),
    );
    expect(keypair.privkey).toEqual(
      fromHex("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"),
    );
    expect(keypair.pubkey).toEqual(
      fromHex("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"),
    );
  });

  it("exports Libsodium private key", () => {
    const keypair = new Ed25519Keypair(
      fromHex("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"),
      fromHex("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"),
    );
    expect(keypair.toLibsodiumPrivkey()).toEqual(
      fromHex(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      ),
    );
  });
});

describe("Ed25519", () => {
  it("exists", () => {
    expect(Ed25519).toBeTruthy();
  });

  it("generates keypairs", async () => {
    {
      // ok
      const seed = fromHex("43a9c17ccbb0e767ea29ce1f10813afde5f1e0a7a504e89b4d2cc2b952b8e0b9");
      const keypair = await Ed25519.makeKeypair(seed);
      expect(keypair).toBeTruthy();
      expect(keypair.pubkey).toBeTruthy();
      expect(keypair.privkey).toBeTruthy();
      expect(keypair.pubkey.byteLength).toEqual(32);
      expect(keypair.privkey.byteLength).toEqual(32);
      expect(keypair.privkey).toEqual(seed);
    }

    {
      // Test secret to public conversion (TEST 1–4 from https://tools.ietf.org/html/rfc8032#section-7.1)
      const privkey1 = fromHex("9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60");
      const pubkey1 = (await Ed25519.makeKeypair(privkey1)).pubkey;
      expect(pubkey1).toEqual(fromHex("d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a"));

      const privkey2 = fromHex("4ccd089b28ff96da9db6c346ec114e0f5b8a319f35aba624da8cf6ed4fb8a6fb");
      const pubkey2 = (await Ed25519.makeKeypair(privkey2)).pubkey;
      expect(pubkey2).toEqual(fromHex("3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c"));

      const privkey3 = fromHex("c5aa8df43f9f837bedb7442f31dcb7b166d38535076f094b85ce3a2e0b4458f7");
      const pubkey3 = (await Ed25519.makeKeypair(privkey3)).pubkey;
      expect(pubkey3).toEqual(fromHex("fc51cd8e6218a1a38da47ed00230f0580816ed13ba3303ac5deb911548908025"));

      const privkey4 = fromHex("f5e5767cf153319517630f226876b86c8160cc583bc013744c6bf255f5cc0ee5");
      const pubkey4 = (await Ed25519.makeKeypair(privkey4)).pubkey;
      expect(pubkey4).toEqual(fromHex("278117fc144c72340f67d0f2316e8386ceffbf2b2428c9c51fef7c597f1d426e"));
    }

    {
      // seed too short
      const seed = fromHex("43a9c17ccbb0e767ea29ce1f10813afde5f1e0a7a504e89b4d2cc2b952b8e0");
      await expectAsync(Ed25519.makeKeypair(seed)).toBeRejectedWithError(
        /"secretKey" expected Uint8Array of length 32, got length=31/,
      );
    }

    {
      // seed too long
      const seed = fromHex("43a9c17ccbb0e767ea29ce1f10813afde5f1e0a7a504e89b4d2cc2b952b8e0b9aa");
      await expectAsync(Ed25519.makeKeypair(seed)).toBeRejectedWithError(
        /"secretKey" expected Uint8Array of length 32, got length=33/,
      );
    }
  });

  it("generates keypairs deterministically", async () => {
    const seedA1 = fromHex("43a9c17ccbb0e767ea29ce1f10813afde5f1e0a7a504e89b4d2cc2b952b8e0b9");
    const seedA2 = fromHex("43a9c17ccbb0e767ea29ce1f10813afde5f1e0a7a504e89b4d2cc2b952b8e0b9");
    const seedB1 = fromHex("c0c42a0276d456ee007faae2cc7d1bc8925dd74983726d548e10da14c3aed12a");
    const seedB2 = fromHex("c0c42a0276d456ee007faae2cc7d1bc8925dd74983726d548e10da14c3aed12a");

    const keypairA1 = await Ed25519.makeKeypair(seedA1);
    const keypairA2 = await Ed25519.makeKeypair(seedA2);
    const keypairB1 = await Ed25519.makeKeypair(seedB1);
    const keypairB2 = await Ed25519.makeKeypair(seedB2);

    expect(keypairA1).toEqual(keypairA2);
    expect(keypairB1).toEqual(keypairB2);
    expect(keypairA1).not.toEqual(keypairB1);
    expect(keypairA2).not.toEqual(keypairB2);
  });

  it("creates signatures", async () => {
    const seed = fromHex("43a9c17ccbb0e767ea29ce1f10813afde5f1e0a7a504e89b4d2cc2b952b8e0b9");
    const keypair = await Ed25519.makeKeypair(seed);
    const message = new Uint8Array([0x11, 0x22]);
    const signature = await Ed25519.createSignature(message, keypair);
    expect(signature).toBeTruthy();
    expect(signature.byteLength).toEqual(64);
  });

  it("creates signatures deterministically", async () => {
    const seed = fromHex("43a9c17ccbb0e767ea29ce1f10813afde5f1e0a7a504e89b4d2cc2b952b8e0b9");
    const keypair = await Ed25519.makeKeypair(seed);
    const message = new Uint8Array([0x11, 0x22]);

    const signature1 = await Ed25519.createSignature(message, keypair);
    const signature2 = await Ed25519.createSignature(message, keypair);
    expect(signature1).toEqual(signature2);
  });

  it("verifies signatures", async () => {
    const seed = fromHex("43a9c17ccbb0e767ea29ce1f10813afde5f1e0a7a504e89b4d2cc2b952b8e0b9");
    const keypair = await Ed25519.makeKeypair(seed);
    const message = new Uint8Array([0x11, 0x22]);
    const signature = await Ed25519.createSignature(message, keypair);

    {
      // valid
      const ok = await Ed25519.verifySignature(signature, message, keypair.pubkey);
      expect(ok).toEqual(true);
    }

    {
      // message corrupted
      const corruptedMessage = message.map((x, i) => (i === 0 ? x ^ 0x01 : x));
      const ok = await Ed25519.verifySignature(signature, corruptedMessage, keypair.pubkey);
      expect(ok).toEqual(false);
    }

    {
      // signature corrupted
      const corruptedSignature = signature.map((x, i) => (i === 0 ? x ^ 0x01 : x));
      const ok = await Ed25519.verifySignature(corruptedSignature, message, keypair.pubkey);
      expect(ok).toEqual(false);
    }

    {
      // wrong pubkey
      const otherSeed = fromHex("91099374790843e29552c3cfa5e9286d6c77e00a2c109aaf3d0a307081314a09");
      const wrongPubkey = (await Ed25519.makeKeypair(otherSeed)).pubkey;
      const ok = await Ed25519.verifySignature(signature, message, wrongPubkey);
      expect(ok).toEqual(false);
    }
  });

  it("works with RFC8032 test vectors", async () => {
    {
      // TEST 1 from https://tools.ietf.org/html/rfc8032#section-7.1
      const keypair = new Ed25519Keypair(
        fromHex("9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60"),
        fromHex("d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a"),
      );
      const message = fromHex("");
      const signature = await Ed25519.createSignature(message, keypair);
      expect(signature).toEqual(
        fromHex(
          "e5564300c360ac729086e2cc806e828a84877f1eb8e5d974d873e065224901555fb8821590a33bacc61e39701cf9b46bd25bf5f0595bbe24655141438e7a100b",
        ),
      );
      const valid = await Ed25519.verifySignature(signature, message, keypair.pubkey);
      expect(valid).toEqual(true);
    }

    {
      // TEST 2 from https://tools.ietf.org/html/rfc8032#section-7.1
      const keypair = new Ed25519Keypair(
        fromHex("4ccd089b28ff96da9db6c346ec114e0f5b8a319f35aba624da8cf6ed4fb8a6fb"),
        fromHex("3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c"),
      );
      const message = fromHex("72");
      const signature = await Ed25519.createSignature(message, keypair);
      expect(signature).toEqual(
        fromHex(
          "92a009a9f0d4cab8720e820b5f642540a2b27b5416503f8fb3762223ebdb69da085ac1e43e15996e458f3613d0f11d8c387b2eaeb4302aeeb00d291612bb0c00",
        ),
      );
      const valid = await Ed25519.verifySignature(signature, message, keypair.pubkey);
      expect(valid).toEqual(true);
    }

    {
      // TEST 3 from https://tools.ietf.org/html/rfc8032#section-7.1
      const keypair = new Ed25519Keypair(
        fromHex("c5aa8df43f9f837bedb7442f31dcb7b166d38535076f094b85ce3a2e0b4458f7"),
        fromHex("fc51cd8e6218a1a38da47ed00230f0580816ed13ba3303ac5deb911548908025"),
      );
      const message = fromHex("af82");
      const signature = await Ed25519.createSignature(message, keypair);
      expect(signature).toEqual(
        fromHex(
          "6291d657deec24024827e69c3abe01a30ce548a284743a445e3680d7db5ac3ac18ff9b538d16f290ae67f760984dc6594a7c15e9716ed28dc027beceea1ec40a",
        ),
      );
      const valid = await Ed25519.verifySignature(signature, message, keypair.pubkey);
      expect(valid).toEqual(true);
    }

    {
      // TEST 1024 from https://tools.ietf.org/html/rfc8032#section-7.1
      const keypair = new Ed25519Keypair(
        fromHex("f5e5767cf153319517630f226876b86c8160cc583bc013744c6bf255f5cc0ee5"),
        fromHex("278117fc144c72340f67d0f2316e8386ceffbf2b2428c9c51fef7c597f1d426e"),
      );
      const message = fromHex(
        "08b8b2b733424243760fe426a4b54908632110a66c2f6591eabd3345e3e4eb98fa6e264bf09efe12ee50f8f54e9f77b1e355f6c50544e23fb1433ddf73be84d879de7c0046dc4996d9e773f4bc9efe5738829adb26c81b37c93a1b270b20329d658675fc6ea534e0810a4432826bf58c941efb65d57a338bbd2e26640f89ffbc1a858efcb8550ee3a5e1998bd177e93a7363c344fe6b199ee5d02e82d522c4feba15452f80288a821a579116ec6dad2b3b310da903401aa62100ab5d1a36553e06203b33890cc9b832f79ef80560ccb9a39ce767967ed628c6ad573cb116dbefefd75499da96bd68a8a97b928a8bbc103b6621fcde2beca1231d206be6cd9ec7aff6f6c94fcd7204ed3455c68c83f4a41da4af2b74ef5c53f1d8ac70bdcb7ed185ce81bd84359d44254d95629e9855a94a7c1958d1f8ada5d0532ed8a5aa3fb2d17ba70eb6248e594e1a2297acbbb39d502f1a8c6eb6f1ce22b3de1a1f40cc24554119a831a9aad6079cad88425de6bde1a9187ebb6092cf67bf2b13fd65f27088d78b7e883c8759d2c4f5c65adb7553878ad575f9fad878e80a0c9ba63bcbcc2732e69485bbc9c90bfbd62481d9089beccf80cfe2df16a2cf65bd92dd597b0707e0917af48bbb75fed413d238f5555a7a569d80c3414a8d0859dc65a46128bab27af87a71314f318c782b23ebfe808b82b0ce26401d2e22f04d83d1255dc51addd3b75a2b1ae0784504df543af8969be3ea7082ff7fc9888c144da2af58429ec96031dbcad3dad9af0dcbaaaf268cb8fcffead94f3c7ca495e056a9b47acdb751fb73e666c6c655ade8297297d07ad1ba5e43f1bca32301651339e22904cc8c42f58c30c04aafdb038dda0847dd988dcda6f3bfd15c4b4c4525004aa06eeff8ca61783aacec57fb3d1f92b0fe2fd1a85f6724517b65e614ad6808d6f6ee34dff7310fdc82aebfd904b01e1dc54b2927094b2db68d6f903b68401adebf5a7e08d78ff4ef5d63653a65040cf9bfd4aca7984a74d37145986780fc0b16ac451649de6188a7dbdf191f64b5fc5e2ab47b57f7f7276cd419c17a3ca8e1b939ae49e488acba6b965610b5480109c8b17b80e1b7b750dfc7598d5d5011fd2dcc5600a32ef5b52a1ecc820e308aa342721aac0943bf6686b64b2579376504ccc493d97e6aed3fb0f9cd71a43dd497f01f17c0e2cb3797aa2a2f256656168e6c496afc5fb93246f6b1116398a346f1a641f3b041e989f7914f90cc2c7fff357876e506b50d334ba77c225bc307ba537152f3f1610e4eafe595f6d9d90d11faa933a15ef1369546868a7f3a45a96768d40fd9d03412c091c6315cf4fde7cb68606937380db2eaaa707b4c4185c32eddcdd306705e4dc1ffc872eeee475a64dfac86aba41c0618983f8741c5ef68d3a101e8a3b8cac60c905c15fc910840b94c00a0b9d0",
      );
      const signature = await Ed25519.createSignature(message, keypair);
      expect(signature).toEqual(
        fromHex(
          "0aab4c900501b3e24d7cdf4663326a3a87df5e4843b2cbdb67cbf6e460fec350aa5371b1508f9f4528ecea23c436d94b5e8fcd4f681e30a6ac00a9704a188a03",
        ),
      );
      const valid = await Ed25519.verifySignature(signature, message, keypair.pubkey);
      expect(valid).toEqual(true);
    }
  });
});
