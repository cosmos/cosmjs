import { fromHex, toAscii } from "@cosmjs/encoding";

import { Argon2id, Argon2idOptions } from "./argon2";

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
    await expectAsync(Argon2id.execute(password, fromHex("aabbccddeeff0011"), options)).toBeRejectedWithError(
      /invalid salt length/,
    );
    // 15 bytes
    await expectAsync(
      Argon2id.execute(password, fromHex("aabbccddeeff001122334455667788"), options),
    ).toBeRejectedWithError(/invalid salt length/);
    // 17 bytes
    await expectAsync(
      Argon2id.execute(password, fromHex("aabbccddeeff00112233445566778899aa"), options),
    ).toBeRejectedWithError(/invalid salt length/);
    // 32 bytes
    await expectAsync(
      Argon2id.execute(
        password,
        fromHex("aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899"),
        options,
      ),
    ).toBeRejectedWithError(/invalid salt length/);
  });
});
