/* eslint-disable no-bitwise */
import { fromHex, toAscii } from "@cosmjs/encoding";

import { Argon2id, Argon2idOptions, Ed25519, Ed25519Keypair, Xchacha20poly1305Ietf } from "./libsodium";

describe("Libsodium", () => {
  describe("Argon2id", () => {
    // we use relatively week values here to avoid slowing down test execution

    it("works for 1 MiB memory and opsLimit = 5", async () => {
      const options: Argon2idOptions = {
        outputLength: 32,
        opsLimit: 5,
        memLimitKib: 1024,
      };
      const salt = toAscii("ABCDEFGHIJKLMNOP");

      // echo -n "123" | ./argon2 ABCDEFGHIJKLMNOP -id -v 13 -k 1024 -t 5
      await Argon2id.execute("123", salt, options).then((result) => {
        expect(result).toEqual(fromHex("3c5d010180ba0cf5b6b858cba23b318e42d33088983c404598599c3b029ecac6"));
      });
      await Argon2id.execute("!'§$%&/()", salt, options).then((result) => {
        expect(result).toEqual(fromHex("b0268bd63015c3d8f866f9be385507b466a9bfc75f271c2c1e97c00bf53224ba"));
      });
      await Argon2id.execute("ö", salt, options).then((result) => {
        expect(result).toEqual(fromHex("b113fc7863dbc87b7d1366c3b468d3864a2473ce46e90ed3641fff87ada561f7"));
      });
      await Argon2id.execute("😎", salt, options).then((result) => {
        expect(result).toEqual(fromHex("dc92db2a69a5607a75472e1581ac0851292ed9a2606f1000f62fa2efc97964e0"));
      });
    });

    it("works for 8 MiB memory and opsLimit = 2", async () => {
      const options: Argon2idOptions = {
        outputLength: 32,
        opsLimit: 2,
        memLimitKib: 8 * 1024,
      };
      const salt = toAscii("ABCDEFGHIJKLMNOP");

      // echo -n "123" | ./argon2 ABCDEFGHIJKLMNOP -id -v 13 -k 8192 -t 2
      await Argon2id.execute("123", salt, options).then((result) => {
        expect(result).toEqual(fromHex("3ee950488d26ce691657b1d753f562139857b61a58f234d6cb0ce84c4cc27328"));
      });
      await Argon2id.execute("!'§$%&/()", salt, options).then((result) => {
        expect(result).toEqual(fromHex("ab410498b44942a28f9d0dde72f0398edf104021ee41bb80412464975817a8a1"));
      });
      await Argon2id.execute("ö", salt, options).then((result) => {
        expect(result).toEqual(fromHex("f80c502bc3fe7b191f6e7e06359955d5dbd23f532548b7058ecbcf77a58e683d"));
      });
      await Argon2id.execute("😎", salt, options).then((result) => {
        expect(result).toEqual(fromHex("474d9445596d2600ba3dc9bbe87d21ed4879e2445cafb10fcb69c5c3ab8ecbc7"));
      });
    });

    it("works for 10 MiB memory and opsLimit = 1", async () => {
      const options: Argon2idOptions = {
        outputLength: 32,
        opsLimit: 1,
        memLimitKib: 10 * 1024,
      };
      const salt = toAscii("ABCDEFGHIJKLMNOP");

      // echo -n "123" | ./argon2 ABCDEFGHIJKLMNOP -id -v 13 -k 10240 -t 1
      await Argon2id.execute("123", salt, options).then((result) => {
        expect(result).toEqual(fromHex("f1832edbd41c209546eafd01f3aae28390de39bc13ff38981c4fc0c1ceaa05e3"));
      });
      await Argon2id.execute("!'§$%&/()", salt, options).then((result) => {
        expect(result).toEqual(fromHex("30c74f405d148fd5c882a0f4238aad9ed85ef255adc102411d22736d68f76f76"));
      });
      await Argon2id.execute("ö", salt, options).then((result) => {
        expect(result).toEqual(fromHex("b80a62f11e7a058194a8ddd80d341c47e0f3b6c41c72ee15b7926788e9963e8f"));
      });
      await Argon2id.execute("😎", salt, options).then((result) => {
        expect(result).toEqual(fromHex("b868aa1875de2edc57bc22de1fc75f9d19f451067c529565f73c61958088b5e9"));
      });
    });

    it("works for different output lengths", async () => {
      // echo -n "123" | ./argon2 ABCDEFGHIJKLMNOP -id -v 13 -k 1024 -t 5 -l 16
      const salt = toAscii("ABCDEFGHIJKLMNOP");

      // libsodium does not support output length < 16
      const data = new Map<number, string>();
      data.set(16, "01a5ea70c68132b474bdb7f996f55a5a");
      data.set(24, "14cf66110e167ebdbea968328bba3f40113077bc359acbe8");
      data.set(32, "3c5d010180ba0cf5b6b858cba23b318e42d33088983c404598599c3b029ecac6");
      data.set(
        48,
        "1141dc209086803b06fe0835be055ed592289c9baf9a9db6cd584cd63c2712ca0efc989017a73d6dafb7211a9d09413f",
      );
      data.set(
        96,
        "cdb42cddd7190d0ab2453571f644ebf1214177886a51639f23518e1c92d73a196cadddf927bbc8fac59ab3615325642920d7dd73171c7b63f17e1ae173a7b6372bac7525a3230ab1edf6e3ed5c971321186c00a544c79d96bc65263eb5a85d50",
      );
      data.set(
        128,
        "c0108a962f59c30b6af298025ad8b8027791cc91f74b96a01a92993e41871e391516e831210bdd3ae20fe501b9c2279d59d42ebc777286088d56a87f30eea04829b9903cb05a468f320e4aced531c7b10631463141a9cbd903dbad4c9b43b2ca0c56ff5a0093179924685e061979e49a593719bb3373152856df922b0007bd9f",
      );
      data.set(
        192,
        "092aeca103de921794a97abfd4f0dd1e51de29c62f372e2a984f72d280c12067316db192e47d37ccfd07243bb1ea9a14f7a361a1ab3f5c4be70fb33fea868d9047bdf9ccc52cde1f1cefbb77923b236a690f30f03ebd2ebf72cd47e2acf28627d64b6bd0fe1f8fb2e598017c4892413b83df2ab4c210b51bd730644fa042fee64653a33fbc81dc715c1e05ed4592b71dee1b3fa080b3d332bd96b50c9a1b1c71b7b4e131517dcb63ab628679d20a386f98948d8b9ecf99f32611c9f747abb2d5",
      );
      data.set(
        256,
        "94aaf5677f2c0ad13d504bbbfe9b05bbcb8194c8415c119c9d3c170fbcff0e0a42ffa48c11085c6c61f0942d88d32e0da3408099991148db876e29fc5ca80b8425ac0a09987393d7c67fc62ff21fb9713442f3a67690350a871d99bedaecb7c86c357410631c89eedf04c97e386ecb5c0028d53f2d1d6aacba67d2e7bd23792689367dfd777eb28ff4de1753955dcb5f85f34a03684089590927ebd09c251cec4abb7f717ebed22690116938c5ca8404ae7814e9391c4f3c023bafad92b26899f94b6b3dc13ebc7fa693a9233a73f3b2f06b337af3a848b006e8c53bf24b79ca50df8f638304a8671f6949fde9239e0bfa78b5a7ddf424b808a0bfcd2b4fbb20",
      );

      for (const length of data.keys()) {
        const options: Argon2idOptions = {
          outputLength: length,
          opsLimit: 5,
          memLimitKib: 1024,
        };
        await Argon2id.execute("123", salt, options).then((result) => {
          expect(result).toEqual(fromHex(data.get(length)!));
        });
      }
    });

    it("throw for invalid salt lengths", async () => {
      const password = "123";
      const options: Argon2idOptions = {
        outputLength: 32,
        opsLimit: 1,
        memLimitKib: 10 * 1024,
      };

      // 8 bytes
      await Argon2id.execute(password, fromHex("aabbccddeeff0011"), options)
        .then(() => {
          fail("Argon2id with invalid salt length must not resolve");
        })
        .catch((e) => {
          expect(e).toMatch(/invalid salt length/);
        });
      // 15 bytes
      await Argon2id.execute(password, fromHex("aabbccddeeff001122334455667788"), options)
        .then(() => {
          fail("Argon2id with invalid salt length must not resolve");
        })
        .catch((e) => {
          expect(e).toMatch(/invalid salt length/);
        });
      // 17 bytes
      await Argon2id.execute(password, fromHex("aabbccddeeff00112233445566778899aa"), options)
        .then(() => {
          fail("Argon2id with invalid salt length must not resolve");
        })
        .catch((e) => {
          expect(e).toMatch(/invalid salt length/);
        });
      // 32 bytes
      await Argon2id.execute(
        password,
        fromHex("aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899"),
        options,
      )
        .then(() => {
          fail("Argon2id with invalid salt length must not resolve");
        })
        .catch((e) => {
          expect(e).toMatch(/invalid salt length/);
        });
    });
  });

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
        await Ed25519.makeKeypair(seed)
          .then(() => {
            fail("promise must not resolve");
          })
          .catch((error) => {
            expect(error.message).toContain("invalid seed length");
          });
      }

      {
        // seed too long
        const seed = fromHex("43a9c17ccbb0e767ea29ce1f10813afde5f1e0a7a504e89b4d2cc2b952b8e0b9aa");
        await Ed25519.makeKeypair(seed)
          .then(() => {
            fail("promise must not resolve");
          })
          .catch((error) => {
            expect(error.message).toContain("invalid seed length");
          });
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

  describe("Xchacha20poly1305Ietf", () => {
    it("can encrypt and decypt simple data", async () => {
      const key = fromHex("1324cdddc4b94e625bbabcac862c9429ba011e2184a1ccad60e7c3f6ff4916d8");
      const nonce = fromHex("000000000000000000000000000000000000000000000000");

      const originalMessage = new Uint8Array([0x11, 0x22, 0x33, 0x44]);
      const ciphertext = await Xchacha20poly1305Ietf.encrypt(originalMessage, key, nonce);
      expect(ciphertext).toBeTruthy();
      expect(ciphertext.length).toEqual(4 /* message length */ + 16 /* tag length*/);

      const decrypted = await Xchacha20poly1305Ietf.decrypt(ciphertext, key, nonce);
      expect(decrypted).toBeTruthy();
      expect(decrypted).toEqual(originalMessage);
    });

    it("throws when encrypting with wrong key length", async () => {
      const nonce = fromHex("000000000000000000000000000000000000000000000000");
      const message = new Uint8Array([]);

      {
        // empty
        const key = fromHex("");
        await Xchacha20poly1305Ietf.encrypt(message, key, nonce)
          .then(() => {
            fail("encryption must not succeed");
          })
          .catch((error) => {
            expect(error).toMatch(/invalid key length/);
          });
      }
      {
        // 31 bytes
        const key = fromHex("1324cdddc4b94e625bbabcac862c9429ba011e2184a1ccad60e7c3f6ff4916");
        await Xchacha20poly1305Ietf.encrypt(message, key, nonce)
          .then(() => {
            fail("encryption must not succeed");
          })
          .catch((error) => {
            expect(error).toMatch(/invalid key length/);
          });
      }
      {
        // 33 bytes
        const key = fromHex("1324cdddc4b94e625bbabcac862c9429ba011e2184a1ccad60e7c3f6ff4916d8aa");
        await Xchacha20poly1305Ietf.encrypt(message, key, nonce)
          .then(() => {
            fail("encryption must not succeed");
          })
          .catch((error) => {
            expect(error).toMatch(/invalid key length/);
          });
      }
      {
        // 64 bytes
        const key = fromHex(
          "1324cdddc4b94e625bbabcac862c9429ba011e2184a1ccad60e7c3f6ff4916d81324cdddc4b94e625bbabcac862c9429ba011e2184a1ccad60e7c3f6ff4916d8",
        );
        await Xchacha20poly1305Ietf.encrypt(message, key, nonce)
          .then(() => {
            fail("encryption must not succeed");
          })
          .catch((error) => {
            expect(error).toMatch(/invalid key length/);
          });
      }
    });

    it("decryption fails with wrong ciphertext/key/nonce", async () => {
      const key = fromHex("1324cdddc4b94e625bbabcac862c9429ba011e2184a1ccad60e7c3f6ff4916d8");
      const nonce = fromHex("000000000000000000000000000000000000000000000000");

      const originalMessage = new Uint8Array([0x11, 0x22, 0x33, 0x44]);
      const ciphertext = await Xchacha20poly1305Ietf.encrypt(originalMessage, key, nonce);
      expect(ciphertext).toBeTruthy();
      expect(ciphertext.length).toEqual(4 /* message length */ + 16 /* tag length*/);

      {
        // baseline
        expect(await Xchacha20poly1305Ietf.decrypt(ciphertext, key, nonce)).toEqual(originalMessage);
      }
      {
        // corrupted ciphertext
        const corruptedCiphertext = ciphertext.map((x, i) => (i === 0 ? x ^ 0x01 : x));
        await Xchacha20poly1305Ietf.decrypt(corruptedCiphertext, key, nonce).then(
          () => {
            fail("promise must not resolve");
          },
          (error) => {
            expect(error.message).toMatch(/ciphertext cannot be decrypted using that key/i);
          },
        );
      }
      {
        // corrupted key
        const corruptedKey = key.map((x, i) => (i === 0 ? x ^ 0x01 : x));
        await Xchacha20poly1305Ietf.decrypt(ciphertext, corruptedKey, nonce).then(
          () => {
            fail("promise must not resolve");
          },
          (error) => {
            expect(error.message).toMatch(/ciphertext cannot be decrypted using that key/i);
          },
        );
      }
      {
        // corrupted nonce
        const corruptedNonce = nonce.map((x, i) => (i === 0 ? x ^ 0x01 : x));
        await Xchacha20poly1305Ietf.decrypt(ciphertext, key, corruptedNonce).then(
          () => {
            fail("promise must not resolve");
          },
          (error) => {
            expect(error.message).toMatch(/ciphertext cannot be decrypted using that key/i);
          },
        );
      }
    });

    it("encrypt conforms to Botan implementation ", async () => {
      // Test data generated by
      // echo -n "<message>" | ./botan encryption --mode=chacha20poly1305 --iv=000000000000000000000000000000000000000000000000 --ad= --key=0000000000000000000000000000000000000000000000000000000000000000 | xxd -p -c 1000000

      // Tested messages:
      // empty, "a", "ab", "abc", 577 (prime) random bytes, 1024 random bytes

      {
        // zero key, zero nonce
        const key = fromHex("0000000000000000000000000000000000000000000000000000000000000000");
        const nonce = fromHex("000000000000000000000000000000000000000000000000");

        expect(await Xchacha20poly1305Ietf.encrypt(fromHex(""), key, nonce)).toEqual(
          fromHex("8f3b945a51906dc8600de9f8962d00e6"),
        );
        expect(await Xchacha20poly1305Ietf.encrypt(fromHex("61"), key, nonce)).toEqual(
          fromHex("19841f4c8866efab6c6b5329aef9e36752"),
        );
        expect(await Xchacha20poly1305Ietf.encrypt(fromHex("6162"), key, nonce)).toEqual(
          fromHex("19fcc0cbdcffdf83f822811687b79930dcf7"),
        );
        expect(await Xchacha20poly1305Ietf.encrypt(fromHex("616263"), key, nonce)).toEqual(
          fromHex("19fcf5f6e7aba23c37d7a59e4c8f061e15f1f6"),
        );
        expect(
          await Xchacha20poly1305Ietf.encrypt(
            fromHex(
              "ad376ccca21922a93f532f98bcede77577c5fb857ab280215b7ead7321844f23a42349e9095f394f028f0c731d43db471e39a008a79f5932cb709f2e48743f7a77bd3ee87f93fca8f33ff792daf289e7d4577299f52e0808222311df5e1bdf97c844daa0e9c62123c5df2f3ddc7f873052ee6ee282fa65a7a54d8b91c8e32f628b96c55bdc7db6a43ab156de528dd00e92a27e384addd02fb91cfff0bcf5a64f81738f82b49677661ffedc91af07f3e1ad62aef54daa9980ba4a221a5986c7c29d6867fa9e5db4ff9066da136afdd733b15a404d2dc195885ab0d82e1d1cc5cbae4011ce83146f079702813693483624c53c31775995e96b71def34a7d82c53b9bf4d7f612e89fdeb237f4df28e69f8cb8a3bc04c883915d3416a26c8e23c78efeb1ed658d0d6e7f95bc75c1652014084169569afac77c5b039d7db15c01a5b270b38a1e3d37fb1723a2de1b8ff0333d26ca5514473d3e98f815c894623779653018b7c7abcfe0cdc16f76b773332da2ef861cb7322aebbc64c880b7d805edd416cb231b18d910f0a93924f186fa490feb02ee5d21c17e76c526527951824f0c25dd658731c568d2beeb4619602362d3f07a5458399f68089dd196ef3db907730d48fa1fb4c5ea3dc6e9fc4493dc9662de0d87308be5cdbb8355e2b3a4c483d09ad71d97439950719cf88a6a0d1b616e0960ef2a320f4258a66f83d29f6a8d906427f4d94c0043bfd173a04c06c2e0e48e5c77d32578ee75bf553855f5daa8e376aca79b131bad85a0e78e224babd103ca84e7a3562610409b1c9b52b42548cd6c",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "d5a9fa454739afd6e6b2dc5d09d9f83d98dd5abb3b3b188c81a33ad048bed75c2aa1a53cc81c02b1d3204506114cc4b58278d4a8fc8ec3916298ac165a94ff84d32320086cd98c0127a3d372112a75dc7629e55ac704dc8fd55be9033409f03254fae947912c0f737e8626f44b63c8dc7d7d3cddf57348b06fe80af61627f9a5a282b8d49cd2adf5191dd7855ffa5b931295773744691ba0b99305de8581184046c074148a8488d021122ddec21482bde85029aecd09907371ae67abc6cfc44655c3b49e7df3e2fac6b73b2803746bd1b4d17b30f5c2dfc31a7c33be5c737330e855d7630155523e3fb85c55a5ff95fd0754f4e9c5f0d88827bb28caa9af2d8f3e52b5d0957dd37d77af5df644bc483a6583d3b1e32d3b5dcbe7a6684ff8c0e44c7250744f705fce4e588f3a2ae65cac0c2b218d455911a2415fd839d3ef288d7447d6e561f4d70e93a739f6890ee3b6edcd3089266bd17d73a0c7fb96a1cdf96b2b7b18f38fe73bb6eb437a37588628ab51894b421137d1032a480643f5b36bb894ae82b8927fa7e87c906b90a3379b3f0aabee718a1e87f31dbfa3f8b1ebb5df9fdf96cd93ecdfcd421ded6299929676fa58ed3034f13474fa278b0a2c62b136e211e7a33e437e24386aae16524adc17557112fdaf484c5e6a038e8513cb2cb157816d6c85406aaae5514ca5b900dd18a90147311a37c82538e1f9adbad1bdc993264475cc54f61e54e048d63190cf138f3cdb5faf52e954d1caa8081a614beb44b2d9bea7e30d51513b4c3fd77e1cfd84e58588f733116c9be6b15cd4f72e3d602c2fe77f7880b91f62197c547df9d2",
          ),
        );
        expect(
          await Xchacha20poly1305Ietf.encrypt(
            fromHex(
              "09b7b8c14569057a7c4cdc611b839bda48123c1aba86a3e1ac6ca981c7a8c1885c9d95c661d3ff530aaf9f07f8233049ebe92297fb3a708352c59fa703087011117215142f10843b976862579be7cea3d8112d3ae69f58ed9d9684da5c51123a73e5b08627ef83b1f8feb3ef91ca8f1be327468e0cc2b3bffc1a8ef1291cedf80ff8320b90f0d17fb623c447e65f4fa48a17327d427d1aa6bb445c61dda9cc9b5c1611675e618fe6b79ab9bf045cfe0b1295aa72ff1c73d6641fb942a831506c0d268c628abff8925c011d222c443b73f18e994077f1c7a893123ed400cf2f11b8fa144c0d8fc5afcd2960281f067f1329cd4abf15a1a701762121b1e103db9538f989443fbc824d39fab22b622ec98632e957adbb39dd956f31b42af3629d8fcd461c9d4519105c0f308c7c45888583832c3c659b17b0733bc7257a9c00899a4ba9933c211579480e5c30d6837241a59d044280df466d55d0b46dcfa2db4c809023d77c2503ed3afd82489c98b0949baac0a00403af770e65c45607b615912eaf7c727b15cf976e742c1cb75fc160966dda4504edc7322a9479cb2617286c85b1412b9ffc067be3f9d2fd49568a29fe40115cf76de6dd7cc3f7e833bafbdffc39097150fe14960582a39d10102aa86718f59b102c89441806c80acfe300ea415be03162e729bd92a75b4e18a33470409034bc7fc7e9fb6c4823d6bfc77d75046c0927922dae805c7ced7a4a6fb4f46a15ee6b145e0dae56e6480ac726f7ccd5296fb2c82b5ebc2239eac2d81cea4fa789e0187134a270b6e74fc7932983e6e993e391ecc0dc9cb5963a644c6ece2eba6564533a330861eaac6120f84959e5b41ccbbe2255db17106a9955a94964ba07c5b1d1a0159f3f1e8f76f65181c17e3d616398df19fe6d8625922f5a0fd384b3238761a2003e5b5101c0c795c48ceb3ec72d9f7f5cf42df449075153f642f0ffb01414a5f6c7985855d752fd7c5a71d8eead5cf51681bb67adf267d5fb290933dff2aa25eff736616cb6437738b0121e4d14bdaf5e7e8009631ecb1f30bf574c7e3c6a79cd571dd08a38054cec4dce6fb7805a0fc8c729d75f1233bc85149e0bd1d13895855f71f2f57eda6101ed274c9e41468c28b97f5f969cc849ef5027c5afd57c24ae85e16e9659cd3954c9535d3218b20f191982df2dfad4fd13d0e33b24d83274ed6066814d70d41f84874c6072b9515aa5d2f0716d851a84533fd43f21c902fb54320e04fd0b7d05d169137482f82d46b275672a7c8aa51e4546ab494f0aa2dee67d5ea2476c0a7463af609727d52ac54054ee7f454f9420d5e9f5e28357c2b0745a466087d505919ae4923586649b5b3e845929c78ff4c22c6d5f8a31eb8eedb3351e6d5f9ce68dbb318a5d62bc116bdea32a77c46492a3ca52f06a00a14420daee72b97673ef6d4a3bc35a",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "71292e48a0498805a5ad2fa4aeb78492a70a9d24fb0f3b4c76b13e22ae9259f7d21f7913a090c4addb00d672f42c2fbb77a85637a02bea20fb2dac9f11e8b0efb5ec0bf43c5af49243f446b7503f32987a6fbaf9d4b58c6a6aee7c0636433d9fef5b83615f05ade143a7ba2606d6c0f7ccb414b17b4b9ea836bf0f96f7d83b3f26ec4f84d05fca2e958f451ceb28c4390a203b724cc9d129bbcba64fe4dd72949ba5eaf160737050897648f0694f8f5757a72d297fbf7a25affbfcf3377853e8c58d5f066911ae970ad0fc1945cd8791f405a23daff28de3d3ded54441a099eafeefd2e18fcef8966593bd4b29b1dccaeba58f2189c496e22044fa31352e33219d5feb62b829ceeefc621b020e741e30efc938189097779590c0b02e32b99ae57f85a18c876421edd4d476870a4ecd27ce6e4b722489dd8a790580f213ee04a54f5dcfc77dd65551be59d73b858c912e5603271dbe1082b05b0162a0564df81ccb101ba37d43eacc8a067d51dcdb3f11ee1735f87394ab6302269eb62de5cf910123ffe2b584f8393569a82d49981e02b9d200b7bd8c52dba24226fcbe1bc83c4b03918e0050ffee8a7ba6bd5430d9bbc6915042644d44402adc59578d6eba3e02a39aa8e9ef3f4660720bfa95a474d9d1ad6d325ac3c1efdbf7ebf2c2d7a2bd7060ad98c835ad899146953e0b9611f381fd5212c4fc8efccb74b494f5ad2929c1bdf50f14629715b3ca3a4ebf478441883d201c24da12ca0dccf83adb37057db487a78a86e2f2aac85c77b66896e0b8bee01a57ea7353e710c8ba70c172590ac2843520e26a2bea555abb2e08be3ee158c73325f2d28053c8adf0ac529051b729a15ef40033d9308208768db4f3af4470304de164d7cf7db5fbd80bd82007bb66703d5b5d8d3716579399736fd81e1e4b0f8df407c5aff52dcc7d4b9104203a45f32888921398704f74f022346778e4feec6acdfea405d24a3cfba770fe230dc17eb0f50f6290b1f3ddfcf9d3a0171fc914da5281f9e5d955a8c75ba3b472b4e724bfe11aa2b720c4c99b6f9cd40eaf957dc39941025a23cff213892a03c840555d984ab370a74ce8fee6fefaf9bc80e390d5cc258a277974304bcbb83a2eebcfe080ef886640685a7174862b89133e35cbb42819d9949d5077aafc752be3fbda1405193d2be0733e91b6a0b45388a039e5fe50d5bcf98472c8be6217fe5595c3198d5db6c1856d9db97c484182cf1071b3473beb4f9df03efbbee998dfa49da014fff5b996d93bd8a79b2a3931666a49eefc13cbbf56185e2ea9924ff1ea632ad72859984397529de6b6c500f5fab65813810606f4449afcf57a59f6a7fd7140bb8a59b87fe0d8de65398938c0b7a8697eda50c175296c3a82a93de00a40f623d62c02adff2ca8ccdab1357a009d7e7f6f461152c28fe917fc56d94fd66546c9691ed640692515e4bdd1d7ae0a2d1c",
          ),
        );
      }
      {
        // zero key, random nonce
        const key = fromHex("0000000000000000000000000000000000000000000000000000000000000000");
        const nonce = fromHex("623ac6e73c2c00951bf4c7490e4692f8e30f5f8c1c4196da");

        expect(await Xchacha20poly1305Ietf.encrypt(fromHex(""), key, nonce)).toEqual(
          fromHex("ee5f3601ce18d227df5d5a8b2ddb05e3"),
        );
        expect(await Xchacha20poly1305Ietf.encrypt(fromHex("61"), key, nonce)).toEqual(
          fromHex("0c5a3d0c311a2a9598ce968549a8d6a6f9"),
        );
        expect(await Xchacha20poly1305Ietf.encrypt(fromHex("6162"), key, nonce)).toEqual(
          fromHex("0ce46df742a0423e9954a903c9f5bf54412e"),
        );
        expect(await Xchacha20poly1305Ietf.encrypt(fromHex("616263"), key, nonce)).toEqual(
          fromHex("0ce4be1fd7c793ac56c6d734955514bd8391a3"),
        );
        expect(
          await Xchacha20poly1305Ietf.encrypt(
            fromHex(
              "ad376ccca21922a93f532f98bcede77577c5fb857ab280215b7ead7321844f23a42349e9095f394f028f0c731d43db471e39a008a79f5932cb709f2e48743f7a77bd3ee87f93fca8f33ff792daf289e7d4577299f52e0808222311df5e1bdf97c844daa0e9c62123c5df2f3ddc7f873052ee6ee282fa65a7a54d8b91c8e32f628b96c55bdc7db6a43ab156de528dd00e92a27e384addd02fb91cfff0bcf5a64f81738f82b49677661ffedc91af07f3e1ad62aef54daa9980ba4a221a5986c7c29d6867fa9e5db4ff9066da136afdd733b15a404d2dc195885ab0d82e1d1cc5cbae4011ce83146f079702813693483624c53c31775995e96b71def34a7d82c53b9bf4d7f612e89fdeb237f4df28e69f8cb8a3bc04c883915d3416a26c8e23c78efeb1ed658d0d6e7f95bc75c1652014084169569afac77c5b039d7db15c01a5b270b38a1e3d37fb1723a2de1b8ff0333d26ca5514473d3e98f815c894623779653018b7c7abcfe0cdc16f76b773332da2ef861cb7322aebbc64c880b7d805edd416cb231b18d910f0a93924f186fa490feb02ee5d21c17e76c526527951824f0c25dd658731c568d2beeb4619602362d3f07a5458399f68089dd196ef3db907730d48fa1fb4c5ea3dc6e9fc4493dc9662de0d87308be5cdbb8355e2b3a4c483d09ad71d97439950719cf88a6a0d1b616e0960ef2a320f4258a66f83d29f6a8d906427f4d94c0043bfd173a04c06c2e0e48e5c77d32578ee75bf553855f5daa8e376aca79b131bad85a0e78e224babd103ca84e7a3562610409b1c9b52b42548cd6c",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "c0b1b1d9acd58a7e8bc324343f0f9bf4eca174c4f9056b7e2dda6f185ea7587d032b3b202df5db9ae73ace5f994b366cb82d05175b6af3f7b93f53a8bd3bf99f69dae2c5bdcdf9bb74c21706687956db8d9879a833ebaf7d70d74b52c750026f5dd14dc03c6376848443f0dc18fa39d2acfaaf41276789621aa6b844af8a3e00e0dc807ec113343a9a14c4e205064f113af0aaa01f00a0cee37e8f0f54d9818248f60f9f1bd2ff5c615f7ca72c6d71085b0ef79f51d8978cabf6c6dc31d526aa0a692748882bda4e2684014b7bdd2e598b1fed56b9ec4038a10a32be2c9e1b88d99d76d17646326ae4a8513bf030dc19af0e83a69219231dec942d72abd963a3e2fc854494f70539e5a92076f32431334bdba71aa81bb96fad0daa4e64a99f0d3bbc781554ba52bdac4690216faff2d25c229d2d69ae16da7d3a8adbc0424a3a923e562d3064dcc78155b4223a73c2587f4bc77c0ebe9592264c74437d95e976f11aef5e26db2ae7b54a4034301a21bce58aee4f51b8c4d09b2b188121c012f5a476580573b497cbf26f96c03dd22f2128f1e8e0669857a87d6a60741cef746b0af6c56adaff445f7736c65265d3a38305421b0b9e6161dcc2eac86f1d97a253c9df8594cf654e1c85ac6a323935b9a30911422f2514bc62aca52dacc4fea99fb2f28c71ca79737d8968b5d420143f4d313d3affda4a584877f08d59f7b83c7a16045c6d9d39ae696905139a322d02be29ce99a01493f9e3f38fbcb48b7c66d30c8b78c703eb1079eb5077f07ef5ecb281d15bedd35db5decd343c85ebe5471fd40004c24d3ad31878c5e92c98143728d2",
          ),
        );
        expect(
          await Xchacha20poly1305Ietf.encrypt(
            fromHex(
              "09b7b8c14569057a7c4cdc611b839bda48123c1aba86a3e1ac6ca981c7a8c1885c9d95c661d3ff530aaf9f07f8233049ebe92297fb3a708352c59fa703087011117215142f10843b976862579be7cea3d8112d3ae69f58ed9d9684da5c51123a73e5b08627ef83b1f8feb3ef91ca8f1be327468e0cc2b3bffc1a8ef1291cedf80ff8320b90f0d17fb623c447e65f4fa48a17327d427d1aa6bb445c61dda9cc9b5c1611675e618fe6b79ab9bf045cfe0b1295aa72ff1c73d6641fb942a831506c0d268c628abff8925c011d222c443b73f18e994077f1c7a893123ed400cf2f11b8fa144c0d8fc5afcd2960281f067f1329cd4abf15a1a701762121b1e103db9538f989443fbc824d39fab22b622ec98632e957adbb39dd956f31b42af3629d8fcd461c9d4519105c0f308c7c45888583832c3c659b17b0733bc7257a9c00899a4ba9933c211579480e5c30d6837241a59d044280df466d55d0b46dcfa2db4c809023d77c2503ed3afd82489c98b0949baac0a00403af770e65c45607b615912eaf7c727b15cf976e742c1cb75fc160966dda4504edc7322a9479cb2617286c85b1412b9ffc067be3f9d2fd49568a29fe40115cf76de6dd7cc3f7e833bafbdffc39097150fe14960582a39d10102aa86718f59b102c89441806c80acfe300ea415be03162e729bd92a75b4e18a33470409034bc7fc7e9fb6c4823d6bfc77d75046c0927922dae805c7ced7a4a6fb4f46a15ee6b145e0dae56e6480ac726f7ccd5296fb2c82b5ebc2239eac2d81cea4fa789e0187134a270b6e74fc7932983e6e993e391ecc0dc9cb5963a644c6ece2eba6564533a330861eaac6120f84959e5b41ccbbe2255db17106a9955a94964ba07c5b1d1a0159f3f1e8f76f65181c17e3d616398df19fe6d8625922f5a0fd384b3238761a2003e5b5101c0c795c48ceb3ec72d9f7f5cf42df449075153f642f0ffb01414a5f6c7985855d752fd7c5a71d8eead5cf51681bb67adf267d5fb290933dff2aa25eff736616cb6437738b0121e4d14bdaf5e7e8009631ecb1f30bf574c7e3c6a79cd571dd08a38054cec4dce6fb7805a0fc8c729d75f1233bc85149e0bd1d13895855f71f2f57eda6101ed274c9e41468c28b97f5f969cc849ef5027c5afd57c24ae85e16e9659cd3954c9535d3218b20f191982df2dfad4fd13d0e33b24d83274ed6066814d70d41f84874c6072b9515aa5d2f0716d851a84533fd43f21c902fb54320e04fd0b7d05d169137482f82d46b275672a7c8aa51e4546ab494f0aa2dee67d5ea2476c0a7463af609727d52ac54054ee7f454f9420d5e9f5e28357c2b0745a466087d505919ae4923586649b5b3e845929c78ff4c22c6d5f8a31eb8eedb3351e6d5f9ce68dbb318a5d62bc116bdea32a77c46492a3ca52f06a00a14420daee72b97673ef6d4a3bc35a",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "643165d44ba5adadc8dcd7cd9861e75bd376b35b393148bedac86beab88bd6d6fb95e70f45791d86ef1a5d2b7c2bdd624dfd878807cfda46208a5321f647b6f40f15c939ed4e8128109582c3296c119f81de260b205aff98cf62de57c51acfc2e67027e6f24ad416b9626c0e554f31f91d33872da95f5f7a43f1bd244e75fc9a64b2772e8d9e53e11686567bb1d4d0bb2245e6e517a06a47e1262c9e3585eb569593917af12507dcc93b198987367ce2e4f9f318e36e7dda75a35d84c062b1049a27ccd09cc99623eae3c67a3d64c219cbcb345be3dc121868a8d444314df152cf277353f8dd98c2be83b0257c7e952e43fff86ede2d6d77eb6bff8937587d0d41f1dbf6b9a318aa6e646682b9ec6739c1914cb3dba1f5a7f62abc0819e8c50c084b89ed9cae2c9e36ca699c4f0763599e67f7d2087edaf24560d21000436612a9244f0f2c465e98acab5aef36f1b0c0c485d0e896c5c65f0eedd118bd79dc9351218fe5a817271089a77e1fdb999885a0cc52fc603d58629a27ce314fd06e0f1dc109657ea210552f7aae86e4e906b8ae2943b9aa9e1bf42c35f92b5a4557e29e6a8b72173c576e300f7d02537ae8aeb52913a4ca18d4a89cccb6b39ad57adcfd9e0edb85b43224c1e60b66bac387a6cfe95e0f827835c12938c5d0833ac00e73c5a0846ec99e9eb2cb71a68e3b2e63a86969aa2face17c99bcd834afafc4ee1e2a8f26fc976d8ac49bc99c5b5b1630b27c85676fe6b9c0aa928e26585102e553486d943bae01de725d3b0a29b47216c2b5a43fb1d9d528b16760447643e93b2bfce4247dce0e9167c26d776ce5db7044411f3d1d4f51c400f0b14f65f68f395af75568955bbd1662b9e85c2b9651d0296be568d410af43d78a7202d357f7093644bbab734db1f8e2c4eb8f950b4e20122c0f079d3980539e8a7a22b0444d8e548f17a21c5cd01a1fdf237cd55e6031921488598919c6ded91d33169240d1dd5684de3368c0148cf82bbf9587a118ce770e5371b34b97a50cfeb2f685142dfa609225f6ed6c754c567eba859d794e89bd3b88f768bed757ecd2fbee8216816d4b15b6f39fb59b583353478372b6e395d845b57aef27dcdf40ee5e906e62fd6b5ae4ec071d95a3d9dc688b7aa1fe9bed64070e8881cbb7e10d37da67306d8c9c6f71dc175f055bba88271dfdaf0a88a4c5460fcf83c0b9ef58e75ee18a75bee1ddd3de18d130bc90327e2338cf2f640256d02ecffe9fa113c02c168c97845df2549c62504d1e6054d80caa18821222dbf73707816c7513c92574a8257bd84507b8706f9eea99d02910c3a7e5d4ed9d37d5f22888288e158a0c665bc5be491c514d763851e22a4852c8b8178cac89745949f264db4d4b3ac711ddc3b2e556aa10d957e60734e45b3f5b84a800752da82f36d820474126703c734515123b1054723a741d2840a8e935690158c47c8aa185",
          ),
        );
      }
      {
        // random key, zero nonce
        const key = fromHex("1e1d2cd50e63f38a81275236f5ccc04c06dbe7a9b050eb1e38cb196c4125bbe2");
        const nonce = fromHex("000000000000000000000000000000000000000000000000");

        expect(await Xchacha20poly1305Ietf.encrypt(fromHex(""), key, nonce)).toEqual(
          fromHex("6142f36622e4becf1fad773123d067e8"),
        );
        expect(await Xchacha20poly1305Ietf.encrypt(fromHex("61"), key, nonce)).toEqual(
          fromHex("94f1c39995a77dd01265112ea5f5c3470c"),
        );
        expect(await Xchacha20poly1305Ietf.encrypt(fromHex("6162"), key, nonce)).toEqual(
          fromHex("94f1ba350b17e0b580bb7541812ffcaf4eda"),
        );
        expect(await Xchacha20poly1305Ietf.encrypt(fromHex("616263"), key, nonce)).toEqual(
          fromHex("94f1a17b016c87a9a1135b57acc427edea2b6e"),
        );
        expect(
          await Xchacha20poly1305Ietf.encrypt(
            fromHex(
              "ad376ccca21922a93f532f98bcede77577c5fb857ab280215b7ead7321844f23a42349e9095f394f028f0c731d43db471e39a008a79f5932cb709f2e48743f7a77bd3ee87f93fca8f33ff792daf289e7d4577299f52e0808222311df5e1bdf97c844daa0e9c62123c5df2f3ddc7f873052ee6ee282fa65a7a54d8b91c8e32f628b96c55bdc7db6a43ab156de528dd00e92a27e384addd02fb91cfff0bcf5a64f81738f82b49677661ffedc91af07f3e1ad62aef54daa9980ba4a221a5986c7c29d6867fa9e5db4ff9066da136afdd733b15a404d2dc195885ab0d82e1d1cc5cbae4011ce83146f079702813693483624c53c31775995e96b71def34a7d82c53b9bf4d7f612e89fdeb237f4df28e69f8cb8a3bc04c883915d3416a26c8e23c78efeb1ed658d0d6e7f95bc75c1652014084169569afac77c5b039d7db15c01a5b270b38a1e3d37fb1723a2de1b8ff0333d26ca5514473d3e98f815c894623779653018b7c7abcfe0cdc16f76b773332da2ef861cb7322aebbc64c880b7d805edd416cb231b18d910f0a93924f186fa490feb02ee5d21c17e76c526527951824f0c25dd658731c568d2beeb4619602362d3f07a5458399f68089dd196ef3db907730d48fa1fb4c5ea3dc6e9fc4493dc9662de0d87308be5cdbb8355e2b3a4c483d09ad71d97439950719cf88a6a0d1b616e0960ef2a320f4258a66f83d29f6a8d906427f4d94c0043bfd173a04c06c2e0e48e5c77d32578ee75bf553855f5daa8e376aca79b131bad85a0e78e224babd103ca84e7a3562610409b1c9b52b42548cd6c",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "58a4ae64d149c7fe648d93f0a293055b08c72302a457aa99d6892b258b9d5bcc59332df250f735d98ff32351907738efbc21ef0412e9a00ae7f2fecedcd6ae52abe266f1e17990ce2f958bfdd6bc32ca70f0734788d44318d7fc86c687059da9ac6b859c5286b3941b2847891ea87a56e81a3d7d543dea2c984492ff8345ab8f52ec69d0ce1392dc42f1df875b9170b198b04ee4d9f7cfd430c145066a9b4592b828d5785e600b655982797557827cfc8c9e2bd55df3fc956f5199c59974dc2e1550361487181516f322b44d7d1649dd072932e0225bf929e1c6d905055051ccc779edbdd9c8643f318a6f564197e3187b27f84b4e153317e860542a3bbe541738c9e6115da21bd23cc40a8ef8b205f824fd4bcf4abfd88cfb4436a4e651c39a14412fe68da9a1a1abf62674ff001e31a6d2b435828321686e1b135a51d65e8117dcf31aab6b8120ebcc6a8c048d47685c9a0fd58ee629b9a7ee73734082da893484ef9de37a291881ff808192d0726c41f1b04fbd687331e1e8a71cc1f84186556c6bc81545413c52a1cc21e42675929369340f93d55396ce25e1fdd819015e8295d529b85032f21aeefadfb1aaac0e1d3e04b5fba0150a9b9796a628e5627713443aed99f480cd7495b5eb5a4c65d2b9bad43fce9b7d24a18cf3e8e983942ed476f2deb38aa3ff38f0b84a3432e5fb25647a3ca0d2a563e8655f93cd1be4f2672375740a469b75dcdd66fc5f3645e751caadfcf11ec3efdf1015160b3035134b44acc6fef3b5fd00d9c7e713590d1021ab6c2ced3316a813a10969e3da876fe152b8253ddd4f853fdc9954e3f3349de7",
          ),
        );
        expect(
          await Xchacha20poly1305Ietf.encrypt(
            fromHex(
              "09b7b8c14569057a7c4cdc611b839bda48123c1aba86a3e1ac6ca981c7a8c1885c9d95c661d3ff530aaf9f07f8233049ebe92297fb3a708352c59fa703087011117215142f10843b976862579be7cea3d8112d3ae69f58ed9d9684da5c51123a73e5b08627ef83b1f8feb3ef91ca8f1be327468e0cc2b3bffc1a8ef1291cedf80ff8320b90f0d17fb623c447e65f4fa48a17327d427d1aa6bb445c61dda9cc9b5c1611675e618fe6b79ab9bf045cfe0b1295aa72ff1c73d6641fb942a831506c0d268c628abff8925c011d222c443b73f18e994077f1c7a893123ed400cf2f11b8fa144c0d8fc5afcd2960281f067f1329cd4abf15a1a701762121b1e103db9538f989443fbc824d39fab22b622ec98632e957adbb39dd956f31b42af3629d8fcd461c9d4519105c0f308c7c45888583832c3c659b17b0733bc7257a9c00899a4ba9933c211579480e5c30d6837241a59d044280df466d55d0b46dcfa2db4c809023d77c2503ed3afd82489c98b0949baac0a00403af770e65c45607b615912eaf7c727b15cf976e742c1cb75fc160966dda4504edc7322a9479cb2617286c85b1412b9ffc067be3f9d2fd49568a29fe40115cf76de6dd7cc3f7e833bafbdffc39097150fe14960582a39d10102aa86718f59b102c89441806c80acfe300ea415be03162e729bd92a75b4e18a33470409034bc7fc7e9fb6c4823d6bfc77d75046c0927922dae805c7ced7a4a6fb4f46a15ee6b145e0dae56e6480ac726f7ccd5296fb2c82b5ebc2239eac2d81cea4fa789e0187134a270b6e74fc7932983e6e993e391ecc0dc9cb5963a644c6ece2eba6564533a330861eaac6120f84959e5b41ccbbe2255db17106a9955a94964ba07c5b1d1a0159f3f1e8f76f65181c17e3d616398df19fe6d8625922f5a0fd384b3238761a2003e5b5101c0c795c48ceb3ec72d9f7f5cf42df449075153f642f0ffb01414a5f6c7985855d752fd7c5a71d8eead5cf51681bb67adf267d5fb290933dff2aa25eff736616cb6437738b0121e4d14bdaf5e7e8009631ecb1f30bf574c7e3c6a79cd571dd08a38054cec4dce6fb7805a0fc8c729d75f1233bc85149e0bd1d13895855f71f2f57eda6101ed274c9e41468c28b97f5f969cc849ef5027c5afd57c24ae85e16e9659cd3954c9535d3218b20f191982df2dfad4fd13d0e33b24d83274ed6066814d70d41f84874c6072b9515aa5d2f0716d851a84533fd43f21c902fb54320e04fd0b7d05d169137482f82d46b275672a7c8aa51e4546ab494f0aa2dee67d5ea2476c0a7463af609727d52ac54054ee7f454f9420d5e9f5e28357c2b0745a466087d505919ae4923586649b5b3e845929c78ff4c22c6d5f8a31eb8eedb3351e6d5f9ce68dbb318a5d62bc116bdea32a77c46492a3ca52f06a00a14420daee72b97673ef6d4a3bc35a",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "fc247a693639e02d2792600905fd79f43710e49d64638959219b2fd76db1d567a18df1dd387bf3c587d3b0257517d3e149f16d9b4e4c89bb7e47fe4797aae139cd2d4d0db1fae85d4bc21e3897a9758e7cb62ce49b6513fd684913c3854f500417caefba9caf11062609db5b531d727d59d31511da053c34c113979f62ba6915d6829e80829ef507ce634d1eef43ef1b800502a1d157055d3299e6970bc72f46654d4b9db497f3e5f1e61c5bfcd9711633692f52ef4516c3b104029d68c34b80851edd8c93fa597b3f45737c3bafa59d47fdebed786bab0928643fff1883bb16d1c3e83f5753ce976ba18e48cdd9aa2f97d6838302217d7def9f86d1a73f4ab99bc4b8a370f60641b7094c7ab27a53f2aeb7a06639059444a06320e29b10999b27b6de1e45bddf82317adfc9dfa88fba6497decae353ed4056414b9191d772a92cc6ea38b749037fc6328441080f35f0e7541841169d7a748f4fd628806eef6c94bf8f266db624efbd12beaa7953cb5504b70cfc8cedef83e0e471acafe83d7cecdb3aa81853c6a28fb4f4673d1d5c0b15b19f565fd31fca9f7a78a29eb322d716099b31759321c35dd7418f8703e723ad550c1aafd9a07ec5b1e87aafa7baf82705b1a2d325fcf530dfd4bfd9ba5bd77f42c81f69f7f48724111b94ae47fdbf1541de2b173a4e1c03537c389a1df4d5bc30296955341c5706290afe950c1c666f0da63f6be858967143bcfa36405169ca78b13b8a6b83cc860d2784d81d51251487b995c6b6a45a99d48b1d441893b462cf93fe8fb7765e6ff255a87e7c294b1e69e2483a56586d5e422bf9095e7b2aac6305ae4112024e02966b6d6494c4252c44f2ff807b27597891f95b2c2781444ff402155f2e34477dca2d5926934bba819561cdf7fa3e6e1009db51a4d99f2c364854b20b5e4f7713a409ebd31e16e0f6505158fdd2406a085c66ec2af17aa2e197f22094cf6167168243b5e73e45286b1fcc8b66f28058a0a6b2554f641780c4e31d8b6f47f34e0e978ecd3127ae148561a8c18c1f36b5349ae74fddc3caa4ba88c31a12a42f918c10f0bf56defcc8bcfb0975c2d550160d381c9b323d87d927f490abd1c992e490aa0c069437c34998f8b0e8e6f97ea010195387d512d2bef913fcfee4c088a36b0e03c5e14296cc991c2efaf9f27f2c44aa5734defac0138de2049b03ace45b3f4db3865be3157924ede7ee0e381fefb4c418363326f5c0d72ca1e9b9bd2cac73e3e793b1afc8101f3cd57aa7edb9d49777f447637d423821cde426e9f56083d0fd0c39816d08434f04ddc1eeeeb9fe6bc4c985d33c66f64a221f63f2d2f9fc2fa68ccd8b797ca84fbb92fda61093490492bdceb5796de563592f97531a15edb2b45b15008207ebb27fc4d9dfef4014e3f347af35c1e5686df24491b88477c90180a89d845299097a54f97d71ac3b07e6722602dd823434",
          ),
        );
      }
      {
        // random key, random nonce
        const key = fromHex("1e1d2cd50e63f38a81275236f5ccc04c06dbe7a9b050eb1e38cb196c4125bbe2");
        const nonce = fromHex("623ac6e73c2c00951bf4c7490e4692f8e30f5f8c1c4196da");

        expect(await Xchacha20poly1305Ietf.encrypt(fromHex(""), key, nonce)).toEqual(
          fromHex("7e51936afe05c64a87fcd64cf811f22d"),
        );
        expect(await Xchacha20poly1305Ietf.encrypt(fromHex("61"), key, nonce)).toEqual(
          fromHex("fb5530e69e505cb1d3d5344f354e8e96d5"),
        );
        expect(await Xchacha20poly1305Ietf.encrypt(fromHex("6162"), key, nonce)).toEqual(
          fromHex("fb4927d0dbb75b8d866c0f891195be725cfe"),
        );
        expect(await Xchacha20poly1305Ietf.encrypt(fromHex("616263"), key, nonce)).toEqual(
          fromHex("fb4984e6af4f702a738693d59104c6690da890"),
        );
        expect(
          await Xchacha20poly1305Ietf.encrypt(
            fromHex(
              "ad376ccca21922a93f532f98bcede77577c5fb857ab280215b7ead7321844f23a42349e9095f394f028f0c731d43db471e39a008a79f5932cb709f2e48743f7a77bd3ee87f93fca8f33ff792daf289e7d4577299f52e0808222311df5e1bdf97c844daa0e9c62123c5df2f3ddc7f873052ee6ee282fa65a7a54d8b91c8e32f628b96c55bdc7db6a43ab156de528dd00e92a27e384addd02fb91cfff0bcf5a64f81738f82b49677661ffedc91af07f3e1ad62aef54daa9980ba4a221a5986c7c29d6867fa9e5db4ff9066da136afdd733b15a404d2dc195885ab0d82e1d1cc5cbae4011ce83146f079702813693483624c53c31775995e96b71def34a7d82c53b9bf4d7f612e89fdeb237f4df28e69f8cb8a3bc04c883915d3416a26c8e23c78efeb1ed658d0d6e7f95bc75c1652014084169569afac77c5b039d7db15c01a5b270b38a1e3d37fb1723a2de1b8ff0333d26ca5514473d3e98f815c894623779653018b7c7abcfe0cdc16f76b773332da2ef861cb7322aebbc64c880b7d805edd416cb231b18d910f0a93924f186fa490feb02ee5d21c17e76c526527951824f0c25dd658731c568d2beeb4619602362d3f07a5458399f68089dd196ef3db907730d48fa1fb4c5ea3dc6e9fc4493dc9662de0d87308be5cdbb8355e2b3a4c483d09ad71d97439950719cf88a6a0d1b616e0960ef2a320f4258a66f83d29f6a8d906427f4d94c0043bfd173a04c06c2e0e48e5c77d32578ee75bf553855f5daa8e376aca79b131bad85a0e78e224babd103ca84e7a3562610409b1c9b52b42548cd6c",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "371c8bc350aca6a7aeb8eed66276f2a11f4f48147aa0871bc693603beeec2c68fc89dff91dcc2b7799960f40c3a8cb2c9d98d0c8fb22e3823f066e0f73e95c1420a386aec2060c21e8cd2cd79f3c14cc6af7d249acd2cd7945318b0184fdacb6eba33eb7e4498431c9ed484f24c1c4ddd8a8f3ed0f82d01e0afe595ef389c3dcad0688443cdebb3bbc0f8b34e8b6455012c77fed003d433e267ac0aea55618ef95ba3726484f6982900bc12304c2dcd89101301a9dc8eb350dc24532c7f46d9f34565d6abb6546c2fd8c74a1fd2a715b81d54cc93bd12b315ec070c81cfa072472a5b9e89ec545a0d1895e112abca47b3d2a610f1d06ccf80c04529a01794cc5498fe6ecf48cdb97f8b591b1688d6706b72cbc480f463016f177b7d2b941d1e48ac7a735e7f84fcf42004aa2c37941930a4f5b98ab3c68f32667f4f814c12c0e17d2c7599b2d248d51e3e7dae9f1df5441f1290bc26e2e7043ead46958c2abbc76ed2bc8e01befbd9a4d55af491d3187815b90cb1dc6016b5e15698a5b6cf41166d291118f19a25e6fdce0a04a1ecfa4a7ee66f8d21774921b9a31fe72a20de610338c7c041e2c7980e28d6da6b769f321e142ed2cc4334ec87e974052f39442d1a87c28846c1bfee8fd41254cc2359dcc885b95f1b8d64d8ca5bc82035a52f7ce50ae9456dbec99b6a2c4f29c4d3f140edfb0adce7b990db7bfe8f440c1674c33b5bde7814c12bccc1968fef2282c927b08f95b06e48716191ec95bd0c65f18f88e8fe2e626eee92bcbb960df674320a2591e82e973ccac49d67dc3f34897e51b9089520ae8275be009c0b5695325e7dd",
          ),
        );
        expect(
          await Xchacha20poly1305Ietf.encrypt(
            fromHex(
              "09b7b8c14569057a7c4cdc611b839bda48123c1aba86a3e1ac6ca981c7a8c1885c9d95c661d3ff530aaf9f07f8233049ebe92297fb3a708352c59fa703087011117215142f10843b976862579be7cea3d8112d3ae69f58ed9d9684da5c51123a73e5b08627ef83b1f8feb3ef91ca8f1be327468e0cc2b3bffc1a8ef1291cedf80ff8320b90f0d17fb623c447e65f4fa48a17327d427d1aa6bb445c61dda9cc9b5c1611675e618fe6b79ab9bf045cfe0b1295aa72ff1c73d6641fb942a831506c0d268c628abff8925c011d222c443b73f18e994077f1c7a893123ed400cf2f11b8fa144c0d8fc5afcd2960281f067f1329cd4abf15a1a701762121b1e103db9538f989443fbc824d39fab22b622ec98632e957adbb39dd956f31b42af3629d8fcd461c9d4519105c0f308c7c45888583832c3c659b17b0733bc7257a9c00899a4ba9933c211579480e5c30d6837241a59d044280df466d55d0b46dcfa2db4c809023d77c2503ed3afd82489c98b0949baac0a00403af770e65c45607b615912eaf7c727b15cf976e742c1cb75fc160966dda4504edc7322a9479cb2617286c85b1412b9ffc067be3f9d2fd49568a29fe40115cf76de6dd7cc3f7e833bafbdffc39097150fe14960582a39d10102aa86718f59b102c89441806c80acfe300ea415be03162e729bd92a75b4e18a33470409034bc7fc7e9fb6c4823d6bfc77d75046c0927922dae805c7ced7a4a6fb4f46a15ee6b145e0dae56e6480ac726f7ccd5296fb2c82b5ebc2239eac2d81cea4fa789e0187134a270b6e74fc7932983e6e993e391ecc0dc9cb5963a644c6ece2eba6564533a330861eaac6120f84959e5b41ccbbe2255db17106a9955a94964ba07c5b1d1a0159f3f1e8f76f65181c17e3d616398df19fe6d8625922f5a0fd384b3238761a2003e5b5101c0c795c48ceb3ec72d9f7f5cf42df449075153f642f0ffb01414a5f6c7985855d752fd7c5a71d8eead5cf51681bb67adf267d5fb290933dff2aa25eff736616cb6437738b0121e4d14bdaf5e7e8009631ecb1f30bf574c7e3c6a79cd571dd08a38054cec4dce6fb7805a0fc8c729d75f1233bc85149e0bd1d13895855f71f2f57eda6101ed274c9e41468c28b97f5f969cc849ef5027c5afd57c24ae85e16e9659cd3954c9535d3218b20f191982df2dfad4fd13d0e33b24d83274ed6066814d70d41f84874c6072b9515aa5d2f0716d851a84533fd43f21c902fb54320e04fd0b7d05d169137482f82d46b275672a7c8aa51e4546ab494f0aa2dee67d5ea2476c0a7463af609727d52ac54054ee7f454f9420d5e9f5e28357c2b0745a466087d505919ae4923586649b5b3e845929c78ff4c22c6d5f8a31eb8eedb3351e6d5f9ce68dbb318a5d62bc116bdea32a77c46492a3ca52f06a00a14420daee72b97673ef6d4a3bc35a",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "939c5fceb7dc8174eda71d2fc5188e0e20988f8bba94a4db318164c908c0a2c3043703d67540ed6b91b69c3426c8202268485257a787ca33a6b36e863895137f466cad52928574b28c9ab912de29538866b18deabf639d9cfa841e0486b7611b500254912a6026a3f4ccd49d6974ccf66961db8181ba060653a95c3e1276014629687f147053dce0309d19ad5c64dafa0a7233a8089d89b72422633fc40a723b48dfa9c3a2b89102386fa40daf99d1322ef6349d2f7e0163d397de6a3643fa31a418b6f2af870aaf31ebb390bb939d1bc10195c461e17911976296320129edfe641fbc6a105eef088ba2bf0fa6f2ed4cd1db1ac7513282920bfb80619df8526bea82b85ed9d8c6047378d7452245310c3d6657e17cfc7cdeaa50a194c4008be5b93056cd2fec31ecd88cb31fe3d1d018c80a3167caeca4db1e3dac33d4c000262cc8de7b870fa6d27c1d0917e573adccfa3f3e9f5a157dbd6b4b7132982e9e59d6d64b736ed7e24aa6a06b84a29e88bec41d2c782c439dd95f19bf3a357c88ebdf65c071820f25c0b2c9d8e69325e63d2136cda11e1138ce4ac5a8a134082e6f84afc264c9dd3f48c7db363d901e22de918a4a4278bd863a9658e99cd5b14ccde5e9f767cebd67c6acb72071cf340b980a7047b556d45fee093854fe449e3b660f678261f26b017a8d01008032622e3a978be3f83b9d203959f3bd9918d69fd83b9b6eace0e2d15f6187b2f89b5e381ce0bae59c7d91c7354003fbc903eb3b2ea74d9ab1de63ff4eb2c6f59a8826dd84e13de1508bf7ac5a358521026eee39c1e45a5bd889404da32f6cee415928e01b723cea9165a487073989adbd4ed139dc32fd9912f750bfc0f4d7113a24e2855218ec99d5de1c87276727134cd778989937c00c30c26e7b0c91f39aa1eed52089f55092bac70bd91b190ae573490713c00cc47915540a8e15e7fdbd02874d9f8de11e3d91b0add39b27cddbb91e9cc11958896d5f43cfaff9b672bd18af5260e28c48c12fde57d34f0e9df7199f514bac7e06d164fc96ca69170c5194f040ed14d45a07766e87afa919fe4f082e3d95c6e73c3fe26cf742f71152d9ac4a1e554830075b1812ab5acde59b98bcc1e1894935e7a1bd66bc7187a3d2555f10589d60dd93e5d997fe6ffe18fe787eeab5ccfb80c012c34e4fb4fb30387e0ba9d9e2d07876f3598b95b92ece64a0f3b4aa70fbf8415ffa195a076689947c5e539098856bab5950f0bccf839c283a5972e8e70000883ddcee167eb2c424b72a82753a7f4ef14bc66ba621331e37392fce0eae3d820059e0316b5b7f1cb46a2ef026a6a942745267918cccbd535af4bc3b1e14d9b543946840c824f21730a233d01cc438cb2ac5435135a627c77508433c8c657f87bfffea9bcefe9b8e21f4e7c64a39fe3766896f4e32829bee81c2d7f12464067b734245b5246814f986f35517fee6ec",
          ),
        );
      }
    });

    it("decrypt conforms to Botan implementation ", async () => {
      // same data as in the encryption tests, but reversed

      {
        // zero key, zero nonce
        const key = fromHex("0000000000000000000000000000000000000000000000000000000000000000");
        const nonce = fromHex("000000000000000000000000000000000000000000000000");

        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("8f3b945a51906dc8600de9f8962d00e6"), key, nonce),
        ).toEqual(fromHex(""));
        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("19841f4c8866efab6c6b5329aef9e36752"), key, nonce),
        ).toEqual(fromHex("61"));
        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("19fcc0cbdcffdf83f822811687b79930dcf7"), key, nonce),
        ).toEqual(fromHex("6162"));
        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("19fcf5f6e7aba23c37d7a59e4c8f061e15f1f6"), key, nonce),
        ).toEqual(fromHex("616263"));
        expect(
          await Xchacha20poly1305Ietf.decrypt(
            fromHex(
              "d5a9fa454739afd6e6b2dc5d09d9f83d98dd5abb3b3b188c81a33ad048bed75c2aa1a53cc81c02b1d3204506114cc4b58278d4a8fc8ec3916298ac165a94ff84d32320086cd98c0127a3d372112a75dc7629e55ac704dc8fd55be9033409f03254fae947912c0f737e8626f44b63c8dc7d7d3cddf57348b06fe80af61627f9a5a282b8d49cd2adf5191dd7855ffa5b931295773744691ba0b99305de8581184046c074148a8488d021122ddec21482bde85029aecd09907371ae67abc6cfc44655c3b49e7df3e2fac6b73b2803746bd1b4d17b30f5c2dfc31a7c33be5c737330e855d7630155523e3fb85c55a5ff95fd0754f4e9c5f0d88827bb28caa9af2d8f3e52b5d0957dd37d77af5df644bc483a6583d3b1e32d3b5dcbe7a6684ff8c0e44c7250744f705fce4e588f3a2ae65cac0c2b218d455911a2415fd839d3ef288d7447d6e561f4d70e93a739f6890ee3b6edcd3089266bd17d73a0c7fb96a1cdf96b2b7b18f38fe73bb6eb437a37588628ab51894b421137d1032a480643f5b36bb894ae82b8927fa7e87c906b90a3379b3f0aabee718a1e87f31dbfa3f8b1ebb5df9fdf96cd93ecdfcd421ded6299929676fa58ed3034f13474fa278b0a2c62b136e211e7a33e437e24386aae16524adc17557112fdaf484c5e6a038e8513cb2cb157816d6c85406aaae5514ca5b900dd18a90147311a37c82538e1f9adbad1bdc993264475cc54f61e54e048d63190cf138f3cdb5faf52e954d1caa8081a614beb44b2d9bea7e30d51513b4c3fd77e1cfd84e58588f733116c9be6b15cd4f72e3d602c2fe77f7880b91f62197c547df9d2",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "ad376ccca21922a93f532f98bcede77577c5fb857ab280215b7ead7321844f23a42349e9095f394f028f0c731d43db471e39a008a79f5932cb709f2e48743f7a77bd3ee87f93fca8f33ff792daf289e7d4577299f52e0808222311df5e1bdf97c844daa0e9c62123c5df2f3ddc7f873052ee6ee282fa65a7a54d8b91c8e32f628b96c55bdc7db6a43ab156de528dd00e92a27e384addd02fb91cfff0bcf5a64f81738f82b49677661ffedc91af07f3e1ad62aef54daa9980ba4a221a5986c7c29d6867fa9e5db4ff9066da136afdd733b15a404d2dc195885ab0d82e1d1cc5cbae4011ce83146f079702813693483624c53c31775995e96b71def34a7d82c53b9bf4d7f612e89fdeb237f4df28e69f8cb8a3bc04c883915d3416a26c8e23c78efeb1ed658d0d6e7f95bc75c1652014084169569afac77c5b039d7db15c01a5b270b38a1e3d37fb1723a2de1b8ff0333d26ca5514473d3e98f815c894623779653018b7c7abcfe0cdc16f76b773332da2ef861cb7322aebbc64c880b7d805edd416cb231b18d910f0a93924f186fa490feb02ee5d21c17e76c526527951824f0c25dd658731c568d2beeb4619602362d3f07a5458399f68089dd196ef3db907730d48fa1fb4c5ea3dc6e9fc4493dc9662de0d87308be5cdbb8355e2b3a4c483d09ad71d97439950719cf88a6a0d1b616e0960ef2a320f4258a66f83d29f6a8d906427f4d94c0043bfd173a04c06c2e0e48e5c77d32578ee75bf553855f5daa8e376aca79b131bad85a0e78e224babd103ca84e7a3562610409b1c9b52b42548cd6c",
          ),
        );
        expect(
          await Xchacha20poly1305Ietf.decrypt(
            fromHex(
              "71292e48a0498805a5ad2fa4aeb78492a70a9d24fb0f3b4c76b13e22ae9259f7d21f7913a090c4addb00d672f42c2fbb77a85637a02bea20fb2dac9f11e8b0efb5ec0bf43c5af49243f446b7503f32987a6fbaf9d4b58c6a6aee7c0636433d9fef5b83615f05ade143a7ba2606d6c0f7ccb414b17b4b9ea836bf0f96f7d83b3f26ec4f84d05fca2e958f451ceb28c4390a203b724cc9d129bbcba64fe4dd72949ba5eaf160737050897648f0694f8f5757a72d297fbf7a25affbfcf3377853e8c58d5f066911ae970ad0fc1945cd8791f405a23daff28de3d3ded54441a099eafeefd2e18fcef8966593bd4b29b1dccaeba58f2189c496e22044fa31352e33219d5feb62b829ceeefc621b020e741e30efc938189097779590c0b02e32b99ae57f85a18c876421edd4d476870a4ecd27ce6e4b722489dd8a790580f213ee04a54f5dcfc77dd65551be59d73b858c912e5603271dbe1082b05b0162a0564df81ccb101ba37d43eacc8a067d51dcdb3f11ee1735f87394ab6302269eb62de5cf910123ffe2b584f8393569a82d49981e02b9d200b7bd8c52dba24226fcbe1bc83c4b03918e0050ffee8a7ba6bd5430d9bbc6915042644d44402adc59578d6eba3e02a39aa8e9ef3f4660720bfa95a474d9d1ad6d325ac3c1efdbf7ebf2c2d7a2bd7060ad98c835ad899146953e0b9611f381fd5212c4fc8efccb74b494f5ad2929c1bdf50f14629715b3ca3a4ebf478441883d201c24da12ca0dccf83adb37057db487a78a86e2f2aac85c77b66896e0b8bee01a57ea7353e710c8ba70c172590ac2843520e26a2bea555abb2e08be3ee158c73325f2d28053c8adf0ac529051b729a15ef40033d9308208768db4f3af4470304de164d7cf7db5fbd80bd82007bb66703d5b5d8d3716579399736fd81e1e4b0f8df407c5aff52dcc7d4b9104203a45f32888921398704f74f022346778e4feec6acdfea405d24a3cfba770fe230dc17eb0f50f6290b1f3ddfcf9d3a0171fc914da5281f9e5d955a8c75ba3b472b4e724bfe11aa2b720c4c99b6f9cd40eaf957dc39941025a23cff213892a03c840555d984ab370a74ce8fee6fefaf9bc80e390d5cc258a277974304bcbb83a2eebcfe080ef886640685a7174862b89133e35cbb42819d9949d5077aafc752be3fbda1405193d2be0733e91b6a0b45388a039e5fe50d5bcf98472c8be6217fe5595c3198d5db6c1856d9db97c484182cf1071b3473beb4f9df03efbbee998dfa49da014fff5b996d93bd8a79b2a3931666a49eefc13cbbf56185e2ea9924ff1ea632ad72859984397529de6b6c500f5fab65813810606f4449afcf57a59f6a7fd7140bb8a59b87fe0d8de65398938c0b7a8697eda50c175296c3a82a93de00a40f623d62c02adff2ca8ccdab1357a009d7e7f6f461152c28fe917fc56d94fd66546c9691ed640692515e4bdd1d7ae0a2d1c",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "09b7b8c14569057a7c4cdc611b839bda48123c1aba86a3e1ac6ca981c7a8c1885c9d95c661d3ff530aaf9f07f8233049ebe92297fb3a708352c59fa703087011117215142f10843b976862579be7cea3d8112d3ae69f58ed9d9684da5c51123a73e5b08627ef83b1f8feb3ef91ca8f1be327468e0cc2b3bffc1a8ef1291cedf80ff8320b90f0d17fb623c447e65f4fa48a17327d427d1aa6bb445c61dda9cc9b5c1611675e618fe6b79ab9bf045cfe0b1295aa72ff1c73d6641fb942a831506c0d268c628abff8925c011d222c443b73f18e994077f1c7a893123ed400cf2f11b8fa144c0d8fc5afcd2960281f067f1329cd4abf15a1a701762121b1e103db9538f989443fbc824d39fab22b622ec98632e957adbb39dd956f31b42af3629d8fcd461c9d4519105c0f308c7c45888583832c3c659b17b0733bc7257a9c00899a4ba9933c211579480e5c30d6837241a59d044280df466d55d0b46dcfa2db4c809023d77c2503ed3afd82489c98b0949baac0a00403af770e65c45607b615912eaf7c727b15cf976e742c1cb75fc160966dda4504edc7322a9479cb2617286c85b1412b9ffc067be3f9d2fd49568a29fe40115cf76de6dd7cc3f7e833bafbdffc39097150fe14960582a39d10102aa86718f59b102c89441806c80acfe300ea415be03162e729bd92a75b4e18a33470409034bc7fc7e9fb6c4823d6bfc77d75046c0927922dae805c7ced7a4a6fb4f46a15ee6b145e0dae56e6480ac726f7ccd5296fb2c82b5ebc2239eac2d81cea4fa789e0187134a270b6e74fc7932983e6e993e391ecc0dc9cb5963a644c6ece2eba6564533a330861eaac6120f84959e5b41ccbbe2255db17106a9955a94964ba07c5b1d1a0159f3f1e8f76f65181c17e3d616398df19fe6d8625922f5a0fd384b3238761a2003e5b5101c0c795c48ceb3ec72d9f7f5cf42df449075153f642f0ffb01414a5f6c7985855d752fd7c5a71d8eead5cf51681bb67adf267d5fb290933dff2aa25eff736616cb6437738b0121e4d14bdaf5e7e8009631ecb1f30bf574c7e3c6a79cd571dd08a38054cec4dce6fb7805a0fc8c729d75f1233bc85149e0bd1d13895855f71f2f57eda6101ed274c9e41468c28b97f5f969cc849ef5027c5afd57c24ae85e16e9659cd3954c9535d3218b20f191982df2dfad4fd13d0e33b24d83274ed6066814d70d41f84874c6072b9515aa5d2f0716d851a84533fd43f21c902fb54320e04fd0b7d05d169137482f82d46b275672a7c8aa51e4546ab494f0aa2dee67d5ea2476c0a7463af609727d52ac54054ee7f454f9420d5e9f5e28357c2b0745a466087d505919ae4923586649b5b3e845929c78ff4c22c6d5f8a31eb8eedb3351e6d5f9ce68dbb318a5d62bc116bdea32a77c46492a3ca52f06a00a14420daee72b97673ef6d4a3bc35a",
          ),
        );
      }
      {
        // zero key, random nonce
        const key = fromHex("0000000000000000000000000000000000000000000000000000000000000000");
        const nonce = fromHex("623ac6e73c2c00951bf4c7490e4692f8e30f5f8c1c4196da");

        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("ee5f3601ce18d227df5d5a8b2ddb05e3"), key, nonce),
        ).toEqual(fromHex(""));
        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("0c5a3d0c311a2a9598ce968549a8d6a6f9"), key, nonce),
        ).toEqual(fromHex("61"));
        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("0ce46df742a0423e9954a903c9f5bf54412e"), key, nonce),
        ).toEqual(fromHex("6162"));
        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("0ce4be1fd7c793ac56c6d734955514bd8391a3"), key, nonce),
        ).toEqual(fromHex("616263"));
        expect(
          await Xchacha20poly1305Ietf.decrypt(
            fromHex(
              "c0b1b1d9acd58a7e8bc324343f0f9bf4eca174c4f9056b7e2dda6f185ea7587d032b3b202df5db9ae73ace5f994b366cb82d05175b6af3f7b93f53a8bd3bf99f69dae2c5bdcdf9bb74c21706687956db8d9879a833ebaf7d70d74b52c750026f5dd14dc03c6376848443f0dc18fa39d2acfaaf41276789621aa6b844af8a3e00e0dc807ec113343a9a14c4e205064f113af0aaa01f00a0cee37e8f0f54d9818248f60f9f1bd2ff5c615f7ca72c6d71085b0ef79f51d8978cabf6c6dc31d526aa0a692748882bda4e2684014b7bdd2e598b1fed56b9ec4038a10a32be2c9e1b88d99d76d17646326ae4a8513bf030dc19af0e83a69219231dec942d72abd963a3e2fc854494f70539e5a92076f32431334bdba71aa81bb96fad0daa4e64a99f0d3bbc781554ba52bdac4690216faff2d25c229d2d69ae16da7d3a8adbc0424a3a923e562d3064dcc78155b4223a73c2587f4bc77c0ebe9592264c74437d95e976f11aef5e26db2ae7b54a4034301a21bce58aee4f51b8c4d09b2b188121c012f5a476580573b497cbf26f96c03dd22f2128f1e8e0669857a87d6a60741cef746b0af6c56adaff445f7736c65265d3a38305421b0b9e6161dcc2eac86f1d97a253c9df8594cf654e1c85ac6a323935b9a30911422f2514bc62aca52dacc4fea99fb2f28c71ca79737d8968b5d420143f4d313d3affda4a584877f08d59f7b83c7a16045c6d9d39ae696905139a322d02be29ce99a01493f9e3f38fbcb48b7c66d30c8b78c703eb1079eb5077f07ef5ecb281d15bedd35db5decd343c85ebe5471fd40004c24d3ad31878c5e92c98143728d2",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "ad376ccca21922a93f532f98bcede77577c5fb857ab280215b7ead7321844f23a42349e9095f394f028f0c731d43db471e39a008a79f5932cb709f2e48743f7a77bd3ee87f93fca8f33ff792daf289e7d4577299f52e0808222311df5e1bdf97c844daa0e9c62123c5df2f3ddc7f873052ee6ee282fa65a7a54d8b91c8e32f628b96c55bdc7db6a43ab156de528dd00e92a27e384addd02fb91cfff0bcf5a64f81738f82b49677661ffedc91af07f3e1ad62aef54daa9980ba4a221a5986c7c29d6867fa9e5db4ff9066da136afdd733b15a404d2dc195885ab0d82e1d1cc5cbae4011ce83146f079702813693483624c53c31775995e96b71def34a7d82c53b9bf4d7f612e89fdeb237f4df28e69f8cb8a3bc04c883915d3416a26c8e23c78efeb1ed658d0d6e7f95bc75c1652014084169569afac77c5b039d7db15c01a5b270b38a1e3d37fb1723a2de1b8ff0333d26ca5514473d3e98f815c894623779653018b7c7abcfe0cdc16f76b773332da2ef861cb7322aebbc64c880b7d805edd416cb231b18d910f0a93924f186fa490feb02ee5d21c17e76c526527951824f0c25dd658731c568d2beeb4619602362d3f07a5458399f68089dd196ef3db907730d48fa1fb4c5ea3dc6e9fc4493dc9662de0d87308be5cdbb8355e2b3a4c483d09ad71d97439950719cf88a6a0d1b616e0960ef2a320f4258a66f83d29f6a8d906427f4d94c0043bfd173a04c06c2e0e48e5c77d32578ee75bf553855f5daa8e376aca79b131bad85a0e78e224babd103ca84e7a3562610409b1c9b52b42548cd6c",
          ),
        );
        expect(
          await Xchacha20poly1305Ietf.decrypt(
            fromHex(
              "643165d44ba5adadc8dcd7cd9861e75bd376b35b393148bedac86beab88bd6d6fb95e70f45791d86ef1a5d2b7c2bdd624dfd878807cfda46208a5321f647b6f40f15c939ed4e8128109582c3296c119f81de260b205aff98cf62de57c51acfc2e67027e6f24ad416b9626c0e554f31f91d33872da95f5f7a43f1bd244e75fc9a64b2772e8d9e53e11686567bb1d4d0bb2245e6e517a06a47e1262c9e3585eb569593917af12507dcc93b198987367ce2e4f9f318e36e7dda75a35d84c062b1049a27ccd09cc99623eae3c67a3d64c219cbcb345be3dc121868a8d444314df152cf277353f8dd98c2be83b0257c7e952e43fff86ede2d6d77eb6bff8937587d0d41f1dbf6b9a318aa6e646682b9ec6739c1914cb3dba1f5a7f62abc0819e8c50c084b89ed9cae2c9e36ca699c4f0763599e67f7d2087edaf24560d21000436612a9244f0f2c465e98acab5aef36f1b0c0c485d0e896c5c65f0eedd118bd79dc9351218fe5a817271089a77e1fdb999885a0cc52fc603d58629a27ce314fd06e0f1dc109657ea210552f7aae86e4e906b8ae2943b9aa9e1bf42c35f92b5a4557e29e6a8b72173c576e300f7d02537ae8aeb52913a4ca18d4a89cccb6b39ad57adcfd9e0edb85b43224c1e60b66bac387a6cfe95e0f827835c12938c5d0833ac00e73c5a0846ec99e9eb2cb71a68e3b2e63a86969aa2face17c99bcd834afafc4ee1e2a8f26fc976d8ac49bc99c5b5b1630b27c85676fe6b9c0aa928e26585102e553486d943bae01de725d3b0a29b47216c2b5a43fb1d9d528b16760447643e93b2bfce4247dce0e9167c26d776ce5db7044411f3d1d4f51c400f0b14f65f68f395af75568955bbd1662b9e85c2b9651d0296be568d410af43d78a7202d357f7093644bbab734db1f8e2c4eb8f950b4e20122c0f079d3980539e8a7a22b0444d8e548f17a21c5cd01a1fdf237cd55e6031921488598919c6ded91d33169240d1dd5684de3368c0148cf82bbf9587a118ce770e5371b34b97a50cfeb2f685142dfa609225f6ed6c754c567eba859d794e89bd3b88f768bed757ecd2fbee8216816d4b15b6f39fb59b583353478372b6e395d845b57aef27dcdf40ee5e906e62fd6b5ae4ec071d95a3d9dc688b7aa1fe9bed64070e8881cbb7e10d37da67306d8c9c6f71dc175f055bba88271dfdaf0a88a4c5460fcf83c0b9ef58e75ee18a75bee1ddd3de18d130bc90327e2338cf2f640256d02ecffe9fa113c02c168c97845df2549c62504d1e6054d80caa18821222dbf73707816c7513c92574a8257bd84507b8706f9eea99d02910c3a7e5d4ed9d37d5f22888288e158a0c665bc5be491c514d763851e22a4852c8b8178cac89745949f264db4d4b3ac711ddc3b2e556aa10d957e60734e45b3f5b84a800752da82f36d820474126703c734515123b1054723a741d2840a8e935690158c47c8aa185",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "09b7b8c14569057a7c4cdc611b839bda48123c1aba86a3e1ac6ca981c7a8c1885c9d95c661d3ff530aaf9f07f8233049ebe92297fb3a708352c59fa703087011117215142f10843b976862579be7cea3d8112d3ae69f58ed9d9684da5c51123a73e5b08627ef83b1f8feb3ef91ca8f1be327468e0cc2b3bffc1a8ef1291cedf80ff8320b90f0d17fb623c447e65f4fa48a17327d427d1aa6bb445c61dda9cc9b5c1611675e618fe6b79ab9bf045cfe0b1295aa72ff1c73d6641fb942a831506c0d268c628abff8925c011d222c443b73f18e994077f1c7a893123ed400cf2f11b8fa144c0d8fc5afcd2960281f067f1329cd4abf15a1a701762121b1e103db9538f989443fbc824d39fab22b622ec98632e957adbb39dd956f31b42af3629d8fcd461c9d4519105c0f308c7c45888583832c3c659b17b0733bc7257a9c00899a4ba9933c211579480e5c30d6837241a59d044280df466d55d0b46dcfa2db4c809023d77c2503ed3afd82489c98b0949baac0a00403af770e65c45607b615912eaf7c727b15cf976e742c1cb75fc160966dda4504edc7322a9479cb2617286c85b1412b9ffc067be3f9d2fd49568a29fe40115cf76de6dd7cc3f7e833bafbdffc39097150fe14960582a39d10102aa86718f59b102c89441806c80acfe300ea415be03162e729bd92a75b4e18a33470409034bc7fc7e9fb6c4823d6bfc77d75046c0927922dae805c7ced7a4a6fb4f46a15ee6b145e0dae56e6480ac726f7ccd5296fb2c82b5ebc2239eac2d81cea4fa789e0187134a270b6e74fc7932983e6e993e391ecc0dc9cb5963a644c6ece2eba6564533a330861eaac6120f84959e5b41ccbbe2255db17106a9955a94964ba07c5b1d1a0159f3f1e8f76f65181c17e3d616398df19fe6d8625922f5a0fd384b3238761a2003e5b5101c0c795c48ceb3ec72d9f7f5cf42df449075153f642f0ffb01414a5f6c7985855d752fd7c5a71d8eead5cf51681bb67adf267d5fb290933dff2aa25eff736616cb6437738b0121e4d14bdaf5e7e8009631ecb1f30bf574c7e3c6a79cd571dd08a38054cec4dce6fb7805a0fc8c729d75f1233bc85149e0bd1d13895855f71f2f57eda6101ed274c9e41468c28b97f5f969cc849ef5027c5afd57c24ae85e16e9659cd3954c9535d3218b20f191982df2dfad4fd13d0e33b24d83274ed6066814d70d41f84874c6072b9515aa5d2f0716d851a84533fd43f21c902fb54320e04fd0b7d05d169137482f82d46b275672a7c8aa51e4546ab494f0aa2dee67d5ea2476c0a7463af609727d52ac54054ee7f454f9420d5e9f5e28357c2b0745a466087d505919ae4923586649b5b3e845929c78ff4c22c6d5f8a31eb8eedb3351e6d5f9ce68dbb318a5d62bc116bdea32a77c46492a3ca52f06a00a14420daee72b97673ef6d4a3bc35a",
          ),
        );
      }
      {
        // random key, zero nonce
        const key = fromHex("1e1d2cd50e63f38a81275236f5ccc04c06dbe7a9b050eb1e38cb196c4125bbe2");
        const nonce = fromHex("000000000000000000000000000000000000000000000000");

        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("6142f36622e4becf1fad773123d067e8"), key, nonce),
        ).toEqual(fromHex(""));
        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("94f1c39995a77dd01265112ea5f5c3470c"), key, nonce),
        ).toEqual(fromHex("61"));
        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("94f1ba350b17e0b580bb7541812ffcaf4eda"), key, nonce),
        ).toEqual(fromHex("6162"));
        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("94f1a17b016c87a9a1135b57acc427edea2b6e"), key, nonce),
        ).toEqual(fromHex("616263"));
        expect(
          await Xchacha20poly1305Ietf.decrypt(
            fromHex(
              "58a4ae64d149c7fe648d93f0a293055b08c72302a457aa99d6892b258b9d5bcc59332df250f735d98ff32351907738efbc21ef0412e9a00ae7f2fecedcd6ae52abe266f1e17990ce2f958bfdd6bc32ca70f0734788d44318d7fc86c687059da9ac6b859c5286b3941b2847891ea87a56e81a3d7d543dea2c984492ff8345ab8f52ec69d0ce1392dc42f1df875b9170b198b04ee4d9f7cfd430c145066a9b4592b828d5785e600b655982797557827cfc8c9e2bd55df3fc956f5199c59974dc2e1550361487181516f322b44d7d1649dd072932e0225bf929e1c6d905055051ccc779edbdd9c8643f318a6f564197e3187b27f84b4e153317e860542a3bbe541738c9e6115da21bd23cc40a8ef8b205f824fd4bcf4abfd88cfb4436a4e651c39a14412fe68da9a1a1abf62674ff001e31a6d2b435828321686e1b135a51d65e8117dcf31aab6b8120ebcc6a8c048d47685c9a0fd58ee629b9a7ee73734082da893484ef9de37a291881ff808192d0726c41f1b04fbd687331e1e8a71cc1f84186556c6bc81545413c52a1cc21e42675929369340f93d55396ce25e1fdd819015e8295d529b85032f21aeefadfb1aaac0e1d3e04b5fba0150a9b9796a628e5627713443aed99f480cd7495b5eb5a4c65d2b9bad43fce9b7d24a18cf3e8e983942ed476f2deb38aa3ff38f0b84a3432e5fb25647a3ca0d2a563e8655f93cd1be4f2672375740a469b75dcdd66fc5f3645e751caadfcf11ec3efdf1015160b3035134b44acc6fef3b5fd00d9c7e713590d1021ab6c2ced3316a813a10969e3da876fe152b8253ddd4f853fdc9954e3f3349de7",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "ad376ccca21922a93f532f98bcede77577c5fb857ab280215b7ead7321844f23a42349e9095f394f028f0c731d43db471e39a008a79f5932cb709f2e48743f7a77bd3ee87f93fca8f33ff792daf289e7d4577299f52e0808222311df5e1bdf97c844daa0e9c62123c5df2f3ddc7f873052ee6ee282fa65a7a54d8b91c8e32f628b96c55bdc7db6a43ab156de528dd00e92a27e384addd02fb91cfff0bcf5a64f81738f82b49677661ffedc91af07f3e1ad62aef54daa9980ba4a221a5986c7c29d6867fa9e5db4ff9066da136afdd733b15a404d2dc195885ab0d82e1d1cc5cbae4011ce83146f079702813693483624c53c31775995e96b71def34a7d82c53b9bf4d7f612e89fdeb237f4df28e69f8cb8a3bc04c883915d3416a26c8e23c78efeb1ed658d0d6e7f95bc75c1652014084169569afac77c5b039d7db15c01a5b270b38a1e3d37fb1723a2de1b8ff0333d26ca5514473d3e98f815c894623779653018b7c7abcfe0cdc16f76b773332da2ef861cb7322aebbc64c880b7d805edd416cb231b18d910f0a93924f186fa490feb02ee5d21c17e76c526527951824f0c25dd658731c568d2beeb4619602362d3f07a5458399f68089dd196ef3db907730d48fa1fb4c5ea3dc6e9fc4493dc9662de0d87308be5cdbb8355e2b3a4c483d09ad71d97439950719cf88a6a0d1b616e0960ef2a320f4258a66f83d29f6a8d906427f4d94c0043bfd173a04c06c2e0e48e5c77d32578ee75bf553855f5daa8e376aca79b131bad85a0e78e224babd103ca84e7a3562610409b1c9b52b42548cd6c",
          ),
        );
        expect(
          await Xchacha20poly1305Ietf.decrypt(
            fromHex(
              "fc247a693639e02d2792600905fd79f43710e49d64638959219b2fd76db1d567a18df1dd387bf3c587d3b0257517d3e149f16d9b4e4c89bb7e47fe4797aae139cd2d4d0db1fae85d4bc21e3897a9758e7cb62ce49b6513fd684913c3854f500417caefba9caf11062609db5b531d727d59d31511da053c34c113979f62ba6915d6829e80829ef507ce634d1eef43ef1b800502a1d157055d3299e6970bc72f46654d4b9db497f3e5f1e61c5bfcd9711633692f52ef4516c3b104029d68c34b80851edd8c93fa597b3f45737c3bafa59d47fdebed786bab0928643fff1883bb16d1c3e83f5753ce976ba18e48cdd9aa2f97d6838302217d7def9f86d1a73f4ab99bc4b8a370f60641b7094c7ab27a53f2aeb7a06639059444a06320e29b10999b27b6de1e45bddf82317adfc9dfa88fba6497decae353ed4056414b9191d772a92cc6ea38b749037fc6328441080f35f0e7541841169d7a748f4fd628806eef6c94bf8f266db624efbd12beaa7953cb5504b70cfc8cedef83e0e471acafe83d7cecdb3aa81853c6a28fb4f4673d1d5c0b15b19f565fd31fca9f7a78a29eb322d716099b31759321c35dd7418f8703e723ad550c1aafd9a07ec5b1e87aafa7baf82705b1a2d325fcf530dfd4bfd9ba5bd77f42c81f69f7f48724111b94ae47fdbf1541de2b173a4e1c03537c389a1df4d5bc30296955341c5706290afe950c1c666f0da63f6be858967143bcfa36405169ca78b13b8a6b83cc860d2784d81d51251487b995c6b6a45a99d48b1d441893b462cf93fe8fb7765e6ff255a87e7c294b1e69e2483a56586d5e422bf9095e7b2aac6305ae4112024e02966b6d6494c4252c44f2ff807b27597891f95b2c2781444ff402155f2e34477dca2d5926934bba819561cdf7fa3e6e1009db51a4d99f2c364854b20b5e4f7713a409ebd31e16e0f6505158fdd2406a085c66ec2af17aa2e197f22094cf6167168243b5e73e45286b1fcc8b66f28058a0a6b2554f641780c4e31d8b6f47f34e0e978ecd3127ae148561a8c18c1f36b5349ae74fddc3caa4ba88c31a12a42f918c10f0bf56defcc8bcfb0975c2d550160d381c9b323d87d927f490abd1c992e490aa0c069437c34998f8b0e8e6f97ea010195387d512d2bef913fcfee4c088a36b0e03c5e14296cc991c2efaf9f27f2c44aa5734defac0138de2049b03ace45b3f4db3865be3157924ede7ee0e381fefb4c418363326f5c0d72ca1e9b9bd2cac73e3e793b1afc8101f3cd57aa7edb9d49777f447637d423821cde426e9f56083d0fd0c39816d08434f04ddc1eeeeb9fe6bc4c985d33c66f64a221f63f2d2f9fc2fa68ccd8b797ca84fbb92fda61093490492bdceb5796de563592f97531a15edb2b45b15008207ebb27fc4d9dfef4014e3f347af35c1e5686df24491b88477c90180a89d845299097a54f97d71ac3b07e6722602dd823434",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "09b7b8c14569057a7c4cdc611b839bda48123c1aba86a3e1ac6ca981c7a8c1885c9d95c661d3ff530aaf9f07f8233049ebe92297fb3a708352c59fa703087011117215142f10843b976862579be7cea3d8112d3ae69f58ed9d9684da5c51123a73e5b08627ef83b1f8feb3ef91ca8f1be327468e0cc2b3bffc1a8ef1291cedf80ff8320b90f0d17fb623c447e65f4fa48a17327d427d1aa6bb445c61dda9cc9b5c1611675e618fe6b79ab9bf045cfe0b1295aa72ff1c73d6641fb942a831506c0d268c628abff8925c011d222c443b73f18e994077f1c7a893123ed400cf2f11b8fa144c0d8fc5afcd2960281f067f1329cd4abf15a1a701762121b1e103db9538f989443fbc824d39fab22b622ec98632e957adbb39dd956f31b42af3629d8fcd461c9d4519105c0f308c7c45888583832c3c659b17b0733bc7257a9c00899a4ba9933c211579480e5c30d6837241a59d044280df466d55d0b46dcfa2db4c809023d77c2503ed3afd82489c98b0949baac0a00403af770e65c45607b615912eaf7c727b15cf976e742c1cb75fc160966dda4504edc7322a9479cb2617286c85b1412b9ffc067be3f9d2fd49568a29fe40115cf76de6dd7cc3f7e833bafbdffc39097150fe14960582a39d10102aa86718f59b102c89441806c80acfe300ea415be03162e729bd92a75b4e18a33470409034bc7fc7e9fb6c4823d6bfc77d75046c0927922dae805c7ced7a4a6fb4f46a15ee6b145e0dae56e6480ac726f7ccd5296fb2c82b5ebc2239eac2d81cea4fa789e0187134a270b6e74fc7932983e6e993e391ecc0dc9cb5963a644c6ece2eba6564533a330861eaac6120f84959e5b41ccbbe2255db17106a9955a94964ba07c5b1d1a0159f3f1e8f76f65181c17e3d616398df19fe6d8625922f5a0fd384b3238761a2003e5b5101c0c795c48ceb3ec72d9f7f5cf42df449075153f642f0ffb01414a5f6c7985855d752fd7c5a71d8eead5cf51681bb67adf267d5fb290933dff2aa25eff736616cb6437738b0121e4d14bdaf5e7e8009631ecb1f30bf574c7e3c6a79cd571dd08a38054cec4dce6fb7805a0fc8c729d75f1233bc85149e0bd1d13895855f71f2f57eda6101ed274c9e41468c28b97f5f969cc849ef5027c5afd57c24ae85e16e9659cd3954c9535d3218b20f191982df2dfad4fd13d0e33b24d83274ed6066814d70d41f84874c6072b9515aa5d2f0716d851a84533fd43f21c902fb54320e04fd0b7d05d169137482f82d46b275672a7c8aa51e4546ab494f0aa2dee67d5ea2476c0a7463af609727d52ac54054ee7f454f9420d5e9f5e28357c2b0745a466087d505919ae4923586649b5b3e845929c78ff4c22c6d5f8a31eb8eedb3351e6d5f9ce68dbb318a5d62bc116bdea32a77c46492a3ca52f06a00a14420daee72b97673ef6d4a3bc35a",
          ),
        );
      }
      {
        // random key, random nonce
        const key = fromHex("1e1d2cd50e63f38a81275236f5ccc04c06dbe7a9b050eb1e38cb196c4125bbe2");
        const nonce = fromHex("623ac6e73c2c00951bf4c7490e4692f8e30f5f8c1c4196da");

        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("7e51936afe05c64a87fcd64cf811f22d"), key, nonce),
        ).toEqual(fromHex(""));
        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("fb5530e69e505cb1d3d5344f354e8e96d5"), key, nonce),
        ).toEqual(fromHex("61"));
        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("fb4927d0dbb75b8d866c0f891195be725cfe"), key, nonce),
        ).toEqual(fromHex("6162"));
        expect(
          await Xchacha20poly1305Ietf.decrypt(fromHex("fb4984e6af4f702a738693d59104c6690da890"), key, nonce),
        ).toEqual(fromHex("616263"));
        expect(
          await Xchacha20poly1305Ietf.decrypt(
            fromHex(
              "371c8bc350aca6a7aeb8eed66276f2a11f4f48147aa0871bc693603beeec2c68fc89dff91dcc2b7799960f40c3a8cb2c9d98d0c8fb22e3823f066e0f73e95c1420a386aec2060c21e8cd2cd79f3c14cc6af7d249acd2cd7945318b0184fdacb6eba33eb7e4498431c9ed484f24c1c4ddd8a8f3ed0f82d01e0afe595ef389c3dcad0688443cdebb3bbc0f8b34e8b6455012c77fed003d433e267ac0aea55618ef95ba3726484f6982900bc12304c2dcd89101301a9dc8eb350dc24532c7f46d9f34565d6abb6546c2fd8c74a1fd2a715b81d54cc93bd12b315ec070c81cfa072472a5b9e89ec545a0d1895e112abca47b3d2a610f1d06ccf80c04529a01794cc5498fe6ecf48cdb97f8b591b1688d6706b72cbc480f463016f177b7d2b941d1e48ac7a735e7f84fcf42004aa2c37941930a4f5b98ab3c68f32667f4f814c12c0e17d2c7599b2d248d51e3e7dae9f1df5441f1290bc26e2e7043ead46958c2abbc76ed2bc8e01befbd9a4d55af491d3187815b90cb1dc6016b5e15698a5b6cf41166d291118f19a25e6fdce0a04a1ecfa4a7ee66f8d21774921b9a31fe72a20de610338c7c041e2c7980e28d6da6b769f321e142ed2cc4334ec87e974052f39442d1a87c28846c1bfee8fd41254cc2359dcc885b95f1b8d64d8ca5bc82035a52f7ce50ae9456dbec99b6a2c4f29c4d3f140edfb0adce7b990db7bfe8f440c1674c33b5bde7814c12bccc1968fef2282c927b08f95b06e48716191ec95bd0c65f18f88e8fe2e626eee92bcbb960df674320a2591e82e973ccac49d67dc3f34897e51b9089520ae8275be009c0b5695325e7dd",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "ad376ccca21922a93f532f98bcede77577c5fb857ab280215b7ead7321844f23a42349e9095f394f028f0c731d43db471e39a008a79f5932cb709f2e48743f7a77bd3ee87f93fca8f33ff792daf289e7d4577299f52e0808222311df5e1bdf97c844daa0e9c62123c5df2f3ddc7f873052ee6ee282fa65a7a54d8b91c8e32f628b96c55bdc7db6a43ab156de528dd00e92a27e384addd02fb91cfff0bcf5a64f81738f82b49677661ffedc91af07f3e1ad62aef54daa9980ba4a221a5986c7c29d6867fa9e5db4ff9066da136afdd733b15a404d2dc195885ab0d82e1d1cc5cbae4011ce83146f079702813693483624c53c31775995e96b71def34a7d82c53b9bf4d7f612e89fdeb237f4df28e69f8cb8a3bc04c883915d3416a26c8e23c78efeb1ed658d0d6e7f95bc75c1652014084169569afac77c5b039d7db15c01a5b270b38a1e3d37fb1723a2de1b8ff0333d26ca5514473d3e98f815c894623779653018b7c7abcfe0cdc16f76b773332da2ef861cb7322aebbc64c880b7d805edd416cb231b18d910f0a93924f186fa490feb02ee5d21c17e76c526527951824f0c25dd658731c568d2beeb4619602362d3f07a5458399f68089dd196ef3db907730d48fa1fb4c5ea3dc6e9fc4493dc9662de0d87308be5cdbb8355e2b3a4c483d09ad71d97439950719cf88a6a0d1b616e0960ef2a320f4258a66f83d29f6a8d906427f4d94c0043bfd173a04c06c2e0e48e5c77d32578ee75bf553855f5daa8e376aca79b131bad85a0e78e224babd103ca84e7a3562610409b1c9b52b42548cd6c",
          ),
        );
        expect(
          await Xchacha20poly1305Ietf.decrypt(
            fromHex(
              "939c5fceb7dc8174eda71d2fc5188e0e20988f8bba94a4db318164c908c0a2c3043703d67540ed6b91b69c3426c8202268485257a787ca33a6b36e863895137f466cad52928574b28c9ab912de29538866b18deabf639d9cfa841e0486b7611b500254912a6026a3f4ccd49d6974ccf66961db8181ba060653a95c3e1276014629687f147053dce0309d19ad5c64dafa0a7233a8089d89b72422633fc40a723b48dfa9c3a2b89102386fa40daf99d1322ef6349d2f7e0163d397de6a3643fa31a418b6f2af870aaf31ebb390bb939d1bc10195c461e17911976296320129edfe641fbc6a105eef088ba2bf0fa6f2ed4cd1db1ac7513282920bfb80619df8526bea82b85ed9d8c6047378d7452245310c3d6657e17cfc7cdeaa50a194c4008be5b93056cd2fec31ecd88cb31fe3d1d018c80a3167caeca4db1e3dac33d4c000262cc8de7b870fa6d27c1d0917e573adccfa3f3e9f5a157dbd6b4b7132982e9e59d6d64b736ed7e24aa6a06b84a29e88bec41d2c782c439dd95f19bf3a357c88ebdf65c071820f25c0b2c9d8e69325e63d2136cda11e1138ce4ac5a8a134082e6f84afc264c9dd3f48c7db363d901e22de918a4a4278bd863a9658e99cd5b14ccde5e9f767cebd67c6acb72071cf340b980a7047b556d45fee093854fe449e3b660f678261f26b017a8d01008032622e3a978be3f83b9d203959f3bd9918d69fd83b9b6eace0e2d15f6187b2f89b5e381ce0bae59c7d91c7354003fbc903eb3b2ea74d9ab1de63ff4eb2c6f59a8826dd84e13de1508bf7ac5a358521026eee39c1e45a5bd889404da32f6cee415928e01b723cea9165a487073989adbd4ed139dc32fd9912f750bfc0f4d7113a24e2855218ec99d5de1c87276727134cd778989937c00c30c26e7b0c91f39aa1eed52089f55092bac70bd91b190ae573490713c00cc47915540a8e15e7fdbd02874d9f8de11e3d91b0add39b27cddbb91e9cc11958896d5f43cfaff9b672bd18af5260e28c48c12fde57d34f0e9df7199f514bac7e06d164fc96ca69170c5194f040ed14d45a07766e87afa919fe4f082e3d95c6e73c3fe26cf742f71152d9ac4a1e554830075b1812ab5acde59b98bcc1e1894935e7a1bd66bc7187a3d2555f10589d60dd93e5d997fe6ffe18fe787eeab5ccfb80c012c34e4fb4fb30387e0ba9d9e2d07876f3598b95b92ece64a0f3b4aa70fbf8415ffa195a076689947c5e539098856bab5950f0bccf839c283a5972e8e70000883ddcee167eb2c424b72a82753a7f4ef14bc66ba621331e37392fce0eae3d820059e0316b5b7f1cb46a2ef026a6a942745267918cccbd535af4bc3b1e14d9b543946840c824f21730a233d01cc438cb2ac5435135a627c77508433c8c657f87bfffea9bcefe9b8e21f4e7c64a39fe3766896f4e32829bee81c2d7f12464067b734245b5246814f986f35517fee6ec",
            ),
            key,
            nonce,
          ),
        ).toEqual(
          fromHex(
            "09b7b8c14569057a7c4cdc611b839bda48123c1aba86a3e1ac6ca981c7a8c1885c9d95c661d3ff530aaf9f07f8233049ebe92297fb3a708352c59fa703087011117215142f10843b976862579be7cea3d8112d3ae69f58ed9d9684da5c51123a73e5b08627ef83b1f8feb3ef91ca8f1be327468e0cc2b3bffc1a8ef1291cedf80ff8320b90f0d17fb623c447e65f4fa48a17327d427d1aa6bb445c61dda9cc9b5c1611675e618fe6b79ab9bf045cfe0b1295aa72ff1c73d6641fb942a831506c0d268c628abff8925c011d222c443b73f18e994077f1c7a893123ed400cf2f11b8fa144c0d8fc5afcd2960281f067f1329cd4abf15a1a701762121b1e103db9538f989443fbc824d39fab22b622ec98632e957adbb39dd956f31b42af3629d8fcd461c9d4519105c0f308c7c45888583832c3c659b17b0733bc7257a9c00899a4ba9933c211579480e5c30d6837241a59d044280df466d55d0b46dcfa2db4c809023d77c2503ed3afd82489c98b0949baac0a00403af770e65c45607b615912eaf7c727b15cf976e742c1cb75fc160966dda4504edc7322a9479cb2617286c85b1412b9ffc067be3f9d2fd49568a29fe40115cf76de6dd7cc3f7e833bafbdffc39097150fe14960582a39d10102aa86718f59b102c89441806c80acfe300ea415be03162e729bd92a75b4e18a33470409034bc7fc7e9fb6c4823d6bfc77d75046c0927922dae805c7ced7a4a6fb4f46a15ee6b145e0dae56e6480ac726f7ccd5296fb2c82b5ebc2239eac2d81cea4fa789e0187134a270b6e74fc7932983e6e993e391ecc0dc9cb5963a644c6ece2eba6564533a330861eaac6120f84959e5b41ccbbe2255db17106a9955a94964ba07c5b1d1a0159f3f1e8f76f65181c17e3d616398df19fe6d8625922f5a0fd384b3238761a2003e5b5101c0c795c48ceb3ec72d9f7f5cf42df449075153f642f0ffb01414a5f6c7985855d752fd7c5a71d8eead5cf51681bb67adf267d5fb290933dff2aa25eff736616cb6437738b0121e4d14bdaf5e7e8009631ecb1f30bf574c7e3c6a79cd571dd08a38054cec4dce6fb7805a0fc8c729d75f1233bc85149e0bd1d13895855f71f2f57eda6101ed274c9e41468c28b97f5f969cc849ef5027c5afd57c24ae85e16e9659cd3954c9535d3218b20f191982df2dfad4fd13d0e33b24d83274ed6066814d70d41f84874c6072b9515aa5d2f0716d851a84533fd43f21c902fb54320e04fd0b7d05d169137482f82d46b275672a7c8aa51e4546ab494f0aa2dee67d5ea2476c0a7463af609727d52ac54054ee7f454f9420d5e9f5e28357c2b0745a466087d505919ae4923586649b5b3e845929c78ff4c22c6d5f8a31eb8eedb3351e6d5f9ce68dbb318a5d62bc116bdea32a77c46492a3ca52f06a00a14420daee72b97673ef6d4a3bc35a",
          ),
        );
      }
    });
  });
});
